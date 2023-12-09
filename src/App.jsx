import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '../BB-8-1';
import { useEffect, useState } from 'react';
import Typewriter from './Typewriter';

const send = (message) => {
  const api = 'http://127.0.0.1:5000';
  return fetch(
    `${api}/chat?` +
      new URLSearchParams({
        message,
      })
  );
};
// const inactivityThreshold = 35000;
export const App = () => {
  const [response, setResponse] = useState("Hi, I'm Cosmo");
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [jumping, setJumping] = useState(false);
  // const [activityTimer, setActivityTimer] = useState(null);
  const [animation, setAnimation] = useState('');

  // const resetActivityTimer = () => {
  //   if (activityTimer) {
  //     clearTimeout(activityTimer);
  //   }

  //   setActivityTimer(
  //     setTimeout(() => {
  //       setJumping(true);
  //       setLoading(true);
  //     }, inactivityThreshold)
  //   );

  //   const jumpTimer = setTimeout(() => {
  //     setJumping(false);
  //     setLoading(false);
  //   }, 10000);
  //   setActivityTimer(jumpTimer);
  // };

  // useEffect(() => {
  //   const handleInput = () => {
  //     resetActivityTimer();
  //   };

  //   const handleButtonClick = () => {
  //     resetActivityTimer();
  //   };

  //   document.addEventListener("input", handleInput);
  //   document.addEventListener("click", handleButtonClick);

  //   return () => {
  //     if (activityTimer) {
  //       clearTimeout(activityTimer);
  //     }
  //     document.removeEventListener("input", handleInput);
  //     document.removeEventListener("click", handleButtonClick);
  //   };
  // }, [activityTimer]);

  // useEffect(() => {
  //   resetActivityTimer();
  // }, []);

  const submit = async () => {
    setAnimation('animated');
    setLoading(true);
    setValue('');
    const request = await send(value);
    const { response } = await request.json();
    const responseToLoweCase = response.toLowerCase();
    if (
      responseToLoweCase.includes('yay') ||
      responseToLoweCase.includes('awesome') ||
      responseToLoweCase.includes('!!')
    ) {
      setJumping(true);
      const jumpTimer = setTimeout(() => {
        setJumping(false);
      }, 10000);
    } else {
      setJumping(false);
    }
    setResponse(response);
    setLoading(false);
    setAnimation('');
    // resetActivityTimer();
  };

  return (
    <div className="wrapper">
      <h1 className="answer">
        <Typewriter text={response} delay={25} />
      </h1>
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
          isJumping={jumping}
        />
      </Canvas>
      <div className="question">
        <input
          type="text"
          value={value}
          placeholder="Ask me about fantasy books..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
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
  );
};
