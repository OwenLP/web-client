import { CreateSignalProvider } from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";

export const editSignal = (request: CreateSignalProvider) => {
  const authorization = authService.getAuthArg();
  return assetsApi.updateSignalProviderSettings(authorization, {
    request
  });
};
