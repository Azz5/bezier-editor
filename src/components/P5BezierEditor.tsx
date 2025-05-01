import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

export interface ControlPoint { x: number; y: number; }
export interface CurveData { id: number; controlPoints: ControlPoint[]; }

interface Props {
  curves: CurveData[];
  onCurveUpdate: (id: number, newPoints: ControlPoint[]) => void;
}

// Helper: compute binomial coefficient C(n, k)
function binomial(n: number, k: number): number {
  let res = 1;
  for (let i = 1; i <= k; i++) {
    res *= (n - (k - i));
    res /= i;
  }
  return res;
}

const P5BezierEditor: React.FC<Props> = ({ curves, onCurveUpdate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curvesRef = useRef<CurveData[]>(curves);
  const updateRef = useRef(onCurveUpdate);
  const dragging = useRef<{ curveId: number; ptIdx: number } | null>(null);

  // Sync refs
  useEffect(() => { curvesRef.current = curves; }, [curves]);
  useEffect(() => { updateRef.current = onCurveUpdate; }, [onCurveUpdate]);

  useEffect(() => {
    // Clear any existing canvas before creating a new one
    const parent = containerRef.current!;
    parent.innerHTML = '';

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 400).parent(parent);
      };

      p.draw = () => {
        p.background(240);
        curvesRef.current.forEach(curve => {
          const pts = curve.controlPoints;
          const n = pts.length - 1;
          // draw Bezier curve
          p.stroke(0);
          p.strokeWeight(2);
          p.noFill();
          p.beginShape();
          for (let t = 0; t <= 1.001; t += 0.01) {
            let x = 0;
            let y = 0;
            for (let i = 0; i <= n; i++) {
              const b = binomial(n, i) * Math.pow(1 - t, n - i) * Math.pow(t, i);
              x += b * pts[i].x;
              y += b * pts[i].y;
            }
            p.vertex(x, y);
          }
          p.endShape();

          // draw handles between control points
          p.stroke(0, 141, 11);
          p.strokeWeight(1);
          for (let i = 0; i < pts.length - 1; i++) {
            p.line(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);
          }

          // draw control points
          pts.forEach((pt, idx) => {
            p.noStroke();
            p.fill(idx === 0 || idx === n ? 'blue' : 'orange');
            p.circle(pt.x, pt.y, 12);
          });
        });
      };

      p.mousePressed = () => {
        curvesRef.current.forEach(curve => {
          curve.controlPoints.forEach((pt, idx) => {
            if (p.dist(p.mouseX, p.mouseY, pt.x, pt.y) < 10) {
              dragging.current = { curveId: curve.id, ptIdx: idx };
            }
          });
        });
      };

      p.mouseDragged = () => {
        if (dragging.current) {
          const { curveId, ptIdx } = dragging.current;
          const target = curvesRef.current.find(c => c.id === curveId);
          if (!target) return;
          const updated = target.controlPoints.map((pt, i) =>
            i === ptIdx ? { x: p.mouseX, y: p.mouseY } : { ...pt }
          );
          updateRef.current(curveId, updated);
        }
      };

      p.mouseReleased = () => { dragging.current = null; };
    };

    const instance = new p5(sketch);
    return () => instance.remove();
  }, []);

  return <div ref={containerRef} />;
};

export default P5BezierEditor;
