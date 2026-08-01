import React, { useRef, useState } from 'react';

export function Seat3D({
  id,
  row,
  col,
  position,
  status, // 'available' | 'booked' | 'selected' | 'vip'
  price,
  onClick,
  onHoverStart,
  onHoverEnd
}) {
  const meshGroup = useRef();
  const [hovered, setHovered] = useState(false);

  // Seat color palettes
  const getColor = () => {
    if (status === 'selected') return '#00F0FF'; // Neon Cyan Glow
    if (status === 'booked') return '#DC2626';   // Dark Crimson
    if (status === 'vip') return '#A855F7';      // Purple VIP
    if (hovered) return '#10B981';               // Emerald Green
    return '#374151';                             // Standard Dark Slate
  };

  const currentColor = getColor();

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (status === 'booked') return;
    setHovered(true);
    if (onHoverStart) onHoverStart(id);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    if (onHoverEnd) onHoverEnd(id);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (status === 'booked') return;
    if (onClick) onClick(id, price);
  };

  // Lift position when hovered or selected
  const offsetY = hovered ? 0.25 : (status === 'selected' ? 0.15 : 0);
  const rotationY = status === 'selected' ? 0.12 : 0;

  return (
    <group
      ref={meshGroup}
      position={[position[0], position[1] + offsetY, position[2]]}
      rotation={[0, rotationY, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Base Leg Stand */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 8]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Seat Cushion */}
      <mesh position={[0, 0.55, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.2, 0.8]} />
        <meshStandardMaterial
          color={currentColor}
          metalness={0.3}
          roughness={0.4}
          emissive={currentColor}
          emissiveIntensity={status === 'selected' ? 0.7 : (hovered ? 0.4 : (status === 'vip' ? 0.2 : 0.05))}
        />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 1.15, -0.3]} rotation={[-0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.85, 1.0, 0.2]} />
        <meshStandardMaterial
          color={currentColor}
          metalness={0.3}
          roughness={0.4}
          emissive={currentColor}
          emissiveIntensity={status === 'selected' ? 0.7 : (hovered ? 0.4 : 0.05)}
        />
      </mesh>

      {/* Headrest Cushion */}
      <mesh position={[0, 1.75, -0.32]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.75, 0.3, 0.22]} />
        <meshStandardMaterial color={status === 'vip' ? '#C084FC' : '#1F2937'} />
      </mesh>

      {/* Left Armrest */}
      <mesh position={[-0.48, 0.8, 0]}>
        <boxGeometry args={[0.12, 0.15, 0.85]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Right Armrest with Cup Holder */}
      <mesh position={[0.48, 0.8, 0]}>
        <boxGeometry args={[0.12, 0.15, 0.85]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Seat Number Tag */}
      {hovered && (
        <mesh position={[0, 2.05, -0.3]}>
          <planeGeometry args={[0.6, 0.25]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      )}
    </group>
  );
}
