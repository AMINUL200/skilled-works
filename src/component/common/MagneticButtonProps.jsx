import React, { useRef, useEffect } from "react";

const MagneticButton = ({
  children,
  variant = "round", // round | square
  size = 140,
  className = "",
  ...props
}) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    const magneticRadius = 150;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < magneticRadius) {
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${offsetX * 0.45}px, ${offsetY * 0.45}px)`;
        text.style.transform = `translate(${offsetX * 0.2}px, ${offsetY * 0.2}px)`;
      } else {
        button.style.transform = "translate(0px, 0px)";
        text.style.transform = "translate(0px, 0px)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button ${variant} ${className}`}
      style={{
        width: variant === "round" ? size : undefined,
        height: variant === "round" ? size : "52px",
      }}
      {...props}
    >
      <span ref={textRef} className="inline-flex! items-center gap-3">
        {children}
      </span>
    </button>
  );
};

export default MagneticButton;
