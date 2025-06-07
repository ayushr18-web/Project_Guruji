// components/commonComponents/InfoCard.tsx
'use client';

import CustomButton from './customButton';

interface InfoCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const InfoCard = ({
  imageSrc,
  imageAlt = 'Icon',
  title,
  description,
  buttonText,
  onClick,
}: InfoCardProps) => {
  return (
    <div className="bg-[#fef6e8] border-[4px] border-[#642B00] rounded-2xl p-6 w-full max-w-sm text-center flex flex-col items-center w-1/5 h-2/4">
      <img src={imageSrc} alt={imageAlt} width={50} height={50} />
        
     
      <h2 className="mt-4 text-xl font-semibold text-[#642B00]">{title}</h2>
      <p className="mt-2 text-[#9a5d31] text-sm">{description}</p>
      <div className="mt-4">
        <CustomButton
          text={buttonText}
          onClick={onClick}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default InfoCard;
