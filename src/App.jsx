import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutModal from './components/AboutModal';
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

  /* ── Mouse parallax tracking ──────────────────────────────── */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      // Normalize to -1...1 from center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    });
  }, []);

  // Parallax multipliers
  const bgX = mouse.x * -12;
  const bgY = mouse.y * -8;
  const charX = mouse.x * 8;
  const charY = mouse.y * 5;
  // Shadow moves opposite to cursor (light source follows cursor)
  const shadowX = mouse.x * -20;
  const shadowY = mouse.y * -15;

  return (
    <div
      className="w-screen h-[100dvh] overflow-hidden relative bg-darkBlack-900 select-none"
      onMouseMove={handleMouseMove}
    >

      {/* ── Z-0 · FULL-SCREEN BACKGROUND IMAGE (parallax) ────── */}
      <img
        src="/Home Background.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        draggable={false}
        style={{
          transform: `translate(${bgX}px, ${bgY}px) scale(1.05)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* ── Z-10 · HERO CHARACTER (bottom-left, parallax + dynamic shadow) ── */}
      <motion.img
        src="/rehan biru.svg"
        alt="M. Raihan — Character"
        draggable={false}
        className="absolute bottom-0 left-4 h-[75vh] md:h-[80vh] w-auto object-contain object-bottom z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.15 }}
        style={{
          transform: `translate(${charX}px, ${charY}px)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.3s ease',
          filter: `drop-shadow(${shadowX}px ${Math.abs(shadowY) + 15}px 25px rgba(0,0,0,0.6))`,
        }}
      />

      {/* ── Z-10 · LOGO TEXT (center-right) ──────────────────────── */}
      <motion.img
        src="/Portfolio rehan text.png"
        alt="Portfolio Rehan"
        draggable={false}
        className="absolute top-16 right-[18%] w-[280px] md:w-[320px] lg:w-[360px] h-auto object-contain z-10"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.25 }}
      />

      {/* ── Z-20 · MAJOR BADGE (top-left) ─────────────────────── */}
      <motion.button
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24, delay: 0.5 }}
        className="absolute top-6 left-6 md:top-12 md:left-12 z-20
                   bg-slate-900/90 backdrop-blur-sm
                   border border-customCyan-500/40
                   rounded-md px-4 py-2 md:px-6 md:py-3
                   shadow-[0_0_25px_rgba(81,238,252,0.5)]
                   hover:shadow-[0_0_35px_rgba(81,238,252,0.7)]
                   transition-shadow duration-300
                   cursor-default"
      >
        <span className="font-oswald font-bold text-white text-lg tracking-wide">
          Bachelor of Information Systems
        </span>
      </motion.button>

      {/* ── Z-20 · MAIN NAVIGATION MENU (bottom-right) ─────────── */}
      <motion.nav
        variants={menuContainerVariants}
        initial="hidden"
        animate="show"
        className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20 flex flex-col items-end gap-1"
      >
        {menuItems.map((item, index) => (
          <motion.div
            key={item}
            variants={menuItemVariants}
            className="relative cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
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
              className="relative font-oswald font-bold italic text-4xl md:text-6xl lg:text-7xl
                         leading-none tracking-tight text-white
                         drop-shadow-[3px_3px_0px_rgba(0,0,0,0.5)]
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
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />

      {/* ── Z-50 · EXPERIENCE MODAL ─────────────────────────── */}
      <ExperienceModal isOpen={experienceOpen} onClose={() => setExperienceOpen(false)} />

      {/* ── Z-50 · PROJECTS MODAL ───────────────────────────── */}
      <ProjectsModal isOpen={projectsOpen} onClose={() => setProjectsOpen(false)} />

      {/* ── Z-50 · ACHIEVEMENT MODAL ────────────────────────── */}
      <AchievementModal isOpen={achievementOpen} onClose={() => setAchievementOpen(false)} />

      {/* ── Z-50 · SKILL MODAL ──────────────────────────────── */}
      <SkillModal isOpen={skillOpen} onClose={() => setSkillOpen(false)} />

      {/* ── Z-50 · CONTACT MODAL ────────────────────────────── */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
