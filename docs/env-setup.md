# Environment Setup Guide

Follow these steps to set up the development environment for Nirog Bharat.

## 1. Backend Configuration (`apps/api`)

Create a `.env` file in `apps/api/` based on `.env.example`.

```bash
PORT=3001
DATABASE_URL="file:./dev.db"
JSON_RPC_PROVIDER=http://127.0.0.1:8545
PRIVATE_KEY=your_private_key
CONTRACT_ADDRESS=your_contract_address
```

> [!CAUTION]
> Never commit your `.env` file or actual private keys to version control. The keys provided in `.env.example` are for local development with Hardhat only.

## 2. Frontend Configuration (`apps/web`)

Create a `.env` file in `apps/web/` based on `.env.example`.

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
```

## 3. Database Initialization

Run the following command to initialize the SQLite database and generate the Prisma client:

```bash
cd apps/api
npx prisma migrate dev --name init
```

## 4. Blockchain Setup (Optional for mock tests)

If you are running a local Hardhat node:

```bash
cd packages/contracts
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

Update the `CONTRACT_ADDRESS` in both `.env` files with the address output by the deployment script.

## 5. Running the Workspace

From the root directory, run:

```bash
npm install
npm run dev
```
