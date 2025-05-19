import React, { useCallback } from "react";
import "./sidebar.css";
import { Icon } from "../Icon/icon";
import { InlineStyleObjectModel } from "../../utils/models/inline-style-model";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { closeSidebar } from "../../stores/app-state/app-state-slice";
import { NavLink } from "react-router-dom";
import logger from "../../services/logger/logger";

/**
 * React component responsible to show sidebar
 * @param {Function} closeSideBar function to close the sidebar on left arrow icon press
 * @param {boolean} isOpen whether the sidebar is visible
 * @returns {React.FC}
 */

export const SideBar: React.FC<SideBarProps> = () => {
  const appStateStore = useAppSelector((state) => state.appState);
  const isOpen = appStateStore.isSidebarOpened;
  const dispatch = useAppDispatch();

  const hideSidebar = useCallback(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  try {
    return (
      <aside className={`sidebar-container ${isOpen ? "open" : ""}`}>
        <div className="flex padding-default row-space-between">
          <p>Logo</p>
          <Icon
            name="arrow-left"
            onClick={hideSidebar}
            externalStyle={styles.iconStyle}
          />
        </div>

        {/* divider */}
        <div className="divider margin-horizontal-default padding-vertical-default"></div>

        {/* sidebar menu */}

        <section className="menu-container margin-vertical-default">
          <nav className="sidebar-nav">
            <NavLink
              onClick={hideSidebar}
              to="/dashboard/records"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Records
            </NavLink>
            <NavLink
              onClick={hideSidebar}
              to="/dashboard/sales"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Sales
            </NavLink>
          </nav>
        </section>
      </aside>
    )
  } catch (err) {
    logger.logError(`Error rendering sidebar => sidebar.tsx`, err);
  }
};

const styles: InlineStyleObjectModel = {
  iconStyle: {
    backgroundColor: "rgb(191, 230, 132)",
    color: "rgb(26, 228, 23)",
  },
};
