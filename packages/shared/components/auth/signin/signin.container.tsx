import Router from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { LOGIN_ROUTE } from "shared/routes/app.routes";
import { AuthRootState, SetSubmittingType } from "shared/utils/types";

import CaptchaContainer, { ValuesType } from "../captcha-container";
import AuthTabs from "../components/auth-tabs/auth-tabs";
import {
  CODE_TYPE,
  loginUserInvestorAction,
  loginUserManagerAction
} from "./signin.actions";
import { clearLoginData, login } from "./signin.service";

const _SignInContainer: React.FC<Props> = ({
  className,
  renderForm,
  password,
  email,
  redirectFrom,
  service,
  errorMessage,
  role,
  type
}) => {
  const method =
    role === ROLE.MANAGER ? loginUserManagerAction : loginUserInvestorAction;
  useEffect(() => service.clearLoginData, [service.clearLoginData]);
  useEffect(
    () => {
      if (type && (email === "" || password === ""))
        Router.replace(NOT_FOUND_PAGE_ROUTE);
    },
    [email, password, type]
  );
  return (
    <div className={className}>
      {!type && <AuthTabs authPartUrl={LOGIN_ROUTE} />}
      <CaptchaContainer
        request={service.login(method, redirectFrom, type)}
        renderForm={handle => renderForm(handle, email, errorMessage)}
      />
    </div>
  );
};

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return {
    password,
    email,
    errorMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      clearLoginData,
      login
    },
    dispatch
  )
});

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}
interface ServiceThunks extends ActionCreatorsMapObject {
  clearLoginData: typeof clearLoginData;
  login: typeof login;
}

interface StateProps {
  errorMessage: string;
  password: string;
  email: string;
}

interface OwnProps {
  renderForm: (
    handle: (values: ValuesType, setSubmitting?: SetSubmittingType) => void,
    email: string,
    errorMessage: string
  ) => JSX.Element;
  className: string;
  type?: CODE_TYPE;
  redirectFrom: string;
}

interface Props extends OwnProps, StateProps, DispatchProps, WithRoleProps {}

const SignInContainer = compose<React.ComponentType<OwnProps>>(
  withRole,
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_SignInContainer);
export default SignInContainer;
