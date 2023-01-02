# Web 3 Octo 🐙

<img width="1600" alt="credit" src="https://user-images.githubusercontent.com/67114280/192802079-d5db390f-aac4-486f-b370-817ac9bfbffa.png">

### Functionalities

- [x] Publish Blog
- [x] Update Blog
- [x] Search Blogs
- [x] Related Blogs

### Stack

- Frontend : [Next Js](https://nextjs.org/)
- Smart Contract Lang : [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- Indexing :  [The Graph](https://thegraph.com/en/)
- Dev Environment for ETH Software: [Hardhat](https://hardhat.org/)
- Testing: [Chai](https://www.chaijs.com/)
- File Storage : [Arweave](https://www.arweave.org/)
- Scaling Permenant Storage - [Bundlr](https://bundlr.network/)
- Network : [Polygon](https://polygon.technology/)
- Style : [Tailwind CSS](https://tailwindcss.com/)
- State management : [GraphQL Apollo Client](https://www.apollographql.com/)
- Toast: [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- Fonts - [Google Fonts](https://fonts.google.com/)
- Editor: [React SimpleMDE Markdown Editor](https://github.com/RIP21/react-simplemde-editor)
- Markdown Preview - [React Markdown](https://remarkjs.github.io/react-markdown/)
- Icons : [Iconsax React](https://iconsax-react.pages.dev/)



### Installation

####  Fork The Repo 

Click on the Right Side of the Top Bar to After the Watch button. <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/GitHub_Fork_Button.png" width="120px" />

Now It will be available in GitHub Account.

#### OR

#### Clone

- Clone this repo with url

```shell
git clone https://github.com/Aakrut/web3-octo
```

##### Setup

> Install npm dependencies using npm install

```shell
cd web3-octo && npm install
```

> Set up environment Variables I already Provided .env.example file.

> Create a .env file in the root directory.

> Set up required environment variables.

```
URL="POLYGON_TESTNET_URI"
PRIVATE_KEY="METAMASK_PRIVATE_KEY"
NEXT_PUBLIC_RPC_URL="POLYGON_TESTNET_URI"
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
NEXT_PUBLIC_GRAPHQL_URL="GRAPHQL_URL"
```

> In the Root Directory First Compile Your Smart Contract with This Following Command.

```shell
npx hardhat compile
```

> After Deploy Smart Contract to the Polygon Mumbai Testnet with this command.

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

> Copy Smart Contract Address and replace it in with your "CONTRACT_ADDRESS"

```
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
```

## For Setting up Graph Protocol - [The Graph](https://thegraph.com/en/)

now replace the graph url with 
```
NEXT_PUBLIC_GRAPHQL_URL="GRAPHQL_URL"
```

Let's Run this command for dev

```shell
npm run dev
--or--
yarn dev
```

### Screenshots

<img width="1600" alt="web3-octo" src="https://user-images.githubusercontent.com/67114280/192806400-ec8ccf9b-1399-42a8-ac88-7bd9cdc4ece4.png">

<img width="1600" alt="dashboard" src="https://user-images.githubusercontent.com/67114280/192802102-084b3de6-e975-4efb-84b9-8c27a4007a07.png">

<img width="1600" alt="search" src="https://user-images.githubusercontent.com/67114280/192805112-4155c0a0-e9ef-4118-984e-20f673f6d262.png">

<img width="1600" alt="upload" src="https://user-images.githubusercontent.com/67114280/192802264-020cf819-206d-45bb-afd6-abc84e8f65c0.png">

<img width="1600" alt="blog" src="https://user-images.githubusercontent.com/67114280/192802026-f2375299-2a30-42a1-8aef-2bb67e25ea02.png">

<img width="1600" alt="responsive" src="https://user-images.githubusercontent.com/67114280/192802196-28e3c931-060e-489c-940c-63dfbcd58a5c.png">

<img width="1600" alt="responsive 2" src="https://user-images.githubusercontent.com/67114280/192802144-88e6ba32-f590-4aea-9f74-d2d27be184d6.png">

<img width="1600" alt="responsive 3" src="https://user-images.githubusercontent.com/67114280/192802163-65505f11-ee1e-4f88-9105-f1985ec247b8.png">
