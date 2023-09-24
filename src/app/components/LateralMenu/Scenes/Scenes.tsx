"use client";

// **** Library Imports ****
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRef, useEffect } from "react";

// **** Local Imports ****
import SceneIcon from "./SceneIcon";
import { scenesList } from "./scene-images";

import { useScenesModal } from "./hooks/useScenesModal";

const Scenes = () => {
  const {
    isOpen,
    onOpenChange,
    currentScene,
    setCurrentScene,
    setCurrentSceneImage,
  } = useScenesModal();

  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const SceneModalVariants: Variants = {
    hidden: {
      y: 5,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    exit: {
      y: 5,
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const SceneVariants: Variants = {
    hidden: {
      y: 5,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 5,
      opacity: 0,
    },
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (
        ref.current &&
        buttonRef.current &&
        !ref.current.contains(e.target as Node)
      ) {
        if (buttonRef.current.contains(e.target as Node)) {
          if (isOpen) {
            onOpenChange(false);
          } else {
            onOpenChange(true);
          }

          return;
        }
        onOpenChange(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div className="relative">
      <button
        className="border border-transparent p-1 rounded-md group hover:bg-[#222226] hover:border-[#434348]"
        onClick={() => {
          onOpenChange(!isOpen);
        }}
        ref={buttonRef}
      >
        <SceneIcon classes="h-5 w-5 group-hover:scale-105 group-hover:active:scale-95 transition" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={SceneModalVariants}
            ref={ref}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-50 bottom-[50px] !-translate-x-[100%] lg:!-translate-x-3/4 overflow-y-auto max-w-[1092px] backdrop-blur-[30px] rounded-xl p-4"
            style={{
              background: "hsla(0,0%,7%,.75)",
              border: "0.61px solid hsla(0,0%,100%,.2)",
            }}
          >
            <div className="flex flex-wrap lg:flex-nowrap gap-4">
              {scenesList.map((scene) => {
                return (
                  <motion.label
                    variants={SceneVariants}
                    htmlFor={scene.id}
                    key={scene.id}
                    className="w-[120px] lg:w-[150px] xl:w-[240px] h-[100px] lg:h-[160px] xl:h-[200px] relative cursor-pointer"
                    onClick={() => {
                      setCurrentScene(scene.Scene);
                      setCurrentSceneImage(scene.SceneImage);
                    }}
                  >
                    <input
                      type="radio"
                      id={scene.id}
                      name="scene"
                      className="absolute w-0 h-0 opacity-0"
                    />
                    <div className="w-full h-[100px] lg:h-[160px] xl:h-[200px] relative">
                      {currentScene === scene.Scene && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-[#f3a952] z-[2] rounded-full" />
                      )}
                      <img
                        src={scene.SceneImage}
                        alt={scene.id}
                        className="rounded-lg absolute inset-0 h-full"
                      />
                    </div>
                  </motion.label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scenes;
