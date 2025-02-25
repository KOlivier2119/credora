import React from "react";

const StyledComponent = () => {
  return (
    <div className="relative w-40 h-40 bg-white border border-gray-300">
      {/* Dark diagonal bar */}
      <div className="absolute top-0 left-0 w-full h-full transform rotate-45 bg-gray-900" style={{ width: "70%", height: "30%", top: "-15%", left: "-15%" }}></div>
      
      {/* Light gray shadow effect */}
      <div className="absolute bottom-0 left-0 w-full h-full transform rotate-45 bg-gray-500 opacity-70" style={{ width: "70%", height: "30%", bottom: "-15%", left: "-15%" }}></div>
    </div>
  );
};

export default StyledComponent;
