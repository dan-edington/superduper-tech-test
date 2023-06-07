import { OrthographicCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

import vertexShader from '../../shaders/stars/vertex.glsl';
import fragmentShader from '../../shaders/stars/fragment.glsl';

const Stars = () => {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });
  }, []);

  useFrame(() => {
    material.uniforms.uTime.value += 0.01;
  });

  return (
    <>
      <OrthographicCamera makeDefault left={-1} right={1} top={1} bottom={-1} near={0} far={1} />
      <mesh material={material}>
        <planeGeometry args={[2, 2]} />
      </mesh>
    </>
  );
};

export default Stars;
