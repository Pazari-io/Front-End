# Welcome to Pazari Interface

This repository holds our user hybrid interface, which contains code that runs smoothly on backend tanks to moralis, next, and vercel. It requires this hybrid model to be open-source while protecting our users in production.

## Purpose

The primary purpose of the repo is to bring an enjoyable interface to users. Behind the scene, it also handles the following tasks.

- Pazari smart contract interactions
- Pazari engine interactions
- Database management

## DEV

for building our UI/UX, we use Next.js, React, Moralis SDK
Ensure you have a `node.js 14+` installed; you can install yarn and use it as your package manager instead of npm. Get your server a moralis instance on the avalanche test net. Finally, clone this repository.

edit the `.env` file

```yaml
NEXT_PUBLIC_MORALIS_APP_ID=ID
NEXT_PUBLIC_MORALIS_SERVER_ID=ID
MORALIS_MASTER_KEY=KEY
PAZARI_ENGINE_API_KEY=KEY
PAZARI_ENGINE_ENDPOINT=ENDPOINT
```

Using yarn:

```bash
cd front-end
yarn
npm i
```

Dev:

```
yarn
yarn dev
```

Build:

```
yarn build
yarn start
```

using npm

Dev:

```
npm i
npm run dev
```

Build:

```
npm run build
npm run start
```

## Version

**1.0.0-alpha.7**

## Dependencies

Our interface uses well-known open-source software to handle encryption, authorization, database management, and media processing. You can read more about each of them. Please consult with `packages.json` for the complete list.

- [React](https://github.com/facebook/react)
- [Next.js](https://github.com/vercel/next.js/)
- [Tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [Moralis-SDK](https://github.com/MoralisWeb3/Moralis-JS-SDK)
- [React-Moralis](/https://github.com/MoralisWeb3/react-moralis)
- [Ethers.js](https://github.com/ethers-io/ethers.js)
- [Web3.js](https://github.com/ChainSafe/web3.js)
- [Filepond](https://github.com/pqina/filepond)

## Security

We handle security and security issues with great care. Please contract security [at] pazari.io as soon as you find a valid vulnerability.
Important
Currently alpha and under development .
