const status = document.getElementById("status");
const hintBtn = document.getElementById("hintBtn");
const modeSelect = document.getElementById("mode");
let isCooldown = false;

function setLoading(isLoading) {
  if (isLoading) {
    status.textContent = "Mentor is thinking…";
    hintBtn.disabled = true;
  } else {
    hintBtn.disabled = false;
  }
}
function formatHint(text) {
  if (!text) return "";

  return text
    .replace(/\n{3,}/g, "\n\n")   // collapse excessive newlines
    .replace(/^[-•]\s*/gm, "")   // remove bullet symbols
    .trim();
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0]?.url || "";

  if (!url.includes("leetcode.com/problems/")) {
    status.textContent = "Not a LeetCode problem page ❌";
    hintBtn.disabled = true;
  }
});

hintBtn.addEventListener("click", () => {
  if (isCooldown) return;
  setLoading(true);

  const mode = modeSelect.value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "GET_PROBLEM_DATA", mode },
      (response) => {
        if (chrome.runtime.lastError) {
          status.textContent = "Mentor not reachable. Try again.";
          setLoading(false);
          isCooldown = true;
          setTimeout(() => {
            isCooldown = false;
          }, 2000);
          return;
        }


        if (response?.error) {
          status.textContent = response.error;
          setLoading(false);
          isCooldown = true;
          setTimeout(() => {
            isCooldown = false;
          }, 2000);
          return;
        }

        console.log("📘 LeetMentor Payload:", response);

        chrome.runtime.sendMessage(
          {
            type: "LLM_HINT",
            mode: response.mode,
            title: response.title,
            description: response.description
          },
          (llmResponse) => {
            console.log("🧠 LeetMentor Hint:", llmResponse.hint);
            status.textContent = formatHint(llmResponse.hint);
            setLoading(false);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              chrome.tabs.sendMessage(tabs[0].id, {
                type: "SHOW_HINT_OVERLAY",
                hint: llmResponse.hint
              });
            });

          }
        );
      }
    );
  });
});
