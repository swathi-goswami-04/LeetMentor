**🧠 LeetMentor**

LeetMentor is a Chrome extension that helps you think while solving LeetCode problems — without giving you the solution.

Instead of dumping answers or full code, LeetMentor behaves like a calm senior mentor:
it gives short, precise hints, nudges your reasoning, and encourages you to arrive at the solution yourself.

Screenshot:

<img width="1905" height="935" alt="Screenshot 2026-01-02 121251" src="https://github.com/user-attachments/assets/b7d2840a-32e7-4db6-b1d6-461df6a2e1d1" />










❓ Why LeetMentor Exists

Many LeetCode helpers:

reveal full solutions

encourage memorization

break the learning loop

LeetMentor was built with a different philosophy:

Learning happens when you think, not when you copy.

This tool is designed to:

preserve problem-solving skills

improve pattern recognition

help you debug your own thinking

avoid solution leakage completely

✅ What LeetMentor Does

Gives short, focused hints (not solutions)

Uses simple English, no heavy jargon

Includes one small intuitive example when helpful

Adapts hints based on the selected mode

Shows hints directly on the LeetCode page as a floating, draggable panel

Animates hints word-by-word for a calm, mentor-like experience

❌ What LeetMentor Deliberately Does NOT Do

❌ No full solutions

❌ No full code

❌ No algorithm names spoon-fed

❌ No copy-paste advantage

❌ No competitive cheating intent

LeetMentor is built for learning, not shortcuts.

🎯 Modes
🟢 Brute Mode

Validates naive thinking

Helps reason about correctness

Highlights inefficiencies gently

🔵 Optimized Mode

Nudges toward better approaches

Uses constraints to guide thinking

Avoids naming algorithms directly

✨ Key Features

🧠 Mentor-style hints (one idea at a time)

🪟 Floating, draggable hint panel

⌨️ Word-by-word typing animation

🎯 Mode-based guidance

🧘 Minimal, distraction-free UI

🔒 No solution leakage

🏗️ How It Works (Architecture)
Popup (mode selection)
        ↓
Background Service Worker
        ↓
Local LLM (Ollama + Phi-3)
        ↓
Content Script
        ↓
Floating Hint Overlay on LeetCode

Why a Local LLM?

LeetMentor uses Ollama with Phi-3, running entirely on your machine:

✅ Zero API cost

✅ No rate limits

✅ No data sent to external servers

✅ Full control over behavior

✅ Offline-friendly

This also avoids vendor lock-in and makes the project more privacy-respecting.

🚀 How to Run Locally
1️⃣ Install Ollama

👉 https://ollama.com

2️⃣ Pull the model
ollama run phi3

3️⃣ Enable CORS for Chrome Extensions (Windows)
setx OLLAMA_ORIGINS "*"


Restart your system after this.

4️⃣ Load the Chrome Extension

Open Chrome → chrome://extensions

Enable Developer mode

Click Load unpacked

Select the LeetMentor project folder

5️⃣ Open a LeetCode problem

Choose a mode

Click Get Hint

See the mentor hint appear directly on the page

📸 Demo

(Add screenshots or a short GIF here — highly recommended)

🧪 Design Philosophy

Teach thinking, not answers

One hint = one idea

Calm UX > flashy UI

Learning > speed

Ethics over exploitation

🔮 Future Improvements

Editor-aware positioning

Hint history per problem

Smarter escalation when stuck

Optional backend for shared usage

Light/Dark theme auto-sync

🤝 Ethics Note

LeetMentor is not intended to:

bypass interviews

cheat assessments

replace learning

It exists to support deliberate practice and responsible skill-building.

👤 Author

Built with care by Swathi
Computer Science student, problem-solver, and lifelong learner.
