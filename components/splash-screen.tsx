"use client";

import Logo from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FC } from "react";

interface SplashScreenProps {
  className?: string;
  show?: boolean;
}

export const SplashScreen: FC<SplashScreenProps> = ({
  className,
  show = true,
}) => (
  <div className="fullscreen fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500">
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
            className,
          )}
          aria-label="Splash screen"
          role="status"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Logo
              iconVariant="gradient"
              size="xl"
              text="findoora"
              orientation="vertical"
              interactive={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
