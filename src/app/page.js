"use client"
import { useState, useEffect, Suspense  } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {Switch } from "@nextui-org/react";
import {MoonIcon} from "../../public/icon/MoonIcon";
import {SunIcon} from "../../public/icon/SunIcon";
import {LoadingScreen} from "./LoadingScreen";
import { Habilidades } from './Habilidades';
import { Proyectos } from './Proyectos';
import { SobreMi } from './SobreMi';
import { Contactame } from './Contactame';

function Model({ urlDark, urlLight, theme }) {
  const gltfDark = useLoader(GLTFLoader, urlDark);
  const gltfLight = useLoader(GLTFLoader, urlLight);
  const mixerDark = new THREE.AnimationMixer(gltfDark.scene);
  const mixerLight = new THREE.AnimationMixer(gltfLight.scene);
  const actionDark = mixerDark.clipAction(gltfDark.animations[0]);
  const actionLight = mixerLight.clipAction(gltfLight.animations[0]);

  useFrame((state, delta) => {
    mixerDark.update(delta);
    mixerLight.update(delta);
    
  });

  useEffect(() => {
    if (theme === 'dark') {
      actionDark.play();
      actionLight.stop();
    } else {
      actionLight.play();
      actionDark.stop();
    }
    return () => {
      actionDark.stop();
      actionLight.stop();
    };
  }, [theme]);
  // Posiciones iniciales tema oscuro
  gltfDark.scene.position.x = -3;
  gltfDark.scene.position.y = -5.5;
  gltfDark.scene.rotation.z = 0;
  // Posiciones iniciales tema claro
  gltfLight.scene.position.x = -3;
  gltfLight.scene.position.y = -5.5;
  gltfLight.scene.rotation.z = 0;

  return (
    <>
      <primitive object={gltfDark.scene} dispose={null} scale={[1, 1, -1]} visible={theme === 'dark'} />
      <primitive object={gltfLight.scene} dispose={null} scale={[1, 1, -1]} visible={theme === 'light'} />
    </>
  );
}


