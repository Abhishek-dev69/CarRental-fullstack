import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'

const createWheelAssembly = (THREE, rimMaterial, tireMaterial, detailMaterial) => {
  const wheelGroup = new THREE.Group()

  const tire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.54, 0.54, 0.4, 42, 1, true),
    tireMaterial
  )
  tire.rotation.z = Math.PI / 2
  tire.castShadow = true
  tire.receiveShadow = true

  const tireCaps = [-0.21, 0.21].map((offset) => {
    const cap = new THREE.Mesh(
      new THREE.CircleGeometry(0.54, 42),
      tireMaterial
    )
    cap.position.x = offset
    cap.rotation.y = offset > 0 ? Math.PI / 2 : -Math.PI / 2
    cap.castShadow = true
    cap.receiveShadow = true
    return cap
  })

  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.28, 32),
    rimMaterial
  )
  rim.rotation.z = Math.PI / 2
  rim.castShadow = true

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.11, 0.3, 24),
    detailMaterial
  )
  hub.rotation.z = Math.PI / 2

  const brake = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.18, 24),
    new THREE.MeshPhysicalMaterial({
      color: 0xff6b6b,
      metalness: 0.35,
      roughness: 0.45,
      clearcoat: 0.4,
    })
  )
  brake.rotation.z = Math.PI / 2

  const spokes = new THREE.Group()
  for (let index = 0; index < 5; index += 1) {
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.24, 0.08),
      rimMaterial
    )
    const angle = (index / 5) * Math.PI * 2
    spoke.position.set(0, Math.cos(angle) * 0.16, Math.sin(angle) * 0.16)
    spoke.rotation.x = angle
    spokes.add(spoke)
  }

  wheelGroup.add(tire, rim, hub, brake, spokes, ...tireCaps)
  return wheelGroup
}

