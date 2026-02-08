let scene, camera, renderer, hearts = [];

function initThreeScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 8;

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("threeCanvas"),
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.add(new THREE.AmbientLight(0xffc0cb, 1));

  const geo = new THREE.SphereGeometry(0.25, 32, 32);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff4d6d });

  for (let i = 0; i < 40; i++) {
    const heart = new THREE.Mesh(geo, mat);
    heart.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    hearts.push(heart);
    scene.add(heart);
  }

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  hearts.forEach(h => h.position.y += 0.01);
  renderer.render(scene, camera);
}

function celebrateHearts() {
  hearts.forEach(h => {
    gsap.to(h.position, {
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      duration: 2
    });
  });
}

function heartFirework() {
  for (let i = 0; i < 40; i++) {
    const geo = new THREE.SphereGeometry(0.12, 16, 16);
    const mat = new THREE.MeshStandardMaterial({ color: 0xff4d6d });
    const p = new THREE.Mesh(geo, mat);
    scene.add(p);

    gsap.to(p.position, {
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
      duration: 1.5,
      onComplete: () => scene.remove(p)
    });
  }
}

/* BEAT SYNC HEART PULSE */
setInterval(() => {
  hearts.forEach(h => {
    gsap.to(h.scale, {
      x: 1.4,
      y: 1.4,
      z: 1.4,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  });
}, 600);
