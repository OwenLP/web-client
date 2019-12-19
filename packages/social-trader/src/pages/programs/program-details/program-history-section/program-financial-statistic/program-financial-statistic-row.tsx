import "./program-financial-statistic.scss";

import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { TableCell, TableRow } from "components/table/components";
import { ProgramPeriodViewModel } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "shared/utils/dates";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramFinancialStatisticRow: React.FC<Props> = ({
  period,
  currency,
  showCommissionRebateSometime
}) => {
  const {
    managerStatistic: { profit, balance, successFee, entryFee },
    managerDeposit,
    managerWithdraw,
    managerCommissionRebate
  } = period;

  return (
    <TableRow stripy>
      <TableCell className="program-financial-statistic__cell">
        {period.number}
      </TableCell>
      <TableCell className="program-financial-statistic__cell">
        {formatDate(period.dateFrom)}
      </TableCell>
      <TableCell className="program-financial-statistic__cell">
        <NumberFormat
          value={formatCurrencyValue(balance, currency)}
          displayType="text"
          thousandSeparator=" "
          suffix={` ${currency}`}
        />
      </TableCell>
      <TableCell className="program-financial-statistic__cell">
        <Profitability value={profit} prefix={PROFITABILITY_PREFIX.SIGN}>
          <NumberFormat
            value={formatCurrencyValue(profit, currency)}
            thousandSeparator=" "
            displayType="text"
            allowNegative={false}
            suffix={` ${currency}`}
          />
        </Profitability>
      </TableCell>
      <TableCell className="program-financial-statistic__cell program-financial-statistic__cell--sm-size">
        <NumberFormat
          value={successFee}
          suffix={` ${currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell className="program-financial-statistic__cell program-financial-statistic__cell--sm-size">
        <NumberFormat
          value={entryFee}
          suffix={` ${currency}`}
          displayType="text"
        />
      </TableCell>
      <TableCell className="program-financial-statistic__cell program-financial-statistic__cell--sm-size">
        {managerWithdraw ? (
          <Profitability
            prefix={PROFITABILITY_PREFIX.SIGN}
            value={`-${formatCurrencyValue(managerWithdraw, currency)}`}
          >
            <NumberFormat
              value={formatCurrencyValue(managerWithdraw, currency)}
              thousandSeparator=" "
              displayType="text"
              suffix={` ${currency}`}
            />
          </Profitability>
        ) : (
          <Profitability
            prefix={PROFITABILITY_PREFIX.SIGN}
            value={formatCurrencyValue(managerDeposit, currency)}
          >
            <NumberFormat
              value={formatCurrencyValue(managerDeposit, currency)}
              thousandSeparator=" "
              displayType="text"
              suffix={` ${currency}`}
            />
          </Profitability>
        )}
      </TableCell>
      {showCommissionRebateSometime && (
        <TableCell className="program-financial-statistic__cell program-financial-statistic__cell--sm-size">
          <NumberFormat
            value={formatCurrencyValue(managerCommissionRebate, currency)}
            displayType="text"
            suffix={` ${currency}`}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

interface Props {
  showCommissionRebateSometime: boolean;
  period: ProgramPeriodViewModel;
  currency: CurrencyEnum;
}

const ProgramFinancialStatisticRow = React.memo(_ProgramFinancialStatisticRow);
export default ProgramFinancialStatisticRow;
