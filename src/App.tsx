import React, { useState } from 'react';
import './styles/App.css';
import P5BezierEditor, { ControlPoint, CurveData } from './components/P5BezierEditor';

const App: React.FC = () => {
  const [curves, setCurves] = useState<CurveData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CurveData|null>(null);
  const [formPoints, setFormPoints] = useState<ControlPoint[]>([]);

  const openNew = () => {
    setEditing(null);
    setFormPoints([
      {x:100,y:300},{x:200,y:100},{x:300,y:100},{x:400,y:300}
    ]);
    setShowModal(true);
  };
  const openEdit = (curve:CurveData) => {
    setEditing(curve);
    setFormPoints(curve.controlPoints.map(pt=>({...pt})));
    setShowModal(true);
  };
  const deleteCurve = (id:number) => setCurves(c=>c.filter(x=>x.id!==id));
  const saveCurve=()=>{
    if(formPoints.length<2) return;
    if(editing) {
      setCurves(c=>c.map(x=>x.id===editing.id?{...x,controlPoints:formPoints}:x));
    } else {
      setCurves(c=>[...c,{id:Date.now(),controlPoints:formPoints}]);
    }
    setShowModal(false);
  };
  const updateCurvePoints=(id:number,newPts:ControlPoint[])=>{
    setCurves(c=>c.map(x=>x.id===id?{...x,controlPoints:newPts}:x));
  };

  return (
    <div id="root" className="app">
      <h1>n-Degree Bézier Curve Editor</h1>
      <button onClick={openNew}>Add Curve</button>
      <P5BezierEditor curves={curves} onCurveUpdate={updateCurvePoints}/>
      <div className="curveHolder">
        {curves.map(curve=>(
          <div key={curve.id} className="curveItem">
            <span>Curve {curve.id}</span>
            <button onClick={()=>openEdit(curve)}>Edit</button>
            <button onClick={()=>deleteCurve(curve.id)}>Delete</button>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>{editing?'Edit Curve':'New Curve'}</h2>
            {formPoints.map((pt,idx)=>(
              <div key={idx} className="pointField">
                <label>P{idx} X:</label>
                <input type="number" value={pt.x} onChange={e=>{
                  const v=parseFloat(e.target.value);
                  setFormPoints(fp=>fp.map((p,i)=>(i===idx?{...p,x:v}:p)));
                }}/>
                <label>Y:</label>
                <input type="number" value={pt.y} onChange={e=>{
                  const v=parseFloat(e.target.value);
                  setFormPoints(fp=>fp.map((p,i)=>(i===idx?{...p,y:v}:p)));
                }}/>
              </div>
            ))}
            <div className="modalActions">
              <button onClick={()=>setFormPoints(fp=>[...fp,{x:0,y:0}])}>Add Point</button>
              <button onClick={()=>setFormPoints(fp=>fp.length>2?fp.slice(0,-1):fp)}>Remove Point</button>
            </div>
            <div className="modalActions">
              <button onClick={saveCurve}>Save</button>
              <button onClick={()=>setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
