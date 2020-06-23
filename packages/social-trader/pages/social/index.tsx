import { getGlobalFeed } from "components/conversation/conversation.service";
import { initialOptions } from "components/notifications/components/notifications.helpers";
import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { PostItemsViewModel, SocialSummary } from "gv-api-web";
import { NextPage } from "next";
import { getSocialPageData } from "pages/social/social/services/social-page.service";
import { SocialPage } from "pages/social/social/social.page";
import React from "react";
import { compose } from "redux";

interface Props {
  initFeedData?: PostItemsViewModel;
  data: SocialSummary;
}

const Page: NextPage<Props> = ({ initFeedData, data }) => {
  return <SocialPage initFeedData={initFeedData} data={data} />;
};

Page.getInitialProps = async () => {
  const data = await getSocialPageData();
  const initFeedData = await getGlobalFeed(initialOptions);
  return {
    initFeedData,
    data,
    namespacesRequired: ["conversation", "social-page"]
  };
};

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);
