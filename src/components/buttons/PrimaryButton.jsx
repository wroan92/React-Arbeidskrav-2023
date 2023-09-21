import React from "react";

const PrimaryButton = ({ label, onClick }) => {
  return (
    <button
      className="bg-blue-500 text-white rounded-full py-2 px-4"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