const createCarModel = (THREE, roundedBoxFactory) => {
  const { RoundedBoxGeometry } = roundedBoxFactory
  const carGroup = new THREE.Group()

  const bodyPaint = new THREE.MeshPhysicalMaterial({
    color: 0x1667ff,
    metalness: 0.9,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.8,
  })

  const carbonMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x08111f,
    metalness: 0.72,
    roughness: 0.4,
    clearcoat: 0.45,
  })

  const chromeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xdfe8f7,
    metalness: 1,
    roughness: 0.12,
    envMapIntensity: 2,
  })

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xc9e6ff,
    metalness: 0,
    roughness: 0.06,
    transmission: 0.88,
    transparent: true,
    opacity: 0.48,
    envMapIntensity: 1.4,
  })

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x12151b,
    metalness: 0.08,
    roughness: 0.82,
  })

  const chassis = new THREE.Mesh(
    new RoundedBoxGeometry(4.8, 0.82, 2.05, 8, 0.26),
    bodyPaint
  )
  chassis.position.y = 0.72
  chassis.castShadow = true
  chassis.receiveShadow = true

  const roofShell = new THREE.Mesh(
    new RoundedBoxGeometry(2.45, 0.82, 1.7, 8, 0.28),
    bodyPaint
  )
  roofShell.position.set(-0.15, 1.55, 0)
  roofShell.scale.set(1, 0.95, 0.92)
  roofShell.castShadow = true

  const windshield = new THREE.Mesh(
    new RoundedBoxGeometry(1.15, 0.72, 1.55, 6, 0.18),
    glassMaterial
  )
  windshield.position.set(0.78, 1.44, 0)
  windshield.rotation.z = -0.38

  const rearGlass = new THREE.Mesh(
    new RoundedBoxGeometry(0.95, 0.66, 1.48, 6, 0.18),
    glassMaterial
  )
  rearGlass.position.set(-1.18, 1.43, 0)
  rearGlass.rotation.z = 0.31

  const sideWindowLeft = new THREE.Mesh(
    new RoundedBoxGeometry(1.48, 0.46, 0.05, 4, 0.09),
    glassMaterial
  )
  sideWindowLeft.position.set(-0.08, 1.47, 0.8)
  sideWindowLeft.rotation.y = 0.08

  const sideWindowRight = sideWindowLeft.clone()
  sideWindowRight.position.z = -0.8
  sideWindowRight.rotation.y = -0.08

  const hood = new THREE.Mesh(
    new RoundedBoxGeometry(1.55, 0.26, 1.78, 6, 0.16),
    bodyPaint
  )
  hood.position.set(1.42, 1.02, 0)
  hood.rotation.z = -0.13
  hood.castShadow = true

  const rearDeck = new THREE.Mesh(
    new RoundedBoxGeometry(1.2, 0.24, 1.74, 6, 0.16),
    bodyPaint
  )
  rearDeck.position.set(-1.62, 1.04, 0)
  rearDeck.rotation.z = 0.1
  rearDeck.castShadow = true

  const splitter = new THREE.Mesh(
    new RoundedBoxGeometry(1.02, 0.12, 1.66, 4, 0.08),
    carbonMaterial
  )
  splitter.position.set(2.15, 0.43, 0)
  splitter.castShadow = true

  const rearDiffuser = new THREE.Mesh(
    new RoundedBoxGeometry(0.82, 0.12, 1.62, 4, 0.08),
    carbonMaterial
  )
  rearDiffuser.position.set(-2.18, 0.45, 0)
  rearDiffuser.castShadow = true

  const sideSkirtLeft = new THREE.Mesh(
    new RoundedBoxGeometry(2.8, 0.15, 0.16, 4, 0.06),
    carbonMaterial
  )
  sideSkirtLeft.position.set(-0.08, 0.42, 0.98)

  const sideSkirtRight = sideSkirtLeft.clone()
  sideSkirtRight.position.z = -0.98

  const frontFenderLeft = new THREE.Mesh(
    new RoundedBoxGeometry(0.92, 0.62, 0.34, 5, 0.12),
    bodyPaint
  )
  frontFenderLeft.position.set(1.32, 0.82, 1.0)
  frontFenderLeft.rotation.z = -0.08

  const frontFenderRight = frontFenderLeft.clone()
  frontFenderRight.position.z = -1.0

  const rearFenderLeft = new THREE.Mesh(
    new RoundedBoxGeometry(1.08, 0.68, 0.42, 5, 0.14),
    bodyPaint
  )
  rearFenderLeft.position.set(-1.34, 0.86, 1.0)

  const rearFenderRight = rearFenderLeft.clone()
  rearFenderRight.position.z = -1.0

  const doorLineLeft = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.018, 0.018),
    chromeMaterial
  )
  doorLineLeft.position.set(0.04, 1.08, 1.04)

  const doorLineRight = doorLineLeft.clone()
  doorLineRight.position.z = -1.04

  const accentStrip = new THREE.Mesh(
    new THREE.BoxGeometry(3.1, 0.04, 0.04),
    chromeMaterial
  )
  accentStrip.position.set(0.12, 0.78, 1.01)

  const accentStripRight = accentStrip.clone()
  accentStripRight.position.z = -1.01

  const mirrorLeft = new THREE.Group()
  const mirrorStemLeft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.04, 0.28, 12),
    carbonMaterial
  )
  mirrorStemLeft.rotation.z = -0.7
  const mirrorShellLeft = new THREE.Mesh(
    new RoundedBoxGeometry(0.24, 0.14, 0.18, 4, 0.06),
    bodyPaint
  )
  mirrorShellLeft.position.set(0.1, 0.02, 0)
  mirrorLeft.position.set(0.78, 1.28, 1.12)
  mirrorLeft.add(mirrorStemLeft, mirrorShellLeft)

  const mirrorRight = mirrorLeft.clone()
  mirrorRight.position.z = -1.12

  const headLightMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xdaf2ff,
    emissive: 0x74d2ff,
    emissiveIntensity: 2.6,
    metalness: 0.2,
    roughness: 0.08,
    transmission: 0.3,
  })

  const tailLightMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffc0c0,
    emissive: 0xff4f6d,
    emissiveIntensity: 2.2,
    metalness: 0.16,
    roughness: 0.12,
  })

  const headlightLeft = new THREE.Mesh(
    new RoundedBoxGeometry(0.2, 0.16, 0.62, 4, 0.05),
    headLightMaterial
  )
  headlightLeft.position.set(2.34, 0.88, 0.55)
  headlightLeft.rotation.y = Math.PI / 2

  const headlightRight = headlightLeft.clone()
  headlightRight.position.z = -0.55

  const tailLightLeft = new THREE.Mesh(
    new RoundedBoxGeometry(0.18, 0.18, 0.54, 4, 0.05),
    tailLightMaterial
  )
  tailLightLeft.position.set(-2.34, 0.84, 0.56)
  tailLightLeft.rotation.y = Math.PI / 2

  const tailLightRight = tailLightLeft.clone()
  tailLightRight.position.z = -0.56

  const headGlowLeft = new THREE.PointLight(0x7dd3fc, 5, 8, 2)
  headGlowLeft.position.set(2.54, 0.92, 0.55)
  const headGlowRight = headGlowLeft.clone()
  headGlowRight.position.z = -0.55

  const spoiler = new THREE.Group()
  const spoilerDeck = new THREE.Mesh(
    new RoundedBoxGeometry(1.28, 0.08, 1.18, 4, 0.05),
    carbonMaterial
  )
  spoilerDeck.position.y = 0.08
  const spoilerSupportLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.18, 0.08),
    carbonMaterial
  )
  spoilerSupportLeft.position.set(0.28, -0.04, 0.38)
  const spoilerSupportRight = spoilerSupportLeft.clone()
  spoilerSupportRight.position.z = -0.38
  spoiler.position.set(-1.95, 1.3, 0)
  spoiler.add(spoilerDeck, spoilerSupportLeft, spoilerSupportRight)

  const wheelPositions = [
    [1.46, 0.42, 1.02],
    [1.46, 0.42, -1.02],
    [-1.34, 0.42, 1.02],
    [-1.34, 0.42, -1.02],
  ]

  wheelPositions.forEach(([x, y, z], index) => {
    const wheel = createWheelAssembly(THREE, chromeMaterial, tireMaterial, carbonMaterial)
    wheel.position.set(x, y, z)
    if (index % 2 === 1) {
      wheel.rotation.x = Math.PI
    }
    carGroup.add(wheel)
  })

  const carShadowCatch = new THREE.Mesh(
    new THREE.PlaneGeometry(5.4, 2.8),
    new THREE.ShadowMaterial({ color: 0x0f172a, opacity: 0.22 })
  )
  carShadowCatch.rotation.x = -Math.PI / 2
  carShadowCatch.position.y = 0.02
  carShadowCatch.receiveShadow = true

  carGroup.add(
    chassis,
    roofShell,
    windshield,
    rearGlass,
    sideWindowLeft,
    sideWindowRight,
    hood,
    rearDeck,
    splitter,
    rearDiffuser,
    sideSkirtLeft,
    sideSkirtRight,
    frontFenderLeft,
    frontFenderRight,
    rearFenderLeft,
    rearFenderRight,
    doorLineLeft,
    doorLineRight,
    accentStrip,
    accentStripRight,
    mirrorLeft,
    mirrorRight,
    headlightLeft,
    headlightRight,
    tailLightLeft,
    tailLightRight,
    spoiler,
    carShadowCatch,
    headGlowLeft,
    headGlowRight
  )

  carGroup.position.y = -0.22
  carGroup.rotation.x = 0.05

  return carGroup
}

