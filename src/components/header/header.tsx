import React, { useCallback } from "react";
import "./header.css";
import { Icon } from "../Icon/icon";
import { useAppDispatch } from "../../hooks/useReduxHooks";
import {
  openSidebar,
  showAddRecordModal,
} from "../../stores/app-state/app-state-slice";
import { Button } from "../button/button";
import logger from "../../services/logger/logger";

/**
 * React component responsible for sticky header at the top
 * @returns {React.FC}
 */
export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const showSidebar = useCallback(() => {
    dispatch(openSidebar());
  }, [dispatch]);

  const openAddRecordModal = useCallback(() => {
    dispatch(showAddRecordModal(true));
  }, [dispatch]);

  try {
    return (
      <header className="header-container flex centered">
        {/* menu icon span */}
        <span className="icon-container centered">
          <Icon name="menu" onClick={showSidebar} />
        </span>

        {/* remaining header strip */}
        <span className="strip centered">
          <div className="add-data-btn-container">
            <Button label="+ Add New Data" onClick={openAddRecordModal} />
          </div>
        </span>
      </header>
    )
  } catch (err) {
    logger.logError(`Error rendering header => header.tsx`, err);
  }
};
