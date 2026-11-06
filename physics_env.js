function collideEnvironment(b, subDt) {
  b.velocity.y += gravity * subDt;
  b.velocity.x *= Math.pow(damping, subDt * 60);
  b.velocity.z *= Math.pow(damping, subDt * 60);

  b.position.x += b.velocity.x * subDt;
  b.position.y += b.velocity.y * subDt;
  b.position.z += b.velocity.z * subDt;

  if (b.position.y - b.radius < 0) {
    b.position.y = b.radius;
    if (b.velocity.y < 0) {
      b.velocity.y = -b.velocity.y * restitution;
      b.velocity.x *= 0.95;
      b.velocity.z *= 0.95;
    }
  }

  const distFromCenter = Math.sqrt(b.position.x * b.position.x + b.position.z * b.position.z);
  if (distFromCenter + b.radius > arenaSize) {
    const normalX = b.position.x / distFromCenter;
    const normalZ = b.position.z / distFromCenter;
    const overlap = (distFromCenter + b.radius) - arenaSize;
    b.position.x -= normalX * overlap;
    b.position.z -= normalZ * overlap;
    const dot = b.velocity.x * normalX + b.velocity.z * normalZ;
    if (dot > 0) {
      b.velocity.x -= (1 + restitution) * dot * normalX;
      b.velocity.z -= (1 + restitution) * dot * normalZ;
    }
  }

  if (distFromCenter < 3.5 + b.radius && b.position.y < 2.5 + b.radius) {
    if (b.position.y >= 2.5) {
      b.position.y = 2.5 + b.radius;
      if (b.velocity.y < 0) b.velocity.y = -b.velocity.y * (restitution + 0.15);
    } else {
      const nx = b.position.x / (distFromCenter || 1);
      const nz = b.position.z / (distFromCenter || 1);
      const push = (3.5 + b.radius) - distFromCenter;
      b.position.x += nx * push;
      b.position.z += nz * push;
      const dot = b.velocity.x * nx + b.velocity.z * nz;
      if (dot < 0) {
        b.velocity.x -= (1 + restitution * 1.3) * dot * nx;
        b.velocity.z -= (1 + restitution * 1.3) * dot * nz;
      }
    }
  }

  for (let k = 0; k < obstacles.length; k++) {
    const obs = obstacles[k];
    const dx = b.position.x - obs.x;
    const dz = b.position.z - obs.z;
    const pegDist = Math.sqrt(dx * dx + dz * dz);
    const minPegDist = obs.radius + b.radius;
    if (pegDist < minPegDist && b.position.y < obs.yTop + b.radius) {
      const nx = dx / pegDist;
      const nz = dz / pegDist;
      const overlap = minPegDist - pegDist;
      b.position.x += nx * overlap;
      b.position.z += nz * overlap;
      const dot = b.velocity.x * nx + b.velocity.z * nz;
      if (dot < 0) {
        b.velocity.x -= (1 + restitution * 1.2) * dot * nx;
        b.velocity.z -= (1 + restitution * 1.2) * dot * nz;
      }
    }
  }
}
