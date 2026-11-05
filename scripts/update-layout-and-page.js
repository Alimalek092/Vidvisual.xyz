const fs = require('fs');
const path = require('path');

const root = 'C:/Users/admin/.gemini/antigravity/scratch/Vidvisual.xyz';

// 1. Update layout.js to include premium-ui.css
const layoutPath = path.join(root, 'app/layout.js');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');

if (!layoutContent.includes('premium-ui.css')) {
  layoutContent = layoutContent.replace(
    "import './motion-enhancements.css';",
    "import './motion-enhancements.css';\nimport './premium-ui.css';"
  );
  fs.writeFileSync(layoutPath, layoutContent, 'utf8');
  console.log('[1/2] Successfully updated layout.js with premium-ui.css');
} else {
  console.log('[1/2] layout.js already imports premium-ui.css');
}

// 2. Update page.js with Icons and enhanced card structures
const pagePath = path.join(root, 'app/page.js');
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Add Icons import
if (!pageContent.includes("from '@/components/Icons'")) {
  const iconsImport = `import { IconBolt, IconBrain, IconNotes, IconRefresh, IconMic, IconGrad, IconBriefcase, IconUsers, IconBook, IconClock, IconHandshake, IconFolder } from '@/components/Icons';\n`;
  pageContent = iconsImport + pageContent;
}

// Update VALUE_PROPS
const oldVP = `const VALUE_PROPS = [
  { emoji: '⚡', accent: 'blue', title: 'Save 90% of watch time', text: 'Skip scrubbing through a 2-4 hour video for the 3 ideas that matter. Turn hours of conversation into a scannable visual in under 20 seconds.' },
  { emoji: '🧠', accent: 'violet', title: 'Remember 65% more', text: 'Visual, spatial summaries are proven by cognitive science to be significantly easier for your brain to retain than a linear page of text.' },
  { emoji: '📝', accent: 'green', title: 'Extract main key points', text: 'Every summary distills core thesis statements, structured concept cards, and actionable takeaway bullets you can study and reference anytime.' },
  { emoji: '🔁', accent: 'amber', title: 'Build a visual knowledge base', text: 'Every visual you generate is saved to your account, so your personal library of podcasts, lectures, and tutorials keeps growing.' },
];`;

const newVP = `const VALUE_PROPS = [
  { icon: 'bolt', emoji: '⚡', accent: 'blue', title: 'Save 90% of watch time', text: 'Skip scrubbing through a 2-4 hour video for the 3 ideas that matter. Turn hours of conversation into a scannable visual in under 20 seconds.' },
  { icon: 'brain', emoji: '🧠', accent: 'violet', title: 'Remember 65% more', text: 'Visual, spatial summaries are proven by cognitive science to be significantly easier for your brain to retain than a linear page of text.' },
  { icon: 'notes', emoji: '📝', accent: 'green', title: 'Extract main key points', text: 'Every summary distills core thesis statements, structured concept cards, and actionable takeaway bullets you can study and reference anytime.' },
  { icon: 'refresh', emoji: '🔁', accent: 'amber', title: 'Build a visual knowledge base', text: 'Every visual you generate is saved to your account, so your personal library of podcasts, lectures, and tutorials keeps growing.' },
];`;

if (pageContent.includes(oldVP)) {
  pageContent = pageContent.replace(oldVP, newVP);
}

// Update AUDIENCES
const oldAud = `const AUDIENCES = [
  { emoji: '🎙️', accent: 'blue', title: 'Podcast listeners', text: 'Turn 3-4 hour podcasts (Huberman Lab, Lex Fridman, All-In, Joe Rogan) into concise whiteboard notes and mind maps in 20 seconds.' },
  { emoji: '🎓', accent: 'green', title: 'Students & academics', text: 'Convert university lecture recordings, MIT OpenCourseWare, and exam review sessions into visual study sheets you can revise from in 60 seconds.' },
  { emoji: '💼', accent: 'amber', title: 'Founders & professionals', text: 'Compress long industry keynotes, tech tutorials, and market webinars into a 1-page visual summary you can share with colleagues.' },
  { emoji: '👥', accent: 'violet', title: 'Lifelong visual learners', text: 'Build a permanent visual library of everything you have learned on YouTube, from science and coding to history and business.' },
];`;

const newAud = `const AUDIENCES = [
  { icon: 'mic', emoji: '🎙️', accent: 'blue', title: 'Podcast listeners', text: 'Turn 3-4 hour podcasts (Huberman Lab, Lex Fridman, All-In, Joe Rogan) into concise whiteboard notes and mind maps in 20 seconds.' },
  { icon: 'grad', emoji: '🎓', accent: 'green', title: 'Students & academics', text: 'Convert university lecture recordings, MIT OpenCourseWare, and exam review sessions into visual study sheets you can revise from in 60 seconds.' },
  { icon: 'briefcase', emoji: '💼', accent: 'amber', title: 'Founders & professionals', text: 'Compress long industry keynotes, tech tutorials, and market webinars into a 1-page visual summary you can share with colleagues.' },
  { icon: 'users', emoji: '👥', accent: 'violet', title: 'Lifelong visual learners', text: 'Build a permanent visual library of everything you have learned on YouTube, from science and coding to history and business.' },
];`;

