import { useEffect, useRef } from "react";
import feather from "feather-icons";
import "./icon.css";
import logger from "../../services/logger/logger";

interface IconProps {
  name: string;
  onClick: () => void;
  externalStyle: React.CSSProperties;
}

/**
 * Renders a clickable icon
 * @param {string} name name of the icon
 * @param {Function} onClick function to execute on click
 * @param {React.CSSProperties} externalStyle externalStyle required at a particular place
 * @returns {React.FC}
 */
export const Icon: React.FC<IconProps> = ({
  name,
  onClick,
  externalStyle,
}: IconProps) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (iconRef.current) {
      feather.replace();
    }
  }, []);
  try {
    return (
      <button className="icon-btn" onClick={onClick} style={externalStyle}>
        <i data-feather={name} ref={iconRef} />
      </button>
    );
  } catch (err) {
    logger.logError(`Error rendering icon => icon.tsx`, err);
  }
};
