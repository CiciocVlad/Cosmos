import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Model({
  scale,
  isRotating,
  isJumping,
  materialProps,
  ...props
}) {
  const { nodes, materials } = useGLTF('/cosmos/BB-8-1.glb');
  const ref = useRef(4.2);

  let jumpHeight = -1.8;
  const jumpSpeed = 0.05;
  let isJumpingUp = true;

  const jump = () => {
    if (isJumpingUp) {
      ref.current.position.y += jumpSpeed;

      if (ref.current.position.y >= -0.3) {
        isJumpingUp = false;
      }
    } else {
      ref.current.position.y -= jumpSpeed;
      if (ref.current.position.y <= jumpHeight) {
        isJumpingUp = true;
      }
    }
  };

  const stopJump = () => {
    const landingPosition = -1;
    const smoothLandSpeed = 0.02;

    if (ref.current.position.y < landingPosition) {
      ref.current.position.y += smoothLandSpeed;

      if (ref.current.position.y >= landingPosition) {
        ref.current.position.y = landingPosition;
        isJumpingUp = false;
      }
    } else if (ref.current.position.y > landingPosition) {
      ref.current.position.y -= smoothLandSpeed;

      if (ref.current.position.y <= landingPosition) {
        ref.current.position.y = landingPosition;
        isJumpingUp = true;
      }
    }
  };

  useFrame(() => {
    if (isRotating) {
      ref.current.rotation.y += 0.1;
    } else {
      const deg = (ref.current.rotation.y * 180) / Math.PI;
      if (deg % 360 < 240 || deg % 360 > 260) ref.current.rotation.y += 0.1;
    }

    if (isJumping) {
      jump();
    } else {
      stopJump();
    }
  });

  const bodyColor = new THREE.Color(184/255, 39/255, 65/255);
  const headColor = new THREE.Color(182/255, 62/255, 84/255)
  const eyePieceColor = new THREE.Color(222/255, 122/255, 140/255)


  return (
    <group {...props} dispose={null} scale={scale} ref={ref}>
      <group
        position={[0.955, 3.554, -0.416]}
        rotation={[-0.756, 0.237, -1.332]}
        scale={0.102}
      >
        <mesh
          geometry={nodes.Cilindro002.geometry}
          material={materials['Material.005']}
          material-color={bodyColor}
        />
        <mesh
          geometry={nodes.Cilindro002_1.geometry}
          material={materials['Material.006']}
          material-color={bodyColor}
        />
      </group>
      <mesh
        geometry={nodes.Contorno_Ojo.geometry}
        material={materials['Material.004']}
        position={[0.871, 3.843, 0.041]}
        rotation={[0, 0, -1.269]}
        scale={0.293}
        material-color={eyePieceColor}
      />
      <mesh
        geometry={nodes.Ojo.geometry}
        material={materials['Material.002']}
        position={[0.741, 3.802, 0.039]}
        scale={0.364}
        material-color={'black'}
        material-transparent
        material-opacity={0.6}
        material-envMapIntensity={2}
      />
      <mesh
        geometry={nodes.Antena_1.geometry}
        material={nodes.Antena_1.material}
        position={[-0.141, 4.573, 0.234]}
        scale={[0.053, 0.484, 0.053]}
        material-color={'blue'}
      />
      <mesh
        geometry={nodes.Cuerpo.geometry}
        material={materials['Material.006']}
        position={[0, 1.388, 0]}
        rotation={[0.014, 0, 0]}
        scale={1.81}
      />
      <group position={[0, 3.566, 0]} scale={[1.045, 1.031, 1.068]}>
        <mesh
          geometry={nodes.Esfera002.geometry}
          material={materials.Material}
          material-color={headColor}
        />
        <mesh
          geometry={nodes.Esfera002_1.geometry}
          material={materials.Linea}
          material-color={bodyColor}
        />
        <mesh
          geometry={nodes.Esfera002_2.geometry}
          material={materials['Linea 2']}
        />
      </group>
      <group
        position={[-0.328, 4.599, -0.231]}
        rotation={[0, 0, -0.072]}
        scale={[0.066, 0.602, 0.049]}
      >
        <mesh
          geometry={nodes.Cilindro001.geometry}
          material={materials['Material.007']}
          material-color={'white'}
        />
        <mesh
          geometry={nodes.Cilindro001_1.geometry}
          material={materials['Material.008']}
          material-color={'blue'}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/BB-8-1.glb');
