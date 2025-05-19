import React from "react";
import "./input-field.css";
import logger from "../../services/logger/logger";

type InputFieldProps = {
  label: string;
  value: string;
  isPassword: boolean;
  isNumeric: boolean;
  onChange: () => void;
};

/**
 * Description
 * @param {string} label label for input box
 * @param {string} value text inside input box
 * @param {boolean} isPassword is the input field requested is of password type
 * @param {boolean} isNumeric is the input field requested is of numeric type
 * @param {any} onChange function to trigger on change
 * @returns {React.FC} returns UI for requested input
 */

export const InputField: React.FC<InputFieldProps> = ({
  value,
  label,
  isPassword,
  isNumeric,
  onChange,
}: InputFieldProps) => {
  try {
    return (
      <div className="container full-width">
        <label className="input-label">{label}</label>
        <input
          required
          type={isPassword ? "password" : isNumeric ? "number" : "text"}
          name={label}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          className="login-input full-width"
          value={value}
        ></input>
      </div>
    );
  } catch (err) {
    logger.logError(`Error rendering input field => input-field.tsx`, err);
  }
};
