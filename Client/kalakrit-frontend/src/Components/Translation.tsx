import {
  useDebounce,
  useLocalStorage,
  useSessionStorage,
} from "@uidotdev/usehooks";
import { useCallback, useEffect, useMemo, useState } from "react";

// Utility
import { calculateToken } from "@/Utils";

// Components
import TextInputArea from "./TextArea";
import NewLanguageBar from "./LanguageBar.Mobile.tsx";
import LanguageBar from "./LanguageBar.Desktop.tsx";

// Icons
import { ArrowRightLeft } from "lucide-react";

// Service Layer
import { TranslateAPI } from "@/Services/TranslateAPI.tsx";
import SetupWizard from "./Setup.tsx";
import TranslationControlBar from "./TranslationControlBar.tsx";

const TOKEN_LIMIT = 200;

const LoadingMessage = () => {
  const loadingTexts = useMemo(
    () => [
      "Hold on! We're getting your text ready for translation",
      "Identifying the language of your text. This may take a moment",
      "Translating your text now. Sit tight",
      "Ensuring accuracy and refining the translation for you",
    ],
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dots, setDots] = useState(".");

  const updateText = useCallback(() => {
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  const updateDots = useCallback(() => {
    setDots((dots) => (dots.length < 5 ? dots + "." : "."));
  }, []);

  useEffect(() => {
    const textInterval =
      currentIndex < 3 ? setInterval(updateText, 45000) : null;
    const dotInterval = setInterval(updateDots, 300);

    return () => {
      if (textInterval) clearInterval(textInterval);
      clearInterval(dotInterval);
    };
  }, [updateText, updateDots, currentIndex]);

  return (
    <>
      {loadingTexts[currentIndex]}
      {dots}
    </>
  );
};

const Translation = () => {
  const [freshInstance, setFreshInstance] = useLocalStorage(
    "freshInstance",
    true
  );
  const [openSetup, setOpenSetup] = useState(false);

  const setupDoneHandler = () => {
    setFreshInstance(false);
    setOpenSetup(false);
    doTranslation();
  };

  // For Source Language
  const [sourceLanguage, setSourceLanguage] = useSessionStorage(
    "sourceLanguage",
    "Detect Language"
  );
  const [recentSourceLanguages, setRecentSourceLanguages] = useSessionStorage<
    Array<string>
  >("recentSourceLanguages", ["Detect Language", "English", "Hindi", "French"]);

  // For Translate To Language
  const [activeTranslateToLanguage, setActiveTranslateToLanguage] =
    useSessionStorage("activeTranslateToLanguage", "English");
  const [recentTranslateLanguages, setRecentTranslateLanguages] =
    useSessionStorage<Array<string>>("recentTranslateLanguages", [
      "English",
      "Hindi",
      "Marathi",
    ]);

  // Text State Input Field
  const [sourceText, setSourceText] = useSessionStorage("sourceText", "");
  const [translatedText, setTranslatedText] = useSessionStorage(
    "translatedText",
    ""
  );

  // Detect Language State
  const [detectedLanguage, setDetectedLanguage] = useSessionStorage<string>(
    "detectedLanguage",
    ""
  );
  function changeDetectedLanguage(langName: string) {
    setDetectedLanguage(langName);
  }

  // Calculate Token State
  const [sourceTextToken, setSourceToken] = useState(0);
  const debouncedSourceText = useDebounce(sourceText, 300);

  // Loading State
  const [loading, setLoading] = useState(false);

  const handleSourceTextChange = (sourceText: string) => {
    setSourceText(sourceText);
  };

  function selectLanguage(
    langName: string,
    languageType: "Source" | "TranslateTo",
    swap?: "Swap"
  ) {
    const isActiveLanguageSame =
      languageType === "Source"
        ? langName === activeTranslateToLanguage
        : langName === sourceLanguage;

    if (isActiveLanguageSame && !swap) {
      const recentLanguages =
        languageType === "Source"
          ? recentTranslateLanguages
          : recentSourceLanguages;
      const newActiveLanguage =
        recentLanguages.find(
          (l) => l !== langName && l !== "Detect Language"
        ) || "English";

      if (languageType === "Source") {
        setActiveTranslateToLanguage(newActiveLanguage);
      } else {
        setSourceLanguage(newActiveLanguage);
      }
    }

    if (languageType === "Source") {
      setSourceLanguage(langName);
      if (!recentSourceLanguages.includes(langName))
        updateRecentLanguage(langName, setRecentSourceLanguages, "Source");
    } else {
      setActiveTranslateToLanguage(langName);
      if (!recentTranslateLanguages.includes(langName))
        updateRecentLanguage(
          langName,
          setRecentTranslateLanguages,
          "TranslateTo"
        );
    }
  }

  function updateRecentLanguage(
    langName: string,
    setRecentLanguage: React.Dispatch<React.SetStateAction<string[]>>,
    languageType: "Source" | "TranslateTo"
  ) {
    setRecentLanguage((prev) => {
      const newLanguages = prev.filter(
        (l) => l !== langName && l != "Detect Language"
      );
      return languageType === "Source"
        ? ["Detect Language", langName, ...newLanguages.slice(0, 2)]
        : [langName, ...newLanguages.slice(0, 2)];
    });
  }

  useEffect(() => {
    setSourceToken(calculateToken(debouncedSourceText).length);
  }, [debouncedSourceText]);

  function swapLanguages() {
    // Save current Languages and text
    const currentSourceLanguage = sourceLanguage;
    const currentTranslateToLanguage = activeTranslateToLanguage;
    const currentSourceText = sourceText;
    const currentTranslatedText = translatedText;
    // console.log(currentSourceLanguage, currentTranslateToLanguage);

    if (currentSourceLanguage === "Detect Language" && detectedLanguage) {
      selectLanguage(detectedLanguage, "TranslateTo");
    } else {
      // setSourceLanguage("");
      const language =
        currentSourceLanguage === recentSourceLanguages[0]
          ? recentSourceLanguages.find(
              (lang) =>
                lang !== currentTranslateToLanguage &&
                lang != recentSourceLanguages[0]
            ) || "English"
          : currentSourceLanguage;
      selectLanguage(language, "TranslateTo", "Swap");
    }

    selectLanguage(currentTranslateToLanguage, "Source", "Swap");

    if (sourceText && translatedText) {
      setTranslatedText(currentSourceText);
      setSourceText(currentTranslatedText);
    }
  }

  function responseHandler(response: any) {
    const content = response.choices[0].message.content;
    const contentParsedToJson = JSON.parse(content);
    if (sourceLanguage === "Detect Language") {
      changeDetectedLanguage(contentParsedToJson.language_detected);
    } else if (sourceLanguage !== contentParsedToJson.language_detected) {
      changeDetectedLanguage(contentParsedToJson.language_detected);
      setSourceLanguage("Detect Language");
    }
    setTranslatedText(contentParsedToJson.better);
  }

  async function doTranslation() {
    if (freshInstance) setOpenSetup(true);
    setTranslatedText("");
    setLoading(true);
    try {
      const response = await TranslateAPI.post({
        tone: localStorage.tone,
        type: localStorage.textType,
        domain: localStorage.domain,
        targetMarket: localStorage.region,
        data: sourceText,
        outputLanguage: activeTranslateToLanguage,
      });
      responseHandler(response);
    } catch (err) {
      console.error("Translation error:", err);
      // Handle the error, e.g., display a user-friendly message
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col flex-1 max-md:min-h-[70vh] max-md:h-fit ">
      {/* Mobile Language Bar Single for Both Source and TranslateTo Language */}
      <NewLanguageBar
        SourceText={{
          active: sourceLanguage,
          languages: recentSourceLanguages,
          clickHandler: (langName) => selectLanguage(langName, "Source"),
        }}
        TranslatedText={{
          active: activeTranslateToLanguage,
          languages: recentTranslateLanguages,
          clickHandler: (langName) => selectLanguage(langName, "TranslateTo"),
        }}
        detectedLanguage={detectedLanguage}
        flipHandler={swapLanguages}
      />

      <div className="flex flex-row max-lg:flex-col max-lg:gap-5 flex-1 relative">
        {/* Source Language */}
        <div className="flex-1 flex flex-col md:pt-4 md:pr-5 max-md:h-[50vh]">
          <LanguageBar
            detectedLanguage={detectedLanguage}
            active={sourceLanguage}
            languages={recentSourceLanguages}
            changeHandler={(langName: string) =>
              selectLanguage(langName, "Source")
            }
            typeOfText="source"
          />
          <TextInputArea
            className="self-stretch flex-1 relative mt-10 flex"
            sourceText={sourceText}
            changeHandler={handleSourceTextChange}
            submitHandler={doTranslation}
            placeholderText="Paste or start writing..."
          />
          <TranslationControlBar
            className={`flex flex-row items-center justify-between pr-[10%] ${
              sourceText.length === 0 && "hidden"
            }`}
            textTokens={sourceTextToken}
            tokenLimit={TOKEN_LIMIT}
            doTranslation={doTranslation}
            loadingState={loading}
          />
        </div>

        {/* TranslateTo Language */}
        <div className="flex-1 flex flex-col pt-4 pl-5  dark:bg-dark-el-1 bg-orange-600/10 rounded-md ">
          {/* Language Bar Desktop Version for TranslateTo Language */}
          <LanguageBar
            active={activeTranslateToLanguage}
            languages={recentTranslateLanguages}
            changeHandler={(langName: string) =>
              selectLanguage(langName, "TranslateTo")
            }
            typeOfText="translateTo"
          />

          {/* Text Area for TranslateTo Language */}
          <div
            className={`self-stretch w-4/5 my-10 ${
              translatedText.length > 100
                ? translatedText.length > 500
                  ? "text-base"
                  : "text-xl"
                : "text-3xl"
            }`}
          >
            <span className="dark:text-[#6d5648] text-orange-950">
              {loading ? (
                <LoadingMessage />
              ) : translatedText ? (
                translatedText
              ) : (
                "Translation"
              )}
            </span>
          </div>
        </div>

        {/* Mobile Do Translation Button */}
        <div
          className="md:hidden flex items-center justify-center p-3 squircle bg-[#eb5a00]"
          onClick={freshInstance ? () => setOpenSetup(true) : doTranslation}
        >
          Translate
        </div>

        {/*  Desktop Flip Translation Button */}
        <button
          className={`cursor-pointer select-none ${
            !loading &&
            "hover:scale-105 transition-transform active:translate-y-[2px]"
          } max-lg:hidden absolute bottom-1/4 left-[50%] -translate-x-1/2  dark:bg-[#e9bfa5]/20 bg-black/20 p-[2px] flex justify-center items-center squircle`}
          disabled={loading}
          onClick={swapLanguages}
        >
          <div className="h-full w-full px-6 py-3 dark:bg-dark bg-white squircle">
            {/* <FlipIcon className="dark:fill-white fill-[#431407]" /> */}
            <ArrowRightLeft className="dark:stroke-[#e9bfa5] stroke-black/50" />
          </div>
        </button>
      </div>

      {openSetup && <SetupWizard CloseSetupHandler={setupDoneHandler} />}
    </div>
  );
};

export default Translation;
