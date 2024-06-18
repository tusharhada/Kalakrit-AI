import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Language, LanguageKey } from "@/Constants/language";
import { useState } from "react";

interface SelectLanguageI {
  typeOfText: LanguageKey;
  activeLanguage: string;
  selectHandler: (lang: string) => void;
}

const SelectLanguage = (props: SelectLanguageI) => {
  const [showDropdown, setShowDropdown] = useState(false);

  function dropdownOnClickHandler() {
    setShowDropdown(!showDropdown);
  }

  function dropdownOnExitHandler() {
    setShowDropdown(false);
  }

  const dropdownAnimate = {
    enter: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.5,
        type: "spring",
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      translateY: -15,
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.1,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <>
      <div
        onClick={dropdownOnClickHandler}
        className="dark:hover:bg-white/[0.06] hover:bg-black/[0.04] rounded-full p-2 w-fit flex items-center justify-center select-none cursor-pointer"
      >
        <ChevronDown
          className={`dark:stroke-white stroke-black w-5 h-auto transition-all ${
            showDropdown && "-rotate-180"
          }`}
        />
      </div>
      {showDropdown && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[10000]"
          onClick={dropdownOnExitHandler}
        ></div>
      )}
      <motion.div
        initial="exit"
        animate={showDropdown ? "enter" : "exit"}
        variants={dropdownAnimate}
        className="absolute top-full left-0 mt-6 w-full z-[10001] rounded-md drop-shadow-lg dark:shadow-stone-800 "
      >
        <div className="flex flex-col bg-white dark:bg-dark text-black squircle dark:text-white z-[10001] w-full  max-h-[50vh] ">
          <div className="flex flex-row items-center py-4 px-10 border-b border-slate-800/20 dark:border-slate-50/20">
            <h3 className="text-2xl flex-1">Languages</h3>
            <X
              onClick={dropdownOnExitHandler}
              className="w-6 h-6 transition-all hover:fill-gray-400"
            />
          </div>
          <ul className="px-10 py-4 grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 gap-4 overflow-y-auto">
            {Language[props.typeOfText].map((langName, index) => {
              return (
                <li
                  key={index}
                  className={`select-none cursor-pointer w-40 p-2 mb-1 ${
                    langName == props.activeLanguage
                      ? "bg-dark/[0.04] dark:bg-white/[0.04]"
                      : "dark:hover:bg-white/[0.04] hover:bg-dark/[0.04]"
                  }  squircle whitespace-nowrap`}
                  onClick={() => {
                    props.selectHandler(langName);
                    dropdownOnExitHandler();
                  }}
                >
                  {langName}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default SelectLanguage;
