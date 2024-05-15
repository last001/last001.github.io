<template>
    <div ref="webgl" id="webgl"></div>
</template>

<script lang="ts" setup>
import { nextTick ,ref,Ref} from 'vue';
import * as THREE from 'three';
// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

console.log("THREE ==>", THREE);
const webgl = ref();

const scene = new THREE.Scene();
//创建一个长方体几何对象Geometry
const geometry = new THREE.SphereGeometry(100, 100, 100);
//创建一个材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: "#24acf2",//0xff0000设置材质颜色为红色
    transparent: true,//开启透明
    opacity: .9,//设置透明度
});

// 两个参数分别为几何体geometry、材质material
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(0, 0, 0);
scene.add(mesh);

// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera();
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(200, 200, 200);
//相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0, 0, 0); //坐标原点

// AxesHelper：辅助观察的坐标系
// const axesHelper = new THREE.AxesHelper(150);
// scene.add(axesHelper);

//点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.intensity = 1.25;//光照强度
pointLight.decay = 1.0;//设置光源不随距离衰减
// //点光源位置
pointLight.position.set(1500, 3800, 850);//点光源放在x轴上
scene.add(pointLight); //点光源添加到场景中

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
// 定义threejs输出画布的尺寸(单位:像素px)
const width = 800; //宽度
const height = 800; //高度
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)

function animate() {
    renderer.render(scene, camera);
    webgl.value.appendChild(renderer.domElement);
}
nextTick(() => {
    animate();
})



</script>

<style lang="scss"></style>