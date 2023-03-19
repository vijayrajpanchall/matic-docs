---
id: supernets-setup-dev-env
title: Setup a Devnet Environment
sidebar_label: Setup a devnet
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

## Overview

This tutorial will teach you how to set up a local devnet for Polygon Supernets on AWS using Terraform and Ansible.
You will also learn how to configure the nodes using an Ansible playbook.

:::info Fast-track guide

**Here's the fast-track guide if you're looking for a quick guide on the essential commands needed to set up a devnet with AWS.**

<details>
<summary>Setup a local devnet</summary>

1. Clone the devnet repository:

   - Run `git clone git@github.com:maticnetwork/polygon-devnets.git` and navigate to the playground - `cd terraform/nets/edge-playground`.

2. Terraform templates:

   - Initialize the Terraform environment by running `terraform init`.
   - Preview the changes that will be made to your infrastructure by running `terraform plan`.
   - Apply the changes to your infrastructure by running `terraform apply`.

3. Ansible playbook:

   - To generate an Ansible inventory file, run `ansible -inventory --graph --inventory inventory/aws_ec2.yml`.
   - To test that Ansible can connect to the EC2 instances, run `ansible all -m ping -i inventory/aws_ec2.yml`.
   - Provision the EC2 instances using `ansible-playbook -i inventory/aws_ec2.yml site.yml`.

</details>

:::

## What you'll learn

- How to deploy a devnet cloud deployment locally on AWS using Terraform.
- How to configure EC2 instances for Supernet nodes.
- How to run and manage a PolyBFT network on AWS.

### Learning outcomes

By the end of this tutorial, you will be able to:

- Set up a local devnet cloud deployment on AWS using Terraform.
- Configure Supernet nodes with Ansible.
- Deploy the associated node resources to manage the Supernet.

## Prerequisites

Before starting the tutorial, make sure you have the following prerequisites:

- An AWS account with administrator access and an RDS database.
- Basic knowledge of AWS services.
- Basic knowledge of Terraform and Ansible.
- AWS CLI installed.
- Terraform installed.
- Ansible installed.
- Polygon CLI installed.

## What you'll do

The tutorial will cover the following steps:

1. Set up AWS credentials and create a VPC.
2. Configure the devnet deployment using Terraform.
3. Configure the devnet deployment nodes using Ansible.
4. Test the devnet deployment.
5. Optional: destroy the setup

:::info Summary of deployed resources

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
:::

## Configure a local devnet

Before you get started, start by cloning Polygon devnet repository to your local machine.

```shell
git clone git@github.com:maticnetwork/polygon-devnets.git
```

Start by navigating to the "terraform/nets/edge-playground" directory.

```shell
cd terraform/nets/edge-playground
```

### 1. Set up AWS credentials

To use AWS services, you need to set up your AWS credentials. You can either set them up using the AWS CLI or
manually in your AWS console. Check out the AWS documentation to learn more.

### 2. Configure the devnet deployment using Terraform

With Terraform, we will initialize our working directory, create and preview an execution plan, and apply the changes to create our devnet deployment on AWS. Initializing the working directory downloads, installing the necessary modules and plugins, and creating the Terraform state file to track changes. The execution plan shows what changes will make without actually applying them, allowing for a preview of the resources that will be created, modified, or destroyed. Applying the changes creates or modifies the resources based on the execution plan.

:::info Terraform templates

The playground provides the following terraform templates.

- `main.tf` is the main configuration file for Terraform, where all the resources to be created are defined. It specifies the desired state of the infrastructure to be created on AWS.
- `outputs.tf` defines the values to be outputted by Terraform after it applies the configuration in main.tf. This can include IP addresses, DNS names, and other essential values needed for further configuration or testing.

<details>
<summary>main.tf</summary>

```terraform
variable "datadog_app_key" {}
variable "datadog_api_key" {}
variable "explorer_rds_master_password" {}

locals {
  region             = "us-west-2"
  zones              = ["us-west-2a", "us-west-2b", "us-west-2c"]
  environment        = "devnet"
  deployment_name    = "devnetplayground01"
  owner              = "ylee@polygon.technology"
  network_type       = "edge"
  aws_profile        = "AWSAdministratorAccess-937573258486"
  base_instance_type = "c6a.2xlarge"
  base_ami           = "ami-0ecc74eca1d66d8a6"
  fullnode_count     = 3
  validator_count    = 4
  jumpbox_count      = 1
  metrics_count      = 1
  explorer_count     = 3
  base_dn            = format("%s.%s.polygon.private", local.deployment_name, local.network_type)
  create_ssh_key     = false
  http_rpc_port      = 10002
  node_storage       = 10
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.49.0"
    }
    datadog = {
      source  = "DataDog/datadog"
      version = "~> 3.19.1"
    }
  }
  required_version = ">= 1.2.0"
}

module "edge" {
  source                       = "../../modules/edge"
  deployment_name              = local.deployment_name
  owner                        = local.owner
  network_type                 = local.network_type
  aws_profile                  = local.aws_profile
  region                       = local.region
  zones                        = local.zones
  base_instance_type           = local.base_instance_type
  base_ami                     = local.base_ami
  devnet_key_name              = format("%s_ssh_key", local.deployment_name)
  datadog_api_key              = var.datadog_api_key
  datadog_app_key              = var.datadog_app_key
  fullnode_count               = local.fullnode_count
  validator_count              = local.validator_count
  jumpbox_count                = local.jumpbox_count
  metrics_count                = local.metrics_count
  explorer_count               = local.explorer_count
  create_ssh_key               = local.create_ssh_key
  http_rpc_port                = local.http_rpc_port
  node_storage                 = local.node_storage
  explorer_rds_master_password = var.explorer_rds_master_password
}

provider "aws" {
  region = local.region
  default_tags {
    tags = {
      Environment    = local.environment
      Network        = local.network_type
      Owner          = local.owner
      DeploymentName = local.deployment_name
      BaseDN         = local.base_dn
      Name           = local.base_dn
    }
  }
}

provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```
</details>

