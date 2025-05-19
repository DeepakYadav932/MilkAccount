import React from 'react';

import { useTranslation } from 'react-i18next';
import './language-switcher.css';
import logger from '../../services/logger/logger';
/**
 * renders a strip to select languages from dropdown
 *
 * @returns {React.FC}
 */
const LanguageSwitcher: React.FC = () => {
  const { i18n: i18nextInstance } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18nextInstance.changeLanguage(e.target.value);
  };

  try {
    return (
      <div className="language-switcher">
        <label htmlFor="language-select" className="language-label">🌐 Language:</label>
        <select
          id="language-select"
          value={i18nextInstance.language}
          onChange={handleChange}
          className="language-select"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
    )

  } catch (err) {
    logger.logError(`Error rendering language switcher => language-switcher.tsx`, err)
  }
};

export default LanguageSwitcher;
