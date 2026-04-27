# 🗳️ Voter Sahayak: Election Process Education

**Voter Sahayak** is an AI-powered educational platform designed to bridge the gap between Indian citizens and the democratic process. By leveraging modern web technologies and Generative AI, the platform simplifies complex election procedures, provides a realistic voting experience through a simulator, and offers real-time assistance.

---

## 🏛️ Chosen Vertical: Civic EdTech & Governance
This project falls under the **Civic Educational Technology** vertical. 
- **The Problem:** Many eligible voters in India, especially first-timers, find the registration process, EVM/VVPAT mechanism, and election laws overwhelming or confusing.
- **The Solution:** A centralized digital helpdesk that transforms static government guidelines into an interactive, multilingual, and practical learning experience.

---

## 🧠 Approach and Logic

### 1. The "Officer" Persona Logic
The core philosophy of the assistant is based on the **Administrative Persona**. The AI is programmed not just as a chatbot, but as a "Senior Election Officer." 
- **Logic:** Instead of generic answers, the system uses professional terminology (e.g., *Nagrik, Matdaata, Nirvachan*) to build trust and authority.

### 2. Multilingual Processing
India is a land of diverse languages. The logic ensures that the assistant detects the user's input language and responds in kind (Hindi, English, or Marathi) while maintaining a formal tone.

### 3. Practical Simulation (The EVM)
The approach moves beyond theoretical learning. By providing a **pixel-perfect Indian EVM Simulator**, the logic allows users to overcome "booth anxiety" by practicing the physical steps of voting in a safe, digital environment.

---

## 🛠️ How the Solution Works

### Technical Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Lucide React.
- **AI Engine:** Google Gemini 2.5 Flash (via `@google/generative-ai`).
- **State Management:** React Hooks for real-time EVM simulation and chat history.

### Workflow
1. **AI Assistant (Sahayak):** - User inputs a query.
   - The system sends the message along with a filtered history (ensuring the first message is always from the user) to a custom API route (`/api/chat`).
   - The Gemini 2.5 Flash model processes the request using strict **System Instructions** to maintain the "Officer" persona and returns a structured response in Markdown.
   
2. **EVM Simulator:**
   - A custom-built UI mimicking the official Balloting Unit.
   - **Logic:** When a button is pressed, a Red LED glows, and a simulated 1.5-second "Busy" state triggers, followed by a confirmation, mimicking the real-life polling booth experience.

3. **Interactive Guide:**
   - Uses a structured Accordion system to break down legal roles and eligibility criteria into easy-to-read sections.

---

## 📋 Assumptions Made

1. **Internet Connectivity:** It is assumed the user has a stable internet connection to interact with the Gemini API for real-time guidance.
2. **Standard Procedures:** The simulation and guidelines are based on the standard operating procedures (SOPs) of the Election Commission of India (ECI) as of 2024-25.
3. **Language Detection:** The system assumes the user will interact in either English, Hindi, or Marathi for optimal persona-driven responses.
4. **Non-Political Neutrality:** It is strictly assumed that the platform will remain non-partisan and will not store or analyze user political preferences during the simulation.

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vinaybhadane/Election-Process-Education.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env.local` file and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

**Developed by Vinay Bhadane** *Aapka Vote, Aapki Taqat | Jai Hind!*
