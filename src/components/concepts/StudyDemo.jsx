import { useState } from 'react';
export default function StudyDemo({
  study
}) {
  const [stage, setStage] = useState(0);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('Waiting for input.');
  if (study.id === 'neural') return <div className="study-demo">
<p className="eyebrow">LOCAL WORKFLOW SIMULATION</p>
<p>Request: “Prepare a project brief.”</p>
<ol className="demo-steps">
<li>Request received</li>
<li>
{stage > 0 ? 'Draft prepared · awaiting review' : 'Draft not prepared'}
</li>
<li>
{stage === 2 ? 'Approved · added to this demo’s queue' : 'Execution paused'}
</li>
</ol>
<button className="action-button" disabled={stage === 2} onClick={() => setStage(stage + 1)}>
{stage === 0 ? 'Prepare draft ↗' : stage === 1 ? 'Approve action ↗' : 'Action approved ✓'}
</button>
<button className="text-button" onClick={() => setStage(0)}>Reset</button>
<p role="status" className="demo-status">
{stage === 2 ? 'Local simulation complete. Nothing was sent.' : stage === 1 ? 'Review required. Execution is blocked.' : 'No model or external service is called.'}
</p>
</div>;
  if (study.id === 'system') return <form className="study-demo" onSubmit={event => {
    event.preventDefault();
    setMessage(value.trim().length < 3 ? 'Use at least 3 characters. Nothing was saved.' : `“${value.trim()}” accepted in local demo state. No server request was made.`);
  }}>
<p className="eyebrow">BOUNDARY VALIDATION DEMO</p>
<label htmlFor="demo-name">Name your workspace</label>
<input id="demo-name" value={value} onChange={event => setValue(event.target.value)} placeholder="e.g. Research lab" maxLength={60} aria-describedby="validation-message" />
<button className="action-button" type="submit">Validate request ↗</button>
<p id="validation-message" role="status" className="demo-status">
{message}
</p>
</form>;
  return <div className="study-demo">
<p className="eyebrow">STATE MACHINE / LOCAL DEMO</p>
<div className={`runner-track stage-${stage}`} aria-hidden="true">
<span className="runner-token" />
<span className="runner-goal">⚑</span>
</div>
<p role="status">State: <strong>
{['Idle', 'Moving', 'Arrived'][stage]}
</strong></p>
<button className="action-button" disabled={stage === 2} onClick={() => setStage(stage + 1)}>
{stage === 2 ? 'Destination reached ✓' : stage === 0 ? 'Start movement →' : 'Reach destination →'}
</button>
<button className="text-button" onClick={() => setStage(0)}>Reset world</button>
<p className="demo-status">A browser state model, not a playable Godot build.</p>
</div>;
}
