import React, { useEffect } from "react";
import "./modal.css";
import { Button } from "../button/button";
import logger from "../../services/logger/logger";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) => {
  // Scroll lock effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  try {
    return (
      <div className="modal-backdrop flex centered">
        <div
          className="modal-content  border-radius-default"
          onClick={(e) => e.stopPropagation()} // prevent closing on modal click
        >
          {title && <h2 className="modal-title">{title}</h2>}
          <div className="modal-body">
            {children}
            <div className="flex centered gap-small">
              <Button label="Done" />
              <Button
                label="Close"
                externalStyle={{ backgroundColor: "red", color: "white" }}
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    logger.logError(`Error rendering modal => modal.tsx`, err);
  }
};
