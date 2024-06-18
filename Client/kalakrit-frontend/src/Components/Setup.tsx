import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import Constant from "@/Constants";

interface SetupWizardProps {
  CloseSetupHandler: () => void;
}

const SetupWizard = (props: SetupWizardProps) => {
  const [step, setStep] = useState(1);
  const [tone, setTone] = useLocalStorage<string>("tone");
  const [textType, setTextType] = useLocalStorage<string>("textType");
  const [region, setRegion] = useLocalStorage<string>("region");
  const [domain, setDomain] = useLocalStorage<string>("domain");

  const nextStepHandler = () => {
    if (step === 5) {
      props.CloseSetupHandler();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const skipStepHandler = () => {
    setStep((prev) => prev + 1);
  };

  const prevStepHandler = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="fixed dark:bg-black/60 dark:text-white bg-white/30 top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-[10000] flex lg:justify-center lg:items-center items-end">
      <div className="p-[1px] squircle dark:bg-white/20 bg-black/30 lg:w-[80%] lg:max-w-fit w-full h-4/5">
        <div className="dark:bg-dark bg-white  p-10 squircle flex-col flex gap-10 h-full w-full">
          {step === 1 && (
            <>
              <h3 className="text-3xl">Tone</h3>
              <ul
                className={`max-lg:overflow-y-auto lg:columns-3 gap-2  squircle w-fit max-lg:w-full`}
              >
                {Constant.Options.Tone.map((t) => {
                  return (
                    <li
                      className={`cursor-pointer select-none squircle px-2 py-3 mb-2 w-40 max-lg:w-full font-medium ${
                        t === tone
                          ? "dark:bg-[#e9bfa5] bg-black/[0.08]"
                          : "dark:hover:bg-white/10 hover:bg-black/60"
                      }`}
                      onClick={() => setTone(t)}
                    >
                      {t}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="text-3xl">Text Type</h3>
              <ul
                className={`max-lg:overflow-y-auto columns-2 squircle w-fit max-lg:w-full`}
              >
                {Constant.Options.TextType.map((t) => {
                  return (
                    <li
                      className={`cursor-pointer select-none squircle px-2 py-3 mb-2 w-40 max-lg:w-full font-medium ${
                        t === textType
                          ? "dark:bg-[#e9bfa5] bg-black/[0.08]"
                          : "dark:hover:bg-white/10 hover:bg-black/60"
                      }`}
                      onClick={() => setTextType(t)}
                    >
                      {t}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {step === 3 && (
            <>
              <h3 className="text-3xl">Region</h3>
              <ul
                className={`max-lg:overflow-y-auto lg:columns-3 gap-2  squircle w-fit max-lg:w-full`}
              >
                {Constant.Options.Region.map((t) => {
                  return (
                    <li
                      className={`cursor-pointer select-none squircle px-2 py-3 mb-2 w-40 max-lg:w-full font-medium ${
                        t === region
                          ? "dark:bg-[#e9bfa5] bg-black/[0.08]"
                          : "dark:hover:bg-white/10 hover:bg-black/60"
                      }`}
                      onClick={() => setRegion(t)}
                    >
                      {t}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {step === 4 && (
            <>
              <h3 className="text-3xl">Domain</h3>
              <ul
                className={`max-lg:overflow-y-auto lg:columns-4 gap-2  squircle w-fit max-lg:w-full`}
              >
                {Constant.Options.Domain.map((t) => {
                  return (
                    <li
                      className={`cursor-pointer select-none squircle px-2 py-3 mb-2 w-40 max-lg:w-full font-medium ${
                        t === domain
                          ? "dark:bg-[#e9bfa5] bg-black/[0.08]"
                          : "dark:hover:bg-white/10 hover:bg-black/60"
                      }`}
                      onClick={() => setDomain(t)}
                    >
                      {t}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {step === 5 && (
            <div className="lg:w-[30vw] w-full flex flex-col gap-10">
              <h3 className="text-3xl">Confirm your preferences</h3>
              <ul className="flex flex-col gap-5">
                <li className="flex flex-row gap-3 items-center dark:bg-[#eb5a00]/60 bg-black/70 justify-between squircle px-5 py-2">
                  <p className="text-xl text-white font-semibold">Tone</p>
                  <p className="text-white text-base">{tone}</p>
                </li>
                <li className="flex flex-row gap-3 items-center dark:bg-[#eb5a00]/60 bg-black/70  justify-between squircle px-5 py-2">
                  <p className="text-xl text-white font-semibold">Text Type</p>
                  <p className="text-white text-base">{textType}</p>
                </li>
                <li className="flex flex-row gap-3 items-center dark:bg-[#eb5a00]/60 bg-black/70  justify-between squircle px-5 py-2">
                  <p className="text-xl text-white font-semibold">Region</p>
                  <p className="text-white text-base">{region}</p>
                </li>
                <li className="flex flex-row gap-3 items-center dark:bg-[#eb5a00]/60 bg-black/70 justify-between squircle px-5 py-2">
                  <p className="text-xl text-white font-semibold">Domain</p>
                  <p className="text-white text-base">{domain}</p>
                </li>
              </ul>
            </div>
          )}
          <div className="flex mt-auto justify-end">
            {step !== 1 && <button onClick={prevStepHandler}>Back</button>}
            <div className="flex-1 justify-end flex gap-8">
              {step !== 5 && (
                <button className="" onClick={skipStepHandler}>
                  Skip
                </button>
              )}
              <button
                className="squircle  text-white bg-[#eb5a00] px-5 py-2"
                onClick={nextStepHandler}
              >
                {step === 5 ? "Translate" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
