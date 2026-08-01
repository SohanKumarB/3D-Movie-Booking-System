import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Float, Text } from '@react-three/drei';
import { audioService } from '../services/audioService';

function FloatingPoster({ movie, position, rotation, onSelect }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.15;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    audioService.playSeatClick();
    onSelect(movie);
  };

  return (
    <group ref={meshRef} position={position} rotation={rotation} onClick={handleClick}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Frame Outer Glow */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[2.7, 4.0, 0.1]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.6} />
        </mesh>

        {/* Poster Surface */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 3.8, 0.08]} />
          <meshStandardMaterial color="#111827" roughness={0.3} />
        </mesh>

        {/* Title Text Banner */}
        <Text
          position={[0, -1.4, 0.06]}
          fontSize={0.22}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {movie.title}
        </Text>

        {/* Rating Badge */}
        <Text
          position={[0.8, 1.5, 0.06]}
          fontSize={0.2}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          ⭐ {movie.rating}
        </Text>
      </Float>
    </group>
  );
}

export function VirtualLobby({ movies, onSelectMovie }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

      <ambientLight intensity={0.4} />
      <spotLight position={[0, 8, 5]} intensity={3} color="#00F0FF" angle={0.8} penumbra={1} />
      <pointLight position={[-6, 2, 2]} intensity={2} color="#FF007A" />
      <pointLight position={[6, 2, 2]} intensity={2} color="#8B5CF6" />

      <Stars radius={40} depth={15} count={1500} factor={4} saturation={1} fade speed={2} />

      {/* 3D Floating Cinema Sign */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 2.8, 0]}
          fontSize={0.8}
          color="#00F0FF"
          anchorX="center"
          anchorY="middle"
        >
          MOVIEVERSE 3D LOBBY
        </Text>
        <Text
          position={[0, 2.1, 0]}
          fontSize={0.25}
          color="#9CA3AF"
          anchorX="center"
          anchorY="middle"
        >
          Click any floating poster to zoom in & book tickets
        </Text>
      </Float>

      {/* Grid of Floating Movie Posters */}
      {movies.slice(0, 4).map((movie, idx) => {
        const xPos = (idx - 1.5) * 3.2;
        return (
          <FloatingPoster
            key={movie.id}
            movie={movie}
            position={[xPos, -0.4, 0]}
            rotation={[0, (idx - 1.5) * -0.1, 0]}
            onSelect={onSelectMovie}
          />
        );
      })}

      {/* Floor Mirror Grid Effect */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#080914" roughness={0.1} metalness={0.9} />
      </mesh>
    </>
  );
}
