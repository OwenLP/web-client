import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import { profileApiProxy } from "services/api-client/profile-api";
import authService from "services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import filesService from "shared/services/file-service";

export const updateProfileAvatar = ({
  croppedImage,
  submitCallback,
  successText
}) => dispatch => {
  const authorization = authService.getAuthArg();

  filesService
    .uploadFileProxy(croppedImage, authorization)
    .then(logoId =>
      profileApiProxy.v10ProfileAvatarUpdateByFileIdPost(logoId, authorization)
    )
    .then(() => dispatch(fetchProfileHeaderInfo()))
    .then(() => {
      dispatch(alertMessageActions.success(successText));
      submitCallback();
    })
    .catch(error =>
      dispatch(alertMessageActions.error(error.errorMessage || error.message))
    );
};

export const removeProfileAvatar = ({
  submitCallback,
  successText
}) => dispatch => {
  const authorization = authService.getAuthArg();

  profileApiProxy
    .v10ProfileAvatarRemovePost(authorization)
    .then(() => dispatch(fetchProfileHeaderInfo()))
    .then(() => {
      dispatch(alertMessageActions.success(successText));
      submitCallback();
    })
    .catch(error =>
      alertMessageActions.error(error.errorMessage || error.message)
    );
};
