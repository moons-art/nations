import React from 'react';

interface CoreCardImageSlotProps {
  imageSrc: string | null;
  altText: string;
  gradientClass: string;
}

export const CoreCardImageSlot: React.FC<CoreCardImageSlotProps> = ({
  imageSrc,
  altText,
  gradientClass,
}) => {
  return (
    <div
      className={`w-full rounded-[24px] sm:rounded-[30px] p-3 sm:p-5 ${gradientClass} border border-slate-200/60 shadow-inner flex items-center justify-center transition-all duration-300`}
    >
      {/* Fixed-dimension frame: Fits any landscape or portrait image via object-contain */}
      <div className="w-full max-w-[500px] h-[250px] sm:h-[290px] lg:h-[320px] rounded-2xl flex items-center justify-center relative overflow-hidden select-none">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-contain drop-shadow-md rounded-xl transition-transform duration-300 hover:scale-102"
          />
        ) : (
          <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-400/30 flex flex-col items-center justify-center text-slate-400/70 gap-2 p-4">
            <span className="material-symbols-outlined text-3xl opacity-35">
              add_photo_alternate
            </span>
            <span className="text-[12px] font-medium text-slate-500/70 tracking-tight">
              이미지 등록 대기 중
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
