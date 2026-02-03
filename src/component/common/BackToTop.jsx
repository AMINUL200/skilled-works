import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 z-50
            w-14 h-14 rounded-full
            bg-linear-to-tr from-[#9B3DFF] to-[#1F2E9A]
            text-white
            shadow-xl shadow-purple-300
            flex items-center justify-center
            transition-all duration-300
            hover:scale-110 hover:shadow-2xl
            animate-fade-in
          "
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default BackToTop;
