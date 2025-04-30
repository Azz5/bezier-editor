import React, { useRef, useEffect } from 'react';
import p5 from 'p5';


export interface ControlPoint { x: number; y: number; }
export interface Segment { indices: [number, number, number, number]; }

const P5BezierEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    const controlPoints: ControlPoint[] = [
      { x: 100, y: 300 }, // start of segment 1
      { x: 200, y: 100 },
      { x: 300, y: 100 },
      { x: 400, y: 300 }, // end of segment 1 / start of segment 2
       // end of segment 1 / start of segment 2
       { x: 600, y: 100 },
      { x: 500, y: 100 },
      { x: 600, y: 100 },
      { x: 700, y: 300 }
    ];
    const segments: Segment[] = [
      { indices: [0, 1, 2, 3] },
      { indices: [4, 5, 6, 7] }
    ];

    let draggingIndex: number | null = null;

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 400).parent(containerRef.current!);
      };

      p.draw = () => {
        p.background(240);

        // Draw each Bezier segment
        p.stroke(0);
        p.strokeWeight(2);
        p.noFill();
        segments.forEach(seg => {
          p.stroke(0);

          const [i0, i1, i2, i3] = seg.indices;
          const pt0 = controlPoints[i0];
          const pt1 = controlPoints[i1];
          const pt2 = controlPoints[i2];
          const pt3 = controlPoints[i3];
          p.bezier(pt0.x, pt0.y, pt1.x, pt1.y, pt2.x, pt2.y, pt3.x, pt3.y);

          // Draw handles
          p.stroke(0,141,11);
          p.line(pt0.x, pt0.y, pt1.x, pt1.y);
          p.line(pt2.x, pt2.y, pt3.x, pt3.y);
        });

        // Draw control points
        controlPoints.forEach((pt, idx) => {
          p.noStroke();
          p.fill(idx === 0 || idx === controlPoints.length - 1 ? 'blue' : 'orange');
          p.circle(pt.x, pt.y, 12);
        });
      };

      p.mousePressed = () => {
        // Check if any control point is clicked
        controlPoints.forEach((pt, idx) => {
          const d = p.dist(p.mouseX, p.mouseY, pt.x, pt.y);
          if (d < 10) {
            draggingIndex = idx;
          }
        });
      };

      p.mouseDragged = () => {
        if (draggingIndex !== null) {
          if (p.mouseX <= p.width && p.mouseY <= p.height)
            controlPoints[draggingIndex] = { x: p.mouseX, y: p.mouseY };
        }
      };

      p.mouseReleased = () => {
        draggingIndex = null;
      };
    };

    const p5Instance = new p5(sketch);
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default P5BezierEditor;
