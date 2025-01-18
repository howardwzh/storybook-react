import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Three/太阳系模型',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const SolarSystem: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 场景设置
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 光照
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 太阳
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // 地球
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244, specular: 0xffffff, shininess: 100 });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(10, 0, 0);
    scene.add(earth);

    // 月球
    const moonGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222, specular: 0x444444, shininess: 50 });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(2, 0, 0);
    earth.add(moon);

    camera.position.z = 30;

    // 轨道控制
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // 动画
    const animate = () => {
      requestAnimationFrame(animate);

      // 地球自转
      earth.rotation.y += 0.01;

      // 地球公转
      const time = Date.now() * 0.001;
      earth.position.x = Math.cos(time * 0.5) * 10;
      earth.position.z = Math.sin(time * 0.5) * 10;

      // 月球公转
      moon.position.x = Math.cos(time * 2) * 2;
      moon.position.z = Math.sin(time * 2) * 2;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 响应窗口大小变化
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export const SolarSystemDemo: Story = {
  render: () => <SolarSystem />,
  name: '太阳系模型',
};