if (pageContent.includes(oldAud)) {
  pageContent = pageContent.replace(oldAud, newAud);
}

// Update USES
const oldUses = `const USES = [
  { emoji: '📚', accent: 'blue', title: 'Study for exams in 60s', text: 'Turn a 90-minute lecture recording into high-yield revision notes you will actually remember on test day.' },
  { emoji: '⏱️', accent: 'green', title: 'Binge podcasts at 10x speed', text: 'Grasp the core insights of a 3-hour podcast in 2 minutes without listening at distorted 3x audio speed.' },
  { emoji: '🤝', accent: 'amber', title: 'Share visual briefings', text: 'Send your team a one-page infographic instead of asking them to sit through an hour-long recorded meeting.' },
  { emoji: '🗂️', accent: 'violet', title: 'Build your second brain', text: 'Curate a searchable visual library of every valuable idea, concept, and technique you discover on YouTube.' },
];`;

const newUses = `const USES = [
  { icon: 'book', emoji: '📚', accent: 'blue', title: 'Study for exams in 60s', text: 'Turn a 90-minute lecture recording into high-yield revision notes you will actually remember on test day.' },
  { icon: 'clock', emoji: '⏱️', accent: 'green', title: 'Binge podcasts at 10x speed', text: 'Grasp the core insights of a 3-hour podcast in 2 minutes without listening at distorted 3x audio speed.' },
  { icon: 'handshake', emoji: '🤝', accent: 'amber', title: 'Share visual briefings', text: 'Send your team a one-page infographic instead of asking them to sit through an hour-long recorded meeting.' },
  { icon: 'folder', emoji: '🗂️', accent: 'violet', title: 'Build your second brain', text: 'Curate a searchable visual library of every valuable idea, concept, and technique you discover on YouTube.' },
];`;

if (pageContent.includes(oldUses)) {
  pageContent = pageContent.replace(oldUses, newUses);
}

// Add icon renderer function before Home component
if (!pageContent.includes('function getCardIcon(')) {
  const iconHelper = `
function getCardIcon(key) {
  const map = {
    bolt: IconBolt,
    brain: IconBrain,
    notes: IconNotes,
    refresh: IconRefresh,
    mic: IconMic,
    grad: IconGrad,
    briefcase: IconBriefcase,
    users: IconUsers,
    book: IconBook,
    clock: IconClock,
    handshake: IconHandshake,
    folder: IconFolder,
  };
  const Comp = map[key];
  return Comp ? <Comp style={{ width: 24, height: 24 }} /> : null;
}
`;
  pageContent = pageContent.replace('export default function Home() {', iconHelper + '\nexport default function Home() {');
}

// Replace card rendering for VALUE_PROPS
const oldCardRender1 = `{VALUE_PROPS.map((v) => (
            <div key={v.title} className={\`info-card accent-\${v.accent}\`}>
              <span className="card-emoji">{v.emoji}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}`;

const newCardRender1 = `{VALUE_PROPS.map((v) => (
            <div key={v.title} className={\`info-card accent-\${v.accent}\`}>
              <div className="card-icon-wrap" aria-hidden="true">
                {getCardIcon(v.icon) || <span className="card-emoji">{v.emoji}</span>}
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}`;

if (pageContent.includes(oldCardRender1)) {
  pageContent = pageContent.replace(oldCardRender1, newCardRender1);
}

// Replace card rendering for AUDIENCES
const oldCardRender2 = `{AUDIENCES.map((a) => (
            <div key={a.title} className={\`info-card accent-\${a.accent}\`}>
              <span className="card-emoji">{a.emoji}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}`;

const newCardRender2 = `{AUDIENCES.map((a) => (
            <div key={a.title} className={\`info-card accent-\${a.accent}\`}>
              <div className="card-icon-wrap" aria-hidden="true">
                {getCardIcon(a.icon) || <span className="card-emoji">{a.emoji}</span>}
              </div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}`;

if (pageContent.includes(oldCardRender2)) {
  pageContent = pageContent.replace(oldCardRender2, newCardRender2);
}

// Replace card rendering for USES
const oldCardRender3 = `{USES.map((u) => (
            <div key={u.title} className={\`info-card accent-\${u.accent}\`}>
              <span className="card-emoji">{u.emoji}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}`;

const newCardRender3 = `{USES.map((u) => (
            <div key={u.title} className={\`info-card accent-\${u.accent}\`}>
              <div className="card-icon-wrap" aria-hidden="true">
                {getCardIcon(u.icon) || <span className="card-emoji">{u.emoji}</span>}
              </div>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}`;

if (pageContent.includes(oldCardRender3)) {
  pageContent = pageContent.replace(oldCardRender3, newCardRender3);
}

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('[2/2] Successfully updated page.js with SVG icons and card containers');