<details>
<summary>outputs.tf</summary>

```terraform
output "aws_lb_domain" {
  value = module.edge.aws_lb_domain
}

output "base_dn" {
  value = module.edge.base_dn
}
output "base_id" {
  value = module.edge.base_id
}
```

</details>
:::

To initialize the working directory with the necessary plugins and modules, run the following:

```shell
terraform init
```

To generate an execution plan to show the changes that Terraform will make to the infrastructure, run:

```shell
terraform plan
```

During this step, Terraform will ask for any variables that have not been set, such as `datadog_app_key`, `datadog_api_key`, and `explorer_rds_master_password`. Make sure to provide values for these variables when prompted.

Once you have reviewed the plan and are ready to proceed, run:

```shell
terraform apply
```

During this step, Terraform will once again ask for any required variables that have not been set. Make sure to provide values for these variables when prompted.

At this point, you've successfully generated the necessary infrastructure for the devnet deployment using Terraform. You should have EC2 instances for validators, full nodes, metrics, explorers, and a jumpbox, along with the required networking and security resources to allow these instances to communicate with each other. However, these instances must still be configured to run a PolyBFT network. In the next section, we will use Ansible to configure the instances and deploy the necessary software to run the network.

### 3. Provision the nodes using Ansible

:::info Ansible playbook

The playground provides the following Ansible playbooks.

- `aws_ec2.yml`: This is the Ansible inventory file generated by Terraform. It specifies the EC2 instances that need to be configured.
- `site.yml`: This is the main Ansible playbook configuring the EC2 instances. It includes tasks for configuring the nodes as validators, full nodes, and explorers. It also sets up monitoring and alerting with Datadog, installs the Polygon CLI, and initializes the nodes with the appropriate genesis file.

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
  tag:BaseDN: "devnet08.edge.polygon.private"

hostnames:
  - instance-id

```
</details>

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
    - datadog

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

- hosts: metrics:&{{ current_deploy_inventory }}
  become: true
  tags:
    - metrics
  roles:
    - role: metrics
    - role: cloudalchemy.prometheus
    - role: cloudalchemy.grafana

- hosts: jumpbox:&{{ current_deploy_inventory }}
  become: true
  tags:
    - jumpbox
  roles:
    - role: jumpbox

- hosts: fullnode:validator:&{{ current_deploy_inventory }}
  become: true
  tags:
    - bpf
  roles:
    - bpf

- hosts: fullnode:validator:&{{ current_deploy_inventory }}
  become: true
  tags:
    - haproxy
  roles:
    - haproxy

- hosts: explorer:&{{ current_deploy_inventory }}
  become: true
  tags:
    - explorer
  roles:
    - explorer

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
- Check that all EC2 instances are accessible via SSH by running the command ssh `<EC2_INSTANCE_PUBLIC_IP>` for each instance. This will help verify that the security groups and network settings are properly configured.
- Check that the node is running by making a JSON-RPC request to the endpoint. To do this, first, find the json_rpc_dns_name output variable value by running terraform output json_rpc_dns_name. Then, run the following command to make a JSON-RPC request:

  ```shell
  curl  https://rpc.my-awsome-blockchain.com -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
  ```

### 5. Destroy procedure

:::warning Destroying configuration

The following procedure will permanently delete your entire infrastructure deployed with these Terraform scripts. Ensure you have proper blockchain data backups and work with a testing environment.
:::

If you need to remove the entire infrastructure, run the following command:

```terraform
terraform destroy
```

Additionally, you will need to manually remove secrets stored in AWS Parameter Store for the region the deployment took place.

## Next Steps

Congratulations, you have successfully deployed a devnet on AWS using Terraform and Ansible!

Here are some next steps you might want to take:

- Customize your deployment by modifying the Terraform and Ansible configuration files to suit your needs.
- Explore more advanced Terraform and Ansible features to automate further and optimize your blockchain infrastructure.
- When done testing, remember to destroy your infrastructure to avoid incurring unnecessary costs. To do so, `terraform destroy` in the same directory
  where you ran terraform apply.
