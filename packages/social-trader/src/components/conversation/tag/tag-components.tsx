import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { Message } from "components/conversation/message/message";
import { RepostTagContainer } from "components/conversation/tag/repost-tag-container";
import { TagBlock } from "components/conversation/tag/tag.block";
import { CurrencyItem } from "components/currency-item/currency-item";
import PortfolioEventLogo from "components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { $labelColor } from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeSmall } from "components/gv-styles/gv-sizes";
import Link, { ToType } from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Profitability from "components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "components/profitability/profitability.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { TextColor } from "components/text/text.types";
import Crashable from "decorators/crashable";
import {
  ChangeState,
  Post as PostType,
  PostAssetDetailsWithPrices,
  PostEvent,
  PostLink,
  PostPlatformAssetDetailsWithPrices,
  ProfilePublic,
  SocialPostTagType
} from "gv-api-web";
import { getAssetFolderRoute } from "pages/dashboard/components/dashboard-trading/dashboard-public-card";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import styled from "styled-components";
import { composeAssetDetailsUrl } from "utils/compose-url";

export interface IUrlTagProps {
  data: { link: PostLink };
}

export interface IEventTagProps {
  data: { event: PostEvent; assetDetails: PostAssetDetailsWithPrices };
}

export interface IPlatformAssetTagProps {
  platformAssetDetails: PostPlatformAssetDetailsWithPrices;
}

export interface IUserTagProps {
  userDetails: ProfilePublic;
}

export interface IAssetTagProps {
  assetDetails: PostAssetDetailsWithPrices;
}

export interface IAnyTagProps {
  url: string;
  name: string;
}

export interface IRepostTagProps {
  post: PostType;
}

export type TagToComponentType = {
  tagType: SocialPostTagType;
  Component: React.FC<any>;
};

const getAssetTagTextColor = (
  changeState: ChangeState
): TextColor | undefined => {
  switch (changeState) {
    case "Decreased":
      return "red";
    case "Increased":
      return "green";
  }
};

const TagTitleRow = styled(Row)`
  & div {
    font-size: ${$fontSizeSmall}px;
    color: ${$labelColor};
  }
`;

const AssetTagArrow = styled(RowItem)`
  font-size: 18px;
  line-height: 15px;
`;

const _UrlTagComponent: React.FC<IUrlTagProps> = ({
  data: {
    link: { title, url }
  }
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ wordBreak: "break-all" }}
    >
      {title}
    </a>
  );
};
export const UrlTagComponent = React.memo(_UrlTagComponent);

const _PlatformAssetTagComponent: React.FC<IPlatformAssetTagProps> = ({
  platformAssetDetails: {
    change24Percent,
    changeState,
    price,
    name,
    logoUrl,
    url
  }
}) => {
  const color = getAssetTagTextColor(changeState);
  const hasPercent = change24Percent !== null;
  const hasData = price !== null || hasPercent;
  return (
    <TagBlock>
      <TagTitleRow>
        <CurrencyItem small name={name} url={url} logo={logoUrl} />
      </TagTitleRow>
      {hasData && (
        <Row size={"small"}>
          <RowItem wide>
            <Text size={"small"} wrap={false}>
              $ {price}
            </Text>
          </RowItem>
          {hasPercent && (
            <RowItem>
              <Text size={"small"} wrap={false} color={color}>
                <Row>
                  <RowItem size={"xsmall"}>{change24Percent}% </RowItem>
                  {changeState !== "NotChanged" && (
                    <AssetTagArrow>
                      <div>
                        {changeState === "Increased" ? (
                          <>&uarr;</>
                        ) : (
                          <>&darr;</>
                        )}
                      </div>
                    </AssetTagArrow>
                  )}
                </Row>
              </Text>
            </RowItem>
          )}
        </Row>
      )}
    </TagBlock>
  );
};
export const PlatformAssetTagComponent = React.memo(_PlatformAssetTagComponent);

const _RepostTagComponent: React.FC<IRepostTagProps> = ({
  post: { url, tags, images, date, text, author }
}) => {
  return (
    <RepostTagContainer>
      <Message
        row={false}
        tags={tags}
        url={url}
        images={images}
        date={date}
        text={text}
        author={author}
      />
    </RepostTagContainer>
  );
};
export const RepostTagComponent = React.memo(_RepostTagComponent);

const _EventTag: React.FC<IEventTagProps> = ({
  data: {
    assetDetails,
    event: { logoUrl, title, amount, currency, percent, changeState }
  }
}) => {
  const color = getAssetTagTextColor(changeState);
  return (
    <Row wrap>
      <RowItem size={"small"}>
        <PortfolioEventLogo
          withAsset={true}
          assetDetails={assetDetails}
          icon={logoUrl}
        />
      </RowItem>
      <RowItem>
        <Center>{title}</Center>
      </RowItem>
      {amount !== null && (
        <RowItem>
          <Center>
            <RowItem size={"small"}>
              <Text color={color}>
                {amount} {currency}
              </Text>
            </RowItem>
            {percent !== null && (
              <RowItem>
                <Profitability
                  prefix={PROFITABILITY_PREFIX.SIGN}
                  variant={PROFITABILITY_VARIANT.CHIPS}
                  value={percent}
                >
                  {Math.abs(percent)} %
                </Profitability>
              </RowItem>
            )}
          </Center>
        </RowItem>
      )}
    </Row>
  );
};
export const EventTag = React.memo(_EventTag);

