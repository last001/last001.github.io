<template>
    <div ref="threeContainer" id="threeContainer"></div>
  </template>
   
  <script setup>
  import * as THREE from 'three';
  import { onMounted, ref } from 'vue';
   
  const threeContainer = ref(null);
  let camera, scene, renderer, mesh;
   
  onMounted(() => {
    const width = threeContainer.value.clientWidth;
    const height = threeContainer.value.clientHeight;
   
    // 初始化场景
    scene = new THREE.Scene();
   
    // 初始化相机
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
   
    // 初始化渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    threeContainer.value.appendChild(renderer.domElement);
   
    // 创建球体几何对象
    const geometry = new THREE.SphereGeometry(1, 32, 32);
   
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
   
    // 创建网格
    mesh = new THREE.Mesh(geometry, material);
   
    // 将网格添加到场景
    scene.add(mesh);
   
    // 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;
      renderer.render(scene, camera);
    }
   
    animate();
  });
  </script>
   
  <style>
  #threeContainer {
    width: 100%;
    height: 800px;
    position: relative;
  }
  </style>