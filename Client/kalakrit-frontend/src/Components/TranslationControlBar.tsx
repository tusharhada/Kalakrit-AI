interface TranslationControlBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  textTokens: number;
  loadingState: boolean;
  tokenLimit: number;
  doTranslation: () => void;
}

const TranslationControlBar: React.FC<TranslationControlBarProps> = ({
  textTokens,
  loadingState,
  doTranslation,
  tokenLimit,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="select-none text-[#887061] font-medium">
        {textTokens} / {tokenLimit}
      </div>
      <div className="flex flex-row items-center max-md:hidden gap-6">
        <p className="select-none text-[#55463d] font-semibold">
          Ctrl + Enter or
        </p>
        <button
          className={`cursor-pointer select-none px-5 py-2 text-white ${
            !loadingState &&
            "hover:-translate-y-1 active:-translate-y-[0.8] transition-transform"
          } squircle bg-[#eb5a00] font-semibold`}
          disabled={loadingState}
          onClick={doTranslation}
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default TranslationControlBar;
