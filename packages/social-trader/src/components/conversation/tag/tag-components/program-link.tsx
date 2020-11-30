import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";
import { composeAssetDetailsUrl } from "utils/compose-url";

import { IAssetTagProps } from "./tag-components.types";

const _ProgramLink: React.FC<IAssetTagProps> = ({
  assetDetails: { url, title }
}) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Program", url);
  const folderRoute = getAssetFolderRoute("Program");
  return (
    <Link to={linkCreator(route, folderRoute, contextTitle)}>{title}</Link>
  );
};
export const ProgramLink = React.memo(_ProgramLink);
