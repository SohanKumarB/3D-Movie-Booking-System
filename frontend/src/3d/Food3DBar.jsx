import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, OrbitControls } from '@react-three/drei';

function PopcornModel() {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={groupRef}>
      {/* Bucket */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.65, 1.6, 24]} />
        <meshStandardMaterial color="#DC2626" roughness={0.3} />
      </mesh>

      {/* Bucket White Strips */}
      <mesh position={[0, 0, 0.01]}>
        <cylinderGeometry args={[0.91, 0.66, 1.61, 24, 1, true]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>

      {/* Popcorn Kernels mound */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.85, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#FDE047" roughness={0.8} />
      </mesh>
    </group>
  );
}

function DrinkModel() {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={groupRef}>
      {/* Cup */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.45, 1.8, 20]} />
        <meshStandardMaterial color="#00F0FF" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Lid */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.1, 20]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Straw */}
      <mesh position={[0.2, 1.3, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 12]} />
        <meshStandardMaterial color="#FF007A" />
      </mesh>
    </group>
  );
}

function BurgerModel() {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={groupRef}>
      {/* Bottom Bun */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.8, 0.75, 0.3, 20]} />
        <meshStandardMaterial color="#D97706" roughness={0.5} />
      </mesh>
      {/* Patty */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.25, 20]} />
        <meshStandardMaterial color="#451A03" roughness={0.9} />
      </mesh>
      {/* Cheese */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.5, 0.05, 1.5]} />
        <meshStandardMaterial color="#F59E0B" />
      </mesh>
      {/* Top Bun */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.82, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#D97706" roughness={0.5} />
      </mesh>
    </group>
  );
}

function PizzaModel() {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.12, 3]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.6} />
      </mesh>
      {/* Pepperoni dots */}
      <mesh position={[0.2, 0.07, 0.2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 12]} />
        <meshStandardMaterial color="#991B1B" />
      </mesh>
      <mesh position={[-0.3, 0.07, 0.1]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 12]} />
        <meshStandardMaterial color="#991B1B" />
      </mesh>
    </group>
  );
}

export function Food3DBar({ activeModel = 'popcorn' }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 4]} fov={45} />
      <OrbitControls enableZoom={false} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} />
      <pointLight position={[-2, -1, 2]} color="#00F0FF" intensity={1} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {activeModel === 'popcorn' && <PopcornModel />}
        {activeModel === 'drink' && <DrinkModel />}
        {activeModel === 'burger' && <BurgerModel />}
        {activeModel === 'pizza' && <PizzaModel />}
      </Float>

      {/* Podium Platform */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.6, 1.8, 0.3, 32]} />
        <meshStandardMaterial color="#0B0E17" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Neon Ring under Podium */}
      <mesh position={[0, -1.04, 0]}>
        <ringGeometry args={[1.58, 1.63, 32]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>
    </>
  );
}
