import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";

import { X } from "lucide-react";

interface TextInputAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  placeholderText?: string;
  changeHandler: (text: string) => void;
  submitHandler: () => void;
  sourceText: string;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({
  disabled,
  placeholderText,
  changeHandler,
  submitHandler,
  sourceText,
  ...props
}) => {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const size = useWindowSize();

  useEffect(() => {
    if (textArea.current) {
      textArea.current.style.height = "fit-content";
      textArea.current.style.height = textArea.current?.scrollHeight + "px";
    }
  }, [sourceText, size]);

  return (
    <div {...props}>
      <div
        className={`absolute right-[5%] ${sourceText.length === 0 && "hidden"}`}
        onClick={() => changeHandler("")}
      >
        <X className="transition-all stroke-white/40 hover:stroke-white/70 hover:scale-105 w-5" />
      </div>
      <textarea
        disabled={disabled}
        ref={textArea}
        placeholder={placeholderText}
        className={`w-full dark:text-white text-black pr-14 dark:placeholder-[#6d5648] placeholder-orange-950 box-border  resize-none  max-h-[50vh] ${
          sourceText.length > 100
            ? sourceText.length > 500
              ? "text-base"
              : "text-xl"
            : "text-3xl"
        }`}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            submitHandler();
          }
        }}
        onChange={(e) => {
          changeHandler(e.target.value);
        }}
        value={sourceText}
      />
    </div>
  );
};

export default TextInputArea;
