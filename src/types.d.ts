type AppState = {
  connected: boolean;
  walletAddress: string | null;
  nfts: NFT[];
  selectedIndex: number;
  history: AppHistory;
};

type AppHistory = {
  past: number[];
  present: number | null;
};

type NFT = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
};
