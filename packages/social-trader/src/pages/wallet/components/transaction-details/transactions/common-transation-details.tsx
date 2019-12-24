import "../transaction-details.scss";

import classNames from "classnames";
import ActionButton from "components/action-button/action-button";
import { CurrencyItem } from "components/currency-item/currency-item";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogField } from "components/dialog/dialog-field";
import { DialogTop } from "components/dialog/dialog-top";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import {
  AmountRowCell,
  MultiWalletTransactionStatus,
  TransactionAssetDetails,
  TransactionDetailItem
} from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import TransactionAsset from "pages/wallet/components/transaction-details/transactions/transaction-asset";
import WalletConvert from "pages/wallet/components/wallet-tables/wallet-transactions/wallet-convert";
import { MultiWalletTransaction } from "pages/wallet/wallet.types";
import * as React from "react";
import { useTranslation } from "react-i18next";

const TransactionDetailsItemsBlock: React.FC<{
  items: TransactionDetailItem[];
}> = React.memo(({ items }) => {
  return (
    <>
      {items.map(item => (
        <TransactionDetailsListItem item={item} />
      ))}
    </>
  );
});

const TransactionDetailsListItem: React.FC<{
  item: TransactionDetailItem;
}> = React.memo(({ item: { title, details, url, canCopy } }) => {
  const { linkCreator } = useToLink();
  return (
    <StatisticItem label={title}>
      <div className="transaction-details__details-list-statistic-item">
        <div
          className={classNames(
            "transaction-details__details-list-statistic-item-value",
            {
              "transaction-details__details-list-statistic-item-value--long":
                details.length > 40
            }
          )}
        >
          {url ? <Link to={linkCreator(url)}>{details}</Link> : details}
        </div>
        {canCopy && <CopyButton value={details} text />}
      </div>
    </StatisticItem>
  );
});

const TransactionDetailsItem: React.FC<
  {
    label: string;
  } & React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ label, children }) => {
  return (
    <DialogField>
      <StatisticItem label={label}>{children}</StatisticItem>
    </DialogField>
  );
});

const TransactionStatusBlock: React.FC<{
  status: MultiWalletTransactionStatus;
}> = React.memo(({ status }) => {
  const [t] = useTranslation();
  return (
    <TransactionDetailsItem label={t(`transactions-details.status.title`)}>
      <div className="external-transaction__status">
        <Status withText status={status} />
      </div>
    </TransactionDetailsItem>
  );
});

const TransactionAssetBlock: React.FC<{
  type: "investment" | "withdrawal";
  asset: TransactionAssetDetails;
}> = React.memo(({ asset, type }) => {
  return (
    <TransactionDetailsItem label={asset.description}>
      <TransactionAsset url={asset.logo} data={asset} />
    </TransactionDetailsItem>
  );
});
const TransactionWalletBlock: React.FC<{
  wallets: AmountRowCell;
}> = React.memo(({ wallets }) => {
  const [t] = useTranslation();
  const walletFirst = wallets.first;
  const walletSecond = wallets.second;
  return (
    <TransactionDetailsItem label={t(`transactions-details.wallet`)}>
      {walletSecond ? (
        <WalletConvert wallets={wallets} />
      ) : (
        <CurrencyItem
          logo={walletFirst.logo}
          name={walletFirst.currency}
          clickable={false}
        />
      )}
    </TransactionDetailsItem>
  );
});

const _CommonTransactionDetails: React.FC<Props> = ({
  data,
  handleCancel,
  handleResend
}) => {
  const [t] = useTranslation();
  return (
    <>
      <DialogTop
        title={t(`transactions-details.title`)}
        subtitle={data.detailsTitle}
      >
        {data.asset && (
          <TransactionAssetBlock asset={data.asset} type={"investment"} />
        )}
        <TransactionWalletBlock wallets={data.amount} />
      </DialogTop>
      <DialogBottom>
        {data.details && <TransactionDetailsItemsBlock items={data.details} />}
        <TransactionStatusBlock status={data.status} />
        {data.actions && (
          <DialogField>
            <div className="external-transaction__actions">
              {data.actions.canCancel && (
                <ActionButton
                  onClick={handleCancel}
                  text={t("buttons.cancel")}
                />
              )}
              {data.actions.canResend && (
                <ActionButton
                  onClick={handleResend}
                  text={t("buttons.resend-email")}
                />
              )}
            </div>
          </DialogField>
        )}
      </DialogBottom>
    </>
  );
};

interface Props {
  data: MultiWalletTransaction;
  handleCancel?: () => void;
  handleResend?: () => void;
}

const CommonTransactionDetails = React.memo(_CommonTransactionDetails);
export default CommonTransactionDetails;
