// /src/components/CongratsCard.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Clapperboard } from "lucide-react";

function extractYouTubeId(url = "") {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      return id || null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed");
      if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    }
  } catch (e) {}
  return null;
}

export default function CongratsCard({
  friendName,
  imgs = [],
  youtubeUrl,
  message,
}) {
  const safeImgs =
    Array.isArray(imgs) && imgs.length > 0 ? imgs.slice(0, 4) : [];
  const [selected, setSelected] = useState(0);

  const videoId = useMemo(() => extractYouTubeId(youtubeUrl), [youtubeUrl]);
  const hasVideo = !!videoId;
  const embedUrl = hasVideo
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`
    : null;

  // ⭐ เริ่มต้นเป็น "video" ถ้ามีคลิป ไม่งั้น "photo"
  const [mode, setMode] = useState(hasVideo ? "video" : "photo");
  const mainImg = safeImgs[selected] || safeImgs[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass mx-auto mt-6 w-full max-w-2xl rounded-3xl p-6 text-center"
    >
      {/* สลับโหมด (โชว์เฉพาะถ้ามีวิดีโอ) */}
      {hasVideo && (
        <div className="mb-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("photo")}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm transition ${
              mode === "photo"
                ? "bg-white/20 text-white ring-1 ring-white/40"
                : "text-white/80 hover:bg-white/10"
            }`}
            title="แสดงรูป"
          >
            <ImageIcon className="h-4 w-4" /> รูป
          </button>
          <button
            type="button"
            onClick={() => setMode("video")}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm transition ${
              mode === "video"
                ? "bg-white/20 text-white ring-1 ring-white/40"
                : "text-white/80 hover:bg-white/10"
            }`}
            title="แสดงวิดีโอ"
          >
            <Clapperboard className="h-4 w-4" /> วิดีโอ
          </button>
        </div>
      )}

      {/* ✅ กรอบหลัก: 
            - โหมดวิดีโอ: สี่เหลี่ยม 16:9 กว้างชัด (ไม่ใช่วงกลม)
            - โหมดรูป: วงกลมตามเดิม */}
      {mode === "video" && hasVideo ? (
        <div
          className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/30 shadow-2xl"
          style={{ paddingTop: "56.25%" }} // 16:9
        >
          <iframe
            src={embedUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full border-4 border-white/60 shadow-lg">
          {mainImg ? (
            <img
              src={mainImg}
              alt={friendName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
              ไม่มีรูป
            </div>
          )}
        </div>
      )}

      <h1 className="mt-4 text-2xl font-extrabold text-white drop-shadow">
        ยินดีด้วย {friendName || "บัณฑิตคนเก่ง"}! 🎓
      </h1>
      <p className="mt-2 text-white/90">{message}</p>

      {/* ตัวเลือกภาพ (เฉพาะเมื่อมีมากกว่า 1 รูป และอยู่โหมดรูป) */}
      {mode === "photo" && safeImgs.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          {safeImgs.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelected(idx)}
              className={`h-14 w-14 overflow-hidden rounded-xl border transition-all ${
                selected === idx
                  ? "ring-2 ring-offset-2 ring-offset-black/20 ring-white"
                  : "opacity-80 hover:opacity-100 border-white/40"
              }`}
              title={`รูปที่ ${idx + 1}`}
            >
              <img
                src={url}
                alt={`ตัวเลือก ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
