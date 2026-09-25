/**
 * Illustrative design studies, not verified shipped projects.
 * @typedef {Object} Study
 * @property {string} id
 * @property {string} number
 * @property {string} name
 * @property {string} domain
 * @property {string} premise
 * @property {string[]} nodes
 * @property {string[]} stack
 * @property {string} decision
 * @property {string} constraint
 */
/** @type {Study[]} */
export const studies = [{
  id: 'neural',
  number: '01',
  name: 'Neural Core',
  domain: 'AI + AUTOMATION',
  premise: 'Turn an unstructured request into a workflow a person can trust.',
  nodes: ['Request', 'Context', 'Reasoning', 'Review', 'Action'],
  stack: ['Python', 'Typed contracts', 'Human review'],
  decision: 'Keep reasoning separate from execution. A proposed action stays a proposal until a person approves it.',
  constraint: 'A confident answer is not necessarily a correct action. Review adds friction, but makes the boundary explicit.'
}, {
  id: 'system',
  number: '02',
  name: 'System_X',
  domain: 'WEB + BACKEND',
  premise: 'Make a complex operation feel simple, without hiding its state.',
  nodes: ['Interface', 'Validation', 'API', 'Storage', 'Feedback'],
  stack: ['React', 'TypeScript', 'API design'],
  decision: 'Validate at the boundary and model every state. The interface should explain what is happening, including failure.',
  constraint: 'Optimistic interfaces feel fast, but must be able to recover. Never show success before a durable result exists.'
}, {
  id: 'void',
  number: '03',
  name: 'Void Runner',
  domain: 'GAMES + INTERACTION',
  premise: 'Build a small world whose rules feel consistent in every interaction.',
  nodes: ['Input', 'State', 'Simulation', 'World', 'Feedback'],
  stack: ['Godot', 'State machines', 'Game systems'],
  decision: 'Separate player intent from world state. Explicit transitions make mechanics easier to reason about and extend.',
  constraint: 'Responsiveness and predictable rules matter together. Feedback should reveal the state, rather than disguise it.'
}];
export const contact = {
  email: 'shojahon.toshov@gmail.com',
  github: 'https://github.com/ShojahonToshov',
  telegram: 'https://t.me/shojahon_toshov'
};
