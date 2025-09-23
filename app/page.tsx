'use client';

import React, { JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Star,
  CheckCircle,
  Quote,
  Moon,
  Sun,
  Sparkles,
  Palette,
  MonitorSmartphone,
  CalendarDays,
  Check,
  Clock3,
  AlarmClock,
  AlarmClockOff,
  Trophy,
  Plus,
  Minus,
  Play,
  Pause,
  BadgeCheck,
  ShieldCheck,
  Handshake,
  Rocket,
  Timer,
  Users2,
  Layers,
  LibraryBig,
  FolderKanban,
  Search,
  Filter,
  GitBranch,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Heart,
  Swords,
  Ghost,
  Lock,
  Eye,
  EyeOff,
  Info,
  Crown,
  WandSparkles,
  BatteryCharging,
  Milestone,
  ClipboardCheck,
  Music,
  Flame,
} from 'lucide-react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { GlassHeader } from './components/glassHeader';

// -------------------------------
// Utilities & Constants
// -------------------------------

// Testimonials (retained & expanded)
const testimonials = [
  {
    name: 'Pretty..... Yindah 💖',
    quote: "Jayden’s app helped me stay on top of my exams and even plan dates. 10/10!",
  },
  {
    name: 'Red Fox (Testimony)',
    quote: 'I used to forget assignments. Not anymore. Clean design. Fast. Love it.',
  },
  {
    name: 'Breakthrough (Phyton)',
    quote: 'From duels to deadlines — this app keeps me sharp!',
  },
  {
    name: 'Ama',
    quote: 'The glass UI is 🤌🏽. Theme auto‑switching at dusk is my fave!',
  },
  {
    name: 'Dami',
    quote: 'Checked a box, dopamine hit, back to focus. Simple as that.',
  },
];

// Feature bullets
const features = [
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: 'Smart Scheduling',
    desc: 'Auto‑prioritize by due dates and energy level.',
  },
  { icon: <ClipboardCheck className="w-6 h-6" />, title: 'Quick Capture', desc: 'Add tasks in 0.4s with /commands & templates.' },
  { icon: <Timer className="w-6 h-6" />, title: 'Focus Timers', desc: 'Pomodoro & custom intervals with gentle sounds.' },
  { icon: <Search className="w-6 h-6" />, title: 'Instant Search', desc: 'Type to filter through tasks, tags & projects.' },
  { icon: <Filter className="w-6 h-6" />, title: 'Power Filters', desc: 'Filter by status, priority, tags, or due range.' },
  { icon: <LibraryBig className="w-6 h-6" />, title: 'Templates', desc: 'Daily plan, exam prep, reading list & more.' },
  { icon: <Users2 className="w-6 h-6" />, title: 'Collaboration', desc: 'Share lists, assign dates, track progress.' },
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Privacy First', desc: 'Local‑first encryption for your tasks.' },
];

// Themes – gradient definitions
// Each theme maps to Tailwind gradient classes
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

// Time‑of‑day → theme mapping
function themeByHour(h: number): keyof typeof THEMES {
  if (h >= 5 && h < 10) return 'dawn'; // 5am‑9:59am
  if (h >= 10 && h < 17) return 'day'; // 10am‑4:59pm
  if (h >= 17 && h < 20) return 'dusk'; // 5pm‑7:59pm
  return 'night'; // 8pm‑4:59am
}

// Simple debounce
function debounce<T extends (...args: any[]) => void>(fn: T, delay = 250) {
  let t: any;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// Intersection Observer Hook for on‑scroll animations
function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.15 }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setInView(true);
      });
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);
  return { ref, inView } as const;
}

// Prefers Reduced Motion
function useReduceMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener('change', cb);
    return () => m.removeEventListener('change', cb);
  }, []);
  return reduced;
}

