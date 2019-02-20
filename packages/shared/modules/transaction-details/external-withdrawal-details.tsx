import { GVButton } from "gv-react-components";
import * as React from "react";
import NumberFormat from "react-number-format";
import CopyIcon from "shared/components/icon/copy-icon";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Status from "shared/components/status/status";
import Copy from "shared/decorators/with-copy";
import ArrowIcon from "shared/media/arrow-up-thin.svg";
import { ITransactionDetailsProps } from "shared/modules/transaction-details/transaction-details";
import filesService from "shared/services/file-service";
import { formatCurrencyValue } from "shared/utils/formatter";

const ExternalWithdrawal = (props: ITransactionDetailsProps) => {
  const { data, t } = props;
  return (
    <React.Fragment>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t(`transactions-details.title`)}</h2>
          <p>{t(`transactions-details.withdrawal.title`)}</p>
        </div>
        <StatisticItem label={t(`transactions-details.external.from-wallet`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img
                  className="external-transaction__wallet"
                  src={filesService.getFileUrl(data.currencyLogo)}
                  alt="wallet"
                />
              </div>
            </div>
            <div className="external-transaction__address">
              <p>{data.currencyName}</p>
            </div>
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.external.amount`)} big>
          <NumberFormat
            value={formatCurrencyValue(data.amount, data.currency)}
            suffix={` ${data.currency}`}
            allowNegative={true}
            displayType="text"
          />
        </StatisticItem>
      </div>
      <div className="dialog__bottom">
        <StatisticItem label={t(`transactions-details.external.to`)}>
          <div className="external-transaction">
            <div className="external-transaction__icon">
              <div className="profile-avatar">
                <img src={ArrowIcon} alt={"external withdrawal"} />
              </div>
            </div>
            <div className="external-transaction__address">
              {data.externalTransactionDetails.fromAddress}
              <Copy
                errorMessage={t("transactions-details.copy.error")}
                successMessage={t("transactions-details.copy.success")}
              >
                {({ copy }) => (
                  <GVButton
                    color="secondary"
                    onClick={() =>
                      copy(data.externalTransactionDetails.fromAddress)
                    }
                    variant="text"
                  >
                    <CopyIcon primary />
                    &nbsp;
                    {t("buttons.copy")}
                  </GVButton>
                )}
              </Copy>
            </div>
          </div>
        </StatisticItem>
        <StatisticItem label={t(`transactions-details.status.title`)}>
          <div className="external-transaction__status">
            {data.status} {data.externalTransactionDetails.description}{" "}
            <Status status={data.status} />
          </div>{" "}
        </StatisticItem>
      </div>
    </React.Fragment>
  );
};

export default ExternalWithdrawal;
