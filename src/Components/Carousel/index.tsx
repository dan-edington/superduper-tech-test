import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';

import NFTImage from '../NFTImage';

import { RootState } from '../../store';

const Carousel = () => {
  const { nfts } = useSelector((state: RootState) => state.app);

  const imageGeometry = useMemo(() => {
    const imageSize = 100;
    const geometry = new THREE.PlaneGeometry(imageSize, imageSize, 1, 1);
    return geometry;
  }, []);

  return (
    nfts.length &&
    nfts.map((nft, index) => (
      <NFTImage key={nft.id} nftData={nft} geometry={imageGeometry} index={index} totalImages={nfts.length} />
    ))
  );
};

export default Carousel;
