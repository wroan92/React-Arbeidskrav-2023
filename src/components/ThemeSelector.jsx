import React from "react";

const ThemeSelector = ({ themes, onSelectTheme }) => {
  return (
    <div>
      <h2>Choose Theme</h2>
      <select onChange={(e) => onSelectTheme(e.target.value)}>
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
