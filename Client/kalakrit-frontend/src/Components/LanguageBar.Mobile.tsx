import { ArrowRightLeft } from "lucide-react";
import { Language } from "@/Constants/language";
import { useState } from "react";

interface LanguageBar {
  active: string;
  languages: Array<string>;
  clickHandler: (lang: string) => void;
}

interface NewLanguageBarI {
  SourceText: LanguageBar;
  TranslatedText: LanguageBar;
  detectedLanguage?: string;
  flipHandler: () => void;
}

const NewLanguageBar = (props: NewLanguageBarI) => {
  const [modalState, setModalState] = useState(false);
  const [modalChild, setModalChild] = useState<keyof typeof Language>("source");

  function openModal(typeOfText: keyof typeof Language) {
    setModalState(true);
    setModalChild(typeOfText);
  }
  function closeModal() {
    setModalState(false);
  }

  return (
    <div className="flex flex-row text-[#E9BFA5] items-center mb-2 lg:hidden">
      <div
        className="flex-1 flex flex-row gap-4 pr-5 items-center justify-center"
        onClick={() => openModal("source")}
      >
        {props.SourceText.active === "Detect Language"
          ? props.detectedLanguage
            ? `${props.detectedLanguage} - Detected`
            : "Detect Language"
          : props.SourceText.active}
      </div>
      <div onClick={props.flipHandler}>
        <ArrowRightLeft className="stroke-[#E9BFA5]" />
      </div>
      <div
        className="flex-1 flex flex-row gap-4 p-5 items-center justify-center"
        onClick={() => openModal("translateTo")}
      >
        {props.TranslatedText.active}
      </div>
      {modalState && (
        <>
          <div
            className="fixed top-0 bottom-0 left-0 right-0 bg-black/5 backdrop-blur-sm z-[10001]"
            onClick={closeModal}
          ></div>
          <div className="fixed bottom-0 left-0 h-[90vh] w-full dark:bg-dark bg-white z-[100001] overflow-scroll p-5 ">
            <h2 className="text-xl mb-4">Select a Language</h2>
            <ul className="h-full w-full flex flex-col ">
              {Language[modalChild].map((langName: string, index) => {
                return (
                  <li
                    key={index}
                    className="hover:bg-[#E9BFA5] focus:bg-[#E9BFA5] py-3 squircle text-white hover:text-black"
                    onClick={() => {
                      modalChild === "source"
                        ? props.SourceText.clickHandler(langName)
                        : props.TranslatedText.clickHandler(langName);
                      closeModal();
                    }}
                  >
                    {langName}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default NewLanguageBar;
