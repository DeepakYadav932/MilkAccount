import React, { useCallback } from "react";
import "./login.css";
import { InputField } from "../../components/input-field/input-field";
import { Button } from "../../components/button/button";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { setUsername } from "../../stores/user/userSlice";
import { showToast } from "../../stores/toast/toastSlice";
import { loginHelper } from "../../utils/login/login-helper";
import localStorageService from "../../services/local-storage/local-storage";
import logger from "../../services/logger/logger";
import { useTranslation } from "react-i18next";
import { LocalStorageKeys } from "../../constants/local-storage-keys";
import { useNavigate } from "react-router-dom";
import { NavigationPath } from "../../constants/navigation-paths";

/**
 *
 * @returns {React.FC}React Functional Component
 * handles the UI for Login
 */
export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.user);
  const handleUsernameChange = useCallback(
    (text: string) => {
      dispatch(setUsername(text));
    },
    [dispatch]
  );

  const navigateToDashboard = useCallback(() => {
    navigate(NavigationPath.DASHBOARD);
  }, [navigate]);

  const handleLogin = useCallback(
    async (event: Event) => {
      try {
        event.preventDefault();
        const isLoginSuccess = userStore.username === "deepak";
        if (isLoginSuccess) {
          localStorageService.setKey(
            LocalStorageKeys.AUTH_TOKEN,
            userStore.username
          );
          navigateToDashboard();
        } else {
          dispatch(showToast(loginHelper.createErrorToast()));
          localStorageService.removeKey(LocalStorageKeys.AUTH_TOKEN);
        }
      } catch (err) {
        logger.logError("Login Error", err);
      }
    },
    [navigateToDashboard, userStore.username, dispatch]
  );

  return (
    <div className="login-page-container centered full-height full-width flex-column">
      <div className="logo">
        <img height={150} src="logo.jpg" className="logo"></img>
      </div>

      <div className="login-container bg-primary border-radius-default">
        <form
          className="login-form border-radius-default padding-default flex flex-column"
          onSubmit={handleLogin}
        >
          <p className="text-align-center login-label">{t("login.boxTitle")}</p>
          <div className="centered flex-column input-fields-container ">
            <InputField
              label={t("login.username")}
              onChange={handleUsernameChange}
              value={userStore.username}
            />
            <Button
              label={userStore.loading ? t("login.loading") : t("login.button")}
              disabled={!!userStore.loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
