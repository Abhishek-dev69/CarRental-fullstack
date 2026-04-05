import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'

const ThreeHero = () => {
  const mountRef = useRef(null)
  const frameRef = useRef(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let renderer
    let scene
    let camera
    let vehicleGroup
    let halo
    let cleanupPointer = () => {}
    let cleanupResize = () => {}
    let disposed = false
    let targetRotation = -0.35
    let currentRotation = -0.35

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initScene = async () => {
      try {
        const THREE = await import('three')
        if (disposed || !mountRef.current) return

        const mount = mountRef.current
        const width = mount.clientWidth
        const height = mount.clientHeight

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100)
        camera.position.set(0, 1.1, 7.5)

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
        renderer.setSize(width, height)
        mount.appendChild(renderer.domElement)

        const ambient = new THREE.AmbientLight(0xffffff, 1.2)
        const keyLight = new THREE.DirectionalLight(0xc1d8ff, 3.2)
        keyLight.position.set(5, 8, 7)
        const fillLight = new THREE.PointLight(0x60a5fa, 2.8, 25)
        fillLight.position.set(-5, 3, 2)
        const rimLight = new THREE.PointLight(0xffffff, 1.4, 15)
        rimLight.position.set(0, 2, -6)

        scene.add(ambient, keyLight, fillLight, rimLight)

        const metallicMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x155dfc,
          metalness: 0.82,
          roughness: 0.18,
          clearcoat: 1,
          clearcoatRoughness: 0.14,
        })

        const darkMaterial = new THREE.MeshStandardMaterial({
          color: 0x081121,
          metalness: 0.6,
          roughness: 0.45,
        })

        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xdbeafe,
          transparent: true,
          opacity: 0.34,
          roughness: 0.08,
          transmission: 0.4,
        })

        vehicleGroup = new THREE.Group()

        const body = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.55, 1.8), metallicMaterial)
        body.position.y = 0.45

        const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.62, 1.48), glassMaterial)
        cabin.position.set(0.1, 0.95, 0)

        const hood = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.24, 1.32), metallicMaterial)
        hood.position.set(1.2, 0.68, 0)

        const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.24, 1.32), metallicMaterial)
        trunk.position.set(-1.2, 0.68, 0)

        const bumperFront = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.28, 1.48), darkMaterial)
        bumperFront.position.set(2, 0.36, 0)

        const bumperRear = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.28, 1.48), darkMaterial)
        bumperRear.position.set(-2, 0.36, 0)

        const wheelGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.42, 28)
        const wheelOffsets = [
          [1.24, 0.05, 0.95],
          [-1.24, 0.05, 0.95],
          [1.24, 0.05, -0.95],
          [-1.24, 0.05, -0.95],
        ]

        wheelOffsets.forEach(([x, y, z]) => {
          const wheel = new THREE.Mesh(wheelGeometry, darkMaterial)
          wheel.rotation.z = Math.PI / 2
          wheel.position.set(x, y, z)
          vehicleGroup.add(wheel)
        })

        const lightBar = new THREE.Mesh(
          new THREE.BoxGeometry(0.15, 0.12, 1.1),
          new THREE.MeshBasicMaterial({ color: 0xbfe3ff })
        )
        lightBar.position.set(1.97, 0.52, 0)

        const tailBar = new THREE.Mesh(
          new THREE.BoxGeometry(0.15, 0.12, 1.1),
          new THREE.MeshBasicMaterial({ color: 0xff7f7f })
        )
        tailBar.position.set(-1.97, 0.52, 0)

        vehicleGroup.add(body, cabin, hood, trunk, bumperFront, bumperRear, lightBar, tailBar)

        vehicleGroup.rotation.x = -0.08
        vehicleGroup.rotation.y = currentRotation
        vehicleGroup.position.y = -0.35

        halo = new THREE.Mesh(
          new THREE.TorusGeometry(3.15, 0.05, 16, 100),
          new THREE.MeshBasicMaterial({
            color: 0x7dd3fc,
            transparent: true,
            opacity: 0.4,
          })
        )
        halo.rotation.x = Math.PI / 2
        halo.position.y = -0.62

        const floor = new THREE.Mesh(
          new THREE.CircleGeometry(2.8, 48),
          new THREE.MeshBasicMaterial({
            color: 0x0f172a,
            transparent: true,
            opacity: 0.12,
          })
        )
        floor.rotation.x = -Math.PI / 2
        floor.position.y = -0.68

        scene.add(vehicleGroup, halo, floor)
        setIsReady(true)

        const handleResize = () => {
          if (!mount || !renderer || !camera) return
          const nextWidth = mount.clientWidth
          const nextHeight = mount.clientHeight
          renderer.setSize(nextWidth, nextHeight)
          camera.aspect = nextWidth / nextHeight
          camera.updateProjectionMatrix()
        }

        cleanupResize = () => window.removeEventListener('resize', handleResize)
        window.addEventListener('resize', handleResize)

        if (!prefersReducedMotion) {
          const handlePointerMove = (event) => {
            const bounds = mount.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width
            targetRotation = -0.58 + x * 1.05
          }

          cleanupPointer = () => {
            mount.removeEventListener('pointermove', handlePointerMove)
            mount.removeEventListener('pointerleave', resetRotation)
          }

          const resetRotation = () => {
            targetRotation = -0.35
          }

          mount.addEventListener('pointermove', handlePointerMove)
          mount.addEventListener('pointerleave', resetRotation)
        }

        const animate = () => {
          if (disposed || !renderer || !scene || !camera || !vehicleGroup) return

          currentRotation += (targetRotation - currentRotation) * 0.04
          vehicleGroup.rotation.y = currentRotation

          if (!prefersReducedMotion) {
            const tick = performance.now() * 0.001
            vehicleGroup.position.y = -0.35 + Math.sin(tick * 1.2) * 0.06
            halo.material.opacity = 0.28 + Math.sin(tick * 1.6) * 0.08
            halo.scale.setScalar(1 + Math.sin(tick * 1.3) * 0.015)
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
      cleanupPointer()
      cleanupResize()

      if (renderer) {
        renderer.dispose()
        if (renderer.domElement?.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div className='relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[32px] border border-white/50 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),rgba(236,243,255,0.46)_55%,rgba(189,216,255,0.18)_100%)] p-4 shadow-[0_24px_60px_rgba(8,17,33,0.12)]'>
      <div className='pointer-events-none absolute inset-x-8 top-8 h-24 rounded-full bg-white/60 blur-3xl' />
      <div ref={mountRef} className='absolute inset-0' aria-hidden='true' />
      <img
        src={assets.main_car}
        alt='Featured premium car'
        className={`relative z-10 w-full max-w-xl transition-opacity duration-500 ${isReady ? 'opacity-0' : 'opacity-100'}`}
      />
      <div className='pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 backdrop-blur-md'>
        Interactive 3D Preview
      </div>
    </div>
  )
}

export default ThreeHero
