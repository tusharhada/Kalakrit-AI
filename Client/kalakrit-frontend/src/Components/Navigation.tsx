import ThemeToggle from "./ThemeToggle";
import LogoLight from "@/assets/icons/logoLight.gif";
import LogoDark from "@/assets/icons/logoDark.gif";
import {
  Star,
  File,
  Globe,
  Languages,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

const Navigation = () => {
  return (
    <div className="flex flex-row w-auto py-8 items-center">
      <div className="navigation-left flex-1 text-md font-semibold dark:hidden">
        <img src={LogoLight} alt="Kalakrit AI" className="h-14" />
      </div>
      <div className="navigation-left flex-1 text-md font-semibold hidden dark:block">
        <img src={LogoDark} alt="Kalakrit AI" className="h-14" />
      </div>
      <div className="navigation-mid"></div>
      <div className="navigation-right w-fit flex flex-row items-center">
        <ul className="flex flex-row gap-6 max-md:hidden">
          <li className="flex flex-row gap-2 items-center  font-medium text-[#eb5a00] stroke-[#eb5a00]  cursor-pointer select-none">
            <Languages className={"w-4 h-auto stroke-inherit"} />
            Text
          </li>
          <div className="flex flex-row gap-6 relative px-3 py-1 ">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full dark:text-white text-orange-950 font-regular text-[10px] px-2 py-1 squircle dark:bg-orange-900 bg-orange-400 whitespace-nowrap flex flex-row gap-1 items-center justify-center">
              <Star className="dark:stroke-white fill-white stroke-orange-950 w-2 h-auto" />{" "}
              Coming Soon
            </span>
            <li className="flex flex-row gap-2 items-center font-medium dark:text-gray-600 dark:stroke-gray-600 text-gray-400 stroke-gray-400 cursor-pointer select-none">
              <File className={"w-4 h-auto stroke-inherit"} />
              Document
            </li>
            <li className="flex flex-row gap-2 items-center font-medium dark:text-gray-600 dark:stroke-gray-600 text-gray-400 stroke-gray-400 cursor-pointer select-none relative">
              <Globe className={"w-4 h-auto stroke-inherit"} />
              Website
            </li>
          </div>
        </ul>
        <div className="h-6 w-[1px] bg-gray-600 mx-5 "> </div>
        <ThemeToggle />
        <div className="h-6 w-[1px] bg-gray-600 mx-5 "> </div>
        <div className="flex flex-row items-center stroke-gray-500">
          <div className="flex flex-row gap-3">
            <a
              href="https://www.linkedin.com/company/kalaakrit/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:stroke-[#e9bfa5] transition-colors"
            >
              <Linkedin className="w-4 stroke-inherit" />
            </a>
            <a
              href="https://www.instagram.com/kalakrit.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:stroke-[#e9bfa5] transition-colors"
            >
              <Instagram className="w-4 stroke-inherit" />
            </a>
            <a
              href="https://www.facebook.com/Kalakritofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:stroke-[#e9bfa5] transition-colors"
            >
              <Facebook className="w-4 stroke-inherit" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
