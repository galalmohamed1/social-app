
import { motion } from "framer-motion";
export default function NoNotifications() {
  return (
    <>
      <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mb-3 text-3xl"
          >
            🔔
          </motion.div>
          <p className="text-sm font-semibold text-slate-500">
            No unread notifications yet.
          </p>
        </motion.div>
    </>
  )
}
