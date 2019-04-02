import { ProgramPwdUpdate } from "gv-api-web";
import { Dispatch } from "redux";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const changePasswordTradingAccount = (
  id: string,
  model?: ProgramPwdUpdate
): any => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();
  return managerApi
    .v10ManagerProgramsByIdPasswordChangePost(id, authorization, { model })
    .then(() => {
      dispatch(fetchProfileHeaderInfo());
      dispatch(
        alertMessageActions.success(
          "password-change-trading-account.success-alert-message",
          true
        )
      );
      return;
    });
};
