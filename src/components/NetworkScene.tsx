import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { reducedMotion } from "../lib/motion";

// A slowly turning 3D network: three loose communities of nodes, links to near neighbours, and small
// pulses travelling along the links like messages. It leans toward the pointer and sleeps off screen.

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

function useAccent() {
  const read = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#9be36d";
  const [c, setC] = useState(read);
  useEffect(() => {
    const mo = new MutationObserver(() => setC(read()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return c;
}

function Network({ accent, still }: { accent: string; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.Points>(null);

  const { nodes, edges, linePositions } = useMemo(() => {
    const r = rng(11);
    const centers = [new THREE.Vector3(-1.3, 0.4, 0), new THREE.Vector3(1.2, 0.7, -0.5), new THREE.Vector3(0.2, -1.1, 0.6)];
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 96; i++) {
      const c = centers[i % 3];
      const v = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize().multiplyScalar(0.5 + r() * 1.1);
      nodes.push(c.clone().add(v));
    }
    const edges: [number, number][] = [];
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => [j, a.distanceTo(b)] as const)
        .filter(([j]) => j !== i)
        .sort((p, q) => p[1] - q[1])
        .slice(0, 3)
        .forEach(([j]) => i < j && edges.push([i, j]));
    });
    // a few long links between communities
    for (let k = 0; k < 9; k++) edges.push([Math.floor(r() * 96), Math.floor(r() * 96)]);
    const linePositions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      linePositions.set([nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z], k * 6);
    });
    return { nodes, edges, linePositions };
  }, []);

  const nodePositions = useMemo(() => new Float32Array(nodes.flatMap((v) => [v.x, v.y, v.z])), [nodes]);
  const P = 36;
  const pulseState = useMemo(() => {
    const r = rng(5);
    return Array.from({ length: P }, () => ({ edge: Math.floor(r() * edges.length), t: r(), speed: 0.25 + r() * 0.5 }));
  }, [edges.length]);
  const pulsePositions = useMemo(() => new Float32Array(P * 3), []);

  const dotTexture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (!still) g.rotation.y += delta * 0.06;
    // lean toward the pointer
    g.rotation.x += (state.pointer.y * 0.25 - g.rotation.x) * 0.04;
    g.position.x += (state.pointer.x * 0.3 - g.position.x) * 0.04;
    if (still) return;
    const pos = pulses.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!pos) return;
    pulseState.forEach((p, i) => {
      p.t += delta * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
      }
      const [a, b] = edges[p.edge];
      const v = nodes[a].clone().lerp(nodes[b], p.t);
      pulsePositions.set([v.x, v.y, v.z], i * 3);
    });
    pos.needsUpdate = true;
  });

  const color = new THREE.Color(accent);
  return (
    <group ref={group} scale={1.15}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.18} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.09} map={dotTexture} color="#ffffff" transparent opacity={0.85} depthWrite={false} sizeAttenuation />
      </points>
      <points ref={pulses}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.16} map={dotTexture} color={color} transparent depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
      </points>
    </group>
  );
}

// If WebGL is missing or the scene fails, the page goes on without it.
class Quiet extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function NetworkScene(props: { className?: string }) {
  if (!hasWebGL()) return null;
  return (
    <Quiet>
      <Scene {...props} />
    </Quiet>
  );
}

function Scene({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const accent = useAccent();
  const still = reducedMotion();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={box} className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }} frameloop={visible ? "always" : "never"}>
        <Network accent={accent} still={still} />
      </Canvas>
    </div>
  );
}
