import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const contactInfo = [
  { label: "EMAIL", value: "mraihanrmdhni@gmail.com", href: "mailto:mraihanrmdhni@gmail.com", prefix: "01", iconSlug: "gmail" },
  { label: "LINKEDIN", value: "linkedin.com/in/m-raihan-ramadhani", href: "https://www.linkedin.com/in/m-raihan-ramadhani", prefix: "02", iconSlug: "linkedin" },
  { label: "WHATSAPP", value: "0813 1547 2744", href: "https://wa.me/6281315472744", prefix: "03", iconSlug: "whatsapp" },
  { label: "INSTAGRAM", value: "@raihan.rmdhni", href: "https://www.instagram.com/raihan.rmdhni/", prefix: "04", iconSlug: "instagram" }
];

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } }
};

const bannerVariants = {
  hidden: { x: '-100vw', y: '100vh', rotate: -10 },
  visible: {
    x: '-20vw', // Offset to perfectly fill the left side
    y: '5%',
    rotate: -10,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 90,
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  exit: {
    x: '-100vw',
    y: '100vh',
    rotate: -10,
    transition: { duration: 0.4, ease: 'easeIn' }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50, rotate: 10 },
  visible: { opacity: 1, x: 0, rotate: 10, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function ContactModal({ isOpen, onClose }) {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="contact-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 w-screen h-screen z-50 bg-[#020617] select-none font-oswald overflow-hidden"
        >
          {/* ── GLOBAL BACKGROUND & TEXTURE (z-0) ───────────────────────────── */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/Home Background.png"
              alt="Texture"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
            />
            <motion.div
              animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute top-[10%] left-[70%] w-64 h-64 bg-cyan-500/10"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
            <motion.div
              animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              className="absolute top-[80%] left-[10%] w-32 h-32 bg-pink-500/10"
              style={{ clipPath: 'polygon(0 40%, 100% 0, 80% 100%)' }}
            />
          </div>

          <div className="absolute inset-0 z-0 pointer-events-none flex items-start justify-center pt-2 md:pt-10">
            <h1
              className="text-[12rem] md:text-[25rem] font-black italic uppercase leading-none tracking-tighter"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.05)',
              }}
            >
              CONTACT
            </h1>
          </div>

          {/* ── THE DIAGONAL BANNER (z-10) ────────────────────────── */}
          {/* Huge width to ensure no background gaps, positioned slightly off-screen to the left */}
          <motion.div
            variants={bannerVariants}
            className="absolute -top-[10%] md:top-[5%] w-[150vw] h-[100vh] md:h-[75vh] bg-[#00a8ff] shadow-[0_0_80px_rgba(0,168,255,0.6)] overflow-hidden z-10 origin-center border-t-8 border-b-8 border-white/20"
          >
            {/* Marquee Background inside Banner */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden flex flex-col justify-between py-10 md:py-4">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="whitespace-nowrap text-black font-black italic text-8xl"
              >
                LEVEL UP YOUR PROJECT! /// GET IN TOUCH /// LEVEL UP YOUR PROJECT! /// GET IN TOUCH /// LEVEL UP YOUR PROJECT! /// GET IN TOUCH ///
              </motion.div>
              <motion.div
                animate={{ x: [-1000, 0] }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="whitespace-nowrap text-black font-black italic text-8xl"
              >
                LET'S COLLABORATE /// AVAILABLE FOR HIRE /// LET'S COLLABORATE /// AVAILABLE FOR HIRE /// LET'S COLLABORATE /// AVAILABLE FOR HIRE ///
              </motion.div>
            </div>

            {/* ── INNER SCREEN-SIZED WRAPPER ──────────────────────── */}
            {/* Cancels out the parent's off-screen offset so content aligns perfectly with screen edge */}
            <div className="absolute left-[20vw] top-0 w-[100vw] h-full flex flex-row">

              {/* ── CONTENT (Left Side) ─────────────────────────────── */}
              <div className="w-full md:w-[70%] h-full flex flex-col justify-center px-[8vw] relative z-20 mt-10 md:mt-0">

                {/* Header Title (Rotated back to straight) */}
                <motion.div variants={itemVariants} className="mb-4 md:mb-8 origin-left">
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-3 h-16 md:w-5 md:h-24 bg-black skew-x-12 hidden md:block"></div>
                    <h2 className="text-black text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] font-black italic leading-[0.85] tracking-tighter drop-shadow-md">
                      GET IN<br/>TOUCH!
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 mt-4 ml-1 md:ml-12">
                    <span className="bg-black text-white text-[10px] md:text-sm font-bold px-3 py-1 tracking-widest uppercase italic shadow-[4px_4px_0_rgba(255,0,80,1)]">
                      Rank Max
                    </span>
                    <h3 className="text-white text-base md:text-2xl font-bold tracking-widest drop-shadow-lg">
                      M. Raihan Ramadhani
                    </h3>
                  </div>
                </motion.div>

                {/* Contact Info / Stats Rows */}
                <div className="flex flex-col gap-4 md:gap-8 ml-1 md:ml-12 relative w-full max-w-4xl">
                  {/* Decorative Side Line */}
                  <div className="absolute -left-4 md:-left-6 top-2 bottom-2 w-1 bg-white/20 hidden md:block"></div>

                  {contactInfo.map((info, idx) => (
                    <motion.a
                      key={idx}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="group flex flex-col md:flex-row md:items-end gap-1 md:gap-6 border-b-[3px] border-black/10 pb-2 md:pb-4 origin-left cursor-pointer transition-all hover:border-[#ff0050] hover:pl-4"
                    >
                      <div className="flex items-center gap-2 md:gap-3 w-full md:w-56 shrink-0">
                        <span className="text-black font-black italic text-lg md:text-2xl opacity-40 group-hover:opacity-100 transition-opacity">{info.prefix}</span>
                        <img
                          src={info.iconSlug === "linkedin" ? "/linkedin.svg" : `https://cdn.simpleicons.org/${info.iconSlug}/ffffff`}
                          className="w-4 h-4 md:w-5 md:h-5 object-contain"
                          alt={info.label}
                        />
                        <span className="text-white text-[10px] md:text-sm font-bold tracking-widest uppercase">
                          {info.label}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 flex-1 relative break-all md:break-normal mt-1 md:mt-0">
                        <span className="text-white font-black text-lg md:text-2xl lg:text-3xl italic group-hover:text-[#ff0050] transition-colors drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                          {info.value}
                        </span>
                        {/* Arrow Icon appears on hover */}
                        <span className="text-[#ff0050] text-xl md:text-3xl font-black italic ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          ↗
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* ── RIGHT SIDE PORTRAIT ─────────────────────────────── */}
              {/* Shadow Layer */}
              <motion.img
                initial={{ opacity: 0, scale: 1.1, x: 20 }}
                animate={{ opacity: 0.3, scale: 1, x: 0, transition: { delay: 0.4, duration: 0.6 } }}
                src="/rehan blue sedikit.svg"
                className="absolute right-[-10vw] md:right-0 bottom-[-5vh] md:bottom-0 h-[70%] md:h-[95%] object-contain object-bottom mix-blend-multiply pointer-events-none translate-x-10 translate-y-10 filter blur-sm"
                alt="Portrait Shadow"
              />
              {/* Main Portrait */}
              <motion.img
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.9, scale: 1, transition: { delay: 0.3, duration: 0.5 } }}
                src="/rehan blue sedikit.svg"
                className="absolute right-[-10vw] md:right-0 bottom-[-5vh] md:bottom-0 h-[70%] md:h-[95%] object-contain object-bottom mix-blend-color-burn opacity-90 pointer-events-none drop-shadow-2xl"
                alt="Portrait"
              />

            </div>
          </motion.div>

          {/* ── ESC BACK BUTTON (z-50) ──────────────────────────── */}
          <div 
            className="absolute top-6 left-6 md:top-10 md:left-10 z-50 flex items-center gap-2 md:gap-3 cursor-pointer group bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-3 py-1.5 md:p-0 rounded-full md:rounded-none border border-white/10 md:border-transparent transition-all hover:bg-black/40 md:hover:bg-transparent"
            onClick={onClose}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/30 flex items-center justify-center
                            group-hover:border-[#ff0050] group-hover:bg-[#ff0050] transition-colors bg-black/20">
              <span className="text-white font-bold text-[10px] md:text-xs group-hover:text-white transition-colors">
                ESC
              </span>
            </div>
            <span className="text-white font-bold italic tracking-widest text-sm md:text-base group-hover:text-[#ff0050] transition-colors drop-shadow-md">
              BACK
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
