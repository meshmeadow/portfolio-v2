import { useEffect, useRef } from 'react';

interface DotFieldProps {
  dotColor?: string;
  dotRadius?: number;
  dotSpacing?: number;
  glowColor?: string;
  glowRadius?: number;
}

export default function DotField({
  dotColor = '#7dd3e8',
  dotRadius = 2,
  dotSpacing = 20,
  glowColor = '#5cc4db',
  glowRadius = 120,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = { x: -1000, y: -1000 };
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let radius = dotRadius;
          let alpha = 0.4;

          if (dist < glowRadius) {
            const factor = 1 - dist / glowRadius;
            radius = dotRadius + factor * 0.75;
            alpha = 0.4 + factor * 0.6;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (dist < glowRadius) {
            ctx.fillStyle = glowColor;
            ctx.globalAlpha = alpha;
          } else {
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = alpha;
          }

          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [dotColor, dotRadius, dotSpacing, glowColor, glowRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
