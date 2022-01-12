import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as lil from 'lil-gui'
import { Vector3 } from 'three'


// Debug
const gui = new lil.GUI({ width: 500 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const gltfLoader = new GLTFLoader()

// Models
gltfLoader.load(
    '/models/3Dlogo.glb',
    (gltf) => {
        gltf.scene.scale.set(1.5, 1.5, 1.5)
        gltf.scene.rotation.y = Math.PI * 0.75
        scene.add(gltf.scene)
        console.log('success')
        console.log(gltf)
    }
)

//lights
/*const ambientLight = new THREE.AmbientLight(0xffffff, 3.08) //(kleur van light, intensity)
scene.add(ambientLight)

const hemisphereLight = new THREE.HemisphereLight(0xfff, 0xffffff, 2.3)
scene.add(hemisphereLight)

const directionalLight = new THREE.DirectionalLight(0xfff, 3)
scene.add(directionalLight)
directionalLight.position.set(1, 0.25, 0)/*/


const directionalLight = new THREE.DirectionalLight('#ffffff', 4.457)
directionalLight.position.set(5, 0.39, -1.233)
scene.add(directionalLight)


//gui debuger 
/*gui.add(ambientLight, 'intensity').min(0).max(10).step(0.001).name('A-lightIntensity')
gui.add(ambientLight.position, 'x').min(-5).max(10).step(0.001).name('A-lightX')
gui.add(ambientLight.position, 'y').min(-5).max(10).step(0.001).name('A-lightY')
gui.add(ambientLight.position, 'z').min(-5).max(10).step(0.001).name('A-lightZ')*/

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('D-lightIntensity')
gui.add(directionalLight.position, 'x').min(-5).max(10).step(0.001).name('D-lightX')
gui.add(directionalLight.position, 'y').min(-5).max(10).step(0.001).name('D-lightY')
gui.add(directionalLight.position, 'z').min(-5).max(10).step(0.001).name('D-lightZ')

/*gui.add(hemisphereLight, 'intensity').min(0).max(10).step(0.001).name('H-lightIntensity')
gui.add(hemisphereLight.position, 'x').min(-5).max(10).step(0.001).name('H-lightX')
gui.add(hemisphereLight.position, 'y').min(-5).max(10).step(0.001).name('H-lightY')
gui.add(hemisphereLight.position, 'z').min(-5).max(10).step(0.001).name('H-lightZ')*/


//resize code gehaald van https://stackoverflow.com/questions/20290402/three-js-resizing-canvas
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(4, 1, -4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true

//Animate
function animate() {

    //Update controls
    controls.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}

animate()