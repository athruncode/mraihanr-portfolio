import { useState, useCallback, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import AboutModal from './components/AboutModal';
import { preloadAboutAssets } from './components/aboutAssets';
import ExperienceModal from './components/ExperienceModal';
import ProjectsModal from './components/ProjectsModal';
import AchievementModal from './components/AchievementModal';
import SkillModal from './components/SkillModal';
import ContactModal from './components/ContactModal';
/* ───────────────────────── MENU DATA ───────────────────────── */
const menuItems = ['ABOUT', 'EXPERIENCES', 'PROJECTS', 'ACHIEVEMENTS', 'SKILLS', 'CONTACT'];

/* ───────────────────────── ANIMATION VARIANTS ───────────────────────── */
const menuContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const menuItemVariants = {
  hidden: { x: 120, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 550, damping: 28, mass: 0.8 },
  },
};

/* ═══════════════════════════════════════════════════════════════
   APP — Single-page "title screen" portfolio hero
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [achievementOpen, setAchievementOpen] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  /* ── Mouse parallax tracking (motion values → zero React re-renders) ── */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rafRef = useRef(null);
  const latestPointer = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      // Normalize to -1...1 from center
      latestPointer.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      // Throttle to one update per frame — same cadence as before, but no re-render
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        pointerX.set(latestPointer.current.x);
        pointerY.set(latestPointer.current.y);
      });
    },
    [pointerX, pointerY]
  );

  const anyModalOpen =
    aboutOpen || experienceOpen || projectsOpen || achievementOpen || skillOpen || contactOpen;

  /* Stable close handlers so the memoized modals skip App re-renders */
  const closeAbout = useCallback(() => setAboutOpen(false), []);
  const closeExperience = useCallback(() => setExperienceOpen(false), []);
  const closeProjects = useCallback(() => setProjectsOpen(false), []);
  const closeAchievement = useCallback(() => setAchievementOpen(false), []);
  const closeSkill = useCallback(() => setSkillOpen(false), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  // Parallax multipliers
  const bgX = useTransform(pointerX, (v) => v * -12);
  const bgY = useTransform(pointerY, (v) => v * -8);
  const charX = useTransform(pointerX, (v) => v * 8);
  const charY = useTransform(pointerY, (v) => v * 5);
  // Shadow moves opposite to cursor (light source follows cursor)
  const shadowX = useTransform(pointerX, (v) => v * -20);
  const shadowY = useTransform(pointerY, (v) => Math.abs(v * -15) + 15);
  const charShadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 25px rgba(0,0,0,0.6))`;

  return (
    <div
      className="w-screen h-[100dvh] overflow-hidden relative bg-darkBlack-900 select-none"
      onMouseMove={anyModalOpen ? undefined : handleMouseMove}
    >

      {/* ── Z-0 · FULL-SCREEN BACKGROUND IMAGE (parallax) ────── */}
      <motion.img
        src="/Home Background.png"
        alt="Background"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          x: bgX,
          y: bgY,
          scale: 1.05,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* ── Z-10 · HERO CHARACTER & BADGES (bottom-left, parallax + dynamic shadow) ── */}
      <motion.div
        className="absolute bottom-0 -left-10 sm:-left-4 md:left-8 h-[65vh] sm:h-[75vh] md:h-[95vh] w-auto z-10 pointer-events-none select-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.15 }}
      >
        {/* Character Image */}
        <motion.img
          src="/rehan home background.png"
          alt="M. Raihan — Character"
          draggable={false}
          className="relative h-full w-auto object-contain object-bottom pointer-events-auto"
          style={{
            x: charX,
            y: charY,
            filter: charShadow,
            transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.3s ease',
          }}
        />

        {/* Role Badge */}
        <motion.img
          src="/role-object.png"
          alt="Role — UI/UX Designer & Aspiring Product Designer"
          draggable={false}
          className="absolute w-[150px] sm:w-[220px] md:w-[320px] lg:w-[400px] h-auto object-contain drop-shadow-[4px_6px_10px_rgba(0,0,0,0.45)] pointer-events-auto top-[30%] sm:top-[30%] md:top-[30%] left-[42%] sm:left-[50%] md:left-[58%]"
          initial={{ opacity: 0, x: -24, rotate: -3 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 320, damping: 26 }}
        />
      </motion.div>

      {/* ── Z-10 · LOGO TEXT (center-right) ──────────────────────── */}
      <motion.img
        src="/Portfolio rehan text.png"
        alt="Portfolio Rehan"
        draggable={false}
        className="absolute top-12 sm:top-16 right-3 sm:right-6 md:right-[18%] w-[160px] sm:w-[220px] md:w-[300px] lg:w-[360px] h-auto object-contain z-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.25 }}
      />

      {/* ── Z-20 · MAJOR BADGE + CV DOWNLOAD (top-left) ───────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute top-3 left-3 sm:top-6 sm:left-6 md:top-12 md:left-12 z-20
                   flex flex-col items-start gap-1.5 sm:gap-2 md:gap-3"
      >
        <motion.button
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24, delay: 0.5 }}
          className="bg-slate-900/90 backdrop-blur-sm
                     border border-customCyan-500/40
                     rounded-md px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3
                     max-w-[75vw] sm:max-w-none
                     shadow-[0_0_25px_rgba(81,238,252,0.5)]
                     hover:shadow-[0_0_35px_rgba(81,238,252,0.7)]
                     transition-shadow duration-300
                     cursor-default"
        >
          <span className="font-oswald font-bold text-white text-xs sm:text-sm md:text-lg tracking-wide block truncate sm:whitespace-normal">
            Bachelor of Computer Science in Information Systems
          </span>
        </motion.button>

        {/* Download CV — filled cyan so it reads as the page's main CTA */}
        <motion.a
          href="/cv/M-Raihan-Ramadhani-CV-2026.pdf"
          download="M-Raihan-Ramadhani-CV-2026.pdf"
          aria-label="Download CV (PDF)"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24, delay: 0.65 }}
          className="group inline-flex items-center gap-1.5 sm:gap-2
                     bg-customCyan-500 hover:bg-white
                     text-darkBlack-900
                     rounded-md px-3 py-1 sm:px-4 sm:py-2
                     shadow-[0_0_20px_rgba(81,238,252,0.55)]
                     hover:shadow-[0_0_32px_rgba(81,238,252,0.85)]
                     transition-all duration-200"
        >
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-200 group-hover:translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="M7 11l5 5 5-5" />
            <path d="M4 21h16" />
          </svg>
          <span className="font-oswald font-bold italic text-[10px] sm:text-xs md:text-sm tracking-widest lg:tracking-wider uppercase whitespace-nowrap">
            Download
            <span className="hidden lg:inline"> Curriculum Vitae (CV)</span>
            <span className="lg:hidden"> CV</span>
          </span>
        </motion.a>
      </motion.div>

      {/* ── Z-20 · MAIN NAVIGATION MENU (bottom-right) ─────────── */}
      <motion.nav
        variants={menuContainerVariants}
        initial="hidden"
        animate="show"
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-end gap-0.5 sm:gap-1"
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={item}
            variants={menuItemVariants}
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setHoveredIndex(index);
              if (item === 'ABOUT') preloadAboutAssets();
            }}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              if (item === 'ABOUT') setAboutOpen(true);
              if (item === 'EXPERIENCES') setExperienceOpen(true);
              if (item === 'PROJECTS') setProjectsOpen(true);
              if (item === 'ACHIEVEMENTS') setAchievementOpen(true);
              if (item === 'SKILLS') setSkillOpen(true);
              if (item === 'CONTACT') setContactOpen(true);
            }}
          >
            {/* Blue skewed block behind text on hover */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="menu-skew-block absolute bg-customBlue-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ type: 'spring', stiffness: 700, damping: 35, mass: 0.6 }}
                  style={{
                    zIndex: -1,
                    transformOrigin: 'right center',
                    top: '-4px',
                    bottom: '-4px',
                    left: '-40px',
                    right: '-24px',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Menu label */}
            <span
              className="relative font-oswald font-bold italic text-2xl sm:text-4xl md:text-6xl lg:text-7xl
                         leading-tight sm:leading-none tracking-tight text-white
                         drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)] md:drop-shadow-[3px_3px_0px_rgba(0,0,0,0.5)]
                         transition-colors duration-150"
              style={{
                textShadow: hoveredIndex === index
                  ? '0 0 20px rgba(81, 238, 252, 0.35)'
                  : '3px 3px 0px rgba(0,0,0,0.45)',
              }}
            >
              {item}
            </span>
          </motion.div>
        ))}
      </motion.nav>


      {/* ── Z-50 · ABOUT MODAL ──────────────────────────────── */}
      <AboutModal isOpen={aboutOpen} onClose={closeAbout} />

      {/* ── Z-50 · EXPERIENCE MODAL ─────────────────────────── */}
      <ExperienceModal isOpen={experienceOpen} onClose={closeExperience} />

      {/* ── Z-50 · PROJECTS MODAL ───────────────────────────── */}
      <ProjectsModal isOpen={projectsOpen} onClose={closeProjects} />

      {/* ── Z-50 · ACHIEVEMENT MODAL ────────────────────────── */}
      <AchievementModal isOpen={achievementOpen} onClose={closeAchievement} />

      {/* ── Z-50 · SKILL MODAL ──────────────────────────────── */}
      <SkillModal isOpen={skillOpen} onClose={closeSkill} />

      {/* ── Z-50 · CONTACT MODAL ────────────────────────────── */}
      <ContactModal isOpen={contactOpen} onClose={closeContact} />
    </div>
  );
}