const _AnyTag: React.FC<IAnyTagProps> = ({ name }) => {
  return <>{name}</>;
};
export const AnyTag = React.memo(_AnyTag);

const _EmptyTag: React.FC = () => {
  return null;
};
export const EmptyTag = React.memo(_EmptyTag);

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

const _AssetTagCard: React.FC<IAssetTagProps & { url: ToType | string }> = ({
  url,
  assetDetails: {
    color: assetColor,
    changeState,
    price,
    change24Percent,
    logoUrl,
    title
  }
}) => {
  const color = getAssetTagTextColor(changeState);
  return (
    <TagBlock>
      <AvatarWithName
        size={"small"}
        avatar={
          <Link to={url}>
            <AssetAvatar
              color={assetColor}
              size={"xsmall"}
              url={logoUrl}
              alt={title}
            />
          </Link>
        }
        name={
          <Link to={url}>
            <Text muted wrap={false} size={"small"}>
              {title}
            </Text>
          </Link>
        }
      />
      {(price !== null || change24Percent !== null) && (
        <Row size={"small"}>
          {price !== null && (
            <RowItem wide>
              <Text size={"small"} wrap={false}>
                $ {price}
              </Text>
            </RowItem>
          )}
          {change24Percent !== null && (
            <RowItem>
              <Text size={"small"} wrap={false} color={color}>
                <Row>
                  <RowItem size={"xsmall"}>{change24Percent}% </RowItem>
                  {changeState !== "NotChanged" && (
                    <AssetTagArrow>
                      <div>
                        {changeState === "Increased" ? (
                          <>&uarr;</>
                        ) : (
                          <>&uarr;</>
                        )}
                      </div>
                    </AssetTagArrow>
                  )}
                </Row>
              </Text>
            </RowItem>
          )}
        </Row>
      )}
    </TagBlock>
  );
};
export const AssetTagCard = React.memo(Crashable(_AssetTagCard));

const _ProgramTagCard: React.FC<IAssetTagProps> = ({ assetDetails }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Program", assetDetails.url);
  const folderRoute = getAssetFolderRoute("Program");
  return (
    <AssetTagCard
      assetDetails={assetDetails}
      url={linkCreator(route, folderRoute, contextTitle)}
    />
  );
};
export const ProgramTagCard = React.memo(Crashable(_ProgramTagCard));

const _FundLink: React.FC<IAssetTagProps> = ({
  assetDetails: { url, title }
}) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Fund", url);
  const folderRoute = getAssetFolderRoute("Fund");
  return (
    <Link to={linkCreator(route, folderRoute, contextTitle)}>{title}</Link>
  );
};
export const FundLink = React.memo(_FundLink);

const _FundTagCard: React.FC<IAssetTagProps> = ({ assetDetails }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("Fund", assetDetails.url);
  const folderRoute = getAssetFolderRoute("Fund");
  return (
    <AssetTagCard
      assetDetails={assetDetails}
      url={linkCreator(route, folderRoute, contextTitle)}
    />
  );
};
export const FundTagCard = React.memo(Crashable(_FundTagCard));

const _FollowLink: React.FC<IAssetTagProps> = ({
  assetDetails: { url, title }
}) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("SignalProgram", url);
  const folderRoute = getAssetFolderRoute("SignalProgram");
  return (
    <Link to={linkCreator(route, folderRoute, contextTitle)}>{title}</Link>
  );
};
export const FollowLink = React.memo(_FollowLink);

const _FollowTagCard: React.FC<IAssetTagProps> = ({ assetDetails }) => {
  const { linkCreator, contextTitle } = useToLink();
  const route = composeAssetDetailsUrl("SignalProgram", assetDetails.url);
  const folderRoute = getAssetFolderRoute("SignalProgram");
  return (
    <AssetTagCard
      assetDetails={assetDetails}
      url={linkCreator(route, folderRoute, contextTitle)}
    />
  );
};
export const FollowTagCard = React.memo(Crashable(_FollowTagCard));

const _UserLink: React.FC<IUserTagProps> = ({
  userDetails: { url, username }
}) => {
  const { contextTitle } = useToLink();
  const to = managerToPathCreator(url, contextTitle);
  return <Link to={to}>{username}</Link>;
};
export const UserLink = React.memo(_UserLink);

const _UserTagCard: React.FC<IUserTagProps> = ({
  userDetails: { username, url, logoUrl }
}) => {
  const { contextTitle } = useToLink();
  return (
    <TagBlock>
      <AvatarWithName
        size={"small"}
        avatar={
          <Link to={managerToPathCreator(url, contextTitle)}>
            <ProfileAvatar url={logoUrl} alt={username} />
          </Link>
        }
        name={
          <Link to={managerToPathCreator(url, contextTitle)}>
            <Text muted wrap={false} size={"small"}>
              {username}
            </Text>
          </Link>
        }
      />
    </TagBlock>
  );
};
export const UserTagCard = React.memo(Crashable(_UserTagCard));
