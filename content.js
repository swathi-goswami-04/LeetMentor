// ===== LeetMentor Content Script (LOCKED & VERIFIED) =====
console.log("🧠 LeetMentor content script alive");
window.__leetmentorInjected = true;

function getProblemData() {
  const descEl = document.querySelector('[data-track-load="description_content"]');

  if (!descEl) {
    console.warn("❌ LeetMentor: Description node not found");
    return { error: "Failed to find the question" };
  }

  const fullText = descEl.innerText.trim();

  // Extract title heuristically (first non-empty line)
  const lines = fullText.split("\n").map(l => l.trim()).filter(Boolean);
  const title = lines[0] || "LeetCode Problem";

  const data = {
    title,
    description: fullText
  };

  console.log("✅ LeetMentor Problem Data:", data);
  return data;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_PROBLEM_DATA") {
    const data = getProblemData();
    sendResponse({ ...data, mode: message.mode });
    return true;
  }
});
function createHintOverlay(text) {
  // Remove old hint if exists
  const existing = document.getElementById("leetmentor-hint");
  if (existing) existing.remove();

  // Container
  const box = document.createElement("div");
  box.id = "leetmentor-hint";

  box.style.position = "fixed";
  box.style.right = "24px";
  box.style.bottom = "24px";
  box.style.width = "820px";
  box.style.maxHeight = "200px";
  box.style.padding = "14px";
  box.style.zIndex = "99999";

  box.style.background = "#69728be5";
  box.style.color = "#7d879aff";
  box.style.border = "1px solid #2a2d3a";
  box.style.borderRadius = "10px";
  box.style.fontFamily = "Inter, system-ui, sans-serif";
  box.style.fontSize = "13px";
  box.style.lineHeight = "1.5";
  box.style.boxShadow = "0 10px 30px rgba(12, 12, 12, 0.4)";

  // Header
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.cursor = "move";
  header.style.userSelect = "none";
  header.style.paddingBottom = "6px";
  header.style.marginBottom = "8px";
  header.style.borderBottom = "1px solid #2a2d3a";

  const closeBtn = document.createElement("span");
  closeBtn.textContent = "✕";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.color = "#9ca3af";
  closeBtn.onclick = () => box.remove();

  header.appendChild(closeBtn);

  // Text area
  const content = document.createElement("div");
  content.style.whiteSpace = "pre-wrap";
  content.style.fontSize = "13px";
  content.style.color = "#070707ff";
  content.style.lineHeight = "1.55";
  content.style.maxHeight = "120px";
  content.style.overflowY = "auto";


  box.appendChild(header);
  box.appendChild(content);
  document.body.appendChild(box);

  typeWriter(content, text);
  makeDraggable(box, header);

}
function typeWriter(element, text) {
  element.textContent = "";
  const words = text.split(" ");
  let index = 0;

  const interval = setInterval(() => {
    if (index >= words.length) {
      clearInterval(interval);
      return;
    }
    element.textContent += (index === 0 ? "" : " ") + words[index];
    index++;
  }, 30); // typing speed (tweak 40–80ms)
}
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SHOW_HINT_OVERLAY") {
    createHintOverlay(message.hint);
  }
});


function makeDraggable(box, handle) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - box.offsetLeft;
    offsetY = e.clientY - box.offsetTop;
    box.style.transition = "none";
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    box.style.left = `${e.clientX - offsetX}px`;
    box.style.top = `${e.clientY - offsetY}px`;
    box.style.right = "auto";
    box.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
  });
}

