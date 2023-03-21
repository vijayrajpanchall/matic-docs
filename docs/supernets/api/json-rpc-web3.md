---
id: json-rpc-web3
title: Web3
description: "List of Web3 JSON RPC commands for Polygon Edge."
keywords:
  - docs
  - polygon
  - edge
  - json
  - rpc
  - commands
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {useState} from 'react';

## web3_clientVersion

Returns the current client version.

<h4><i>Parameters:</i></h4>

None

<h4><i>Returns:</i></h4>

*  <b>  String </b> - The current client version

<h4><i>Example:</i></h4>

````bash
curl  https://rpc-endpoint.io:8545 -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}'
````

## web3_sha3

Returns Keccak-256 (not the standardized SHA3-256) of the given data.

<h4><i>Parameters:</i></h4>

*  <b> DATA </b> - the data to convert into a SHA3 hash

<h4><i>Returns:</i></h4>

*  <b>DATA </b> - The SHA3 result of the given string.

<h4><i>Example:</i></h4>

````bash
curl  https://rpc-endpoint.io:8545 -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":1}'
````
