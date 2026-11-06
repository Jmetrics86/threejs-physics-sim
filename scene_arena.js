const arenaSize = 22;
    const arenaHeight = 12;

    const floorGeo = new THREE.CylinderGeometry(arenaSize, arenaSize, 1, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x182234,
      roughness: 0.35,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    scene.add(floor);

    const ringGeo = new THREE.RingGeometry(arenaSize - 0.3, arenaSize, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    const pillarGeo = new THREE.CylinderGeometry(3.5, 4.5, 2.5, 32);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x2e3b55,
      roughness: 0.2,
      metalness: 0.5
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.y = 1.25;
    pillar.receiveShadow = true;
    pillar.castShadow = true;
    scene.add(pillar);

    const bumperGeo = new THREE.TorusGeometry(3.6, 0.4, 16, 32);
    const bumperMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 0.4,
      roughness: 0.1
    });
    const bumper = new THREE.Mesh(bumperGeo, bumperMat);
    bumper.position.y = 2.4;
    bumper.rotation.x = Math.PI / 2;
    bumper.castShadow = true;
    scene.add(bumper);

    const obstacles = [];
    const pegGeo = new THREE.CylinderGeometry(0.5, 0.5, 4, 16);
    const pegMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.3, metalness: 0.4 });

    const pegPositions = [
      [-7, 2, -7], [7, 2, -7], [-7, 2, 7], [7, 2, 7],
      [-11, 2, 0], [11, 2, 0], [0, 2, -11], [0, 2, 11]
    ];

    pegPositions.forEach(pos => {
      const peg = new THREE.Mesh(pegGeo, pegMat);
      peg.position.set(pos[0], pos[1], pos[2]);
      peg.castShadow = true;
      peg.receiveShadow = true;
      scene.add(peg);
      obstacles.push({
        type: 'cylinder',
        mesh: peg,
        radius: 0.5,
        height: 4,
        x: pos[0],
        z: pos[2],
        yBottom: 0,
        yTop: 4
      });
    });