import { DialogField } from "components/dialog/dialog-field";
import StatisticItem from "components/statistic-item/statistic-item";
import Status from "components/status/status";
import { TransactionDetailsProps } from "modules/transaction-details/transaction-details-dialog";
import TransactionAsset from "modules/transaction-details/transactions/transaction-asset";
import * as React from "react";
import NumberFormat from "react-number-format";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "utils/formatter";

import TransactionDetails from "./transaction-details";

/*const OpenCloseTransaction: React.FC<TransactionDetailsProps> = ({
  data,
  t
}) => (
  <TransactionDetails
    header={t(
      `transactions-details.${data.type}.${data.programDetails.programType}`
    )}
    body={
      <StatisticItem
        label={t(`transactions-details.${data.programDetails.programType}`)}
      >
        <TransactionAsset
          url={data.programDetails.logo}
          data={data.programDetails}
        />
      </StatisticItem>
    }
    bottom={
      <>
        <DialogField>
          <StatisticItem label={t(`transactions-details.status.title`)}>
            <div className="external-transaction__status">
              {data.status} <Status status={data.status} />
            </div>
          </StatisticItem>
        </DialogField>
        <DialogField>
          <StatisticItem
            label={t(`transactions-details.investment.amount`)}
            big
          >
            <NumberFormat
              value={formatValue(data.amount, DEFAULT_DECIMAL_SCALE)}
              suffix={` ${data.currency}`}
              allowNegative={true}
              displayType="text"
            />
          </StatisticItem>
        </DialogField>
      </>
    }
  />
);

export default OpenCloseTransaction;*/
