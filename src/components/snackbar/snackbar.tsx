import { useEffect, useState } from "react";
import "./snackbar.css";
import { Icon } from "../Icon/icon";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { hideToast, Severity } from "../../stores/toast/toastSlice";
import logger from "../../services/logger/logger";

export const SNACKBAR_DURATION = 3000;
export const SNACKBAR_FADE_OUT_DURATION = 1000;

export interface SnackBarProps {
  message: string;
  severity: Severity;
}

export const SnackBar: React.FC<SnackBarProps> = () => {
  const toastStore = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    if (!toastStore.show) {
      return;
    }
    const hideSnackBar = () => {
      setIsFadingOut(true); // Trigger fade-out animation
      setTimeout(() => {
        dispatch(hideToast());
        setIsFadingOut(false);
      }, SNACKBAR_FADE_OUT_DURATION);
    };

    const timeout = setTimeout(() => {
      hideSnackBar();
    }, SNACKBAR_DURATION);

    return () => clearTimeout(timeout); // cleanup to avoid memory leaks
  }, [toastStore.show, dispatch]);

  if (!toastStore.show) return null;

  try {
    return (
      <div
        className={`snackbar-container border-radius-default ${
          isFadingOut ? "fade-out" : ""
        } 
        bg-${toastStore.severity}`}
      >
        <div className="flex flex-column">
          <span className="centered row-justify-start msg-heading-container">
            <Icon name="check" />
            <h4 className="msg-heading">{toastStore.title}</h4>
          </span>
          <p className="msg centered row-justify-start">{toastStore.message}</p>
        </div>
      </div>
    );
  } catch (err) {
    logger.logError(`Error rendering snackbar => snackbar.tsx`, err);
  }
};
