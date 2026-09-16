import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating animated geometric shapes
const FloatingShapes = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();

  useFrame((state, delta) => {
    if (mesh1.current) {
      mesh1.current.rotation.x += delta * 0.2;
      mesh1.current.rotation.y += delta * 0.3;
    }
    if (mesh2.current) {
      mesh2.current.rotation.x -= delta * 0.25;
      mesh2.current.rotation.z += delta * 0.2;
    }
    if (mesh3.current) {
      mesh3.current.rotation.y += delta * 0.35;
      mesh3.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <>
      {/* Primary Distorted Holographic Sphere */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere ref={mesh1} args={[1.3, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </Sphere>
      </Float>

      {/* Secondary Cyan Wireframe Icosahedron */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={1.8}>
        <mesh ref={mesh2} position={[2.8, 1.2, -1]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial
            color="#06b6d4"
            wireframe
            roughness={0.1}
            metalness={0.9}
            emissive="#06b6d4"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Tertiary Glowing Torus Knot */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={2.2}>
        <mesh ref={mesh3} position={[-2.8, -1.2, -1.2]}>
          <torusKnotGeometry args={[0.7, 0.22, 100, 16]} />
          <meshStandardMaterial
            color="#ec4899"
            roughness={0.3}
            metalness={0.7}
            emissive="#db2777"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </>
  );
};

// Interactive Ambient Particle Field
const ParticleField = () => {
  const pointsRef = useRef();

  const particleCount = 200;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 15;
      pos[i + 1] = (Math.random() - 0.5) * 15;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const FloatingScene3D = () => {
  return (
    <div className="w-full h-full min-h-[420px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
        <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
        
        <FloatingShapes />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default FloatingScene3D;
