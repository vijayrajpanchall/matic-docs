---
id: supernets-setup-dev-env
title: Deploy a Polygon Supernet to the Cloud
sidebar_label: Deploy a test Supernet on the cloud
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

This document provides references to tutorials for setting up and configuring a Supernet devnet on various cloud platforms.

:::warning Breaking changes
Supernets are rapidly evolving towards a production-ready state, and, as a result, instructions and concepts in these guides are subject to change.

Test releases may include breaking changes and offer no guarantees, including backward compatibility. Use the current test releases for testing and familiarization only.

It is highly recommended that you do not attempt deployments on your own; for support, please reach out to the Supernets team.
:::

<!-- ===================================================================================================================== -->
<!-- ===================================================================================================================== -->
<!-- ===================================================== GUIDE TABS ==================================================== -->
<!-- ===================================================================================================================== -->
<!-- ===================================================================================================================== -->

<Tabs
defaultValue="cloud"
values={[
{ label: 'Cloud deployment', value: 'cloud', },
{ label: 'Tips & Troubleshoot (coming soon)', value: 'troubleshoot', },
]
}>

<!-- ===================================================================================================================== -->
<!-- ==================================================== AWS GUIDE ====================================================== -->
<!-- ===================================================================================================================== -->

<TabItem value="cloud">

| Platform | Guide |
| --- | --- |
| Amazon Web Services | To set up a devnet on AWS, you can refer to the AWS deployment guide available [[ here ]](https://github.com/maticnetwork/terraform-polygon-supernets). The guide provides comprehensive instructions on how to use Terraform to set up a Virtual Private Cloud (VPC), subnets, security groups, and EC2 instances, followed by instructions on configuring nodes using Ansible. |
| Microsoft Azure | To set up a devnet on Azure, you can refer to the Azure deployment guide available [[ here ]](https://github.com/caleteeter/polygon-azure). This repository offers an Azure template that can be deployed through the Azure and Bicep CLI, or directly through the "Deploy to Azure" button. Additionally, the deployment can be viewed via the "Visualize" button available in the repository. |
| Google Cloud Platform | Coming soon. |

</TabItem>
<TabItem value="troubleshoot">

:::info Coming soon
:::

</TabItem>
</Tabs>
