import {
  GlobalSearchContext,
  GlobalSearchContextProvider
} from "components/global-search/global-search-context";
import HeaderContainer from "components/header/header.container";
import {
  appHeaderStyles,
  appMainStyles,
  appStyles,
  appWrapperStyles
} from "components/layouts/app-layout/app-layout.style";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import dynamic from "next/dist/next-server/lib/dynamic";
import React, { ComponentType, useContext } from "react";
import styled from "styled-components";

const GlobalSearchResultContainer = dynamic(() =>
  import(
    "components/global-search/components/global-search-result/global-search-result-container"
  )
);

const App = styled.div`
  ${appStyles}
`;

const AppWrapper = styled.div`
  ${appWrapperStyles}
`;

const AppHeader = styled.div`
  ${appHeaderStyles}
`;

const AppMain = styled.div`
  ${appMainStyles}
`;

const PageContent: React.FC = ({ children }) => {
  const { searchValue } = useContext(GlobalSearchContext);
  return !!searchValue ? (
    <GlobalSearchResultContainer query={searchValue} />
  ) : (
    <>{children}</>
  );
};

const _AppLayout: ComponentType = ({ children }) => {
  return (
    <GlobalSearchContextProvider>
      <AppWrapper>
        <App>
          <AppHeader>
            <HeaderContainer />
          </AppHeader>
          <AppMain>
            <PageContent>{children}</PageContent>
          </AppMain>
          <AlertMessageList />
        </App>
        <div id="modal-root" />
      </AppWrapper>
    </GlobalSearchContextProvider>
  );
};

const AppLayout = React.memo(_AppLayout);
export default AppLayout;
