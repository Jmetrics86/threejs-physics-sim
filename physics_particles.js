const balls = [];
    const maxBalls = 120;
    const gravity = -24;
    const restitution = 0.72; // Bounciness
    const damping = 0.992;   // Air resistance
    const sphereGeo = new THREE.SphereGeometry(1, 24, 24);

    const colors = [
      0x38bdf8, // Sky Blue
      0xf43f5e, // Rose / Pink
      0xa855f7, // Purple
      0x10b981, // Emerald Green
      0xfbbf24, // Amber Yellow
      0x06b6d4  // Cyan
    ];

    function createBall(x, y, z, vx = 0, vy = 0, vz = 0, radius = 0.85 + Math.random() * 0.4) {
      if (balls.length >= maxBalls) {
        const oldest = balls.shift();
        scene.remove(oldest.mesh);
        oldest.mesh.geometry.dispose();
      }

      const color = colors[Math.floor(Math.random() * colors.length)];
      const ballMat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.15,
        roughness: 0.25
      });

      const mesh = new THREE.Mesh(sphereGeo, ballMat);
      mesh.scale.setScalar(radius);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      const ball = {
        mesh: mesh,
        radius: radius,
        position: mesh.position,
        velocity: new THREE.Vector3(vx, vy, vz),
        mass: radius * radius * radius,
        color: color
      };

      balls.push(ball);
      updateBallCount();
      return ball;
    }

    function updateBallCount() {
      ballCountLabel.textContent = `Active Spheres: ${balls.length} / ${maxBalls}`;
    }

    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const dist = 6 + Math.random() * 8;
      createBall(
        Math.cos(angle) * dist,
        8 + Math.random() * 12,
        Math.sin(angle) * dist,
        (Math.random() - 0.5) * 5,
        Math.random() * 2,
        (Math.random() - 0.5) * 5
      );
    }