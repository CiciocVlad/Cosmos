import './App.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from '../BB-8-1'
import { useState } from 'react'

const send = message => {
  const api = 'http://127.0.0.1:5000'
  return fetch(
    `${api}/chat?` +
      new URLSearchParams({
        message
      })
  )
}

const fetchAudio = async () => {
  fetch('http://127.0.0.1:5000/audio') // Assuming Flask server is running on the same domain
  .then(response => response.blob())
  .then(blob => {
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  })
  .catch(error => {
    console.error('Error fetching audio:', error);
  });
};


export const App = () => {
  const [response, setResponse] = useState("Hi, I'm Cosmo")
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [animation, setAnimation] = useState('')
  const [audioSrc, setAudioSrc] = useState('');

    

  const submit = async () => {
    setAnimation('animated')
    setLoading(true)
    setValue('')
    const request = await send(value)
    const { response } = await request.json()
    if(response){
      const audio = await fetchAudio()
    }
    setResponse(response)
    setLoading(false)
    setAnimation('')
  }

  return (
    <div className="wrapper">
      <h1 className="answer">{response}</h1>
      <Canvas
        alpha="true"
        className="robot"
        camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 500 }}
      >
        <ambientLight intensity={10} />
        <directionalLight position={[0, 0, 1.5]} />
        <directionalLight position={[0, 0, 1.5]} />
        <directionalLight position={[0, 0, -2]} />
        <directionalLight position={[0, 0, -2]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Model
          scale={0.6}
          rotation={[0, 4.2, 0]}
          position={[0, -1, 0]}
          isRotating={loading}
        />
      </Canvas>
      <div className="question">
        <input
          type="text"
          value={value}
          placeholder="Ask me about fantasy books..."
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') submit()
          }}
        />
        <button onClick={submit}>
          <img src="/img/notification_box.svg" />
          <img
            id="to_animate"
            className={animation}
            src="/img/notification_box.svg"
          />
        </button>
      </div>
    </div>
  )
}
