---
id: supernets-setup-dev-env
title: Deploying Polygon Supernets with Terraform
sidebar_label: Cloud deployment
description: "An introduction to Polygon Supernets."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document provides a complete walkthrough for setting up and configuring a childchain devnet on AWS using Terraform. The AWS deployment tab contains detailed instructions for deploying a devnet on AWS, and there is also a fast track guide for quick reference.

The tutorials will teach you how to set up a devnet for Polygon Supernets on AWS using Terraform and Ansible. This involves creating a VPC, subnets, security groups, and EC2 instances, and configuring the nodes using an Ansible playbook.

Additionally, a troubleshoot guide will be published shortly to help you with any issues that may arise during the setup, and we plan to add similar guides for other cloud providers in the future.

:::caution Supernets are in active development and not recommended for production use

In their current state, these guides are intended for testing purposes only. The software is subject to change and is still undergoing audits. Using Supernets in production may result in unexpected behavior and loss of funds. Please exercise caution and follow best practices when working with Supernets.

Please note that Supernets will be considered production ready upon the release of version 1.0.

:::

<!-- ===================================================================================================================== -->
<!-- ===================================================================================================================== -->
<!-- ===================================================== GUIDE TABS ==================================================== -->
<!-- ===================================================================================================================== -->
<!-- ===================================================================================================================== -->

<Tabs
defaultValue="aws-cloud"
values={[
{ label: 'AWS deployment', value: 'aws-cloud', },
{ label: 'Fast Track', value: 'fast', },
{ label: 'Troubleshoot', value: 'troubleshoot', },
]
}>

<!-- ===================================================================================================================== -->
<!-- ==================================================== AWS GUIDE ====================================================== -->
<!-- ===================================================================================================================== -->

<TabItem value="aws-cloud">

## What you'll learn

- How to deploy a devnet cloud deployment on AWS using Terraform.
- How to configure EC2 instances for Supernet nodes.
- How to run and manage a PolyBFT network on AWS.

## Prerequisites

Before starting the tutorial, make sure you have the following prerequisites:

- An AWS account with administrator access and an RDS database.
- Basic knowledge of AWS services.
- Basic knowledge of Terraform and Ansible.

