"use client";
import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const PinContainer = ({
  children,
  title,
  href,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const Container = href ? 'a' : 'div';

  return (
    <Container
      href={href}
      className="relative group/pin cursor-pointer"
      onMouseMove={onMouseMove}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          style={{
            transform: useMotionTemplate`translate(-50%,-50%) rotateX(${mouseX}deg) scale(0.8)`,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className="relative z-50">{children}</div>
        </motion.div>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        {title && (
          <span className="text-sm text-gray-500 font-medium">{title}</span>
        )}
      </div>
    </Container>
  );
};