const ThreeHero = () => {
  const mountRef = useRef(null)
  const frameRef = useRef(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let renderer
    let scene
    let camera
    let carGroup
    let platformRing
    let environmentGroup
    let cleanupResize = () => {}
    let cleanupPointer = () => {}
    let disposed = false
    let targetRotation = -0.55
    let currentRotation = -0.55
    let targetPitch = 0.12
    let currentPitch = 0.12

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initScene = async () => {
      try {
        const [THREE, roomEnvironmentFactory, roundedBoxFactory] = await Promise.all([
          import('three'),
          import('three/examples/jsm/environments/RoomEnvironment.js'),
          import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
        ])

        if (disposed || !mountRef.current) return

        const mount = mountRef.current
        const width = mount.clientWidth
        const height = mount.clientHeight

        scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0xe9f4ff, 10, 22)

        camera = new THREE.PerspectiveCamera(29, width / height, 0.1, 100)
        camera.position.set(0.2, 2.15, 10.6)

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
        renderer.setSize(width, height)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.18
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        mount.appendChild(renderer.domElement)

        const pmremGenerator = new THREE.PMREMGenerator(renderer)
        const roomEnvironment = new roomEnvironmentFactory.RoomEnvironment()
        const environmentMap = pmremGenerator.fromScene(roomEnvironment, 0.04).texture
        scene.environment = environmentMap

        const ambient = new THREE.HemisphereLight(0xf3f9ff, 0x1d304f, 1.4)
        const keyLight = new THREE.DirectionalLight(0xf8fcff, 3.1)
        keyLight.position.set(5.5, 8, 5)
        keyLight.castShadow = true
        keyLight.shadow.mapSize.width = 2048
        keyLight.shadow.mapSize.height = 2048
        keyLight.shadow.camera.near = 0.5
        keyLight.shadow.camera.far = 20
        keyLight.shadow.camera.left = -7
        keyLight.shadow.camera.right = 7
        keyLight.shadow.camera.top = 7
        keyLight.shadow.camera.bottom = -7

        const rimLight = new THREE.SpotLight(0x82d7ff, 85, 20, 0.55, 0.5, 1.4)
        rimLight.position.set(-6, 5.6, -5.2)
        rimLight.target.position.set(-0.4, 1, 0)

        const fillLight = new THREE.PointLight(0x4ea5ff, 12, 16, 2)
        fillLight.position.set(3.4, 2.4, -3.2)

        scene.add(ambient, keyLight, rimLight, rimLight.target, fillLight)

        const platformMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xe8f2ff,
          metalness: 0.18,
          roughness: 0.24,
          clearcoat: 0.45,
          envMapIntensity: 1.5,
        })

        const platform = new THREE.Mesh(
          new THREE.CylinderGeometry(3.45, 3.82, 0.48, 84),
          platformMaterial
        )
        platform.position.y = -0.55
        platform.receiveShadow = true

        platformRing = new THREE.Mesh(
          new THREE.TorusGeometry(3.52, 0.06, 16, 160),
          new THREE.MeshBasicMaterial({
            color: 0x7dd3fc,
            transparent: true,
            opacity: 0.42,
          })
        )
        platformRing.rotation.x = Math.PI / 2
        platformRing.position.y = -0.3

        const innerRing = new THREE.Mesh(
          new THREE.TorusGeometry(2.75, 0.035, 16, 120),
          new THREE.MeshBasicMaterial({
            color: 0x2563eb,
            transparent: true,
            opacity: 0.28,
          })
        )
        innerRing.rotation.x = Math.PI / 2
        innerRing.position.y = -0.26

        environmentGroup = new THREE.Group()

        const backdropArch = new THREE.Mesh(
          new THREE.TorusGeometry(4.6, 0.12, 18, 180, Math.PI),
          new THREE.MeshBasicMaterial({
            color: 0xb8dcff,
            transparent: true,
            opacity: 0.34,
          })
        )
        backdropArch.position.set(0, 1.95, -2.65)
        backdropArch.rotation.z = Math.PI

        const backdropArchInner = new THREE.Mesh(
          new THREE.TorusGeometry(3.9, 0.045, 16, 160, Math.PI),
          new THREE.MeshBasicMaterial({
            color: 0x4ea5ff,
            transparent: true,
            opacity: 0.28,
          })
        )
        backdropArchInner.position.set(0, 1.95, -2.55)
        backdropArchInner.rotation.z = Math.PI

        const glowPanel = new THREE.Mesh(
          new THREE.CircleGeometry(3.9, 60),
          new THREE.MeshBasicMaterial({
            color: 0xe6f2ff,
            transparent: true,
            opacity: 0.18,
          })
        )
        glowPanel.position.set(0, 1.7, -2.8)

        const sideGlowLeft = new THREE.Mesh(
          new THREE.PlaneGeometry(0.8, 4.8),
          new THREE.MeshBasicMaterial({
            color: 0x4ea5ff,
            transparent: true,
            opacity: 0.15,
          })
        )
        sideGlowLeft.position.set(-4.2, 1.1, -1.6)
        sideGlowLeft.rotation.y = 0.45

        const sideGlowRight = sideGlowLeft.clone()
        sideGlowRight.position.x = 4.2
        sideGlowRight.rotation.y = -0.45

        environmentGroup.add(backdropArch, backdropArchInner, glowPanel, sideGlowLeft, sideGlowRight)

        carGroup = createCarModel(THREE, roundedBoxFactory)

        scene.add(platform, platformRing, innerRing, environmentGroup, carGroup)
        setIsReady(true)

        const handleResize = () => {
          if (!renderer || !camera) return
          const nextWidth = mount.clientWidth
          const nextHeight = mount.clientHeight
          renderer.setSize(nextWidth, nextHeight)
          camera.aspect = nextWidth / nextHeight
          camera.updateProjectionMatrix()
        }

        const handlePointerMove = (event) => {
          const bounds = mount.getBoundingClientRect()
          const x = (event.clientX - bounds.left) / bounds.width
          const y = (event.clientY - bounds.top) / bounds.height
          targetRotation = -0.9 + x * 1.5
          targetPitch = 0.04 + (0.5 - y) * 0.18
        }

        const resetPointer = () => {
          targetRotation = -0.55
          targetPitch = 0.12
        }

        cleanupResize = () => window.removeEventListener('resize', handleResize)
        cleanupPointer = () => {
          mount.removeEventListener('pointermove', handlePointerMove)
          mount.removeEventListener('pointerleave', resetPointer)
        }

        window.addEventListener('resize', handleResize)

        if (!prefersReducedMotion) {
          mount.addEventListener('pointermove', handlePointerMove)
          mount.addEventListener('pointerleave', resetPointer)
        }

        const animate = () => {
          if (disposed || !renderer || !scene || !camera || !carGroup || !platformRing || !environmentGroup) return

          currentRotation += (targetRotation - currentRotation) * 0.04
          currentPitch += (targetPitch - currentPitch) * 0.04
          carGroup.rotation.y = currentRotation
          carGroup.rotation.x = currentPitch

          if (!prefersReducedMotion) {
            const tick = performance.now() * 0.001
            carGroup.position.y = -0.22 + Math.sin(tick * 1.4) * 0.045
            platformRing.rotation.z = tick * 0.18
            environmentGroup.rotation.y = Math.sin(tick * 0.22) * 0.12
            platformRing.material.opacity = 0.3 + Math.sin(tick * 1.8) * 0.08
          }

          renderer.render(scene, camera)
          frameRef.current = window.requestAnimationFrame(animate)
        }

        animate()
      } catch {
        setIsReady(false)
      }
    }

    initScene()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frameRef.current)
      cleanupResize()
      cleanupPointer()

      if (scene) {
        scene.traverse((child) => {
          if (child.geometry) {
            child.geometry.dispose()
          }

          if (child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach((material) => material?.dispose?.())
          }
        })
      }

      if (renderer) {
        renderer.dispose()
        if (renderer.domElement?.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div className='relative flex min-h-[380px] w-full items-center justify-center overflow-hidden rounded-[34px] border border-white/50 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(236,243,255,0.68)_46%,rgba(175,210,255,0.24)_100%)] p-4 shadow-[0_28px_70px_rgba(8,17,33,0.14)] md:min-h-[430px]'>
      <div className='pointer-events-none absolute inset-x-8 top-8 h-24 rounded-full bg-white/70 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-12 left-1/2 h-32 w-[78%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl' />
      <div ref={mountRef} className='absolute inset-0' aria-hidden='true' />
      <img
        src={assets.main_car}
        alt='Featured premium car'
        className={`relative z-10 w-full max-w-xl transition-opacity duration-500 ${isReady ? 'opacity-0' : 'opacity-100'}`}
      />
      <div className='pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/70 bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 backdrop-blur-md'>
        Studio 3D Concept View
      </div>
    </div>
  )
}

export default ThreeHero
