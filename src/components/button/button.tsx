import React from "react";
import "./button.css";
import logger from "../../services/logger/logger";
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled: boolean;
  externalStyle: React.CSSProperties;
};

/**
 * renders a button
 * @param {string} label
 * @param {Function} onClick
 * @param {boolean} disabled
 * @param {React.CSSProperties} externalStyle
 * @returns {React.FC}
 */

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  externalStyle,
}: ButtonProps) => {
  try {
    return (
      <button
        type="submit"
        onClick={onClick}
        disabled={!!disabled}
        className={`btn btn-login margin-vertical-default padding-vertical-default border-radius-default ${
          disabled ? "btn-disabled" : ""
        }`}
        style={externalStyle}
      >
        {label}
      </button>
    );
  } catch (err) {
    logger.logError(`Error rendering button => button.tsx`, err);
  }
};
