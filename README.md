## Getting Started

# Develop

npm run dev  
yarn dev

## Todo

- [ ] Complete The database tables for every element on UI including ACL / CPL
- [ ] Get everything from database instead of hardcoded ones
- [X] Make sure search / filters / sorting works on every page
- [ ] Make sure pagination works on every page
- [ ] Implement a (forced) email / username setup (one time)
- [ ] File uploader needs to detect uploaded file type to contact backend
- [ ] Fund withdraw pages functionality ?
- [ ] An author might have more than one type of product UI needs to handle it
- [ ] Publish UI/UX add missing details
- [ ] UI/UX for user editing product / profile?
- [ ] Replace all img with next Image
- [ ] Get native price for AVAX ?
- [ ] Smart contract connection and purchase test / download
- [ ] Add some Cypress tests

# To Run Locally
## Running without smart contract
Follow [instructions](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server) for creating a Moralis server.
Add environment variables for the NEXT_PUBLIC_MORALIS_APP_ID, NEXT_PUBLIC_MORALIS_SERVER_ID, and NEXT_PUBLIC_MORALIS_MASTER_KEY.  This is so Moralis can integrate with the Dapp.
Run 'node scripts/seeder.js' to load data to Moralis DB.

## Running with smart contract
Follow [instructions](https://docs.moralis.io/moralis-server/web3/setting-up-ganache) for connecting Ganache to Moralis.

Follow [instructions](https://docs.moralis.io/moralis-server/automatic-transaction-sync/smart-contract-events) for listening to events from Moralis.
For listening to events, you should listen to the marketplace contract.
