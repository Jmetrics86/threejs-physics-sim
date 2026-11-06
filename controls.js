const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    window.addEventListener('pointerdown', (e) => {
      if (e.target.closest('#ui') || e.target.closest('#attribution')) return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const targetPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, targetPoint);

      if (targetPoint && targetPoint.length() < arenaSize) {
        createBall(
          targetPoint.x,
          Math.max(12, targetPoint.y + 10),
          targetPoint.z,
          (Math.random() - 0.5) * 6,
          -4,
          (Math.random() - 0.5) * 6
        );
      }
    });

    document.getElementById('spawn-btn').addEventListener('click', () => {
      createBall(
        (Math.random() - 0.5) * 8,
        15 + Math.random() * 5,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        -2,
        (Math.random() - 0.5) * 8
      );
    });

    let rainInterval = null;
    document.getElementById('rain-btn').addEventListener('click', () => {
      if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
        document.getElementById('rain-btn').textContent = 'Sphere Rain';
        return;
      }
      document.getElementById('rain-btn').textContent = 'Stop Rain';
      let spawned = 0;
      rainInterval = setInterval(() => {
        if (balls.length >= maxBalls || spawned >= 40) {
          clearInterval(rainInterval);
          rainInterval = null;
          document.getElementById('rain-btn').textContent = 'Sphere Rain';
          return;
        }
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * (arenaSize - 3);
        createBall(
          Math.cos(angle) * rad,
          20 + Math.random() * 6,
          Math.sin(angle) * rad,
          (Math.random() - 0.5) * 4,
          -6,
          (Math.random() - 0.5) * 4
        );
        spawned++;
      }, 100);
    });

    document.getElementById('burst-btn').addEventListener('click', () => {
      balls.forEach(b => {
        const dx = b.position.x;
        const dy = b.position.y - 1;
        const dz = b.position.z;
        const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy + dz * dz));
        const power = 35 / dist;
        b.velocity.x += (dx / dist) * power + (Math.random() - 0.5) * 4;
        b.velocity.y += Math.max(10, (dy / dist) * power * 0.8) + 12;
        b.velocity.z += (dz / dist) * power + (Math.random() - 0.5) * 4;
      });
    });

    document.getElementById('clear-btn').addEventListener('click', () => {
      balls.forEach(b => {
        scene.remove(b.mesh);
        b.mesh.geometry.dispose();
      });
      balls.length = 0;
      updateBallCount();
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      updatePhysics(dt);

      bumper.rotation.z += 0.01;

      controls.update();
      renderer.render(scene, camera);
    }

    animate();