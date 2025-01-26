import React from "react";
import promoImage from "../../assets/image.png";

const PromoCard: React.FC = () => {
  return (
    <div className="bg-rose-50 flex items-center justify-between rounded-lg shadow-md font-mono h-48 ">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-[#bb7b85]">
          build your library
        </h2>
        <p className="text-[#313857] mt-2">
          buy two selected books and get one for free
        </p>
      </div>
      <div className="w-1/3 h-full">
        <img
          src={promoImage}
          alt="Promotion"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PromoCard;
