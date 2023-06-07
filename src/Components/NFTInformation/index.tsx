import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const NFTInformation = () => {
  const { selectedIndex, nfts } = useSelector((state: RootState) => state.app);

  return selectedIndex > -1 ? (
    <div className="absolute bottom-16 z-10 flex w-screen flex-col bg-orange-400 px-16 py-4">
      <h1 className="text-lg">{nfts[selectedIndex].name}</h1>
      <p className="text-sm">{nfts[selectedIndex].description}</p>
    </div>
  ) : null;
};

export default NFTInformation;
