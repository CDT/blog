---
title: SSH and Asymmetric Encryption
cover: /images/sshworkflow.jpeg
thumbnail: /images/sshworkflow.jpeg
date: 2022-09-19 10:11:12
categories:
- tech
tags:
- tech
- ssh
- asymmetric encryption
- encryption
---

## Refs
1. [SSH mechanism](https://zhuanlan.zhihu.com/p/108161141)
2. [Asymmetric encryption in plain words](https://www.zhihu.com/question/33645891)
<!--more-->
## What and Why
- SSH: Secured Shell Protocol
- A cryptographic network protocol for operating network services securely over an unsecured network.

## Symmetric and Asymmetric encryption
![Asymmetric encryption](/images/asymmetric_encryption.avif)

- **Symmetric encryption**: Same key to encrypt and decrypt, prone to getting hacked like man-in-the-middle attack. Examples: AES, IDEA, DES, 3DES.
- **Asymmetric encryption**: 
  - Based on public/private key encryption techniques. Public key is public to everyone, private key is private to the user theirselves. 
  - Public key and private key both can encrypt and decrypt.
  - Workflow: 
    - Use A gives his public key to User B
    - Use B encrypts data and send encrypted data to User A
    - User A decrypts encrypted data with his private key
    - It's the same process when User A sends data to User B

### An extremely simple example for Asymmetric encryption:
![Simple Asymmetric encryption](/images/simple_asym_enc.jpg)
- Data: A 3-digit number
- Private Key: 11
- Public Key: 91
- Algorithim: 
  - Encryption: multiplying private key
  - Decryption: multiplying public key, take the trailing three digits
- Try and above and you will find that after encryption and decryption, output data remains the same as original data.

## How it works(TODO: needs more explanation)
- Build an encrypted tunnel:
  1. Client contacts server and agree on a specific SSH version
  2. Server sends its host key cryptographic means and other arguments to Client
  3. Client verifies server identity by host key, and negotiates a session key with server
  4. Build an encrypted tunnel 

- As host key cannot prevent man-in-the-middle attack, public key certificate was introduced where a certificate issued by a reliable third-party institute was granted to server to ensure its identity.

## Tools
### Windows
#### Command line
- For windows 10, `ssh` command is enabled by default. 
- Syntax: `ssh -i [identity key file] username@host -v`
  - If public key authentication is required, use `-i [identity key ile]`. An identity key is a private key that is used in SSH for granting access to servers. They are a kind of SSH key, used for public key authentication. For SSH, identity file is often suffixed with `.pem`. [See what public key authentication is](https://www.ssh.com/academy/ssh/public-key-authentication).
  - If debugging is required, use `-v` directive to print verbose debug information.
- Example: 

#### PuTTY
- [PuTTY](https://www.putty.org/) is a GUI tool for SSH.
- How to use:

![](/images/putty_setting.png)


