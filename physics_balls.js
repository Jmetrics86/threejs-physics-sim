function collideBalls() {
  for (let i = 0; i < balls.length; i++) {
    const b1 = balls[i];
    for (let j = i + 1; j < balls.length; j++) {
      const b2 = balls[j];
      const dx = b2.position.x - b1.position.x;
      const dy = b2.position.y - b1.position.y;
      const dz = b2.position.z - b1.position.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      const minDist = b1.radius + b2.radius;

      if (distSq < minDist * minDist && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const nx = dx / dist;
        const ny = dy / dist;
        const nz = dz / dist;

        const overlap = minDist - dist;
        const totalMass = b1.mass + b2.mass;
        const m1Ratio = b2.mass / totalMass;
        const m2Ratio = b1.mass / totalMass;

        b1.position.x -= nx * overlap * m1Ratio;
        b1.position.y -= ny * overlap * m1Ratio;
        b1.position.z -= nz * overlap * m1Ratio;

        b2.position.x += nx * overlap * m2Ratio;
        b2.position.y += ny * overlap * m2Ratio;
        b2.position.z += nz * overlap * m2Ratio;

        const kx = b1.velocity.x - b2.velocity.x;
        const ky = b1.velocity.y - b2.velocity.y;
        const kz = b1.velocity.z - b2.velocity.z;
        const p = 2 * (nx * kx + ny * ky + nz * kz) / totalMass;

        b1.velocity.x -= p * b2.mass * nx * restitution;
        b1.velocity.y -= p * b2.mass * ny * restitution;
        b1.velocity.z -= p * b2.mass * nz * restitution;

        b2.velocity.x += p * b1.mass * nx * restitution;
        b2.velocity.y += p * b1.mass * ny * restitution;
        b2.velocity.z += p * b1.mass * nz * restitution;
      }
    }
  }
}
