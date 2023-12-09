import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

export const App = () => {
  const cosmos = useGLTF('./cosmos/BB-8-1.glb')

  return (
    <div className="wrapper">
      <Canvas className="robot" frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 500 }}>
        <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
        <primitive object={cosmos.scene} scale={0.5} position={[0, -1, 0]} />
      </Canvas>
    </div>
  )
}
