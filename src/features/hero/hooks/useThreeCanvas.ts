import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useThreeCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 400);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a1a3e, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 1.2);
    mainLight.position.set(200, 300, 200);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xec4899, 0.6);
    rimLight.position.set(-200, -100, -200);
    scene.add(rimLight);

    const topLight = new THREE.PointLight(0x4f46e5, 0.8, 800);
    topLight.position.set(0, 300, 0);
    scene.add(topLight);

    // Build Shark Group
    const sharkGroup = new THREE.Group();

    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x2d2d4e,
      specular: 0x6366f1,
      shininess: 80,
      transparent: true,
      opacity: 0.9,
    });

    const bellyMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a4a6a,
      specular: 0x8b8bb5,
      shininess: 60,
      transparent: true,
      opacity: 0.9,
    });

    // Body
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 16);
    bodyGeometry.scale(3.5, 0.9, 0.85);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    sharkGroup.add(body);

    // Snout
    const snoutGeometry = new THREE.ConeGeometry(0.7, 2.5, 16);
    snoutGeometry.rotateZ(-Math.PI / 2);
    const snout = new THREE.Mesh(snoutGeometry, bodyMaterial);
    snout.position.set(3.8, -0.1, 0);
    sharkGroup.add(snout);

    // Tail
    const tailGeometry = new THREE.ConeGeometry(0.6, 3, 12);
    tailGeometry.rotateZ(Math.PI / 2);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(-4, 0, 0);
    sharkGroup.add(tail);

    // Tail Fin
    const tailFinShape = new THREE.Shape();
    tailFinShape.moveTo(0, 0);
    tailFinShape.lineTo(-1.5, 2.2);
    tailFinShape.lineTo(-0.5, 0.5);
    tailFinShape.lineTo(-1.5, -1.6);
    tailFinShape.lineTo(0, 0);

    const tailFinGeo = new THREE.ExtrudeGeometry(tailFinShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
    });
    const tailFin = new THREE.Mesh(tailFinGeo, bodyMaterial);
    tailFin.position.set(-5.2, 0, -0.06);
    sharkGroup.add(tailFin);

    // Dorsal Fin
    const dorsalShape = new THREE.Shape();
    dorsalShape.moveTo(0, 0);
    dorsalShape.lineTo(-0.3, 2.0);
    dorsalShape.lineTo(-1.8, 0.2);
    dorsalShape.lineTo(0, 0);

    const dorsalGeo = new THREE.ExtrudeGeometry(dorsalShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    });
    const dorsal = new THREE.Mesh(dorsalGeo, bodyMaterial);
    dorsal.position.set(0.5, 0.8, -0.05);
    sharkGroup.add(dorsal);

    // Pectoral Fins
    const pectoralShape = new THREE.Shape();
    pectoralShape.moveTo(0, 0);
    pectoralShape.lineTo(-1.2, -1.5);
    pectoralShape.lineTo(-2.0, -0.5);
    pectoralShape.lineTo(0, 0);

    const pectoralGeo = new THREE.ExtrudeGeometry(pectoralShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
    const pectoralLeft = new THREE.Mesh(pectoralGeo, bodyMaterial);
    pectoralLeft.position.set(1.5, -0.5, 0.7);
    pectoralLeft.rotation.x = -0.3;
    sharkGroup.add(pectoralLeft);

    const pectoralRight = new THREE.Mesh(pectoralGeo, bodyMaterial);
    pectoralRight.position.set(1.5, -0.5, -0.85);
    pectoralRight.rotation.x = 0.3;
    sharkGroup.add(pectoralRight);

    // Belly
    const bellyGeometry = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    bellyGeometry.scale(3.2, 0.7, 0.75);
    const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
    belly.position.set(0, -0.15, 0);
    sharkGroup.add(belly);

    // Eyes
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x6366f1,
      emissiveIntensity: 0.4,
      specular: 0xffffff,
      shininess: 200,
    });
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(2.8, 0.2, 0.65);
    sharkGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(2.8, 0.2, -0.65);
    sharkGroup.add(rightEye);

    // Gills
    const gillMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a35 });
    for (let i = 0; i < 3; i++) {
      const gillGeometry = new THREE.BoxGeometry(0.03, 0.4, 0.03);
      const gillLeft = new THREE.Mesh(gillGeometry, gillMaterial);
      gillLeft.position.set(2.0 - i * 0.25, -0.1, 0.78);
      gillLeft.rotation.z = 0.1;
      sharkGroup.add(gillLeft);

      const gillRight = new THREE.Mesh(gillGeometry, gillMaterial);
      gillRight.position.set(2.0 - i * 0.25, -0.1, -0.78);
      gillRight.rotation.z = 0.1;
      sharkGroup.add(gillRight);
    }

    sharkGroup.scale.set(28, 28, 28);
    sharkGroup.position.set(120, -20, -50);
    sharkGroup.rotation.y = -0.4;
    scene.add(sharkGroup);

    // Ocean Particles
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x6366f1);
    const color2 = new THREE.Color(0xec4899);
    const color3 = new THREE.Color(0x1e1b4b);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1500;

      const r = Math.random();
      const pickedColor = r < 0.3 ? color1 : r < 0.5 ? color2 : color3;
      colors[i * 3] = pickedColor.r;
      colors[i * 3 + 1] = pickedColor.g;
      colors[i * 3 + 2] = pickedColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation Loop
    let animationId = 0;
    const clock = new THREE.Clock();
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      if (sharkGroup) {
        sharkGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.04;
        sharkGroup.rotation.y = -0.4 + Math.sin(elapsed * 0.5) * 0.08;
        sharkGroup.position.x = 120 + Math.sin(elapsed * 0.3) * 60;
        sharkGroup.position.y = -20 + Math.sin(elapsed * 0.6) * 25 + Math.cos(elapsed * 0.2) * 10;
        sharkGroup.position.z = -50 + Math.cos(elapsed * 0.3) * 40;

        const tailFinMesh = sharkGroup.children[3];
        if (tailFinMesh) {
          tailFinMesh.rotation.y = Math.sin(elapsed * 3) * 0.2;
        }

        sharkGroup.rotation.x = Math.cos(elapsed * 0.6) * 0.03;
      }

      camera.position.x += (mouse.x * 30 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 20 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      if (particles) {
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0001;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return containerRef;
};
