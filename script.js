// -----------------------------
// Core profile data
// -----------------------------
const profile = {
  name: "Syed Sakib Alam Mubin",
  title:
    "Cybersecurity Faculty (Arena Web Security), Penetration Tester & Automation Developer.",
  bio: "Specializing in offensive security, secure architecture, and Python automation. Mentoring the next generation of ethical hackers.",
  skills: [
    "Penetration Testing - 94%",
    "Secure Architecture - 89%",
    "Python Automation - 96%",
    "Web App Security - 91%"
  ],
  projects: ["LFI Simulator", "Interactive XSS Simulator"]
};

// DOM handles
const bootSection = document.getElementById("boot-sequence");
const bootLog = document.getElementById("boot-log");
const dashboard = document.getElementById("dashboard");
const typedTitle = document.getElementById("typed-title");
const terminalOutput = document.getElementById("terminal-output");
const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");

// -----------------------------
// Boot sequence
// -----------------------------
function startBootSequence() {
  const bootLines = [
    "[SYS] Initializing Kernel...",
    "[SOC] Loading S4M_OS Modules...",
    "[NET] Establishing Encrypted Link...",
    "[FIREWALL] Bypassing WAF Ruleset...",
    "[TRACE] Calibrating Packet Inspector...",
    "[AUTH] Token Handshake Complete.",
    "[AI] Threat Heuristics Online.",
    "[SCAN] Indexing Attack Surface...",
    "[OPS] Mapping Intrusion Vectors...",
    "[DONE] Command Center Ready."
  ];

  const startTime = performance.now();
  let i = 0;

  const timer = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const line = `${bootLines[i % bootLines.length]} 0x${Math.floor(
      Math.random() * 65535
    )
      .toString(16)
      .toUpperCase()}`;

    bootLog.textContent += `${line}\n`;
    bootLog.scrollTop = bootLog.scrollHeight;
    i += 1;

    if (elapsed >= 3000) {
      clearInterval(timer);
      revealDashboard();
    }
  }, 120);
}

function revealDashboard() {
  bootSection.classList.add("fade-out");
  dashboard.classList.remove("hidden");
  dashboard.classList.add("visible");

  // Start HUD text typing once the dashboard is visible.
  typeText(typedTitle, profile.title, 32);

  // Animate skill bars in.
  setTimeout(() => {
    document.querySelectorAll(".skill-fill").forEach((bar) => {
      bar.style.width = bar.dataset.level;
    });
  }, 250);

  setupTerminal();
  setupSimulationNodes();
  setupTrainingLabsHub();
}

// -----------------------------
// Typewriter utility
// -----------------------------
function typeText(targetEl, text, speed = 40) {
  let idx = 0;
  targetEl.textContent = "";

  const typer = setInterval(() => {
    targetEl.textContent += text[idx];
    idx += 1;

    if (idx >= text.length) {
      clearInterval(typer);
    }
  }, speed);
}

// -----------------------------
// Interactive terminal
// -----------------------------
function setupTerminal() {
  printLine("Welcome, Operator. Type 'help' to list available commands.");
  printLine("SOC shell initialized.");

  terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const raw = terminalInput.value.trim();
    if (!raw) return;

    printLine(`mubin@soc:~$ ${raw}`, "command");
    executeCommand(raw);
    terminalInput.value = "";
  });

  // Keep keyboard flow terminal-like.
  document.querySelector(".terminal-panel").addEventListener("click", () => {
    terminalInput.focus();
  });

  terminalInput.focus();
}

function executeCommand(input) {
  const parts = input.split(" ");
  const command = (parts[0] || "").toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case "help":
      printLine("Available commands:");
      printLine("whoami  | bio     | skills");
      printLine("projects| labs    | clear");
      printLine("date    | echo <message>");
      break;

    case "whoami":
      printLine(`${profile.name}`);
      printLine(profile.title);
      break;

    case "bio":
      printLine(profile.bio);
      break;

    case "skills":
      profile.skills.forEach((skill) => printLine(`- ${skill}`));
      break;

    case "projects":
    case "labs":
      profile.projects.forEach((project, index) =>
        printLine(`${index + 1}. ${project}`)
      );
      break;

    case "date":
      printLine(new Date().toLocaleString());
      break;

    case "echo":
      printLine(args.join(" ") || "[empty]");
      break;

    case "clear":
      terminalOutput.textContent = "";
      break;

    default:
      printLine(`Command not found: ${command}`, "error");
      printLine("Type 'help' for available commands.", "error");
  }
}

function printLine(text, type = "") {
  const line = document.createElement("p");
  line.className = `terminal-line ${type}`.trim();
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// -----------------------------
// Simulation node interactions
// -----------------------------
function setupSimulationNodes() {
  const simNodes = document.querySelectorAll(".sim-node");

  simNodes.forEach((node) => {
    let statusTimer = null;

    node.addEventListener("mouseenter", () => {
      node.dataset.status = "SCANNING VECTOR...";
      node.classList.add("armed");

      statusTimer = setTimeout(() => {
        if (node.matches(":hover")) {
          node.dataset.status = node.dataset.hoverStatus || "TARGET ACQUIRED";
        }
      }, 170);
    });

    node.addEventListener("mouseleave", () => {
      clearTimeout(statusTimer);
      node.dataset.status = node.dataset.idleStatus || "CLASSROOM READY";
      node.classList.remove("armed");
    });
  });
}

function setupTrainingLabsHub() {
  const hubButton = document.getElementById("training-labs-hub-btn");
  const labsGrid = document.getElementById("training-labs-grid");
  if (!hubButton || !labsGrid) return;

  hubButton.addEventListener("click", () => {
    labsGrid.classList.remove("labs-hidden");
    hubButton.classList.add("active");
    hubButton.setAttribute("aria-expanded", "true");
  });
}

window.addEventListener("load", startBootSequence);