// Konami Code hook (↑↑↓↓←→←→BA or variant using Arrow keys + letters)
function useKonamiCode(onUnlock: () => void) {
  const sequence = useRef<string[]>([]);
  const handler = useCallback(
    (e: KeyboardEvent) => {
      const allowed = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'a',
        'A',
        'b',
        'B',
      ];
      if (!allowed.includes(e.key)) return;
      sequence.current.push(e.key);
      const str = sequence.current.join(',');
      const target = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a';
      if (str.toLowerCase().endsWith(target)) {
        onUnlock();
        sequence.current = [];
      }
      if (sequence.current.length > 20) sequence.current.shift();
    },
    [onUnlock]
  );
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}

// -------------------------------
// Reusable UI Components
// -------------------------------



// Glass Card wrapper
const GlassCard: React.FC<{
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  hover?: boolean;
}> = ({ className = '', children, as = 'div', hover = true }) => {
  const Comp: any = as;
  return (
    <Comp
      className={`rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-xl ${
        hover ? 'hover:-translate-y-1 hover:shadow-2xl transition-transform' : ''
      } ${className}`}
    >
      {children}
    </Comp>
  );
};

// Section Header helper
const SectionHeader: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}> = ({ eyebrow, title, subtitle, icon }) => (
  <div className="text-center max-w-2xl mx-auto mb-10">
    {eyebrow && (
      <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white/90 border border-white/20">
        {icon || <Sparkles className="w-3 h-3" />} {eyebrow}
      </span>
    )}
    <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white drop-shadow">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-white/85 text-sm sm:text-base leading-relaxed">{subtitle}</p>
    )}
  </div>
);

// Floating sparkles background (subtle)
const SparkleField: React.FC = () => {
  const [particles] = useState(() =>
    Array.from({ length: 24 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 6,
      delay: Math.random() * 6,
    }))
  );
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: p.delay }}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          className="absolute rounded-full bg-white/30 blur-[1px]"
        >
          <span style={{ width: p.size, height: p.size }} className="block" />
        </motion.span>
      ))}
    </div>
  );
};

// Tilt on hover wrapper (subtle)
const Tilt: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -10;
      const ry = ((x / rect.width) - 0.5) * 10;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <div ref={ref} className={`transition-transform duration-150 will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// FAQ item
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <GlassCard className="p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-semibold text-white/95">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/80 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-sm text-white/80 mt-2"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

// -------------------------------
// Mock Todo Section
// -------------------------------

type Todo = {
  id: string;
  title: string;
  due?: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  tag?: string;
};

type TodoList = {
  id: string;
  name: string;
  items: Todo[];
};

const MOCK_LISTS: TodoList[] = [
  {
    id: 'l1',
    name: 'Today',
    items: [
      { id: 't1', title: 'Revise Data Structures', due: 'Today 7pm', priority: 'High', completed: false, tag: 'Study' },
      { id: 't2', title: 'Plan date with Pretty... Yindah 💖', due: 'Fri 6pm', priority: 'Medium', completed: false, tag: 'Life' },
      { id: 't3', title: 'Gym – Pull Day', due: 'Today 5pm', priority: 'Low', completed: true, tag: 'Health' },
    ],
  },
  {
    id: 'l2',
    name: 'Upcoming',
    items: [
      { id: 't4', title: 'System Programming Lab', due: 'Thu', priority: 'High', completed: false, tag: 'C++' },
      { id: 't5', title: 'Portfolio Creator – Demo', due: 'Mon', priority: 'High', completed: false, tag: 'Project' },
      { id: 't6', title: 'Free Fire 1v1 – Red Fox', due: 'Wed 9pm', priority: 'Medium', completed: false, tag: 'Fun' },
    ],
  },
  {
    id: 'l3',
    name: 'Someday',
    items: [
      { id: 't7', title: 'Refactor todo API', priority: 'Low', completed: false, tag: 'Dev' },
      { id: 't8', title: 'Read “Clean Architecture”', priority: 'Low', completed: false, tag: 'Reading' },
      { id: 't9', title: 'Start blog – tech + tips', priority: 'Low', completed: false, tag: 'Writing' },
    ],
  },
];

// Pill component
const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full ${className}`}>{children}</span>
);

