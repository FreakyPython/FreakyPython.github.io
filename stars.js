// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a nebula-like background using a texture
const textureLoader = new THREE.TextureLoader();
textureLoader.load('https://cdn.pixabay.com/photo/2013/07/12/19/10/space-154218_960_720.png', (texture) => {
    scene.background = texture;
});

// Starfield parameters
const starCount = 1500; // Increased star count for depth
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];

for (let i = 0; i < starCount; i++) {
    let x = (Math.random() - 0.5) * 3000;
    let y = (Math.random() - 0.5) * 3000;
    let z = (Math.random() - 0.5) * 3000;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 1000;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animate the scene
function animate() {
    requestAnimationFrame(animate);

    // Star rotation for motion effect
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;

    // Camera movement based on mouse interaction
    camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
