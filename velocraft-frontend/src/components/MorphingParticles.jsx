import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, useEffect } from "react"
import * as THREE from "three"
import circleTexture from "./circle.png"

function MorphingShape({ currentShape }) {
  const ref = useRef()
  const { camera, raycaster, pointer } = useThree()

  const COUNT = 1000

  // Generate all three shape positions
  const shapes = useMemo(() => {
    // Shape 1: Neural Network Brain
    const brainPositions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / COUNT)
      const theta = Math.sqrt(COUNT * Math.PI) * phi
      
      // Brain-like distortion
      const r = 2 + Math.sin(phi * 3) * 0.3 + Math.cos(theta * 2) * 0.2
      
      brainPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      brainPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8
      brainPositions[i * 3 + 2] = r * Math.cos(phi)
    }

    // Shape 2: Network Graph (nodes in 3D grid)
    const networkPositions = new Float32Array(COUNT * 3)
    const gridSize = 10
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * gridSize
      const y = (Math.random() - 0.5) * gridSize
      const z = (Math.random() - 0.5) * gridSize
      
      // Cluster some nodes
      const cluster = Math.floor(Math.random() * 5)
      const clusterOffset = [
        Math.cos(cluster) * 2,
        Math.sin(cluster) * 2,
        Math.cos(cluster * 2) * 2
      ]
      
      networkPositions[i * 3] = x * 0.4 + clusterOffset[0]
      networkPositions[i * 3 + 1] = y * 0.4 + clusterOffset[1]
      networkPositions[i * 3 + 2] = z * 0.4 + clusterOffset[2]
    }

    // Shape 3: Geometric AI Core (icosahedron + layers)
    const geometricPositions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const layer = Math.floor(i / (COUNT / 5))
      const radius = 1.5 + layer * 0.3
      
      // Create geometric patterns
      const phi = Math.acos(-1 + (2 * (i % (COUNT / 5))) / (COUNT / 5))
      const theta = Math.sqrt((COUNT / 5) * Math.PI) * phi + layer * 0.5
      
      geometricPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      geometricPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      geometricPositions[i * 3 + 2] = radius * Math.cos(phi)
    }

    return {
      brain: brainPositions,
      network: networkPositions,
      geometric: geometricPositions
    }
  }, [])

  const { positions, targetPositions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const targetPositions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    // Start with brain shape
    positions.set(shapes.brain)
    targetPositions.set(shapes.brain)

    for (let i = 0; i < COUNT; i++) {
      const color = new THREE.Color()
      const t = i / COUNT
      
      // Velocraft gold to cyan gradient
      if (t < 0.5) {
        color.setHSL(THREE.MathUtils.lerp(0.12, 0.5, t * 2), 0.95, 0.65)
      } else {
        color.setHSL(THREE.MathUtils.lerp(0.5, 0.52, (t - 0.5) * 2), 0.85, 0.6)
      }

      colors.set([color.r, color.g, color.b], i * 3)
    }

    return { positions, targetPositions, colors }
  }, [shapes])

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    return loader.load(circleTexture)
  }, [])

  // Update target positions when shape changes
  useEffect(() => {
    const shapeMap = {
      0: shapes.brain,
      1: shapes.network,
      2: shapes.geometric
    }
    
    const newTarget = shapeMap[currentShape]
    if (newTarget) {
      targetPositions.set(newTarget)
    }
  }, [currentShape, shapes, targetPositions])

  useFrame(() => {
    if (!ref.current) return

    ref.current.rotation.y += 0.002

    const posAttr = ref.current.geometry.attributes.position
    const colAttr = ref.current.geometry.attributes.color

    // Smooth morphing to target positions
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = THREE.MathUtils.lerp(
        positions[i * 3],
        targetPositions[i * 3],
        0.05
      )
      positions[i * 3 + 1] = THREE.MathUtils.lerp(
        positions[i * 3 + 1],
        targetPositions[i * 3 + 1],
        0.05
      )
      positions[i * 3 + 2] = THREE.MathUtils.lerp(
        positions[i * 3 + 2],
        targetPositions[i * 3 + 2],
        0.05
      )
    }

    // Hover effect
    raycaster.params.Points.threshold = 0.2
    raycaster.setFromCamera(pointer, camera)

    const intersects = raycaster.intersectObject(ref.current)

    if (intersects.length) {
      const index = intersects[0].index

      for (let i = 0; i < COUNT; i++) {
        const dx = positions[i * 3] - positions[index * 3]
        const dy = positions[i * 3 + 1] - positions[index * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[index * 3 + 2]

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < 0.5) {
          const force = (0.5 - dist) * 0.3
          positions[i * 3] += dx * force
          positions[i * 3 + 1] += dy * force
          positions[i * 3 + 2] += dz * force

          colors[i * 3] = THREE.MathUtils.lerp(colors[i * 3], 1, 0.15)
          colors[i * 3 + 1] = THREE.MathUtils.lerp(colors[i * 3 + 1], 0.2, 0.15)
          colors[i * 3 + 2] = THREE.MathUtils.lerp(colors[i * 3 + 2], 0.9, 0.15)
        }
      }
    }

    // Return colors to original
    for (let i = 0; i < COUNT; i++) {
      const origColor = new THREE.Color()
      const t = i / COUNT
      
      if (t < 0.5) {
        origColor.setHSL(THREE.MathUtils.lerp(0.12, 0.5, t * 2), 0.95, 0.65)
      } else {
        origColor.setHSL(THREE.MathUtils.lerp(0.5, 0.52, (t - 0.5) * 2), 0.85, 0.6)
      }

      colors[i * 3] = THREE.MathUtils.lerp(colors[i * 3], origColor.r, 0.05)
      colors[i * 3 + 1] = THREE.MathUtils.lerp(colors[i * 3 + 1], origColor.g, 0.05)
      colors[i * 3 + 2] = THREE.MathUtils.lerp(colors[i * 3 + 2], origColor.b, 0.05)
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        map={texture}
        alphaTest={0.5}
        vertexColors
        size={0.08}
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}

export default function MorphingParticles({ currentShape }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <MorphingShape currentShape={currentShape} />
      </Canvas>
    </div>
  )
}
