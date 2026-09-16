import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';

const AmbientOrbs = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();

  useFrame((state, delta) => {
    if (mesh1.current) {
      mesh1.current.rotation.x += delta * 0.15;
      mesh1.current.rotation.y += delta * 0.18;
    }
    if (mesh2.current) {
      mesh2.current.rotation.y -= delta * 0.2;
      mesh2.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={mesh1} position={[-3, 2, -2]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            emissive="#4338ca"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={mesh2} position={[3.2, -2, -1]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            wireframe
            emissive="#0891b2"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>
    </>
  );
};

const Dust = () => {
  const points = useRef();
  const count = 150;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 16;
      pos[i + 1] = (Math.random() - 0.5) * 16;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c4b5fd"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const AuthBackground3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60 dark:opacity-75">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#06b6d4" />
        <AmbientOrbs />
        <Dust />
      </Canvas>
    </div>
  );
};

export default AuthBackground3D;