const PriorityBadge: React.FC<{ p: Todo['priority'] }> = ({ p }) => {
  const map: Record<Todo['priority'], string> = {
    Low: 'bg-emerald-400/20 text-emerald-200 border border-emerald-300/20',
    Medium: 'bg-amber-400/20 text-amber-100 border border-amber-300/20',
    High: 'bg-rose-500/20 text-rose-100 border border-rose-300/20',
  };
  return <Pill className={map[p]}>{p}</Pill>;
};

const TodoItemRow: React.FC<{
  item: Todo;
  onToggle: (id: string) => void;
}> = ({ item, onToggle }) => {
  return (
    <div className="group flex items-center justify-between gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => onToggle(item.id)}
          className={`grid place-content-center w-6 h-6 rounded-md border transition ${
            item.completed ? 'bg-emerald-400/60 border-emerald-400' : 'bg-white/10 border-white/30'
          }`}
          aria-label={item.completed ? 'Mark as not done' : 'Mark as done'}
        >
          {item.completed ? <Check className="w-4 h-4 text-white" /> : <div className="w-3 h-3 rounded-sm bg-white/40" />}
        </button>
        <div className="min-w-0">
          <div
            className={`text-sm font-medium text-white/95 truncate ${item.completed ? 'line-through opacity-70' : ''}`}
          >
            {item.title}
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-white/70">
            {item.due && (
              <span className="inline-flex items-center gap-1">
                <Clock3 className="w-3 h-3" /> {item.due}
              </span>
            )}
            <PriorityBadge p={item.priority} />
            {item.tag && <Pill className="bg-white/10 border border-white/20 text-white/85">#{item.tag}</Pill>}
          </div>
        </div>
      </div>
      <button className="opacity-0 group-hover:opacity-100 transition px-2 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 border border-white/20">
        Edit
      </button>
    </div>
  );
};

const MockTodosBoard: React.FC = () => {
  const [lists, setLists] = useState<TodoList[]>(MOCK_LISTS);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Done'>('All');

  const toggle = (id: string) => {
    setLists((prev) =>
      prev.map((l) => ({
        ...l,
        items: l.items.map((it) => (it.id === id ? { ...it, completed: !it.completed } : it)),
      }))
    );
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return lists.map((l) => ({
      ...l,
      items: l.items.filter((it) => {
        const matchesQuery = !q || it.title.toLowerCase().includes(q) || (it.tag || '').toLowerCase().includes(q);
        const matchesFilter =
          filter === 'All' ? true : filter === 'Active' ? !it.completed : it.completed;
        return matchesQuery && matchesFilter;
      }),
    }));
  }, [lists, query, filter]);

  return (
    <section id="todos" className="mt-24 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="See it in action"
        title="Example Todo Board"
        subtitle="This mock data shows how your tasks look — with priorities, due dates, tags, filters and search."
        icon={<FolderKanban className="w-4 h-4" />}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks or #tags..."
              className="pl-9 pr-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-white/10 border border-white/20 p-1">
            {(['All', 'Active', 'Done'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filter === t ? 'bg-white/25 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-white/80">
          Tip: Press <kbd className="px-1 bg-white/20 rounded">/</kbd> to focus the search.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((list) => (
          <GlassCard key={list.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white/95">{list.name}</h3>
              <Pill className="bg-white/10 border border-white/20 text-white/85">
                {list.items.length} items
              </Pill>
            </div>
            <div className="space-y-1">
              {list.items.length === 0 && (
                <div className="text-sm text-white/70">No tasks match your filter.</div>
              )}
              {list.items.map((item) => (
                <TodoItemRow key={item.id} item={item} onToggle={toggle} />
              ))}
            </div>
            <button className="mt-3 inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20">
              <Plus className="w-3 h-3" /> Add task
            </button>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

// -------------------------------
// Sections
// -------------------------------

const Hero: React.FC<{ onGetStarted: () => void; themeKey: keyof typeof THEMES }>
 = ({ onGetStarted, themeKey }) => {
  const reduced = useReduceMotion();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="pt-28 sm:pt-32 text-center space-y-6 max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl font-extrabold leading-tight drop-shadow-md text-white"
      >
        Stay Focused. Organize Life.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-lg text-white/90"
      >
        Introducing Jayden’s To‑Do List — a clean, fast, student‑friendly task manager that helps you achieve more.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.95 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 14 }}
        className="flex items-center justify-center gap-3"
      >
        <button
          onClick={onGetStarted}
          className="bg-white text-slate-900 font-semibold px-8 py-3 rounded-full text-lg hover:scale-110 transition transform shadow-lg hover:shadow-2xl"
        >
          🚀 Start Now
        </button>
        <a
          href="#features"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 text-white/90 hover:text-white transition"
        >
          <Play className="w-4 h-4" /> Explore features
        </a>
      </motion.div>

      {/* Theme badge */}
      <div className="flex items-center justify-center">
        <span className={`text-xs px-3 py-1 rounded-full border ${THEMES[themeKey].badge}`}>
          Theme: {THEMES[themeKey].name}
        </span>
      </div>

      {/* Decorative phone mockup */}
      <div className="relative max-w-5xl mx-auto mt-10">
        <GlassCard className="mx-auto p-2 w-[min(900px,95%)]">
          <div className="grid md:grid-cols-2 gap-4 p-3">
            <Tilt>
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/90 text-sm font-semibold">Today</span>
                  <span className="text-white/70 text-xs flex items-center gap-1"><AlarmClock className="w-3 h-3" /> 6 tasks</span>
                </div>
                <div className="mt-3 space-y-2">
                  {['Revise OS notes', 'Gym – Pull Day', 'Email mentor', 'Buy fruits'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-white/30 bg-white/10" />
                      <span className="text-white/90 text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Tilt>
            <Tilt>
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/90 text-sm font-semibold">Focus Timer</span>
                  <span className="text-white/70 text-xs flex items-center gap-1"><Timer className="w-3 h-3" /> 25:00</span>
                </div>
                <div className="mt-5 grid place-content-center">
                  <motion.button whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white">
                    <Play className="w-4 h-4" /> Start Focus
                  </motion.button>
                </div>
              </GlassCard>
            </Tilt>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id="features" ref={ref} className="mt-24 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Why students love it"
        title="Glassy. Fast. Powerful."
        subtitle="A minimal surface with heavyweight features — organized, animated, and ready for deep work."
        icon={<Star className="w-4 h-4" />}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <GlassCard className="p-4 group">
              <div className="flex items-center gap-3">
                <div className="grid place-content-center w-10 h-10 rounded-xl bg-white/15 border border-white/20">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-white/95">{f.title}</h3>
              </div>
              <p className="mt-2 text-white/80 text-sm">{f.desc}</p>
              <div className="mt-3 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
                <a href="#" className="inline-flex items-center gap-1 hover:underline">Learn more <ChevronRight className="w-3 h-3" /></a>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const MissionVision: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="mt-24 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-300" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-white/85">
              To empower students to take control of their goals by organizing tasks, boosting productivity, and building winning habits — one checkbox at a time.
            </p>
          </GlassCard>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-300" />
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-white/85">
              To become the go‑to digital planner for every student who wants to do more and stress less, combining simplicity with powerful features.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDiff = useRef<number>(0);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    // return () => timerRef.current && clearInterval(timerRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    containerRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) dragDiff.current = e.clientX - dragStartX.current;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) {
      const threshold = 80;
      if (dragDiff.current > threshold && current > 0) goToSlide(current - 1);
      else if (dragDiff.current < -threshold && current < testimonials.length - 1) goToSlide(current + 1);
      dragStartX.current = null;
      dragDiff.current = 0;
      containerRef.current?.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section className="mt-24 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Real words"
        title="What users are saying"
        subtitle="Peer‑proofed from exams to everyday life."
        icon={<Quote className="w-4 h-4" />}
      />
      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((item, i) => (
            <div key={i} className="min-w-full px-4">
              <GlassCard className="p-6 space-y-4 mx-auto max-w-xl">
                <Quote className="text-pink-300" />
                <p className="italic text-white/95">"{item.quote}"</p>
                <p className="text-right font-bold text-white/90">– {item.name}</p>
              </GlassCard>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${i === current ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Showcase: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section ref={ref} className="mt-24 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Designed for clarity"
        title="A quick glance at the UI"
        subtitle="Clean glass cards, clear typography, subtle shadows — everything to keep you calm and focused."
        icon={<MonitorSmartphone className="w-4 h-4" />}
      />
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((n, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Tilt>
              <GlassCard className="p-4">
                <div className="aspect-video rounded-xl bg-white/10 border border-white/20 grid place-content-center">
                  <span className="text-white/70 text-sm">Screenshot {n} placeholder</span>
                </div>
                <p className="mt-3 text-sm text-white/85">
                  {n === 1 && 'Plan your day with Today, Upcoming, and Someday lists.'}
                  {n === 2 && 'Use timers and templates to keep momentum without fiddling with settings.'}
                  {n === 3 && 'Collaborate with friends on assignments or projects with ease.'}
                </p>
              </GlassCard>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Stats: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView, controls]);
  return (
    <section ref={ref} className="mt-24 max-w-6xl mx-auto">
      <GlassCard className="p-6">
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { label: 'Tasks completed', value: '24,861+' },
            { label: 'Students onboarded', value: '8,310' },
            { label: 'Avg. daily streak', value: '7.4 days' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={controls} transition={{ delay: i * 0.1 }}>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-white/80 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
};

const Pricing: React.FC = () => (
  <section id="pricing" className="mt-24 max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="Simple pricing"
      title="Start free. Upgrade when ready."
      subtitle="No ads. No spam. Just productivity."
      icon={<BadgeCheck className="w-4 h-4" />}
    />
    <div className="grid md:grid-cols-3 gap-4">
      {/* Free */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white">Free</span>
          <Pill className="bg-white/10 border border-white/20 text-white/85">Best for starters</Pill>
        </div>
        <div className="mt-3 text-white/90 text-3xl font-bold">$0</div>
        <ul className="mt-4 text-white/85 text-sm space-y-2">
          <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Unlimited tasks</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4" /> 3 lists</li>
          <li className="flex items-center gap-2 opacity-70"><Minus className="w-4 h-4" /> No collaboration</li>
        </ul>
        <button className="mt-5 w-full py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white">Get started</button>
      </GlassCard>

      {/* Pro */}
      <GlassCard className="p-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white">Pro</span>
          <Pill className="bg-amber-400/30 border border-amber-300/20 text-amber-100 flex items-center gap-1">
            <Crown className="w-3 h-3" /> Popular
          </Pill>
        </div>
        <div className="mt-3 text-white/90 text-3xl font-bold">$4<span className="text-lg">/mo</span></div>
        <ul className="mt-4 text-white/85 text-sm space-y-2">
          <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Unlimited tasks & lists</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Collaboration</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Focus timers & templates</li>
        </ul>
        <button className="mt-5 w-full py-2 rounded-xl bg-white text-slate-900 hover:opacity-90">Go Pro</button>
      </GlassCard>

      {/* Team */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white">Team</span>
          <Pill className="bg-white/10 border border-white/20 text-white/85">For groups</Pill>
        </div>
        <div className="mt-3 text-white/90 text-3xl font-bold">$12<span className="text-lg">/mo</span></div>
        <ul className="mt-4 text-white/85 text-sm space-y-2">
          <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Shared projects</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Role permissions</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Advanced analytics</li>
        </ul>
        <button className="mt-5 w-full py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white">Contact sales</button>
      </GlassCard>
    </div>
  </section>
);

const Roadmap: React.FC = () => (
  <section className="mt-24 max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="Up next"
      title="Roadmap"
      subtitle="We ship fast. See what's coming soon."
      icon={<GitBranch className="w-4 h-4" />}
    />
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { t: 'Q3', items: ['Offline mode', 'Calendar sync', 'AI quick capture'] },
        { t: 'Q4', items: ['Habit tracker', 'Widgets', 'Whiteboard view'] },
        { t: '2026', items: ['Plugins', 'Public API', 'Automations'] },
      ].map((r, i) => (
        <GlassCard key={i} className="p-5">
          <div className="flex items-center gap-2">
            <Milestone className="w-4 h-4" />
            <h3 className="font-semibold text-white/95">{r.t}</h3>
          </div>
          <ul className="mt-3 text-sm text-white/85 space-y-2 list-disc list-inside">
            {r.items.map((x, ix) => (
              <li key={ix}>{x}</li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </div>
  </section>
);

const FAQ: React.FC = () => (
  <section id="faq" className="mt-24 max-w-4xl mx-auto">
    <SectionHeader
      eyebrow="Answers"
      title="Frequently asked questions"
      subtitle="Quick clarifications to help you decide."
      icon={<Info className="w-4 h-4" />}
    />
    <div className="space-y-3">
      <FAQItem q="Is there a free plan?" a="Yes. It's generous and ad‑free." />
      <FAQItem q="Can I import tasks from another app?" a="CSV import is supported today, more integrations soon." />
      <FAQItem q="Does it work offline?" a="Offline mode is on our Q3 roadmap and partially available on Pro." />
      <FAQItem q="Is my data private?" a="Yes. We use local‑first encryption for sensitive fields and never sell your data." />
    </div>
  </section>
);

const AboutMe: React.FC = () => (
  <section id="about" className="mt-24 max-w-4xl mx-auto">
    <SectionHeader
      eyebrow="Founder"
      title="About Jayden"
      subtitle="Full‑stack developer, C++ learner, and Free Fire fan."
      icon={<Rocket className="w-4 h-4" />}
    />
    <div className="flex justify-center">
      <div className="w-80 h-80 [perspective:1000px] cursor-pointer group">
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <img src="/img.png" alt="Jayden Front" className="w-full h-full object-cover rounded-2xl border border-white/20" />
          </div>
          {/* Back */}
          <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <GlassCard className="w-full h-full p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">Jayden 👨🏾‍💻</h3>
              <p className="text-white/85 mb-3">Full‑stack Developer</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-white/80">
                <li>Next.js, React, Node.js, PostgreSQL</li>
                <li>Built To‑Do App & Portfolio Creator</li>
                <li>Helps Pretty..... Yindah with her studies</li>
                <li>Learning C++ & system programming</li>
                <li>Loves Free Fire 1v1 duels 🔥</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTA: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => (
  <section className="mt-24 max-w-4xl mx-auto">
    <GlassCard className="p-8 text-center">
      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to get organized?</h3>
      <p className="text-white/85 mt-2">Join thousands of students turning chaos into calm.</p>
      <button
        onClick={onGetStarted}
        className="mt-5 bg-white text-slate-900 font-semibold px-8 py-3 rounded-full text-lg hover:scale-110 transition transform shadow-lg hover:shadow-2xl"
      >
        Create your free account
      </button>
    </GlassCard>
  </section>
);

// Secret modal for Easter egg
const SecretModal: React.FC<{ open: boolean; onClose: () => void }>
 = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] grid place-content-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="relative z-[61] w-[min(520px,95vw)] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 text-center shadow-2xl"
          >
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-2xl font-extrabold text-white">Ultra Mode Unlocked</h3>
            <p className="text-white/85 mt-2">You discovered the secret! Here’s to Pretty..... Yindah 💖 and Free Fire duels.</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/80">
              <Pill className="bg-white/10 border border-white/20 text-white/85">Konami Code</Pill>
              <Pill className="bg-white/10 border border-white/20 text-white/85">7× Logo Click</Pill>
            </div>
            <button onClick={onClose} className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-slate-900 hover:opacity-90">
              <Check className="w-4 h-4" /> Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// -------------------------------
// Main Page
// -------------------------------

export default function LandingPage() {
  const router = useRouter();

  // Theme state
  const [themeKey, setThemeKey] = useState<keyof typeof THEMES>('ocean');
  const [autoTheme, setAutoTheme] = useState(true);

  // Secret modal state
  const [secretOpen, setSecretOpen] = useState(false);

  // Load initial theme (dynamic by time, persisted override)
  useEffect(() => {
    const saved = localStorage.getItem('jayden-theme');
    const auto = localStorage.getItem('jayden-theme-auto');
    if (auto === 'false') setAutoTheme(false);
    if (saved && !auto || (auto === 'false')) {
      setThemeKey(saved as keyof typeof THEMES);
    } else {
      const hour = new Date().getHours();
      setThemeKey(themeByHour(hour));
    }
  }, []);

  // Persist theme & auto toggle
  useEffect(() => {
    localStorage.setItem('jayden-theme', themeKey);
    localStorage.setItem('jayden-theme-auto', String(autoTheme));
  }, [themeKey, autoTheme]);

  // Auto theme updater on hour change
  useEffect(() => {
    if (!autoTheme) return;
    const update = () => setThemeKey(themeByHour(new Date().getHours()));
    const id = setInterval(update, 60 * 1000);
    return () => clearInterval(id);
  }, [autoTheme]);

  // Keyboard focus for search shortcut in mock todos
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/') {
        const el = document.querySelector<HTMLInputElement>('input[placeholder="Search tasks or #tags..."]');
        if (el) {
          e.preventDefault();
          el.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Easter egg unlockers
  const openSecret = useCallback(() => setSecretOpen(true), []);
  useKonamiCode(openSecret);

  const onGetStarted = () => router.push('/signup');

  const gradient = THEMES[themeKey].gradient;

  return (
    <div className={`min-h-screen overflow-hidden ${gradient} ${THEMES[themeKey].text || 'text-white'} px-6 py-10 relative`}>      
      {/* Subtle sparkles */}
      <SparkleField />

      {/* Header */}
      <GlassHeader
        themeKey={themeKey}
        setThemeKey={(k) => {
          setThemeKey(k);
          setAutoTheme(false);
        }}
        autoTheme={autoTheme}
        setAutoTheme={(v) => setAutoTheme(v)}
        onSecretClick={openSecret}
      />

      {/* Hero */}
      <Hero onGetStarted={onGetStarted} themeKey={themeKey} />

      {/* Features */}
      <Features />

      {/* Mission & Vision */}
      <MissionVision />

      {/* Showcase */}
      <Showcase />

      {/* Stats */}
      <Stats />

      {/* Mock Todos */}
      <MockTodosBoard />

      {/* Testimonials */}
      <Testimonials />

      {/* Roadmap */}
      <Roadmap />

      {/* FAQ */}
      <FAQ />

      {/* About */}
      <AboutMe />

      {/* CTA */}
      <CTA onGetStarted={onGetStarted} />

      {/* Footer */}
      <footer className="mt-24 text-center text-white/80 text-sm">
        <div className="flex items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} Jayden’s To‑Do List.</span>
          <span className="opacity-80">All rights reserved.</span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-4 text-xs">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Security</a>
        </div>
      </footer>

      {/* Secret Modal */}
      <SecretModal open={secretOpen} onClose={() => setSecretOpen(false)} />
    </div>
  );
}
