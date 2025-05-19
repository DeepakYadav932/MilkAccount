import i18n from "../../i18n/i18n";
import { Severity, ToastProps } from "../../stores/toast/toastSlice";

export const loginHelper = {
  createSuccessToast: (): ToastProps => {
    return {
      message: i18n.t("login.success.title"),
      title: i18n.t("login.success.msg"),
      severity: Severity.SUCCESS,
    };
  },
  createErrorToast: (): ToastProps => {
    return {
      message: i18n.t("login.failed.title"),
      title: i18n.t("login.failed.message"),
      severity: Severity.ERROR,
    };
  },
};
