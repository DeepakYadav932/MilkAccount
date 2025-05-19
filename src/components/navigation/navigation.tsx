import { Navigate, NavigateProps } from "react-router-dom";
import logger from "../../services/logger/logger";

/**
 * centralized logix for programmatic navigation
 * @param {NavigateProps} props 
 * @returns {React.FC}
 */
export const NavigateTo: React.FC<NavigateProps> = (props: NavigateProps) => {
  try {
    return <Navigate {...props} replace />
  } catch (err) {
    logger.logError(`Error in navigation.tsx`, err)
  }
}