function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const isMobile = window.innerWidth <= 912;
  const initialPosition = { x: -5, y: 3, z: isMobile ? -22 : -21};

  camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);

  const bounceFactor = 0.05;

  useFrame(() => {
    const dx = initialPosition.x - camera.position.x;
    const dy = initialPosition.y - camera.position.y;
    const dz = initialPosition.z - camera.position.z;

    if (Math.abs(dx) > 0.1) {
      camera.position.x += dx * bounceFactor;
    }

    if (Math.abs(dy) > 0.1) {
      camera.position.y += dy * bounceFactor;
    }

    if (Math.abs(dz) > 0.1) {
      camera.position.z += dz * bounceFactor;
    }
  });
  return (
    <OrbitControls
      args={[camera, domElement]}
      enableZoom={false}
      enablePan={false}
      enableRotate={true}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
      maxAzimuthAngle={-Math.PI / 5}
      minAzimuthAngle={Math.PI / 2}
      enableDamping={true}
      dampingFactor={0.1}
    />
  );
}
//const icon_negro = {url:"icon_negro.png"}
const icono = {url:"icon.png"}
export default function Home() {
  const [theme, setTheme] = useState(() => {
    if(typeof window !== 'undefined'){
      const theme = localStorage.getItem('theme');
      return theme ? theme : 'light';
    }
  })
  const [showOverlay, setShowOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const handlechangetheme = () => {
    setTheme(prevtheme => prevtheme === 'light' ? 'dark' : 'light')
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 1000);
  }
   if (isLoading) {
    return <LoadingScreen />;
  } 
  return (
    /*  alternativa bg color 
    background-image: linear-gradient(to bottom, #161727, #1c1e39, #23264b, #2a2d5e, #313572);
    */
    <div>
      {/* {isLoading && <LoadingScreen />} */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <div className='bg-white dark:bg-purpleosc-950'>
          <AnimatePresence>
          {showOverlay && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 ${theme === 'dark' ? 'bg-purpleosc-950' : 'bg-white'}`}
          >
            {theme === 'dark' ? 
                <MoonIcon 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100px', height: '100px' }} 
              /> 
              : 
              <SunIcon 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100px', height: '100px' }} 
              />
            }
          </motion.div>
          )}
        </AnimatePresence>
        <header className="bg-white dark:bg-transparent mx-auto max-w-screen-xl">
        <nav className="flex items-center justify-between p-6 lg:px-8">
      <div className="flex justify-start lg:justify-start">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">MSV</span>
          <img className="h-12 w-12 text-gray-900 dark:text-white dark:filter dark:invert" src={icono.url} alt=""/>
        </a>
      </div>
      <div className="hidden lg:flex gap-x-12 justify-center">
        <a href="#" className="text-sm sm:text-lg font-semibold leading-6 text-gray-900 dark:text-white">Habilidades</a>
        <a href="#" className="text-sm sm:text-lg font-semibold leading-6 text-gray-900 dark:text-white">Proyectos</a>
        <a href="#" className="text-sm sm:text-lg font-semibold leading-6 text-gray-900 dark:text-white ">Sobre mí</a>
        <a href="#" className="text-sm sm:text-lg font-semibold leading-6 text-gray-900 dark:text-white ">Contactame</a>
      </div>
      <div className="flex justify-end lg:justify-end">
        <Switch
          className={`font-semibold`}
          onClick={handlechangetheme}
          size="md"
          color="default"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
            <MoonIcon className={className} /> 
            ) : (
            <SunIcon className={className} /> 
            )
          }
        >
          <span className="block text-sm sm:text-lg font-medium text-gray-900 dark:text-white">Modo Oscuro</span>
        </Switch>
      </div>
    </nav>
        </header>
          <div className='flex flex-col md:flex-row bg-white dark:bg-transparent mx-auto max-w-screen-2xl w-full px-4 pb-10'>
            <div className='w-full md:w-1/2 bg-white dark:bg-transparent max-w-lg:ml-32 h-[430px] md:h-[650px]'> 
              <Canvas style={{height:'100%', width:'100%'}} className='bg-white dark:bg-transparent' >
                <CameraControls />
                <ambientLight intensity={2} />
                <spotLight position={[10, 10, 10]} angle={0.3} />
                <Suspense fallback={null}>
                  <Model key={theme + new Date().getTime()} urlDark="modo_oscuro.glb" urlLight="modo_claro.glb" theme={theme}/>
                </Suspense>
              </Canvas>
            </div>
            <div className='w-full h-full md:w-1/2 dark:bg-transparent flex flex-col md:pt-36 '>
              <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold flex flex-row gap-x-4 pb-6 lg:pb-10">
                ¡Hola! Soy Mathias
                {/* <a href="https://linkedin.com/in/midudev" target="_blank" rel="noopener" class="flex justify-center items-center hover:scale-105 transition">
                  <div>
                    <span class="relative flex overflow-hidden rounded-full p-[1px]">
                      <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></span>
                      <div class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl whitespace-nowrap"> Disponible para trabajar </div>
                    </span>
                  </div>
                </a> */}
              </h1>
              <h2 className="text-xl lg:text-2xl text-balance max-w-[700px] text-black dark:text-white">
                <span className='text-red-600 dark:text-red-300'>+2 años de experiencia en Desarrollo Web, de manera freelance.</span>
                <span className="text-yellow-600 dark:text-yellow-200">Residente en Lima, Perú</span>.
                <span className="text-green-600 dark:text-green-300">Especializado en la creación de aplicaciones únicas</span>.
                <span className="text-sky-600 dark:text-sky-200">Apasionado por la innovación y la resolución creativa de problemas.</span>
              </h2>
              <nav className="flex gap-4 mt-8 flex-wrap"> <a className="
                bg-white/5 
                  border dark:border-white/10 border-gray-300 rounded-full
                  flex justify-center items-center gap-x-2
                  py-1 px-2 md:py-2 md:px-4
                  text-xs md:text-base
                  text-black/70 dark:text-white
                  transition
                  hover:scale-110 hover:bg-white/10
                " href="https://linkedin.com/in/mathias-sv" target="_blank" rel="noopener noreferrer">  <svg className="size-4 md:size-6" width="256" height="256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256"><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="currentColor"></path></svg>
              LinkedIn
              </a> <a className="
                bg-white/5 
                  border dark:border-white/10 border-gray-300 rounded-full
                  flex justify-center items-center gap-x-2
                  py-1 px-2 md:py-2 md:px-4
                  text-xs md:text-base
                  text-black/70 dark:text-white
                  transition
                  hover:scale-110 hover:bg-white/10
                " href="https://github.com/mathias-sv" target="_blank" rel="noopener noreferrer">  <svg className="size-4 md:size-6" width="256" height="250" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 250"><path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"></path></svg>
              GitHub
              </a> <a className="
                bg-white/5 
                  border dark:border-white/10 border-gray-300 rounded-full
                  flex justify-center items-center gap-x-2
                  py-1 px-2 md:py-2 md:px-4
                  text-xs md:text-base
                  text-black/70 dark:text-white
                  transition
                  hover:scale-110 hover:bg-white/10
                " href="msamamev@ucvvirtual.edu.pe" target="_blank" rel="noopener noreferrer">  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"></path><path d="M3 6l9 6l9 -6"></path><path d="M15 18h6"></path><path d="M18 15l3 3l-3 3"></path></svg>
              msamamev@ucvvirtual.edu.pe
              </a> 
              </nav>
            </div>
          </div>
          <div className='bg-white dark:bg-transparent mx-auto max-w-screen-xl w-full px-4 pb-10'>
            <div className='flex text-center flex-col '>
            <h1 className='text-gray-900 dark:text-white text-2xl md:text-3xl lg:text-4xl font-bold gap-x-4 pb-6 lg:pb-10'>Habilidades</h1>
              <Habilidades/>
            </div>
            <div>
              <Proyectos/>
            </div>
            <div>
              <SobreMi/>
            </div>
            <div>
              <Contactame/>
            </div>
          </div>
      </div>
    </div>
    </div>
  );
}