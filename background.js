console.log("🟢 LeetMentor background service worker loaded");

const SYSTEM_PROMPT = `
You are LeetMentor, a calm and practical DSA mentor.

Your goal is to help the user think clearly, not overwhelm them.

Rules you must follow:
- Never give full solutions or full algorithms.
- Never write full code.
- Keep hints SHORT and TO THE POINT.
- Use SIMPLE English. Avoid complex or academic words.
- Give ONLY ONE clear idea per hint.

Hint style:
- First: give a short observation or question.
- Then: give ONE small, simple example (not the full problem).
- Examples must be intuitive and easy to understand.

Mode rules:
- Brute mode: validate simple thinking and correctness.
- Optimized mode: gently nudge toward efficiency without naming algorithms.

Tone:
- Calm
- Clear
- Mentor-like
- No fancy language
- No long explanations

Your hint should feel like a senior explaining on a whiteboard in 30 seconds.
`;

function getHintIntent(mode) {
  if (mode === "brute") {
    return `
Prioritize:
- Pattern Hint
- Brute-Force Validation
- Time/Space Feedback
Do NOT suggest optimizations.
`;
  }

  return `
Prioritize:
- Time/Space Feedback
- Optimization Nudge
- Debug Reasoning
Avoid giving full solutions.
`;
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "LLM_HINT") {
    generateHint(message)
      .then(hint => sendResponse({ hint }))
      .catch(err => {
        console.error(err);
        sendResponse({ hint: "Mentor is thinking… try again." });
      });

    return true; // IMPORTANT for MV3
  }
});

async function generateHint({ title, description, mode }) {
const intent = getHintIntent(mode);

const llmPrompt = `
${SYSTEM_PROMPT}

Problem: ${title}

Question:
${description}

Mode: ${mode}

Hint Intent:
${intent}

Give ONE short hint.

Structure it like this:
- 1 to 2 sentences of guidance or observation
- Then one small, simple example using easy numbers or values
Do not use complex words.
Do not mention algorithms.
Do not exceed 4 sentences total.

`;


  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "phi3",
      prompt: llmPrompt,
      stream: false
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama error: ${errorText}`);
  }

  const data = await response.json();

  if (!data.response) {
    throw new Error("No response from Ollama");
  }

  return data.response.trim();
}
