// src/pages/Home.jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NameForm from "../components/NameForm";
import CongratsCard from "../components/CongratsCard";
import { friendsData, defaultFriend } from "../data/friendsData";
import { fireConfetti } from "../utils/confetti";
import {
  Facebook,
  Instagram,
  Music2,
  Github,
  GraduationCap,
  Youtube,
} from "lucide-react";

/** Overlay แสดงอิโมจิฉลองแบบลอยลง (ใช้ร่วมกับ canvas-confetti) */
function CelebrationOverlay({ show }) {
  const emojis = ["🎓", "🎉", "✨", "🌟", "🎈"];
  const items = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        emoji: emojis[i % emojis.length],
        x: Math.random() * 90 + 5, // 5% - 95%
        delay: Math.random() * 0.4,
        duration: 1.7 + Math.random() * 0.7,
        rotate: (Math.random() * 40 - 20) | 0,
      })),
    []
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[60]"
          aria-hidden
        >
          {items.map((it) => (
            <motion.span
              key={it.id}
              initial={{ y: "-10%", opacity: 0, rotate: 0 }}
              animate={{
                y: "110%",
                opacity: [0, 1, 1, 0],
                rotate: it.rotate,
              }}
              transition={{
                delay: it.delay,
                duration: it.duration,
                ease: "easeInOut",
              }}
              style={{ left: `${it.x}%` }}
              className="absolute top-0 text-2xl md:text-3xl"
            >
              {it.emoji}
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** หมวกบัณฑิตลอย (เบา ๆ ไม่กวนการใช้งาน) */
const FloatingCaps = React.memo(function FloatingCaps() {
  const items = useMemo(
    () => [
      { x: -140, y: -30, delay: 0.1 },
      { x: 130, y: -10, delay: 0.2 },
      { x: -90, y: 40, delay: 0.3 },
      { x: 95, y: 55, delay: 0.4 },
    ],
    []
  );

  return (
    <div className="relative mt-2 h-2 w-full max-w-lg z-10 mx-auto" aria-hidden>
      <AnimatePresence>
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.5, delay: it.delay },
              y: {
                duration: 3,
                repeat: Infinity,
                delay: it.delay + 0.2,
                ease: "easeInOut",
              },
            }}
            className="absolute left-1/2"
            style={{ transform: `translateX(${it.x}px) translateY(${it.y}px)` }}
          >
            <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-white/90" />
                <span className="text-xs text-white/90">Congrats! | MIT X 64</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

export default function Home() {
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const onSubmit = (name) => {
    setLoading(true);
    // mock latency เล็กน้อยให้การเปลี่ยนสถานะดูลื่น
    setTimeout(() => {
      const found = friendsData.find((f) => f.name === name);
      const payload = found
        ? {
            friendName: found.name,
            imgs: found.imgs,
            youtubeUrl: found.youtubeUrl ?? null,
            message: found.message,
          }
        : {
            friendName: name,
            imgs: defaultFriend.imgs,
            youtubeUrl: null,
            message: defaultFriend.message,
          };

      setFriend(payload);
      fireConfetti();              // confetti จริง
      setShowCelebration(true);    // overlay อิโมจิ
      setLoading(false);

      // แสดง overlay ชั่วครู่
      const t = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(t);
    }, 500);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-10 text-center">
      {/* Overlay อิโมจิฉลอง */}
      <CelebrationOverlay show={showCelebration} />

      {/* หมวกลอยเบา ๆ */}
      <FloatingCaps />

      {/* ส่วนหัว + ฟอร์ม */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mb-6 rounded-3xl px-6 py-5"
        >
          <h1 className="bg-[linear-gradient(90deg,#a78bfa,45%,#22d3ee,55%,#a78bfa)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl drop-shadow">
            Graduation Congratulation 🎓
          </h1>
          <p className="mt-1 text-slate-300">ป้อนชื่อของคุณเพื่อรับคำยินดีสุดพิเศษ</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="w-full"
        >
          <NameForm onSubmit={onSubmit} loading={loading} />
        </motion.div>

        {/* การ์ดแสดงผล */}
        <AnimatePresence mode="wait">
          {friend && (
            <motion.div
              key={friend.friendName}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <CongratsCard
                friendName={friend.friendName}
                imgs={friend.imgs}
                youtubeUrl={friend.youtubeUrl}
                message={friend.message}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer ติดล่างเสมอ */}
      <footer className="mt-auto w-full border-t border-slate-200/20 pt-6">
        <p className="text-sm md:text-base text-slate-300">
          © 2025 <span className="font-bold text-slate-100">Congrats-Jkphng</span> ·{" "}
          Design by <span className="italic text-slate-300/90">ivieowX</span>
        </p>
        <div className="mt-4 flex items-center justify-center gap-5">
          <a
            href="https://www.facebook.com/Jkphngz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-fb/15 ring-1 ring-brand-fb/30 transition-all hover:scale-105 hover:bg-brand-fb/25"
          >
            <Facebook className="h-5 w-5 text-brand-fb transition-transform group-hover:scale-110" />
          </a>
          <a
            href="https://www.instagram.com/jkphngz._.j/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-ig/15 ring-1 ring-brand-ig/30 transition-all hover:scale-105 hover:bg-brand-ig/25"
          >
            <Instagram className="h-5 w-5 text-brand-ig transition-transform group-hover:scale-110" />
          </a>
          <a
            href="https://www.tiktok.com/@eqqe_ccx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-tiktok/15 ring-1 ring-brand-tiktok/30 transition-all hover:scale-105 hover:bg-brand-tiktok/25"
          >
            <Music2 className="h-5 w-5 text-slate-100 transition-transform group-hover:scale-110" />
          </a>
          {/* แนะนำใช้สีแดงมาตรฐานแทน brand-yt ถ้ายังไม่ได้เพิ่มใน tailwind.config.js */}
          <a
            href="https://www.youtube.com/@IVIeowX"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-500/30 transition-all hover:scale-105 hover:bg-red-500/25"
          >
            <Youtube className="h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />
          </a>
          <a
            href="https://github.com/ivieowX"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-tiktok/15 ring-1 ring-brand-tiktok/30 transition-all hover:scale-105 hover:bg-brand-tiktok/25"
          >
            <Github className="h-5 w-5 text-slate-100 transition-transform group-hover:scale-110" />
          </a>
        </div>
      </footer>
    </div>
  );
}
