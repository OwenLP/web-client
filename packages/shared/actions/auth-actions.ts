import Router from "next/router";
import { Action } from "redux";
import { AuthState } from "shared/reducers/auth-reducer";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { ActionType } from "shared/utils/types";

export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const LOGOUT = "LOGOUT";
export type UpdateTokenActionType = ActionType<AuthState>;

const alreadyAuthenticated = () => {
  Router.push(HOME_ROUTE);
};

const updateTokenAction = (
  isAuthenticated: boolean
): UpdateTokenActionType => ({
  type: UPDATE_TOKEN,
  payload: { isAuthenticated }
});

const logoutAction = (): Action => ({
  type: LOGOUT
});

const authActions = { updateTokenAction, alreadyAuthenticated, logoutAction };
export default authActions;
