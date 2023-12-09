import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Model } from "../BB-8-1";

export const App = () => {
  const cosmos = useGLTF("./cosmos/BB-8-1.glb");

  return (
    <div className="wrapper">
      <Canvas
        alpha="true"
        className="robot"
        frameloop="demand"
        camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 500 }}
      >
        <ambientLight intensity={5} />
        <directionalLight position={[40, 10, 15]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Model scale={0.6} rotation={[0, 6.5, 0]} position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
};
