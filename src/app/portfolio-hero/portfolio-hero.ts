import {
  Component, ElementRef, AfterViewInit, OnDestroy,
  NgZone, Inject, PLATFORM_ID, ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-portfolio-hero',
  imports: [],
  templateUrl: './portfolio-hero.html',
  styleUrl: './portfolio-hero.scss',
})
export class PortfolioHero implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId = 0;
  private isBrowser: boolean;
  private clock = new THREE.Clock();
  private sharkGroup!: THREE.Group;
  private particles!: THREE.Points;
  private mouse = { x: 0, y: 0 };
  private targetMouse = { x: 0, y: 0 };
  private boundMouseMove: (e: MouseEvent) => void;
  private boundResize: () => void;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.boundMouseMove = this.onMouseMove.bind(this);
    this.boundResize = this.onWindowResize.bind(this);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.initScene();
    this.createShark();
    this.createOceanParticles();
    this.animate();
    window.addEventListener('resize', this.boundResize);
    document.addEventListener('mousemove', this.boundMouseMove);
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;
    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('mousemove', this.boundMouseMove);
    cancelAnimationFrame(this.animationId);
    if (this.renderer) {
      this.renderer.dispose();
      this.scene.clear();
    }
  }

  private initScene() {
    const container = this.canvasContainer.nativeElement;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050510, 0.0015);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 0, 400);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8;
    container.appendChild(this.renderer.domElement);

    // Lighting — deep ocean mood
    const ambientLight = new THREE.AmbientLight(0x1a1a3e, 0.6);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 1.2);
    mainLight.position.set(200, 300, 200);
    this.scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xec4899, 0.6);
    rimLight.position.set(-200, -100, -200);
    this.scene.add(rimLight);

    const topLight = new THREE.PointLight(0x4f46e5, 0.8, 800);
    topLight.position.set(0, 300, 0);
    this.scene.add(topLight);
  }

  private createShark() {
    this.sharkGroup = new THREE.Group();

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

    // ---- BODY (elongated ellipsoid) ----
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 16);
    bodyGeometry.scale(3.5, 0.9, 0.85);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.sharkGroup.add(body);

    // ---- SNOUT (front cone) ----
    const snoutGeometry = new THREE.ConeGeometry(0.7, 2.5, 16);
    snoutGeometry.rotateZ(-Math.PI / 2);
    const snout = new THREE.Mesh(snoutGeometry, bodyMaterial);
    snout.position.set(3.8, -0.1, 0);
    this.sharkGroup.add(snout);

    // ---- TAIL (tapered cone) ----
    const tailGeometry = new THREE.ConeGeometry(0.6, 3, 12);
    tailGeometry.rotateZ(Math.PI / 2);
    const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
    tail.position.set(-4, 0, 0);
    this.sharkGroup.add(tail);

    // ---- TAIL FIN (V-shape) ----
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
    this.sharkGroup.add(tailFin);

    // ---- DORSAL FIN ----
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
    this.sharkGroup.add(dorsal);

    // ---- PECTORAL FINS (left & right) ----
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
    this.sharkGroup.add(pectoralLeft);

    const pectoralRight = new THREE.Mesh(pectoralGeo, bodyMaterial);
    pectoralRight.position.set(1.5, -0.5, -0.85);
    pectoralRight.rotation.x = 0.3;
    this.sharkGroup.add(pectoralRight);

    // ---- BELLY (lighter underside) ----
    const bellyGeometry = new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    bellyGeometry.scale(3.2, 0.7, 0.75);
    const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
    belly.position.set(0, -0.15, 0);
    this.sharkGroup.add(belly);

    // ---- EYES ----
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
    this.sharkGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(2.8, 0.2, -0.65);
    this.sharkGroup.add(rightEye);

    // ---- GILL LINES (subtle details) ----
    const gillMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a35 });
    for (let i = 0; i < 3; i++) {
      const gillGeometry = new THREE.BoxGeometry(0.03, 0.4, 0.03);
      const gillLeft = new THREE.Mesh(gillGeometry, gillMaterial);
      gillLeft.position.set(2.0 - i * 0.25, -0.1, 0.78);
      gillLeft.rotation.z = 0.1;
      this.sharkGroup.add(gillLeft);

      const gillRight = new THREE.Mesh(gillGeometry, gillMaterial);
      gillRight.position.set(2.0 - i * 0.25, -0.1, -0.78);
      gillRight.rotation.z = 0.1;
      this.sharkGroup.add(gillRight);
    }

    // Scale and position the shark
    this.sharkGroup.scale.set(28, 28, 28);
    this.sharkGroup.position.set(120, -20, -50);
    this.sharkGroup.rotation.y = -0.4;
    this.scene.add(this.sharkGroup);
  }

  private createOceanParticles() {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

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

      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private onMouseMove(event: MouseEvent) {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate() {
    this.ngZone.runOutsideAngular(() => {
      const renderLoop = () => {
        this.animationId = requestAnimationFrame(renderLoop);
        const elapsed = this.clock.getElapsedTime();

        // Smooth mouse follow
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // ---- Shark swimming animation ----
        if (this.sharkGroup) {
          // Gentle body wave (sinusoidal undulation)
          this.sharkGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.04;
          this.sharkGroup.rotation.y = -0.4 + Math.sin(elapsed * 0.5) * 0.08;

          // Swimming path: slow figure-8 pattern
          this.sharkGroup.position.x = 120 + Math.sin(elapsed * 0.3) * 60;
          this.sharkGroup.position.y = -20 + Math.sin(elapsed * 0.6) * 25 + Math.cos(elapsed * 0.2) * 10;
          this.sharkGroup.position.z = -50 + Math.cos(elapsed * 0.3) * 40;

          // Tail wag: animate the last children (tail fin)
          const tailFin = this.sharkGroup.children[3]; // tail fin
          if (tailFin) {
            tailFin.rotation.y = Math.sin(elapsed * 3) * 0.2;
          }

          // Subtle pitch based on vertical movement
          this.sharkGroup.rotation.x = Math.cos(elapsed * 0.6) * 0.03;
        }

        // ---- Camera subtle follow mouse ----
        this.camera.position.x += (this.mouse.x * 30 - this.camera.position.x) * 0.02;
        this.camera.position.y += (this.mouse.y * 20 - this.camera.position.y) * 0.02;
        this.camera.lookAt(0, 0, 0);

        // ---- Particles drift ----
        if (this.particles) {
          this.particles.rotation.y += 0.0003;
          this.particles.rotation.x += 0.0001;
        }

        this.renderer.render(this.scene, this.camera);
      };
      renderLoop();
    });
  }
}
