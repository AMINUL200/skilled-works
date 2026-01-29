import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';



const PageLoader =() => {
  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#FAFAFF] via-white to-[#F2EEFF]"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient orbs */}
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#1F2E9A]/10 to-[#9B3DFF]/10 rounded-full blur-3xl"
            />
            
            <motion.div
              animate={{ 
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-[#2EC5FF]/10 to-[#FF1F1F]/10 rounded-full blur-3xl"
            />
          </div>

          {/* Main Loader Container */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-8 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                {/* Logo Symbol */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="relative"
                >
                  {/* Outer ring */}
                  <div className="w-20 h-20 rounded-full border-4 border-[#E6E0FF]">
                    {/* Inner animated dots */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            rotate: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                              delay: i * 0.1
                            },
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.2
                            }
                          }}
                          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#1F2E9A] to-[#9B3DFF]"
                          style={{
                            transform: `rotate(${i * 45}deg) translateX(35px)`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Center logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1F2E9A] to-[#2430A3] flex items-center justify-center shadow-lg"
                      >
                        <span className="text-white font-bold text-sm">SWC</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Company Name */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#2EC5FF] bg-clip-text text-transparent mt-4"
              >
                Skilled Workers Cloud
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#666666] mt-2"
              >
                HR-Tech Excellence
              </motion.p>
            </motion.div>

           

            {/* Loading Steps/Dots */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 mt-8"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    backgroundColor: [
                      "rgba(31, 46, 154, 0.1)",
                      "rgba(155, 61, 255, 0.3)",
                      "rgba(31, 46, 154, 0.1)"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-[#1F2E9A]/20 to-[#9B3DFF]/20"
                />
              ))}
            </motion.div>

            {/* Subtle Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 text-center text-xs text-[#666666]"
            >
              UK's Leading HR-Tech Platform • Since 2020
            </motion.p>
          </div>
        </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;