- The following software needs to be installed on your local machine:

  | Name | Version | Documentation |
  |------|---------|---------------|
  | <a name="requirement_aws_cli"></a> [AWS CLI](#requirement_aws_cli) | >= 2.2.0 | [Link](https://aws.amazon.com/cli/) |
  | <a name="requirement_terraform"></a> [Terraform](#requirement_terraform) | >= 1.3.0 | [Link](https://www.terraform.io/downloads.html) |
  | <a name="requirement_ansible"></a> [Ansible](#requirement_ansible) | >= 2.14 | [Link](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) |
  | <a name="requirement_polygon_cli"></a> [Polygon CLI](#requirement_polygon_cli) | >= 3.3.0 | [Link](https://github.com/0xPolygon/polygon-cli) |

- This tutorial uses the following providers:

  | Name | Version |
  |------|---------|
  | <a name="provider_aws"></a> [AWS](#provider\_aws) | >= 4.22.0 |
  | <a name="provider_datadog"></a> [Datadog](#provider\_datadog) | >= 3.22.0 |

## What you'll do

The tutorial will cover the following steps:

1. Set up AWS credentials and create a VPC.
2. Configure the devnet deployment using Terraform.
3. Configure the devnet deployment nodes using Ansible.
4. Test the devnet deployment.
5. Optional: destroy the setup

<details>
<summary> Summary of deployed resources </summary>

- A VPC with multiple subnets across different availability zones.
- Internet Gateway to allow public access to the VPC.
- NAT Gateways for private resources to access the internet.
- Security Groups for the different resources.
- Route Tables to route traffic between the different subnets and gateways.
- Elastic IPs to associate with the NAT Gateways.
- Private DNS zones and DNS records for the different resources within the VPC.
- EC2 instances to serve as validators, full nodes, and explorers within the VPC.
- IAM roles and policies to allow EC2 instances to communicate with other resources within the VPC.
- S3 buckets to store blockchain data.
- Lambda functions to manage the blockchain.
- API Gateway to manage the API endpoints for accessing the blockchain.

</details>

## Configure a devnet

Before you get started, start by cloning Polygon devnet repository to your local machine.

  ```shell
  git clone git@github.com:maticnetwork/terraform-polygon-supernets.git
  ```

### 1. Set up AWS credentials

To utilize AWS services, you need to set up your AWS credentials. There are two ways to set up these credentials: using the AWS CLI or manually setting them up in your AWS console. To learn more about setting up AWS credentials, check out the documentation provided by AWS [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

### 2. Configure the deployment using Terraform

Using Terraform makes it easy to set up a devnet deployment on AWS. The first step is to initialize your working directory, which involves downloading and installing the necessary modules and plugins. Next, you can create an execution plan that previews the changes without applying them. This lets you preview the resources created, modified, or destroyed as part of the deployment. Finally, you can apply the changes to create or modify the resources based on the execution plan.

:::info Terraform templates

The repository provides Terraform templates to set up each key system component.
Each component is defined in its directory within the modules directory.

<details>
<summary>Terraform template components</summary>

- `dns`: creates the DNS records for the nodes
- `ebs`: creates Elastic Block Store (EBS) volumes and attaches them to nodes
- `ec2`: creates the EC2 instances for the nodes and jumpbox
- `elb`: creates the Elastic Load Balancer (ELB) for the nodes
- `networking`: creates the VPC, subnets, and other networking resources
- `securitygroups`: creates the security groups for the nodes and jumpbox
- `ssm`: creates the EC2 System Manager for the nodes and jumpbox

Each directory contains a `main.tf` file, defining the resources for that component.

</details>

- The `main.tf` file at the root of the repository ties all these components together. It specifies the desired state of the infrastructure to be created on AWS and references the modules defined in the `modules` directory. It also includes provider configuration and local variables used throughout the templates.

<details>
<summary>main.tf</summary>

```terraform
locals {
  network_type       = "edge"
  base_ami           = "ami-0ecc74eca1d66d8a6"
  base_dn            = format("%s.%s.%s.private", var.deployment_name, local.network_type, var.company_name)
  base_id = format("%s-%s", var.deployment_name, local.network_type)
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.58.0"
    }
    datadog = {
      source  = "DataDog/datadog"
      version = "~> 3.22.0"
    }
  }
  required_version = ">= 1.3.0"
}

module "dns" {
  source                       = "./modules/dns"
  base_dn                      = local.base_dn
  region                       = var.region
  fullnode_count               = var.fullnode_count
  validator_count              = var.validator_count

  devnet_id = "${module.networking.devnet_id}"
  aws_lb_int_rpc_domain = "${module.elb.aws_lb_int_rpc_domain}"
  validator_private_ips = module.ec2.validator_private_ips
  fullnode_private_ips = module.ec2.fullnode_private_ips
}

module "ebs" {
  source                       = "./modules/ebs"
  zones               = var.zones
  node_storage              = var.node_storage
  validator_count              = var.validator_count
  fullnode_count               = var.fullnode_count

  validator_instance_ids = module.ec2.validator_instance_ids
  fullnode_instance_ids = module.ec2.fullnode_instance_ids
}

module "ec2" {
  source                       = "./modules/ec2"
  base_dn = local.base_dn
  base_instance_type           = var.base_instance_type
  base_ami                     = local.base_ami
  fullnode_count               = var.fullnode_count
  validator_count              = var.validator_count
  jumpbox_count                = var.jumpbox_count
  base_devnet_key_name              = format("%s_ssh_key", var.deployment_name)
  private_network_mode = var.private_network_mode
  network_type                 = local.network_type
  deployment_name              = var.deployment_name
  create_ssh_key = var.create_ssh_key
  devnet_key_value = var.devnet_key_value
  jumpbox_instance_type = var.jumpbox_instance_type

  devnet_private_subnet_ids = module.networking.devnet_private_subnet_ids
  devnet_public_subnet_ids = module.networking.devnet_public_subnet_ids
  ec2_profile_name = module.ssm.ec2_profile_name
}

module "elb" {
  source                       = "./modules/elb"
  http_rpc_port                = var.http_rpc_port
  fullnode_count               = var.fullnode_count
  validator_count              = var.validator_count
  base_id = local.base_id

  devnet_private_subnet_ids = module.networking.devnet_private_subnet_ids
  devnet_public_subnet_ids = module.networking.devnet_public_subnet_ids
  fullnode_instance_ids = module.ec2.fullnode_instance_ids
  validator_instance_ids = module.ec2.validator_instance_ids
  devnet_id = module.networking.devnet_id
  security_group_open_http_id = module.securitygroups.security_group_open_http_id
  security_group_default_id = module.securitygroups.security_group_default_id
}

module "networking" {
  source                       = "./modules/networking"
  base_dn                      = local.base_dn
  devnet_vpc_block = var.devnet_vpc_block
  devnet_public_subnet = var.devnet_public_subnet
  devnet_private_subnet = var.devnet_private_subnet
  zones = var.zones
}

module "securitygroups" {
  source                       = "./modules/securitygroups"
  depends_on = [
    module.networking
  ]
  jumpbox_count                = var.jumpbox_count
  network_type                 = local.network_type
  deployment_name              = var.deployment_name
  jumpbox_ssh_access = var.jumpbox_ssh_access
  network_acl = var.network_acl
  http_rpc_port = var.http_rpc_port

  devnet_id = module.networking.devnet_id
  validator_primary_network_interface_ids = module.ec2.validator_primary_network_interface_ids
  fullnode_primary_network_interface_ids = module.ec2.fullnode_primary_network_interface_ids
  jumpbox_primary_network_interface_ids = module.ec2.jumpbox_primary_network_interface_ids
}

module "ssm" {
  source                       = "./modules/ssm"
  base_dn                      = local.base_dn
  jumpbox_ssh_access = var.jumpbox_ssh_access
  deployment_name              = var.deployment_name
  network_type                 = local.network_type
}

provider "aws" {
  region = var.region
  default_tags {
    tags = {
      Environment    = var.environment
      Network        = local.network_type
      Owner          = var.owner
      DeploymentName = var.deployment_name
      BaseDN         = local.base_dn
      Name           = local.base_dn
    }
  }
}
```

</details>

- The `outputs.tf` file at the repository's root defines the values to be outputted by Terraform after it applies the configuration in `main.tf`. This can include IP addresses, DNS names, and other essential values needed for further configuration or testing.

<details>
<summary>outputs.tf</summary>

```terraform
output "aws_lb_int_rpc_domain" {
  value = module.elb.aws_lb_int_rpc_domain
}

output "aws_lb_ext_domain" {
  value = module.elb.aws_lb_ext_rpc_domain
}

output "aws_lb_ext_validator_domain" {
  value = module.elb.aws_lb_ext_rpc_validator_domain
}

output "base_dn" {
  value = local.base_dn
}
output "base_id" {
  value = local.base_id
}
```

</details>

- The following table includes all the configurable input variables.

<details>
<summary>Inputs</summary>

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_alb_ssl_certificate"></a> [alb\_ssl\_certificate](#input\_alb\_ssl\_certificate) | SSL certificate ARN for JSON-RPC loadblancer | `string` | n/a | yes |
| <a name="input_premine"></a> [premine](#input\_premine) | Premine the accounts with the specified ammount. Format: account:ammount,account:ammount | `string` | n/a | yes |
| <a name="input_alb_sec_gr_name_tag"></a> [alb\_sec\_gr\_name\_tag](#input\_alb\_sec\_gr\_name\_tag) | External security group name tag | `string` | `"Polygon Edge External"` | no |
| <a name="input_block_gas_limit"></a> [block\_gas\_limit](#input\_block\_gas\_limit) | Set the block gas limit | `string` | `""` | no |
| <a name="input_block_gas_target"></a> [block\_gas\_target](#input\_block\_gas\_target) | Sets the target block gas limit for the chain | `string` | `""` | no |
| <a name="input_block_time"></a> [block\_time](#input\_block\_time) | Set block production time in seconds | `string` | `""` | no |
| <a name="input_chain_data_ebs_name_tag"></a> [chain\_data\_ebs\_name\_tag](#input\_chain\_data\_ebs\_name\_tag) | The name of the chain data EBS volume. | `string` | `"Polygon_Edge_chain_data_volume"` | no |
| <a name="input_chain_data_ebs_volume_size"></a> [chain\_data\_ebs\_volume\_size](#input\_chain\_data\_ebs\_volume\_size) | The size of the chain data EBS volume. | `number` | `30` | no |
| <a name="input_chain_id"></a> [chain\_id](#input\_chain\_id) | Set the Chain ID | `string` | `""` | no |
| <a name="input_chain_name"></a> [chain\_name](#input\_chain\_name) | Set the name of chain | `string` | `""` | no |
| <a name="input_consensus"></a> [consensus](#input\_consensus) | Sets consensus protocol. | `string` | `""` | no |
| <a name="input_dns_name"></a> [dns\_name](#input\_dns\_name) | Sets the DNS name for the network package | `string` | `""` | no |
| <a name="input_ebs_device"></a> [ebs\_device](#input\_ebs\_device) | The ebs device path. Defined when creating EBS volume. | `string` | `"/dev/nvme1n1"` | no |
| <a name="input_ebs_root_name_tag"></a> [ebs\_root\_name\_tag](#input\_ebs\_root\_name\_tag) | The name tag for the Polygon Edge instance root volume. | `string` | `"Polygon_Edge_Root_Volume"` | no |
| <a name="input_epoch_size"></a> [epoch\_size](#input\_epoch\_size) | Set the epoch size | `string` | `""` | no |
| <a name="input_instance_interface_name_tag"></a> [instance\_interface\_name\_tag](#input\_instance\_interface\_name\_tag) | The name of the instance interface. | `string` | `"Polygon_Edge_Instance_Interface"` | no |
| <a name="input_instance_name"></a> [instance\_name](#input\_instance\_name) | The name of Polygon Edge instance | `string` | `"Polygon_Edge_Node"` | no |
| <a name="input_instance_type"></a> [instance\_type](#input\_instance\_type) | Polygon Edge nodes instance type. | `string` | `"t3.medium"` | no |
| <a name="input_internal_sec_gr_name_tag"></a> [internal\_sec\_gr\_name\_tag](#input\_internal\_sec\_gr\_name\_tag) | Internal security group name tag | `string` | `"Polygon Edge Internal"` | no |
| <a name="input_lambda_function_name"></a> [lambda\_function\_name](#input\_lambda\_function\_name) | The name of the Lambda function used for chain init | `string` | `"polygon-edge-init"` | no |
| <a name="input_lambda_function_zip"></a> [lambda\_function\_zip](#input\_lambda\_function\_zip) | The lambda function code in zip archive | `string` | `"https://raw.githubusercontent.com/Trapesys/polygon-edge-assm/aws-lambda/artifacts/main.zip"` | no |
| <a name="input_max_slots"></a> [max\_slots](#input\_max\_slots) | Sets maximum slots in the pool | `string` | `""` | no |
| <a name="input_max_validator_count"></a> [max\_validator\_count](#input\_max\_validator\_count) | The maximum number of stakers able to join the validator set in a PoS consensus. | `string` | `""` | no |
| <a name="input_min_validator_count"></a> [min\_validator\_count](#input\_min\_validator\_count) | The minimum number of stakers needed to join the validator set in a PoS consensus. | `string` | `""` | no |
| <a name="input_nat_address"></a> [nat\_address](#input\_nat\_address) | Sets the NAT address for the networking package | `string` | `""` | no |
| <a name="input_node_name_prefix"></a> [node\_name\_prefix](#input\_node\_name\_prefix) | The name prefix that will be used to store secrets | `string` | `"node"` | no |
| <a name="input_nodes_alb_name_prefix"></a> [nodes\_alb\_name\_prefix](#input\_nodes\_alb\_name\_prefix) | ALB name | `string` | `"jrpc-"` | no |
| <a name="input_nodes_alb_name_tag"></a> [nodes\_alb\_name\_tag](#input\_nodes\_alb\_name\_tag) | ALB name tag | `string` | `"Polygon Edge JSON-RPC ALB"` | no |
| <a name="input_nodes_alb_targetgroup_name_prefix"></a> [nodes\_alb\_targetgroup\_name\_prefix](#input\_nodes\_alb\_targetgroup\_name\_prefix) | ALB target group name | `string` | `"jrpc-"` | no |
| <a name="input_polygon_edge_dir"></a> [polygon\_edge\_dir](#input\_polygon\_edge\_dir) | The directory to place all polygon-edge data and logs | `string` | `"/home/ubuntu/polygon"` | no |
| <a name="input_pos"></a> [pos](#input\_pos) | Use PoS IBFT consensus | `bool` | `false` | no |
| <a name="input_price_limit"></a> [price\_limit](#input\_price\_limit) | Sets minimum gas price limit to enforce for acceptance into the pool | `string` | `""` | no |
| <a name="input_prometheus_address"></a> [prometheus\_address](#input\_prometheus\_address) | Enable Prometheus API | `string` | `""` | no |
| <a name="input_s3_bucket_prefix"></a> [s3\_bucket\_prefix](#input\_s3\_bucket\_prefix) | Name prefix for new S3 bucket | `string` | `"polygon-edge-shared-"` | no |
| <a name="input_s3_force_destroy"></a> [s3\_force\_destroy](#input\_s3\_force\_destroy) | Delete S3 bucket on destroy, even if the bucket is not empty | `bool` | `true` | no |
| <a name="input_s3_key_name"></a> [s3\_key\_name](#input\_s3\_key\_name) | Name of the file in S3 that will hold configuration | `string` | `"chain-config"` | no |
| <a name="input_ssm_parameter_id"></a> [ssm\_parameter\_id](#input\_ssm\_parameter\_id) | The id that will be used for storing and fetching from SSM Parameter Store | `string` | `"polygon-edge-validators"` | no |
| <a name="input_vpc_cidr_block"></a> [vpc\_cidr\_block](#input\_vpc\_cidr\_block) | CIDR block for VPC | `string` | `"10.250.0.0/16"` | no |
| <a name="input_vpc_name"></a> [vpc\_name](#input\_vpc\_name) | Name of the VPC | `string` | `"polygon-edge-vpc"` | no |

</details>

:::

To initialize the working directory with the necessary plugins and modules, run the following command:

  ```shell
  terraform init
  ```

To generate an execution plan to show the changes that Terraform will make to the infrastructure, run the following command:

  ```shell
  terraform plan
  ```

During this step, Terraform will ask for any variables that have not been set, such as `datadog_app_key`, `datadog_api_key`, and `explorer_rds_master_password`. Make sure to provide values for these variables when prompted.

Once you have reviewed the plan and are ready to proceed, run the following command:

  ```shell
  terraform apply
  ```

During this step, Terraform will once again ask for any required variables that have not been set. Make sure to provide values for these variables when prompted.

At this point, you've successfully generated the necessary infrastructure for the devnet deployment using Terraform. You should have EC2 instances for validators, full nodes, metrics, explorers, and a jumpbox, along with the required networking and security resources to allow these instances to communicate with each other. However, these instances must still be configured to run a PolyBFT network. In the next section, we will use Ansible to configure the instances and deploy the necessary software to run the network.

### 3. Provision the nodes using Ansible

:::info Ansible playbook

The playground provides the following Ansible playbooks.

- `aws_ec2.yml`: This is the Ansible inventory file generated by Terraform. It specifies the EC2 instances that need to be configured.

<details>
<summary>aws_ec2.yml</summary>

```ansible
---
plugin: amazon.aws.aws_ec2

regions:
  - us-west-2

keyed_groups:
  - key: tags.Role
    seperator: ""
  - key: tags.BaseDN
    seperator: ""
  - key: tags.Hostname
    seperator: ""

# removes leading "_" note value _meta is a system value not tagged on any instances
# requires ansible version>=2.11
leading_separator: "no"

cache: "yes"

filters:
  tag:BaseDN: "devnet01.edge.polygon.private"

hostnames:
  - instance-id

```

</details>

- `site.yml`: This is the main Ansible playbook configuring the EC2 instances. It includes tasks for configuring the nodes as validators, full nodes, and explorers. It also sets up monitoring and alerting with Datadog, installs the Polygon CLI, and initializes the nodes with the appropriate genesis file.

<details>
<summary>site.yml</summary>

```ansible
- hosts: all:&{{ current_deploy_inventory }}
  become: true
  vars:
    clean_deploy_title: "{{ clean_deploy_name }}"
    datadog_api_token: "{{ datadog_api_key }}"
    edge_tag: "{{ edge_tag }}"
    git_token: "{{ git_pat_token }}"
    polycli_tag: "{{ polycli_version_tag }}"
  tags:
    - init
  roles:
    - common

- hosts: fullnode:validator:&{{ current_deploy_inventory }}
  become: true
  vars:
    clean_deploy_title: "{{ clean_deploy_name }}"
    edge_tag: "{{ edge_tag }}"
    git_token: "{{ git_pat_token }}"
  tags:
    - edge
  roles:
    - mounted-storage
    - edge

- hosts: fullnode:validator:&{{ current_deploy_inventory }}
  become: true
  tags:
    - metrics
  roles:
    - cloudalchemy.node_exporter

- hosts: jumpbox:&{{ current_deploy_inventory }}
  become: true
  tags:
    - jumpbox
  roles:
    - role: jumpbox

- hosts: fullnode:validator:&{{ current_deploy_inventory }}
  become: true
  tags:
    - haproxy
  roles:
    - haproxy

```

</details>
:::

After Terraform creates the EC2 instances, you must provision them using Ansible. To generate an Ansible inventory file, run the following command:

  ```shell
  ansible -inventory --graph --inventory inventory/aws_ec2.yml
  ```

This will create an Ansible inventory file called inventory/aws_ec2.yml. To test that Ansible can connect to the EC2 instances, run the following command:

  ```shell
  ansible all -m ping -i inventory/aws_ec2.yml
  ```

This should return pong for each EC2 instance.

Next, run the following command to provision the EC2 instances:

  ```shell
  ansible-playbook -i inventory/aws_ec2.yml site.yml
  ```

This will configure the nodes with the necessary software and configuration files.

### 4. Test deployment

To test the deployment, you can use the following steps:

- Check that all EC2 instances are running by running the `terraform show` command.
- Check that all EC2 instances are accessible via SSH by running the command ssh `<EC2_INSTANCE_PUBLIC_IP>` for each instance. This will help verify that the security groups and network settings are correctly configured.
- Check that the node is running by making a JSON-RPC request to the endpoint. To do this, first, find the json_rpc_dns_name output variable value by running terraform output json_rpc_dns_name. Then, run the following command to make a JSON-RPC request:

  ```shell
  curl  https://rpc.my-awsome-blockchain.com -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
  ```

### 5. Optional: Destroy procedure

:::warning Destroying configuration

The following procedure will permanently delete your entire infrastructure deployed with these Terraform scripts. Ensure you have proper blockchain data backups and work with a testing environment.
:::

If you need to remove the entire infrastructure, run the following command:

  ```terraform
  terraform destroy
  ```

Additionally, you must **manually remove secrets stored in AWS Parameter Store for the region the deployment took place**.

## Next Steps

Congratulations, you have successfully deployed a devnet on AWS using Terraform and Ansible!

Here are some next steps you might want to take:

- Customize your deployment by modifying the Terraform and Ansible configuration files to suit your needs.
- Explore more advanced Terraform and Ansible features to automate further and optimize your blockchain infrastructure.
- When done testing and if you have not already done so, destroy your infrastructure to avoid incurring unnecessary costs. To do so, `terraform destroy` in the same
  directory where you ran terraform apply.

</TabItem>
<TabItem value="fast">

## Fast track guide

**Here's the fast-track guide if you're looking for a quick guide on the essential commands needed to set up a devnet with AWS.**

### 1. Clone the devnet repository

  ```bash
  git clone git@github.com:maticnetwork/terraform-polygon-supernets.git
  ```

### 2. Terraform templates

   - Initialize the Terraform environment by running:

    ```bash
    terraform init
    ```

   - Preview the changes that will be made to your infrastructure by running:

     ```bash
     terraform plan
     ```

   - Apply the changes to your infrastructure by running:

     ```bash
     terraform apply
     ```

### 3. Ansible playbook

   - To generate an Ansible inventory file, run:

     ```bash
     ansible -inventory --graph --inventory inventory/aws_ec2.yml
     ```

   - To test that Ansible can connect to the EC2 instances, run:

     ```bash
     ansible all -m ping -i inventory/aws_ec2.yml
     ```

   - Provision the EC2 instances using:

     ```bash
     ansible-playbook -i inventory/aws_ec2.yml site.yml
     ```

</TabItem>
<TabItem value="troubleshoot">

Coming soon!

</TabItem>
</Tabs>
