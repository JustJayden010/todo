'use client';

import { useRouter } from 'next/navigation';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
const testimonials = [
  {
    name: 'Pretty..... Yindah 💖',
    quote: "Jayden’s app helped me stay on top of my exams and even plan dates. 10/10!",
  },
  {
    name: 'Red Fox (Testimony)',
    quote: "I used to forget assignments. Not anymore. Clean design. Fast. Love it.",
  },
  {
    name: 'Breakthrough (Phyton)',
    quote: "From duels to deadlines — this app keeps me sharp!",
  }
];
export default function LandingPage() {
    const router = useRouter();
    const [flipped, setFlipped] = useState(false);
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

  // Init timer
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle Pointer Events for Drag
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) {
      dragDiff.current = e.clientX - dragStartX.current;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current !== null) {
      const threshold = 80; // Minimum drag to trigger change

      if (dragDiff.current > threshold && current > 0) {
        goToSlide(current - 1);
      } else if (dragDiff.current < -threshold && current < testimonials.length - 1) {
        goToSlide(current + 1);
      }

      // Reset
      dragStartX.current = null;
      dragDiff.current = 0;
      containerRef.current?.releasePointerCapture(e.pointerId);
    }
}

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-10">
            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-2xl mx-auto">
                <h1 className="text-5xl font-extrabold leading-tight drop-shadow-md">
                    Stay Focused. Organize Life.
                </h1>
                <p className="text-lg text-white/80">
                    Introducing Jayden’s To-Do List — a clean, fast, and student-friendly task manager that helps you achieve more.
                </p>
                <button
                    onClick={() => router.push('/signup')}
                    className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full text-lg hover:scale-110 transition transform shadow-lg"
                >
                    🚀 Start Now
                </button>
            </section>

            {/* Mission & Vision */}
            <section className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-300" />
                        <h2 className="text-2xl font-bold">Our Mission</h2>
                    </div>
                    <p className="text-white/80">
                        To empower students to take control of their goals by organizing tasks, boosting productivity, and building winning habits — one checkbox at a time.
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                        <Star className="text-yellow-300" />
                        <h2 className="text-2xl font-bold">Our Vision</h2>
                    </div>
                    <p className="text-white/80">
                        To become the go-to digital planner for every student who wants to do more and stress less, combining simplicity with powerful features.
                    </p>
                </div>
            </section>

            {/* Testimonials */}
            <section className="mt-20 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">What Users Are Saying</h2>

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
                                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg space-y-4 mx-auto max-w-md">
                                    <Quote className="text-pink-300" />
                                    <p className="italic">"{item.quote}"</p>
                                    <p className="text-right font-bold text-white/90">- {item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`h-3 w-3 rounded-full transition-all duration-300 ${i === current ? 'bg-white' : 'bg-gray-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>
            {/* About me */}
            <section className="mt-24 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-white">About Me</h2>

                <div className="flex justify-center">
                    <div className="w-80 h-80 perspective cursor-pointer" onClick={() => setFlipped(!flipped)}>
                        <div className={`card ${flipped ? 'flipped' : ''}`}>
                            {/* Front Side */}
                            <div className="card-face card-front">
                                <img
                                    src="/jayden-front.jpg"
                                    alt="Jayden Front"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>

                            {/* Back Side */}
                            <div className="card-face card-back">
                                <h3 className="text-2xl font-bold mb-2">Jayden 👨🏾‍💻</h3>
                                <p className="text-white/80 mb-2">Fullstack Developer</p>
                                <ul className="list-disc list-inside text-sm space-y-1 text-white/70">
                                    <li>Next.js, React, Node.js, PostgreSQL</li>
                                    <li>Built To-Do App & Portfolio Creator</li>
                                    <li>Help Pretty..... Yindah with her studies</li>
                                    <li>Learns C++ & system programming</li>
                                    <li>Loves Free Fire 1v1 duels 🔥</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-24 text-center text-white/60 text-sm">
                © {new Date().getFullYear()} Jayden’s To-Do List. All rights reserved.
            </footer>
        </div>
    );
}





// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { Quote } from 'lucide-react';

// const testimonials = [
//   {
//     name: 'Pretty..... Yindah 💖',
//     quote: "Jayden’s app helped me stay on top of my exams and even plan dates. 10/10!",
//   },
//   {
//     name: 'Red Fox (Testimony)',
//     quote: "I used to forget assignments. Not anymore. Clean design. Fast. Love it.",
//   },
//   {
//     name: 'Breakthrough (Phyton)',
//     quote: "From duels to deadlines — this app keeps me sharp!",
//   }
// ];

// export default function Testimonials() {
//   const [current, setCurrent] = useState(0);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const dragStartX = useRef<number | null>(null);
//   const dragDiff = useRef<number>(0);

//   const resetTimer = () => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % testimonials.length);
//     }, 4000);
//   };

//   const goToSlide = (index: number) => {
//     setCurrent(index);
//     resetTimer();
//   };

//   // Init timer
//   useEffect(() => {
//     resetTimer();
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, []);

//   // Handle Pointer Events for Drag
//   const onPointerDown = (e: React.PointerEvent) => {
//     dragStartX.current = e.clientX;
//     containerRef.current?.setPointerCapture(e.pointerId);
//   };

//   const onPointerMove = (e: React.PointerEvent) => {
//     if (dragStartX.current !== null) {
//       dragDiff.current = e.clientX - dragStartX.current;
//     }
//   };

//   const onPointerUp = (e: React.PointerEvent) => {
//     if (dragStartX.current !== null) {
//       const threshold = 80; // Minimum drag to trigger change

//       if (dragDiff.current > threshold && current > 0) {
//         goToSlide(current - 1);
//       } else if (dragDiff.current < -threshold && current < testimonials.length - 1) {
//         goToSlide(current + 1);
//       }

//       // Reset
//       dragStartX.current = null;
//       dragDiff.current = 0;
//       containerRef.current?.releasePointerCapture(e.pointerId);
//     }
//   };

//   return (
//     <section className="mt-20 max-w-5xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-10">What Users Are Saying</h2>

//       <div className="relative overflow-hidden">
//         <div
//           ref={containerRef}
//           onPointerDown={onPointerDown}
//           onPointerMove={onPointerMove}
//           onPointerUp={onPointerUp}
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {testimonials.map((item, i) => (
//             <div key={i} className="min-w-full px-4">
//               <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg space-y-4 mx-auto max-w-md">
//                 <Quote className="text-pink-300" />
//                 <p className="italic">"{item.quote}"</p>
//                 <p className="text-right font-bold text-white/90">- {item.name}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Dots */}
//         <div className="flex justify-center mt-6 space-x-2">
//           {testimonials.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goToSlide(i)}
//               className={`h-3 w-3 rounded-full transition-all duration-300 ${
//                 i === current ? 'bg-white' : 'bg-gray-500'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
