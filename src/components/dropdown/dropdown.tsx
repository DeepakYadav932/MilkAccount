import React from "react";
import "./dropdown.css";
import logger from "../../services/logger/logger";

export interface DropdownItem {
  value: string;
  label: string;
}
interface DropdownMenuProps {
  ddData: DropdownItem[];
  onChange: () => void;
  isDisabled: boolean;
  value: number
}
/**
 * Component responsible to select value from the provided options
 * @param {DropdownItem[]} ddData Array of items
 * @param {number} value selected value of dropdown
 * @param {Function} onChange function to run on change
 * @returns {React.FC}
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  ddData,
  onChange,
  isDisabled,
  value
}: DropdownMenuProps) => {
  try {
    return (
      <select
        disabled={!!isDisabled}
        className="select"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value)
        }
      >
        {ddData.map((item: DropdownItem, index) => {
          return (
            <option
              value={item.value}
              key={`ddItem-${index}`}
              label={item.label}
            />
          )
        })}
      </select>
    );
  } catch (err) {
    logger.logError(`Error rendering dropdown => dropdown.tsx`, err);
  }
};
