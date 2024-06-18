import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { X } from "lucide-react";

import Constant from "@/Constants";

interface ModalChildI {
  heading?: string;
  options: Array<string>;
  selected: string;
  columns: number;
  changeHandler: (str: string) => void;
  closeHandler: () => void;
}

const ModalChild = (props: ModalChildI) => {
  const length = props.options.length;
  return (
    <div className="flex flex-col dark:bg-[#201f22] bg-white squircle p-8 max-lg:h-full max-lg:w-full">
      <div className="flex flex-row justify-between items-center mb-10">
        <h2 className="text-3xl font-semibold">{props.heading}</h2>
        <X
          onClick={props.closeHandler}
          className="dark:stroke-white stroke-2 dark:hover:stroke-slate-400 stroke-black hover:stroke-black/40 w-6"
        />
      </div>
      <ul
        className={`max-lg:overflow-y-scroll  ${
          length <= 3
            ? "lg:columns-1"
            : length <= 6
            ? "lg:columns-2"
            : length <= 10
            ? "lg:columns-3"
            : "lg:columns-4"
        } gap-2  squircle w-fit max-lg:w-full`}
      >
        {props.options.map((option) => {
          return (
            <li
              className={`cursor-pointer select-none squircle px-2 py-3 mb-2 w-40 max-lg:w-full font-medium ${
                option == props.selected
                  ? "dark:bg-[#e9bfa5] bg-black/[0.08]"
                  : "dark:hover:bg-white/10 hover:bg-black/60"
              }`}
              onClick={() => props.changeHandler(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Features = () => {
  const [tone, setTone] = useLocalStorage("tone", "Casual");
  const [textType, setTextType] = useLocalStorage("textType", "Legal");
  const [region, setRegion] = useLocalStorage("region", "India");
  const [domain, setDomain] = useLocalStorage("domain", "Law");
  const [modalState, setModalState] = useState(false);
  const [modalChild, setModalChild] = useState("");

  const changeToneHandler = (str: string) => {
    setTone(str);
  };
  const changeTextTypeHandler = (str: string) => {
    setTextType(str);
  };
  const changeRegionHandler = (str: string) => {
    setRegion(str);
  };
  const changeDomainHandler = (str: string) => {
    setDomain(str);
  };

  const openModalHandler = (child: string) => {
    setModalState(true);
    setModalChild(child);
  };

  const closeModalHandler = () => {
    setModalState(false);
  };

  const listStyle = `mb-4 cursor-pointer select-none p-4 dark:bg-dark-el-1 bg-orange-800/[0.08] squircle w-full flex flex-row justify-between items-center dark:hover:bg-[#e9bfa5] dark:hover:text-black hover:bg-orange-800/20 transition-all`;

  return (
    <div className="mt-10 mb-20 max-xl:flex-col flex flex-row gap-28">
      <div className="max-w-lg flex flex-col flex-1">
        <h3 className="text-2xl mb-5">Options</h3>
        <ul className="columns-2 gap-5">
          <li className={listStyle} onClick={() => openModalHandler("Tone")}>
            <h6>Tone</h6>
            <p>{tone}</p>
          </li>
          <li
            className={listStyle}
            onClick={() => openModalHandler("TextType")}
          >
            <h6>Text Type</h6>
            <p>{textType}</p>
          </li>
          <li className={listStyle} onClick={() => openModalHandler("Domain")}>
            <h6>Domain</h6>
            <p>{domain}</p>
          </li>
          <li className={listStyle} onClick={() => openModalHandler("Region")}>
            <h6>Region</h6>
            <p>{region}</p>
          </li>
        </ul>
      </div>
      {modalState && (
        <>
          <div
            className="backdrop fixed top-0 bottom-0 right-0 left-0 z-[10000] bg-black/20 backdrop-blur-sm"
            onClick={closeModalHandler}
          ></div>
          <div className="fixed lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 bottom-0 left-0 h-[90vh] w-full  z-[10001] lg:h-fit lg:w-fit">
            {modalChild == "Tone" && (
              <ModalChild
                heading={modalChild}
                options={Constant.Options.Tone}
                columns={1}
                selected={tone}
                changeHandler={changeToneHandler}
                closeHandler={closeModalHandler}
              />
            )}
            {modalChild == "Region" && (
              <ModalChild
                heading={modalChild}
                options={Constant.Options.Region}
                columns={2}
                selected={region}
                changeHandler={changeRegionHandler}
                closeHandler={closeModalHandler}
              />
            )}
            {modalChild == "Domain" && (
              <ModalChild
                heading={modalChild}
                options={Constant.Options.Domain}
                columns={4}
                selected={domain}
                changeHandler={changeDomainHandler}
                closeHandler={closeModalHandler}
              />
            )}
            {modalChild == "TextType" && (
              <ModalChild
                heading={modalChild}
                options={Constant.Options.TextType}
                columns={2}
                selected={textType}
                changeHandler={changeTextTypeHandler}
                closeHandler={closeModalHandler}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Features;
