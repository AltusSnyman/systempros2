import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSphere(props) {
    const ref = useRef();

    // Generate 5000 random points on a sphere
    const particlesPosition = useMemo(() => {
        const count = 4000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorInside = new THREE.Color('#3B82F6');
        const colorOutside = new THREE.Color('#0A0A0A');

        for (let i = 0; i < count; i++) {
            // Random layout in sphere
            const r = 2.5 * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Color gradient based on radius
            // simplified blue aesthetic
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#3B82F6"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}

function AnimatedGlobe() {
    return (
        <group>
            <ParticleSphere />
            {/* Core Glow */}
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.05} />
            </mesh>
        </group>
    )
}

export default function HeroCanvas() {
    return (
        <div className="absolute inset-0 z-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                <fog attach="fog" args={['#0A0A0A', 5, 15]} />
                <AnimatedGlobe />
            </Canvas>
        </div>
    );
}
