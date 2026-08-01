import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const achievements = [
  {
    id: 1, type: "ACADEMIC", title: "IN-FEST 2025 Web Dev", rank: "3RD",
    desc: "Awarded 3rd Place in the national-level Web Development Competition for developing 'CityList', an AI-powered smart city web application.",
    images: ["/Juara 3 Infest.webp", "/Sertifikat Juara M. Raihan Ramadhani LOMBA WEB DEVELOPMENT TINGKAT NASIONAL.jpg"]
  },
  {
    id: 2, type: "NON-ACADEMIC", title: "Valorant FIK FAIR", rank: "2ND",
    desc: "Achieved Runner-Up (2nd Place) in a competition involving 10 teams, 55 participants, 13 universities, and 7 provinces.",
    images: ["/Sertifikat Lomba FIK FAIR Valorant 2024.png"]
  },
  {
    id: 3, type: "NON-ACADEMIC", title: "IEC 2024", rank: "3RD",
    desc: "Secured 3rd Place / Marvelous tier in the IEC 2024 competition.",
    images: ["/IEC 3rd Winner.jpg", "/Sertifikat IEC 2024 - Marvelous.jpg"]
  },
  {
    id: 4, type: "NON-ACADEMIC", title: "Nouns Valorant Tourney", rank: "3RD",
    desc: "Achieved 3rd Place at the Nouns Valorant Tournament held by Hasanuddin University.",
    images: ["/Nouns Valorant Tournament Hasanuddin University 3rd Winner.jpg", "/Sertifikat_3rd Place_Nouns Valorant Tournament Hasanuddin University 2024.png"]
  },
  {
    id: 5, type: "NON-ACADEMIC", title: "TEC 2024", rank: "PTCPT",
    desc: "Successfully participated and achieved recognition in TEC 2024.",
    images: ["/Sertif TEC 2024_Raihan.png"]
  }
];

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export default function AchievementModal({ isOpen, onClose }) {
  const [selectedId, setSelectedId] = useState(1);
  const [isReversed, setIsReversed] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => setSelectedId(1), 300);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowDown') {
        const idx = achievements.findIndex(a => a.id === selectedId);
        if (idx < achievements.length - 1) {
          setSelectedId(achievements[idx + 1].id);
          setIsReversed(false);
        }
      }
      if (e.key === 'ArrowUp') {
        const idx = achievements.findIndex(a => a.id === selectedId);
        if (idx > 0) {
          setSelectedId(achievements[idx - 1].id);
          setIsReversed(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedId]);

  if (!isOpen) return null;
  const selected = achievements.find(a => a.id === selectedId);

  return (
    <AnimatePresence>
      <motion.div
        key="achievement-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 w-screen h-screen z-50 bg-[#003eb3] select-none font-oswald flex flex-col md:flex-row overflow-hidden"
      >
        {/* ── BACKGROUND ────────────────────────────────────────── */}
        <div className="absolute inset-0 bg-blue-900 opacity-40 mix-blend-multiply pointer-events-none z-0" />
        <img
          src="/Home Background.png"
          alt="Background Texture"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 mix-blend-overlay pointer-events-none"
        />

        {/* ── WATERMARK TEXT (Right Edge) ───────────────────────── */}
        <div className="absolute right-[-15vh] md:right-[-10vw] top-1/2 -translate-y-1/2 -rotate-90 opacity-10 pointer-events-none z-0 hidden md:block">
          <h1 className="text-[10rem] md:text-[14rem] font-black italic text-white leading-none tracking-tighter drop-shadow-2xl whitespace-nowrap">
            ACHIEVEMENT
          </h1>
        </div>

        {/* ── LEFT COLUMN (The List) ────────────────────────────── */}
        <div className="w-full md:w-[35%] h-[40%] md:h-full z-20 flex flex-col pt-8 md:pt-20 px-4 md:pl-8 shrink-0 relative">
          <h2 className="text-white text-5xl md:text-6xl font-black italic mb-4 md:mb-6 ml-2 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] tracking-tighter shrink-0">
            LIST
          </h2>
          <div className="flex flex-col gap-2 md:gap-3 pb-24 md:pb-8 overflow-y-auto overflow-x-hidden scrollbar-hide flex-1 min-h-0 pr-4 -mr-4">
            {achievements.map((ach) => {
              const isActive = ach.id === selectedId;
              return (
                <motion.button
                  key={ach.id}
                  onClick={() => {
                    setSelectedId(ach.id);
                    setIsReversed(false);
                  }}
                  whileHover={{ scale: isActive ? 1.05 : 1.02, x: isActive ? 0 : 10 }}
                  className={`
                     relative w-full flex items-center justify-between px-6 py-3 md:py-4 transition-all duration-300 cursor-pointer text-left
                     ${isActive
                      ? 'bg-white border-l-8 border-[#ff0050] text-black shadow-[0_10px_25px_rgba(0,0,0,0.6)] scale-105 z-10'
                      : 'bg-[#00287a] border-l-4 border-cyan-400 text-white shadow-lg opacity-90 hover:opacity-100'
                    }
                   `}
                  style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}
                >
                  <div className="flex flex-col flex-1 mr-4 overflow-hidden">
                    <span className={`text-xs md:text-sm font-semibold tracking-widest ${isActive ? 'text-gray-500' : 'text-cyan-300'}`}>
                      {ach.type}
                    </span>
                    <span className="text-xl md:text-2xl lg:text-3xl font-black italic leading-none mt-1 truncate">
                      {ach.title}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 md:gap-2 shrink-0">
                    <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${isActive ? 'text-gray-500' : 'text-cyan-300'}`}>
                      RANK
                    </span>
                    <span className={`text-3xl md:text-5xl font-black italic leading-none ${isActive ? 'text-black' : 'text-white'}`}>
                      {ach.rank}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT COLUMN (The Detail View) ────────────────────── */}
        <div className="w-full md:w-[65%] h-[60%] md:h-full relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              {/* Images Display (Floating) */}
              <div className="absolute inset-0 flex items-center justify-center p-2 md:p-12 pb-48 md:pb-24">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative w-full h-[50vh] md:h-full flex items-center justify-center origin-center scale-95 md:scale-110 mt-[-10%]"
                >
                  {selected.images.length === 1 ? (
                    <img
                      src={selected.images[0]}
                      alt={selected.title}
                      className="max-w-[90%] md:max-w-[75%] max-h-[80%] md:max-h-[90%] object-contain border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-white"
                    />
                  ) : (
                    <>
                      <img
                        src={selected.images[0]}
                        alt={`${selected.title} 1`}
                        onClick={() => setIsReversed(!isReversed)}
                        className={`absolute max-w-[85%] md:max-w-[65%] max-h-[85%] md:max-h-[80%] object-contain border-[6px] border-white bg-white origin-bottom-left transition-all duration-500 cursor-pointer
                          ${isReversed 
                            ? 'z-20 scale-105 rotate-0 translate-x-0 md:-translate-x-8 shadow-[0_25px_50px_rgba(0,0,0,0.8)]' 
                            : 'z-0 scale-90 -rotate-6 -translate-x-8 md:-translate-x-12 opacity-80 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
                          }`}
                      />
                      <img
                        src={selected.images[1]}
                        alt={`${selected.title} 2`}
                        onClick={() => setIsReversed(!isReversed)}
                        className={`absolute max-w-[85%] md:max-w-[70%] max-h-[85%] md:max-h-[85%] object-contain border-[6px] border-white bg-white origin-bottom-right transition-all duration-500 cursor-pointer
                          ${!isReversed 
                            ? 'z-20 scale-105 rotate-0 translate-x-0 md:translate-x-8 shadow-[0_25px_50px_rgba(0,0,0,0.8)]' 
                            : 'z-0 scale-90 rotate-6 translate-x-8 md:translate-x-12 translate-y-4 md:translate-y-8 opacity-80 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
                          }`}
                      />
                    </>
                  )}
                </motion.div>
              </div>

              {/* Description Box */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="absolute bottom-20 md:bottom-28 right-4 md:right-12 w-[90%] md:w-auto md:max-w-xl bg-[#0a0a2a]/95 backdrop-blur-md p-6 md:p-8 border-l-[6px] border-cyan-400 shadow-[0_15px_30px_rgba(0,0,0,0.8)] z-20"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)' }}
              >
                <h3 className="text-cyan-400 font-black italic text-2xl md:text-4xl mb-3 drop-shadow-[0_0_15px_rgba(0,255,255,0.4)] leading-none">
                  {selected.title}
                </h3>
                <p className="text-white text-sm md:text-lg font-sans leading-relaxed opacity-95">
                  {selected.desc}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── ESC BACK BUTTON (top-left) ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 25 }}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-50 bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-3 py-1.5 md:p-0 rounded-full md:rounded-none border border-white/10 md:border-transparent transition-all"
        >
          <div
            onClick={handleClose}
            className="flex items-center gap-2 md:gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/30 flex items-center justify-center
                            group-hover:border-[#ff0050] group-hover:bg-[#ff0050] transition-colors bg-black/40 md:bg-black/20">
              <span className="text-white font-bold text-[10px] md:text-xs group-hover:text-white transition-colors">
                ESC
              </span>
            </div>
            <span className="text-white font-bold italic tracking-widest text-sm md:text-base group-hover:text-[#ff0050] transition-colors drop-shadow-md uppercase">
              BACK
            </span>
          </div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}
