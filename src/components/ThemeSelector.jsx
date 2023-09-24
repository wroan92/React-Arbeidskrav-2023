import React from "react";

const ThemeSelector = ({ themes, onSelectTheme }) => {
  return (
    <div className="">
      <h2 className="mt-10 mb-2 text-lg underline font-semibold">Choose Theme</h2>
      <select 
        onChange={(e) => onSelectTheme(e.target.value)} 
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select your theme</option>
        {themes.map((theme) => (
          <option key={theme.fileName} value={theme.fileName}>
            {theme.displayName}
          </option>
        ))}
      </select>
    </div>
  );
  
};

export default ThemeSelector;
