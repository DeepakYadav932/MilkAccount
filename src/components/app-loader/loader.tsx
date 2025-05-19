import React from "react";
import { Icon } from "../Icon/icon";
import "./loader.css";
import { InlineStyleObjectModel } from "../../utils/models/inline-style-model";
import theme from "../../constants/theme";
import logger from "../../services/logger/logger";

interface LoaderProps {}

export const AppLoader: React.FC<LoaderProps> = ({}) => {
  try {
    return (
      <div className="centered full-width loader-bg border-radius-default">
        <span className="loading-icon">
          <Icon name="rotate-ccw" externalStyle={styles.iconStyle} />
        </span>
        <p className="loading-text"> Loading ...</p>
      </div>
    );
  } catch(err) {
    logger.logError(`Error rendering loader => loader.tsx`, err)
  }
};

const styles: InlineStyleObjectModel = {
  iconStyle: {
    color: theme.colors.primary,
  },
};
