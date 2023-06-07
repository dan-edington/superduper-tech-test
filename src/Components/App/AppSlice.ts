import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState: AppState = {
  connected: false,
  walletAddress: null,
  nfts: [],
  selectedIndex: -1,
  history: {
    past: [],
    present: null,
  },
};

const fetchNfts = createAsyncThunk('app/fetchNfts', async (_, { getState, rejectWithValue, fulfillWithValue }) => {
  const baseUrl = `https://eth-mainnet.g.alchemy.com/nft/v3/${import.meta.env.VITE_ALCHEMY_API_KEY}/`;
  const state = getState() as RootState;
  const { connected, walletAddress } = state.app;

  // const walletAddress = '0x154B4045F07B48C3B75D73a3f6C7C11Dfec95b4a';

  if (connected && walletAddress) {
    try {
      const response = await fetch(`${baseUrl}getNFTsForOwner?owner=${walletAddress}&withMetadata=true&pageSize=100`);
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  } else {
    return rejectWithValue('Wallet not connected');
  }
});

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    walletConnected: (state, action) => {
      state.connected = true;
      state.walletAddress = action.payload;
    },
    walletDisconnected: state => {
      state.connected = false;
      state.walletAddress = null;
      state.nfts = [];
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;

      if (state.history.present !== null) {
        state.history.past.push(state.history.present);
      }

      if (action.payload > -1) {
        state.history.present = action.payload;
      }

      if (action.payload === -1) {
        state.history.present = null;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNfts.fulfilled, (state, action) => {
      state.nfts = action.payload.ownedNfts
        .map((nft: any, index: number) => {
          const {
            name,
            description,
            image: { pngUrl, thumbnailUrl },
          } = nft;

          return {
            id: index,
            name,
            description,
            imageUrl: pngUrl,
            thumbnailUrl,
          };
        })
        .filter((nft: NFT) => {
          const { name, description, imageUrl, thumbnailUrl } = nft;
          if (name && description && imageUrl && thumbnailUrl) {
            return true;
          }
        });
    });
    builder.addCase(fetchNfts.rejected, state => {
      state.nfts = [];
    });
  },
});

export const { walletConnected, walletDisconnected, setSelectedIndex } = appSlice.actions;
export { fetchNfts };

export default appSlice.reducer;
