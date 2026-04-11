import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative w-full max-w-sm overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#1877f2]/20 blur-2xl"
        />

        <motion.div
          animate={{
            scale: [1.05, 0.9, 1.05],
            opacity: [0.18, 0.3, 0.18],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-sky-300/20 blur-2xl"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute h-full w-full rounded-full bg-[#1877f2]/20"
            />

            <motion.span
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-20 w-20 rounded-full border-4 border-[#1877f2]/15 border-t-[#1877f2]"
            />

            <motion.span
              animate={{ rotate: -360 }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-14 w-14 rounded-full border-4 border-sky-200/40 border-b-sky-400"
            />

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#e7f3ff] shadow-inner"
            >
              <Loader2 className="h-6 w-6 text-[#1877f2]" />
            </motion.div>
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-xl font-extrabold tracking-tight text-slate-900"
          >
            Loading your Page...
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4 }}
            className="mt-2 text-center text-sm leading-6 text-slate-500"
          >
            Preparing the latest posts and profile details for you...
          </motion.p>

          <div className="mt-6 w-full">
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                animate={{
                  x: ["-120%", "320%"],
                  width: ["30%", "45%", "30%"],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 left-0 rounded-full bg-[#1877f2]"
              />
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5">
              {[0, 1, 2].map((item) => (
                <motion.span
                  key={item}
                  animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: item * 0.15,
                    ease: "easeInOut",
                  }}
                  className="h-2.5 w-2.5 rounded-full bg-[#1877f2]"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}