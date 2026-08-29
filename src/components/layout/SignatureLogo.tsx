import React from "react";

interface SignatureLogoProps {
  name?: string;
  className?: string;
  onClick?: () => void;
}

export const SignatureLogo: React.FC<SignatureLogoProps> = ({
  name = "Pham Son",
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      aria-label="Go to homepage"
      className={`inline-flex items-center cursor-pointer select-none transition-all duration-300 hover:opacity-90 active:scale-95 group ${className}`}
    >
      <span className="font-agustina text-xl sm:text-2xl font-normal text-zinc-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 tracking-wider transition-colors pt-1 leading-none">
        {name}
      </span>
    </div>
  );
};

export default SignatureLogo;
