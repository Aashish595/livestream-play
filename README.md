
🪄Livestream Overlay Studio
A modern React + TypeScript web app built with Vite that allows you to play livestream videos and add interactive overlays such as text or images directly on top of the video player.


[Watch the video]([https://drive.google.com/file/d/FILE_ID/view?usp=sharing](https://drive.google.com/file/d/1fw-SSd-B8zix1Mkx-GR0FLnhG48yxswZ/view?usp=sharing))



✨ Features
🎥 Play livestream or static video streams

➕ Add, move, resize, and delete overlay elements

👀 Toggle visibility of each overlay

🧊 Real-time overlay manipulation with smooth drag & resize

💅 Clean dark UI built with Tailwind CSS and Lucide React icons

🧠 Tech Stack
⚛️ React 18 + TypeScript

⚡ Vite (for fast builds and HMR)

🎨 Tailwind CSS (for styling)

🧩 Lucide React (for icons)

☁️ Optional: Supabase (if used later for backend or data storage)

🚀 Getting Started
1️⃣ Clone the Repository
bash

git clone https://github.com/Aashish595/livestream-play.git
cd livestream-play
2️⃣ Install Dependencies
npm install

3️⃣ Run the Development Server
npm run dev
Visit http://localhost:5173 to view the app.

⚙️ Build for Production

npm run build

🌐 Deploy on Vercel
Go to [https://vercel.com](https://livestream-play.vercel.app/)

Import this repository from GitHub

Use the following build settings:

Setting	Value
Framework Preset	Vite
Build Command	vite build
Output Directory	dist

Click Deploy, and Vercel will host your app live!

🔗 Example Stream URL
By default, the app uses a sample public video:


const streamUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
You can replace this with your own livestream or HLS link.



Video controls are at the bottom of the player

🧑‍💻 Author
Aashish Maurya

