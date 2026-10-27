import React from 'react';

interface CoreCardImageSlotProps {
  imageSrc: string | null;
  altText: string;
  gradientClass: string;
}

export const CoreCardImageSlot: React.FC<CoreCardImageSlotProps> = ({
  imageSrc,
  altText,
}) => {
  return (
    <div className="w-full flex items-center justify-center transition-all duration-300">
      <div className="w-full max-w-[500px] h-[250px] sm:h-[290px] lg:h-[320px] rounded-[28px] sm:rounded-[36px] overflow-hidden flex items-center justify-center select-none">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover object-center rounded-[28px] sm:rounded-[36px] drop-shadow-sm transition-transform duration-300 hover:scale-[1.01]"
          />
        ) : (
          <div className="w-full h-full rounded-[28px] sm:rounded-[36px] border-2 border-dashed border-slate-300/70 flex flex-col items-center justify-center text-slate-400 gap-2 p-4">
            <span className="material-symbols-outlined text-3xl opacity-40">
              add_photo_alternate
            </span>
            <span className="text-[12px] font-medium text-slate-500 tracking-tight">
              이미지 등록 대기 중
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
