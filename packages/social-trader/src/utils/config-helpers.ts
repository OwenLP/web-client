import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

type RuntimeConfig = {
  apiUrl: string;
};

const getServerRuntimeConfig = (): RuntimeConfig => {
  return serverRuntimeConfig;
};

const getPublicRuntimeConfig = (): RuntimeConfig => {
  return publicRuntimeConfig;
};

export const getApiUrl = (): string => {
  const { apiUrl: serverApiUrl } = getServerRuntimeConfig();
  const { apiUrl } = getPublicRuntimeConfig();
  return serverApiUrl || apiUrl;
};
