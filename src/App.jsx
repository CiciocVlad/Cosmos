import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

export const App = () => {
  const cosmos = useGLTF('./cosmos/BB-8-1.glb')

  return (
    <div className="wrapper">
      <div class="robot">
      <Canvas className="cursor-pointer" frameloop="demand" camera={{ position: [-4, 3, 6], fov: 45, near: 0.01, far: 100 }}>
        <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} enablePan={false} />
        <primitive object={cosmos.scene} scale={0.5} />
      </Canvas>
      </div>
    </div>
  )
}
