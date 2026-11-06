let lastTime = performance.now();

function updatePhysics(dt) {
  const subSteps = 6;
  const subDt = dt / subSteps;

  for (let step = 0; step < subSteps; step++) {
    for (let i = 0; i < balls.length; i++) {
      collideEnvironment(balls[i], subDt);
    }
    collideBalls();
  }
}
