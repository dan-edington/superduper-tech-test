import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, RenderTexture } from '@react-three/drei';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { Web3Button } from '@web3modal/react';

import { AppDispatch, RootState } from '../../store';
import { walletConnected, walletDisconnected, fetchNfts } from './AppSlice';

import Carousel from '../Carousel';
import History from '../History';
import NFTInformation from '../NFTInformation';
import Stars from '../Stars';

const chains = [mainnet];
const projectId = import.meta.env.VITE_W3M_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { connected, selectedIndex } = useSelector((state: RootState) => state.app);
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      dispatch(walletConnected(address));
      dispatch(fetchNfts());
    } else {
      dispatch(walletDisconnected());
    }
  }, [address]);

  return (
    <>
      <div className="absolute left-4 top-4 z-10">
        <WagmiConfig config={wagmiConfig}>
          <Web3Button />
        </WagmiConfig>
      </div>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <Canvas camera={{ position: [0, 0, 750], far: 4000 }}>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={selectedIndex === -1} />
        <ambientLight />
        {connected && <Carousel />}
        <RenderTexture attach="background" anisotropy={16} sourceFile={undefined}>
          <Stars />
        </RenderTexture>
      </Canvas>
      <NFTInformation />
      <History />
    </>
  );
};

export default App;
