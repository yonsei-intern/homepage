import { motion } from "motion/react";
import type { ReactNode } from "react";

export function TabPage({
  pageKey,
  title,
  subtitle,
  revealHeader = true,
  children,
}: {
  pageKey: string;
  title?: string;
  subtitle?: string;
  revealHeader?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      key={pageKey}
      className="space-y-8"
    >
      {(title || subtitle) && (
        <div className="space-y-1.5">
          {title && revealHeader ? (
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]"
            >
              {title}
            </motion.h1>
          ) : title ? (
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">{title}</h1>
          ) : null}
          {subtitle && revealHeader ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-gray-500 text-base"
            >
              {subtitle}
            </motion.p>
          ) : subtitle ? (
            <p className="text-gray-500 text-base">{subtitle}</p>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}
