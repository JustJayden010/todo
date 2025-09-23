import { useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Menu, Moon, Palette, Sun } from "lucide-react";

const THEMES: Record<string, { name: string; gradient: string; text?: string; badge?: string }> = {
  dawn: {
    name: 'Dawn',
    gradient: 'bg-gradient-to-br from-rose-200 via-pink-200 to-orange-200',
    text: 'text-slate-800',
    badge: 'bg-white/30 text-slate-800',
  },
  day: {
    name: 'Day',
    gradient: 'bg-gradient-to-br from-sky-300 via-cyan-300 to-emerald-300',
    text: 'text-slate-900',
    badge: 'bg-white/40 text-slate-900',
  },
  dusk: {
    name: 'Dusk',
    gradient: 'bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-orange-300',
    text: 'text-white',
    badge: 'bg-white/20 text-white',
  },
  night: {
    name: 'Night',
    gradient: 'bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-900',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
  ocean: {
    name: 'Ocean',
    gradient: 'bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-500',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
  sunset: {
    name: 'Sunset',
    gradient: 'bg-gradient-to-br from-yellow-300 via-orange-400 to-rose-500',
    text: 'text-slate-900',
    badge: 'bg-white/30 text-slate-900',
  },
  forest: {
    name: 'Forest',
    gradient: 'bg-gradient-to-br from-emerald-700 via-green-600 to-lime-500',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
  midnight: {
    name: 'Midnight',
    gradient: 'bg-gradient-to-br from-black via-slate-800 to-indigo-900',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
  royal: {
    name: 'Royal',
    gradient: 'bg-gradient-to-br from-purple-700 via-violet-600 to-cyan-500',
    text: 'text-white',
    badge: 'bg-white/10 text-white',
  },
};
export const GlassHeader: React.FC<{
  themeKey: keyof typeof THEMES;
  setThemeKey: (k: any ) => void;
  autoTheme: boolean;
  setAutoTheme: (v: boolean) => void;
  onSecretClick: () => void;
}> = ({ themeKey, setThemeKey, autoTheme, setAutoTheme, onSecretClick }) => {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const clickTimer = useRef<any>(null);

  // Multi‑click on logo → part of the Easter egg
  const handleLogoClick = () => {
    setClicks((c) => c + 1);
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => setClicks(0), 800);
    if (clicks + 1 >= 7) {
      onSecretClick();
      setClicks(0);
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,94%)]">
      <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-4 sm:px-6 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="group inline-flex items-center gap-2 select-none"
          aria-label="Logo"
        >
          <div className="relative">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              className="grid place-content-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/60 to-white/20 text-slate-900"
            >
              <Check className="w-6 h-6" />
            </motion.div>
            <span className="absolute -bottom-2 -right-2 text-[10px] px-2 py-0.5 rounded-full bg-white/30 text-white/90 shadow-sm">
              v1.0
            </span>
          </div>
          <span className="font-bold tracking-tight text-white drop-shadow group-hover:scale-105 transition">
            Jayden’s To‑Do
          </span>
        </button>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {[
            { href: '#features', label: 'Features' },
            { href: '#todos', label: 'Example Todos' },
            { href: '#pricing', label: 'Pricing' },
            { href: '#faq', label: 'FAQ' },
            { href: '#about', label: 'About' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition shadow-sm hover:shadow-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 hover:text-white transition"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Theme</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/20 bg-white/20 backdrop-blur-xl p-2 shadow-2xl"
                >
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-xs text-white/90">Auto by time</span>
                    <button
                      onClick={() => setAutoTheme(!autoTheme)}
                      className={`w-10 h-6 rounded-full relative transition ${
                        autoTheme ? 'bg-emerald-400/70' : 'bg-slate-400/50'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 ${autoTheme ? 'left-5' : 'left-0.5'} w-5 h-5 bg-white rounded-full shadow`}
                      />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(THEMES).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setThemeKey(key as keyof typeof THEMES);
                          setOpen(false);
                        }}
                        className={`group flex items-center gap-2 rounded-xl border border-white/20 p-3 text-left hover:bg-white/20 transition ${val.gradient}`}
                      >
                        <span className="grid place-content-center w-8 h-8 rounded-lg bg-black/20">
                          {key === 'night' || key === 'midnight' ? (
                            <Moon className="w-4 h-4 text-white" />
                          ) : (
                            <Sun className="w-4 h-4 text-white" />
                          )}
                        </span>
                        <div>
                          <div className="text-xs text-white/90">{val.name}</div>
                          <div className="text-[10px] text-white/80 opacity-80">click to apply</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu (decorative) */}
          <button className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 hover:text-white transition" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};