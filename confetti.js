
let canvas = document.getElementById('confetti-canvas');
let ctx = canvas.getContext('2d');
let confetti = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 20 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0
    });
  }
  requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
    ctx.stroke();
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confetti.forEach(c => {
    c.y += Math.cos(c.d / 10) + 2;
    c.x += Math.sin(c.d / 10);
    c.tiltAngle += 0.1;
    c.tilt = Math.sin(c.tiltAngle) * 15;
  });
}

function stopConfetti() {
  confetti = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
