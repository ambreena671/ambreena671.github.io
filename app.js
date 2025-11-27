// Simple chat widget with two modes:
// - Local: rule-based canned responses (no server required)
// - API: send user message to backend at /api/chat (you must deploy backend and set API key there)

const toggle = document.getElementById('chat-toggle');
const win = document.getElementById('chat-window');
const closeBtn = document.getElementById('chat-close');
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('chat-messages');
const modeLabel = document.getElementById('mode-label');

let MODE = 'local'; // change to 'api' to enable fetch to backend

toggle.onclick = () => { win.classList.toggle('hidden'); win.setAttribute('aria-hidden', win.classList.contains('hidden')); }
closeBtn.onclick = () => { win.classList.add('hidden'); win.setAttribute('aria-hidden', 'true'); }

function addMessage(who, text){
  const el = document.createElement('div');
  el.className = 'msg '+(who==='user'?'user':'bot');
  el.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function escapeHtml(s){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

function cannedReply(userText){
  const q = userText.toLowerCase();
  if(q.includes('projects')) return 'I built a Streamlit-based NIDS GUI, a forensic acquisition lab, and an AI NIDS prototype. Would you like links or screenshots?';
  if(q.includes('skills') || q.includes('expertise')) return 'Main skills: network security, digital forensics, Python, Scapy, Streamlit, ML for NIDS.';
  if(q.includes('contact')) return 'You can email me at you@example.com or use the contact form on this page.';
  if(q.includes('resume')) return 'Resume: I can summarize or export to PDF. Tell me which section you want (education, projects, skills).';
  return "Nice question — I'm a demo chatbot. Try: 'Tell me about your projects' or 'What skills do you have?'";
}

async function sendToApi(message){
  try{
    const resp = await fetch('/api/chat', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({message})
    });
    if(!resp.ok) throw new Error('Server error: '+resp.status);
    const data = await resp.json();
    return data.reply || 'No reply from server.';
  }catch(e){
    console.error(e);
    return 'Error contacting server. Make sure backend is deployed and set MODE="api" in app.js.';
  }
}

form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  addMessage('user', text);
  input.value='';
  addMessage('bot', '...'); // temporary
  const placeholder = messages.lastChild;
  let reply;
  if(MODE === 'local'){
    reply = cannedReply(text);
  } else {
    reply = await sendToApi(text);
  }
  placeholder.remove();
  addMessage('bot', reply);
});

// small helper: click to toggle mode (for demo)
modeLabel.parentElement.addEventListener('click', ()=>{
  MODE = MODE === 'local' ? 'api' : 'local';
  modeLabel.textContent = MODE.charAt(0).toUpperCase() + MODE.slice(1);
  alert('Mode switched to: ' + MODE + '\nIf you pick API mode, deploy the backend and configure keys.');
});
