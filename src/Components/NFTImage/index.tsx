import { useEffect, useState, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedIndex } from '../App/AppSlice';
import { RootState } from '../../store';

import { randomFloatBetween, randomGaussian } from '../../lib/utils';

import vertexShader from '../../shaders/nftImage/vertex.glsl';
import fragmentShader from '../../shaders/nftImage/fragment.glsl';

type NFTImageProps = {
  nftData: NFT;
  geometry: THREE.PlaneGeometry;
  totalImages: number;
  index: number;
};

const NFTImage: React.FC<NFTImageProps> = props => {
  const { nftData, geometry, index } = props;
  const [nftImg, setNftImg] = useState<HTMLImageElement | null>(null);
  const nftImgRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const dispatch = useDispatch();
  const { selectedIndex } = useSelector((state: RootState) => state.app);

  const positionVector = useMemo(() => {
    return new THREE.Vector3(randomFloatBetween(-1, 1), randomFloatBetween(-1, 1), randomFloatBetween(-1, 1))
      .normalize()
      .multiplyScalar(randomGaussian() * 550);
  }, []);

  const rotationVector = useMemo(() => {
    return new THREE.Vector3(0, 0, randomFloatBetween(-Math.PI * 0.025, Math.PI * 0.025));
  }, []);

  const material = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: null },
        uRandomOffset: { value: randomFloatBetween(-1, 1) },
      },
      side: THREE.DoubleSide,
    });
    return material;
  }, []);

  const eventHandlers = {
    handlePointerEnter: (e: any) => {
      e.stopPropagation();
      if (nftImgRef.current) {
        document.body.style.cursor = 'pointer';
      }
    },

    handlePointerLeave: (e: any) => {
      e.stopPropagation();
      if (nftImgRef.current) {
        document.body.style.cursor = 'default';
      }
    },

    handleClick: (e: any) => {
      e.stopPropagation();
      if (selectedIndex === index) {
        dispatch(setSelectedIndex(-1));
      } else if (selectedIndex === -1) {
        dispatch(setSelectedIndex(index));
      }

      if (nftImgRef.current) {
        document.body.style.cursor = 'default';
      }
    },
  };

  useFrame(() => {
    material.uniforms.uTime.value += 0.01;
  });

  useEffect(() => {
    const url = nftData.imageUrl;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      setNftImg(img);
    };
    img.src = url;
  }, []);

  useEffect(() => {
    if (nftImg) {
      material.uniforms.uTexture.value = new THREE.Texture(nftImg);
      material.uniforms.uTexture.value.needsUpdate = true;

      const aspectRatio = nftImg.width / nftImg.height;
      nftImgRef.current?.scale.set(1 * aspectRatio, 1, 1);
    }
  }, [nftImg]);

  useEffect(() => {
    if (nftImgRef.current) {
      if (selectedIndex === index) {
        const vec = new THREE.Vector3(0, 0, 600);
        vec.applyQuaternion(camera.quaternion);

        nftImgRef.current.position.copy(vec);
        nftImgRef.current.lookAt(camera.position);
      } else {
        nftImgRef.current?.position.copy(positionVector);
        nftImgRef.current?.rotation.set(rotationVector.x, rotationVector.y, rotationVector.z);
      }
    }
  }, [selectedIndex]);

  return (
    <mesh
      ref={nftImgRef}
      material={material}
      geometry={geometry}
      onPointerEnter={eventHandlers.handlePointerEnter}
      onPointerLeave={eventHandlers.handlePointerLeave}
      onClick={eventHandlers.handleClick}
      position={positionVector}
      rotation-x={rotationVector.x}
      rotation-y={rotationVector.y}
      rotation-z={rotationVector.z}
      visible={selectedIndex === -1 || selectedIndex === index}
    />
  );
};

export default NFTImage;
