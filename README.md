# SuperDuper Tech Test

## Installation

1. Install dependencies using:

```
npm install
```

2. Rename .env-sample to .env and update with API keys for Alchemy and [WalletConnect](cloud.walletconnect.com)
3. Start app using:

```
npm run dev
```

4. Navigate to [http://localhost:5173](http://localhost:5173)

## Test Wallet

If your wallet is empty, you can use a test wallet address instead. In `src/Components/App/AppSlice.ts`, uncomment the `walletAddress` in the `fetchNfts()` function.

## TODO

Given more time I would:

- Improve overall design
- Add loading states
- Add support for animated NFTs
- Make accessible
- Make layout more responsive
- Improve layout algorithm so NFTs are displayed better (no overlapping etc.)
- Add transition animations
- Improve UI
- Improve TypeScript definitions and typings
- Add path aliasing for better imports
- Move hardcoded values into a piece of state
