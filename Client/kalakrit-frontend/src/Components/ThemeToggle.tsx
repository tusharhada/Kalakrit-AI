import { useLocalStorage } from "@uidotdev/usehooks";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const ThemeToggle = () => {
  const MediaDarkModeQuery = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useLocalStorage(
    "theme",
    MediaDarkModeQuery() && "dark"
  );
  const toggleTheme = () => {
    document.body.classList.add("transition-color-apply-to-all");
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    setTimeout(() => {
      document.body.classList.remove("transition-color-apply-to-all");
    }, 1000);
  }, [theme]);

  return (
    <div
      className={`toggle-box-shadow w-14 h-7 p-1 squircle rounded-md flex ${
        theme === "light" ? "justify-start" : "justify-end"
      }`}
      onClick={toggleTheme}
    >
      <motion.div
        layout
        transition={{ type: "spring", duration: 0.4 }}
        whileHover={{ width: "26px" }}
        className={`items-center flex p-1 w-5 h-full ${
          theme === "light" && "bg-[#eb5a00]"
        } ${theme === "dark" && "bg-orange-100"} squircle`}
      >
        {theme === "light" && <Sun className="stroke-white w-3 h-auto" />}
        {theme === "dark" && <Moon className="stroke-black w-3 h-auto" />}
      </motion.div>
    </div>
  );
};

export default ThemeToggle;
