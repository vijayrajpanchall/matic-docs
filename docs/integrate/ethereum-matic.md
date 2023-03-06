---
id: ethereum-polygon
title: Ethereum ↔ Polygon
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
  - polygon
  - ethereum
image: https://wiki.polygon.technology/img/polygon-logo.png
---

# Ethereum ↔ Polygon

Plasma Secured Solution to transfer your assets from Ethereum to Polygon and vice-versa.
* Use [matic.js](https://github.com/maticnetwork/matic.js) to interact with the Polygon Plasma contracts.

## Flow
Here is the Flow with the deployment of your contracts on Polygon and Support for Ethereum↔Polygon.

1. User deploys ERC-20 token to Ethereum - XToken

2. Now share your contract address with [Polygon](https://t.me/joinchat/HkoSvlDKW0qKs_kK4Ow0hQ). Here is an example request...

>Hello everyone, We are AwesomeDApp deployed on Polygon. Looking for a solution to transfer my assets from Ethereum to Polygon and vice-versa. <br/><br/>
A short description on my AwesomeDApp...<br/><br/>
Token_Address on Ropsten-> "0x.."<br/>
Token_Name-> "XToken"<br/>
Token_Symbol-> "X"<br/>
Token_Decimals-> "18"<br/><br/>
Requesting you to Map these tokens to Polygon Testnet Version.<br/>

We will deploy a Child Contract for you on Polygon which can be flexible based on the requirements and mapped to your tokens Ethereum ↔ Polygon.(Deployment on Polygon requires it native token Polygon, which can be deposited from Ethereum to Polygon or can be bought at Secondary Market Place.)

3. User can mint the Xtokens and Transfer on Ethereum. For example let's say 100XToken are mint and then transfer to other another account.

4. To avail these tokens on Polygon Chain, Call function deposit which will call for two transactions first approve and then depositERC20.

5. Now 100XTokens are available on Polygon Chain at the same address.

6. You can transfer 50 XToken from YourAddress to NewAddress. Again for transactions on Polygon similar to Ethereum, Polygon uses it own Native token.

7. If the users want to get back these Xtoken on Ethereum Chain, then call StartWithdraw which will withdraw from childTokenContract and Burn these tokens on Polygon Chain. To avoid any bad participation, A set of validation will take place. Once it is done the tokens will be available at Ethereum Chain.

8. Call processExits() to receive those tokens back to your EOA or your account address.

9. You should see the 50 XToken on the Ethereum mainnet at you Account Address.
