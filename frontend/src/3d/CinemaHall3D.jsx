import React, { useMemo } from 'react';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Seat3D } from './Seat3D';
import { audioService } from '../services/audioService';

export function CinemaHall3D({
  selectedMovie,
  selectedSeats,
  onSeatToggle,
  cameraMode = 'overview' // 'overview' | 'screen' | 'vip'
}) {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Hardcoded booked seats for realism
  const bookedSeats = useMemo(() => ['A3', 'A4', 'B5', 'B6', 'C1', 'C10', 'D8'], []);

  // Compute camera position based on mode
  const cameraPos = useMemo(() => {
    if (cameraMode === 'screen') return [0, 2, -5];
    if (cameraMode === 'vip') return [0, 4, 3];
    return [0, 9, 14]; // Default overview view
  }, [cameraMode]);

  const handleSeatClick = (seatId, price) => {
    audioService.playSeatClick();
    onSeatToggle(seatId, price);
  };

  const handleSeatHover = () => {
    audioService.playSeatHover();
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={cameraPos} fov={50} />
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={6}
        maxDistance={22}
      />

      {/* Lighting Setup */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 15, 10]} intensity={0.4} castShadow />

      {/* Screen Spotlight beam */}
      <spotLight
        position={[0, 12, 10]}
        target-position={[0, 3, -10]}
        angle={0.6}
        penumbra={0.8}
        intensity={3}
        color="#00F0FF"
      />

      {/* Screen Neon Backdrop Glow */}
      <pointLight position={[0, 4, -11]} intensity={2.5} color="#00F0FF" distance={15} />

      {/* Atmospheric Starfield / Dust */}
      <Stars radius={50} depth={20} count={1200} factor={4} saturation={0.5} fade speed={1.5} />

      {/* CINEMA HALL STRUCTURE */}
      {/* 1. Curved Screen Frame */}
      <group position={[0, 3.8, -11]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[16, 8, 32, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#1F2937"
            emissiveIntensity={0.2}
            roughness={0.2}
          />
        </mesh>

        {/* Screen Frame Border */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[16.6, 8.6, 0.2]} />
          <meshStandardMaterial color="#0B0E17" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Glow Bar Above Screen */}
        <mesh position={[0, 4.4, 0.1]}>
          <boxGeometry args={[16, 0.15, 0.1]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </group>

      {/* Screen Ray Light Cone visual */}
      <mesh position={[0, 6, -1]} rotation={[0.45, 0, 0]}>
        <coneGeometry args={[7, 18, 32, 1, true]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.06} side={2} />
      </mesh>

      {/* 2. Hall Flooring Steps */}
      <mesh position={[0, -0.2, 1]} receiveShadow>
        <boxGeometry args={[18, 0.4, 18]} />
        <meshStandardMaterial color="#0D0F19" roughness={0.9} />
      </mesh>

      {/* Carpet Center Aisle Strip */}
      <mesh position={[0, 0.02, 1]}>
        <planeGeometry args={[2.5, 17.5]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1E1B4B" roughness={0.7} />
      </mesh>

      {/* Aisle LED Guide Strips */}
      <mesh position={[-1.3, 0.03, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 17.5]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>
      <mesh position={[1.3, 0.03, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 17.5]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>

      {/* 3. Cinema Side Walls & Neon Accent Strips */}
      {/* Left Wall */}
      <mesh position={[-9, 4, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[18, 10]} />
        <meshStandardMaterial color="#090B13" roughness={0.8} />
      </mesh>
      <mesh position={[-8.95, 4, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[18, 0.15]} />
        <meshBasicMaterial color="#FF007A" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[9, 4, 1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[18, 10]} />
        <meshStandardMaterial color="#090B13" roughness={0.8} />
      </mesh>
      <mesh position={[8.95, 4, 1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[18, 0.15]} />
        <meshBasicMaterial color="#FF007A" />
      </mesh>

      {/* 4. DYNAMIC 3D SEAT GRID */}
      {rows.map((rowSymbol, rIdx) => {
        const isVipRow = rIdx >= 3; // Rows D and E are VIP
        const seatPrice = isVipRow ? 24.99 : 16.99;
        const zPos = -4 + rIdx * 2.2;
        const yElev = rIdx * 0.45; // Stadium stepped seating elevation

        return cols.map((colNum, cIdx) => {
          const seatId = `${rowSymbol}${colNum}`;
          const isBooked = bookedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          let status = 'available';
          if (isBooked) status = 'booked';
          else if (isSelected) status = 'selected';
          else if (isVipRow) status = 'vip';

          // Split seats with center aisle (gap between cols 5 and 6)
          const xPos = (cIdx - 4.5) * 1.35 + (cIdx >= 5 ? 0.6 : -0.6);

          return (
            <Seat3D
              key={seatId}
              id={seatId}
              row={rowSymbol}
              col={colNum}
              position={[xPos, yElev, zPos]}
              status={status}
              price={seatPrice}
              onClick={handleSeatClick}
              onHoverStart={handleSeatHover}
            />
          );
        });
      })}
    </>
  );
}
