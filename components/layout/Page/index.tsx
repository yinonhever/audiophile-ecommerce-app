import styles from "./Page.module.scss";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export default function Page({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className={styles.page}
    >
      {children}
    </motion.div>
  );
}
