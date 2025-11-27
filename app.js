const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// Show/hide chat window
chatToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
});
chatClose.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});

// Chatbot responses
const responses = {
  summary: "A motivated and detail-oriented Cybersecurity and Digital Forensics undergraduate with practical experience in vulnerability assessment, threat detection, cybercrime investigation, network monitoring, and digital forensics...",
  contact: "Location: Bahawalpur, Pakistan\nEmail: ambreenamunir@gmail.com\nGitHub: github.com/ambreena671",
  education: "BS Cybersecurity and Digital Forensics, The Islamia University of Bahawalpur — Expected Graduation: 07/2027",
  experience: "Advanced Cybercrime Investigation Intern (ICDF Nigeria), Cybersecurity Intern (Rhombix Technologies), Cybersecurity Intern (Shadowfox India)...",
  certifications: "Google Cybersecurity — Coursera, AI for Cybersecurity & Bug Hunting — Udemy, Introduction to Bug Bounty — Red Team Leaders, Penetration Testing — Security Blue Team, CEH — Cyberwing, Digital Forensic — Cyborts, OOSE — OPSWAT Academy",
  projects: "NIDS-GUI — Real-time intrusion detection with Scapy + ML, Multilanguage Debugger Tool — Supports Python, C/C++, Java, Packet Sniffer — Real-time packet capture and filtering",
  skills: "Vulnerability Assessment, Penetration Testing, Threat Detection, Incident Response, Scapy, Python, Bash, C/C++, Java, Wireshark, Burp Suite, Metasploit, Autopsy, FTK Imager, Packet Inspection, Wireless Security, NIDS Development",
};

// Handle user input
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInput = chatInput.value.trim().toLowerCase();
  if (!userInput) return;

  addMessage(userInput, "user");

  // Find response
  let responseText = "Sorry, I can only answer specific sections. Try: summary, contact, education, experience, certifications, projects, skills.";
  for (let key in responses) {
    if (userInput.includes(key)) {
      responseText = responses[key];
      break;
    }
  }

  setTimeout(() => addMessage(responseText, "bot"), 500);
  chatInput.value = "";
});

// Function to add messages
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerText = text;
  msg.appendChild(bubble);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
