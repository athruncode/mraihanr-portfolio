import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skills = [
  { id: 1, name: "UI/UX Design", level: 95 },
  { id: 2, name: "Figma & Prototyping", level: 90, iconSlugs: ["figma"] },
  { id: 3, name: "User Research & Flow", level: 85, iconSlugs: ["miro"] },
  { id: 4, name: "HTML, CSS & Bootstrap", level: 85, iconSlugs: ["html5", "css", "bootstrap"] },
  { id: 5, name: "React, Next.js & TS", level: 80, iconSlugs: ["react", "nextdotjs", "typescript"] },
  { id: 6, name: "PHP & Laravel", level: 75, iconSlugs: ["php", "laravel"] }
];

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export default function SkillModal({ isOpen, onClose }) {
  const [hoveredSkill, setHoveredSkill] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        const idx = skills.findIndex(s => s.id === hoveredSkill);
        if (idx < skills.length - 1) setHoveredSkill(skills[idx + 1].id);
      }
      if (e.key === 'ArrowUp') {
        const idx = skills.findIndex(s => s.id === hoveredSkill);
        if (idx > 0) setHoveredSkill(skills[idx - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hoveredSkill, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="skill-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 w-screen h-screen z-50 bg-[#02102e] select-none font-oswald overflow-hidden"
        >
          {/* ── BACKGROUND LAYER ─────────────────────────────────── */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-normal md:mix-blend-multiply pointer-events-none" />
            <img 
              src="/Home Background.png" 
              alt="Skills Background" 
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 md:opacity-20 mix-blend-normal md:mix-blend-overlay pointer-events-none"
            />
            
            {/* Floating glass triangles */}
            <motion.div 
              animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute top-[20%] left-[60%] w-32 h-32 bg-pink-500/20"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
            <motion.div 
              animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              className="absolute top-[60%] left-[20%] w-48 h-48 bg-cyan-500/20"
              style={{ clipPath: 'polygon(0 40%, 100% 0, 80% 100%)' }}
            />
          </div>

          {/* ── CHARACTER PORTRAIT (Right Side) ──────────────────── */}
          <img 
            src="/rehan biru.svg" 
            alt="Character Portrait"
            className="absolute -right-[10%] md:right-[5%] bottom-[15%] h-[60vh] md:h-[90vh] object-contain rotate-[15deg] z-10 pointer-events-none drop-shadow-none md:drop-shadow-[0_20px_50px_rgba(0,180,255,0.4)]"
          />

          {/* ── BOTTOM WATERMARK & FRAME (z-20) ──────────────────── */}
          <div className="absolute bottom-0 w-full h-[20vh] md:h-[25vh] bg-white flex items-end overflow-hidden z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            <h1 className="text-[8rem] md:text-[15rem] font-black italic text-gray-300 leading-[0.7] -translate-x-2 md:-translate-x-4 tracking-tighter drop-shadow-sm">
              SKILLS
            </h1>
          </div>

          {/* ── TOP LEFT INFO BANNER (z-30) ──────────────────────── */}
          <div className="absolute top-[8%] left-[5%] md:left-[10%] z-30 flex items-center gap-3">
            <div className="border-[1.5px] border-cyan-400 rounded-full px-3 py-0.5 text-cyan-400 text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(0,255,255,0.3)] bg-cyan-900/30">
              Info
            </div>
            <span className="text-cyan-400 text-sm md:text-lg font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Hover to view proficiency levels
            </span>
          </div>

          {/* ── SKILLS LIST (The Sliders Container - z-30) ───────── */}
          <div className="absolute top-[20%] left-[5%] md:left-[10%] w-[90%] md:w-[50%] flex flex-col gap-2 z-30">
            {skills.map((skill) => {
              const isActive = hoveredSkill === skill.id;

              return (
                <div 
                  key={skill.id}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onClick={() => setHoveredSkill(skill.id)}
                  className={`flex items-center gap-4 md:gap-6 px-4 md:px-6 py-2 transition-all duration-300 cursor-pointer rounded-sm ${
                    isActive 
                      ? 'bg-white border-t-[4px] border-[#ff0050] shadow-[0_10px_30px_rgba(0,0,0,0.5)] scale-105 z-10' 
                      : 'bg-transparent z-0 hover:bg-white/5'
                  }`}
                >
                  {/* Skill Name & Icon */}
                  <div className={`w-[45%] md:w-[40%] flex items-center justify-end gap-3 transition-colors duration-300 ${
                    isActive ? 'text-black font-black text-xl md:text-2xl drop-shadow-sm' : 'text-cyan-400 font-bold text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                  }`}>
                    {skill.name}
                    {skill.iconSlugs && skill.iconSlugs.length > 0 && (
                      <div className="flex items-center gap-1.5 md:gap-2">
                        {skill.iconSlugs.map((slug) => (
                          <img 
                            key={slug}
                            src={`https://cdn.simpleicons.org/${slug}/${isActive ? '000000' : '22d3ee'}`} 
                            className="w-4 h-4 md:w-5 md:h-5 object-contain" 
                            alt={slug} 
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Slider Container */}
                  <div className={`flex-1 h-8 rounded-full flex items-center px-1 md:px-2 relative transition-colors duration-300 ${
                    isActive ? 'bg-[#050b1a] shadow-inner' : 'bg-black/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] border border-white/10'
                  }`}>
                    {/* Left Arrow (Active) */}
                    {isActive && (
                      <motion.span 
                        animate={{ x: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-white font-black absolute left-2 text-xl z-20"
                      >
                        &lt;
                      </motion.span>
                    )}
                    
                    {/* Inner Bar (Fill) */}
                    <div className="w-full h-2 md:h-3 rounded-full bg-white/10 ml-6 mr-6 relative overflow-visible">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                        className="absolute top-0 left-0 h-full bg-white rounded-full flex items-center justify-end shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      >
                        {/* Circle Knob & Value Tooltip */}
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] absolute -right-2 flex justify-center">
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 0 }}
                              animate={{ opacity: 1, y: -28 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                              className="absolute bg-white text-[#050b1a] font-black italic text-[10px] md:text-xs px-2 py-0.5 rounded-sm shadow-[0_4px_10px_rgba(0,0,0,0.8)] border-b-2 border-[#ff0050] whitespace-nowrap pointer-events-none"
                            >
                              {skill.level} / 100
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Arrow (Active) */}
                    {isActive && (
                      <motion.span 
                        animate={{ x: [2, -2, 2] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-white font-black absolute right-2 text-xl z-20"
                      >
                        &gt;
                      </motion.span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── ESC BACK BUTTON ─────────────────────────────────── */}
          <div 
            className="absolute top-6 left-6 md:top-8 md:left-10 z-50 flex items-center gap-2 cursor-pointer group bg-white/70 md:bg-transparent backdrop-blur-none md:backdrop-blur-none px-3 py-1.5 md:p-0 rounded-full md:rounded-none border border-black/10 md:border-transparent transition-all hover:bg-white/90 md:hover:bg-transparent"
            onClick={onClose}
          >
            <div className="w-8 h-8 rounded-full border-2 border-black/20 flex items-center justify-center
                            group-hover:border-[#ff0050] group-hover:bg-[#ff0050] transition-colors bg-black/10 md:bg-transparent">
              <span className="text-black font-bold text-xs group-hover:text-white transition-colors">
                ESC
              </span>
            </div>
            <span className="text-black font-bold italic tracking-wider group-hover:text-[#ff0050] transition-colors uppercase">
              BACK
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
