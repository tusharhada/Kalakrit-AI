import { LanguageKey } from "@/Constants/language";
import SelectLanguage from "./SelectLanguage";

interface LanguageBarProps extends React.HTMLAttributes<HTMLDivElement> {
  typeOfText: LanguageKey;
  detectedLanguage?: string;
  active: string;
  languages: Array<string>;
  changeHandler: (langName: string) => void;
}

const LanguageBar: React.FC<LanguageBarProps> = ({ ...props }) => {
  return (
    <div className="w-full flex flex-row gap-4 items-center relative max-lg:hidden">
      {props.languages.map((langName, index) => {
        return (
          <div
            className={`cursor-pointer select-none px-3 py-4
              ${
                props.active == langName
                  ? "dark:bg-white/[0.08] bg-orange-900/[0.08] dark:text-[#E9BFA5]"
                  : "dark:hover:bg-white/[0.04] hover:bg-dark/[0.04]"
              }
               squircle`}
            onClick={() => {
              props.changeHandler(langName);
            }}
            key={index}
          >
            {langName === "Detect Language"
              ? props.detectedLanguage
                ? `${props.detectedLanguage} - detected`
                : langName
              : langName}
          </div>
        );
      })}
      <SelectLanguage
        activeLanguage={props.active}
        typeOfText={props.typeOfText}
        selectHandler={props.changeHandler}
      />
    </div>
  );
};

export default LanguageBar;
