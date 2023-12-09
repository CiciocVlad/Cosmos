import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model({ scale, isRotating, materialProps, ...props }) {
  const { nodes, materials } = useGLTF("/cosmos/BB-8-1.glb")
  const ref = useRef()

  useFrame(() => {
    if (isRotating)
      ref.current.rotation.y += 0.1
  })

  return (
    <group {...props} dispose={null} scale={scale} ref={ref}>
      <group
        position={[0.955, 3.554, -0.416]}
        rotation={[-0.756, 0.237, -1.332]}
        scale={0.102}
      >
        <mesh
          geometry={nodes.Cilindro002.geometry}
          material={materials["Material.005"]}
          material-color={"red"}
        />
        <mesh
          geometry={nodes.Cilindro002_1.geometry}
          material={materials["Material.006"]}
          material-color={"red"}
        />
      </group>
      <mesh
        geometry={nodes.Contorno_Ojo.geometry}
        material={materials["Material.004"]}
        position={[0.871, 3.843, 0.041]}
        rotation={[0, 0, -1.269]}
        scale={0.293}
        material-color={"red"}
      />
      <mesh
        geometry={nodes.Ojo.geometry}
        material={materials["Material.002"]}
        position={[0.741, 3.802, 0.039]}
        scale={0.364}
        material-color={"black"}
        material-transparent
        material-opacity={0.6}
        material-envMapIntensity={2}
      />
      <mesh
        geometry={nodes.Antena_1.geometry}
        material={nodes.Antena_1.material}
        position={[-0.141, 4.573, 0.234]}
        scale={[0.053, 0.484, 0.053]}
        material-color={"blue"}
      />
      <mesh
        geometry={nodes.Cuerpo.geometry}
        material={materials["Material.006"]}
        position={[0, 1.388, 0]}
        rotation={[0.014, 0, 0]}
        scale={1.81}
      />
      <group position={[0, 3.566, 0]} scale={[1.045, 1.031, 1.068]}>
        <mesh
          geometry={nodes.Esfera002.geometry}
          material={materials.Material}
          material-color={"red"}
        />
        <mesh
          geometry={nodes.Esfera002_1.geometry}
          material={materials.Linea}
          material-color={"red"}
        />
        <mesh
          geometry={nodes.Esfera002_2.geometry}
          material={materials["Linea 2"]}
        />
      </group>
      <group
        position={[-0.328, 4.599, -0.231]}
        rotation={[0, 0, -0.072]}
        scale={[0.066, 0.602, 0.049]}
      >
        <mesh
          geometry={nodes.Cilindro001.geometry}
          material={materials["Material.007"]}
          material-color={"white"}
        />
        <mesh
          geometry={nodes.Cilindro001_1.geometry}
          material={materials["Material.008"]}
          material-color={"blue"}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/BB-8-1.glb");
