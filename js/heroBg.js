
  /* ---------------- Hero particle network animation ---------------- */
  let canvas = document.getElementById('hero-canvas');
  if (canvas && canvas.getContext) {
    let ctx = canvas.getContext('2d');
    let particles = [];
    let w, h, dpr;
    let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let COLORS = ['rgba(0,229,255,', 'rgba(0,119,255,', 'rgba(93,48,255,'];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      let density = (w * h) / 11000;
      let count = Math.max(40, Math.min(110, Math.round(density)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.6,
          c: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);

      // move + draw particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + '0.9)';
        ctx.fill();
      }

      // connect nearby particles
      let maxDist = Math.min(150, w / 6);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let p1 = particles[a], p2 = particles[b];
          let dx = p1.x - p2.x, dy = p1.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            let alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0,229,255,' + alpha.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (!reduceMotion) requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize);
    step();
    // If reduced motion is preferred, draw a single static frame only.
  }
