import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function NameForm({ onSubmit, loading }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
    setName("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass mx-auto w-full max-w-md rounded-2xl p-6 shadow-xl backdrop-blur-lg"
    >
      <label className="mb-3 block text-lg font-semibold text-slate-100">
        พิมพ์ชื่อของตัวเองเลยครับเพื่อนๆ ✨
      </label>

      <div className="relative">
        <input
          className="w-full rounded-xl border border-slate-200/20 bg-slate-900/40 px-4 py-3 text-slate-100 placeholder:text-slate-400 outline-none focus:border-accent focus:ring-2 focus:ring-accent/50 transition"
          placeholder="เช่น MIT"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Sparkles className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-accent/70" />
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 font-semibold text-slate-100 shadow-md transition disabled:cursor-not-allowed disabled:opacity-60 hover:shadow-lg"
      >
        {loading ? "⏳ กำลังโหลด..." : "🎉 แสดงคำยินดี"}
      </motion.button>
    </motion.form>
  );
}
