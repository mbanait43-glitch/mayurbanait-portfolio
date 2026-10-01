# Mayur Banait — Retro Desktop OS Portfolio (`mayur.exe`)

An interactive, responsive "retro desktop operating system" personal portfolio for **Mayur Banait** (B.Tech CSE 2026 | Full-Stack Developer). Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Web Audio API** synthesized sound effects.

---

## 🖥️ Live Features

- **Cozy Retro Desktop Aesthetics**: Chunky 2px ink borders, hard offset drop shadows, custom pixel font (`Press Start 2P`) for headers, and clean typography (`DM Sans`).
- **Original Color Themes & Variables**:
  - **Light Mode**: Periwinkle desktop (`#cfe3ff`), warm white windows, butter-yellow title bars, mint accents.
  - **Dark Mode**: Deep indigo desktop (`#0c101d`), dark slate surfaces, violet title bars, teal accents.
- **Window Management System**:
  - State managed via Zustand (`useWindowStore`).
  - Cascading new window spawns (28px offset) with viewport boundary clamping (never spawns off-screen).
  - Smooth dragging via Pointer Capture (`setPointerCapture`) clamped to viewport limits with zero text selection.
  - Interactive resizing from the bottom-right grip handle (min `320x240`).
  - Title bar controls: Minimize, Maximize/Restore, and Close buttons (plus double-click title bar to toggle maximize).
  - Topmost window focus management and `Esc` key shortcut to close active window.
- **Synthesized Web Audio Engine** (Zero External Audio Files):
  - Procedural oscillator beeps for icon clicks, window opening/closing, minimizing, toggles, form success/error, and mascot jumps.
  - Low default volume (~0.07 gain) and global mute toggle persisted in `localStorage`.
- **Animated Pixel Mascot ("Pixel Bot")**:
  - Original SVG character walking along the taskbar, turning at screen edges, and pausing randomly.
  - Clicking makes it jump with a sound effect and display retro tips and dialogue bubbles.
  - Can be toggled on/off in Settings and pauses when the browser tab is hidden.
- **Right-Click Desktop Context Menu**:
  - Right-click anywhere on the desktop to change wallpaper patterns (Dots, Grid, Plain), switch themes, or launch System Settings.
- **Taskbar & Start Menu**:
  - Bottom taskbar with active window indicator pills and an interactive retro Start menu.
- **Mobile Responsive Design (<768px)**:
  - Automatic detection: windows open as full-screen modal sheets, desktop icons arrange into a 3-column mobile home-screen grid, and taskbar serves as an app dock.
  - Dismissible mobile optimization alert.

---

## 📂 Source Code Structure

```text
d:\My-Portfolio\
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts    # POST contact route with validation & logging
│   │   ├── globals.css             # CSS variables, wallpaper patterns & retro utility classes
│   │   ├── layout.tsx              # Root layout with DM Sans & Press Start 2P fonts, ThemeProvider
│   │   └── page.tsx                # Desktop OS mount entry point
│   ├── components/
│   │   ├── common/
│   │   │   └── OriginalIcons.tsx   # 9 original 48x48 retro SVG desktop icons
│   │   ├── desktop/
│   │   │   ├── ContextMenu.tsx     # Custom right-click desktop menu
│   │   │   ├── Desktop.tsx         # Main desktop workspace coordinator
│   │   │   ├── DesktopIcon.tsx     # Desktop icons with hover lift, selection, and tap/double-click
│   │   │   ├── Taskbar.tsx         # Taskbar with window buttons & retro Start menu
│   │   │   └── TopBar.tsx          # 36px top status bar with clock, theme & audio toggles
│   │   ├── mascot/
│   │   │   └── Mascot.tsx          # Animated robot assistant
│   │   ├── mobile/
│   │   │   └── MobileBanner.tsx    # Mobile welcome notification
│   │   └── window/
│   │       ├── Window.tsx          # Draggable, resizable window frame
│   │       └── content/            # Window content views
│   │           ├── AboutContent.tsx
│   │           ├── CertificatesContent.tsx
│   │           ├── ContactContent.tsx
│   │           ├── ExperienceContent.tsx
│   │           ├── FAQContent.tsx
│   │           ├── ProjectsContent.tsx
│   │           ├── ResumeContent.tsx
│   │           ├── SettingsContent.tsx
│   │           └── SkillsContent.tsx
│   ├── data/
│   │   └── content.ts              # Single source of truth for all portfolio content
│   ├── lib/
│   │   └── sound.ts                # Web Audio API synthesizer
│   ├── store/
│   │   ├── useSettingsStore.ts     # Sound, mascot, wallpaper, and motion store
│   │   └── useWindowStore.ts       # Zustand window management store
│   └── types/
│       └── index.ts                # TypeScript interfaces
├── public/
│   ├── resume.pdf                  # Resume file for direct viewer & download
│   └── icon.svg                    # Retro pixel favicon
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🛠️ How to Customize Your Portfolio

### 1. Updating Content
All personal information, education, projects, skills, certificates, and FAQs are located in:
👉 [`src/data/content.ts`](file:///d:/My-Portfolio/src/data/content.ts)

- **Contact links**: Update your GitHub URL (`profile.links.github`) and LinkedIn URL (`profile.links.linkedin`).
- **Projects**: Add, remove, or edit project cards in `PORTFOLIO_DATA.projects`.
- **Internship / Experience**: Edit the Yexa Technologies details in `PORTFOLIO_DATA.experience`.
- **Skills**: Adjust percentages or skill chips in `PORTFOLIO_DATA.technicalSkills` and `PORTFOLIO_DATA.skillLevels`.

### 2. Updating Your Resume PDF
To replace the resume PDF:
1. Place your final PDF at [`public/resume.pdf`](file:///d:/My-Portfolio/public/resume.pdf).
2. The "Open PDF" and "Download" buttons inside `Resume_Viewer.pdf` will automatically serve your new file.

### 3. Modifying Icons and Mascot
- **Desktop Icons**: Designed in [`src/components/common/OriginalIcons.tsx`](file:///d:/My-Portfolio/src/components/common/OriginalIcons.tsx). They use CSS variables (`var(--color-surface)`, `var(--color-border)`, `var(--color-titlebar)`, etc.) so they automatically adapt to light and dark modes.
- **Mascot Character & Quotes**: The robot SVG and quote bubbles are in [`src/components/mascot/Mascot.tsx`](file:///d:/My-Portfolio/src/components/mascot/Mascot.tsx). You can customize `MASCOT_QUOTES` to add your own personal catchphrases.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies (already completed)
npm install

# 2. Run the development server
npm run dev

# 3. Open your browser
# Navigate to http://localhost:3000
```

---

## 📦 Production Build & Deployment to Vercel

### Testing the Production Build:
```bash
npm run build
npm run start
```

### Deploying to Vercel:
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit of retro desktop OS portfolio"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Next.js will be detected automatically. Click **"Deploy"**.
5. Your portfolio is live with full serverless API routes (`/api/contact`) and static asset caching!
