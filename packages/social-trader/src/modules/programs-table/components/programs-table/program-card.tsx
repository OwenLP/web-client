import GVButton from "components/gv-button";
import Link from "components/link/link";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import StatisticItem from "components/statistic-item/statistic-item";
import TableCard, {
  TableCardTable,
  TableCardTableColumn
} from "components/table/components/table-card/table-card";
import { TableToggleFavoriteHandlerType } from "components/table/components/table.types";
import TagProgramContainer from "components/tags/tag-program-container/tag-program-container";
import { ProgramDetailsList } from "gv-api-web";
import { TAnchor, TEvent } from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";
import NumberFormat from "react-number-format";
import { managerToPathCreator } from "routes/manager.routes";
import { useTranslation } from "shared/i18n";
import { distanceDate } from "shared/utils/dates";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { formatValue, formatValueDifferentDecimalScale } from "utils/formatter";

interface Props {
  program: ProgramDetailsList;
  toggleFavorite: TableToggleFavoriteHandlerType;
  title: string;
}

const DECIMAL_SCALE_SMALL_VALUE = 4;
const DECIMAL_SCALE_BIG_VALUE = 2;

const _ProgramCard: React.FC<Props> = ({ program, toggleFavorite, title }) => {
  const handleToggleFavorite = useCallback(
    () =>
      toggleFavorite(
        program.id,
        program.personalDetails && program.personalDetails.isFavorite
      ),
    [program.id, program.personalDetails, toggleFavorite]
  );
  const { t } = useTranslation();
  const linkProps = {
    pathname: composeProgramDetailsUrl(program.url),
    state: `/ ${title}`
  };
  const requestCurrency = program.balance.currency;

  const renderActions = ({
    clearAnchor,
    anchor
  }: {
    clearAnchor: (event: TEvent) => void;
    anchor: TAnchor;
  }) => (
    <Popover
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      anchorEl={anchor}
      noPadding
      onClose={clearAnchor}
    >
      <div className="popover-list">
        <Link to={linkProps}>
          <GVButton variant="text" color="secondary" onClick={clearAnchor}>
            {t("program-actions.details")}
          </GVButton>
        </Link>
        {program.personalDetails && !program.personalDetails.isFavorite && (
          <GVButton
            variant="text"
            color="secondary"
            onClick={handleToggleFavorite}
          >
            {t("program-actions.add-to-favorites")}
          </GVButton>
        )}
        {program.personalDetails && program.personalDetails.isFavorite && (
          <GVButton
            variant="text"
            color="secondary"
            onClick={handleToggleFavorite}
          >
            {t("program-actions.remove-from-favorites")}
          </GVButton>
        )}
      </div>
    </Popover>
  );
  return (
    <TableCard
      level={program.level}
      levelProgress={program.levelProgress}
      assetId={program.id}
      profit={program.statistic.profit}
      chart={program.statistic.chart}
      color={program.color}
      hasAvatar
      title={program.title}
      subTitle={program.owner.username}
      logo={program.logo}
      managerUrl={managerToPathCreator(program.owner.url, title)}
      detailsUrl={linkProps}
      renderActions={renderActions}
      extraBlock={program.tags && <TagProgramContainer tags={program.tags} />}
    >
      <TableCardTable>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.equity")}>
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                program.balance.amount,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              suffix={` ${requestCurrency}`}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem label={t("programs-page.programs-header.period")}>
            <ProgramPeriodPie
              start={program.periodStarts}
              end={program.periodEnds}
            />
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem label={t("programs-page.programs-header.investors")}>
            <NumberFormat
              value={program.investorsCount}
              displayType="text"
              decimalScale={0}
            />
          </StatisticItem>
          <StatisticItem label={t("programs-page.programs-header.age")}>
            {distanceDate(program.creationDate)}
          </StatisticItem>
        </TableCardTableColumn>
        <TableCardTableColumn>
          <StatisticItem
            label={t("programs-page.programs-header.available-to-invest")}
          >
            <NumberFormat
              value={formatValueDifferentDecimalScale(
                program.availableToInvest,
                DECIMAL_SCALE_SMALL_VALUE,
                DECIMAL_SCALE_BIG_VALUE
              )}
              displayType="text"
              suffix={` ${requestCurrency}`}
            />
          </StatisticItem>
          <StatisticItem label={t("programs-page.programs-header.drawdown")}>
            <NumberFormat
              value={formatValue(program.statistic.drawdown, 2)}
              displayType="text"
              suffix="%"
            />
          </StatisticItem>
        </TableCardTableColumn>
      </TableCardTable>
    </TableCard>
  );
};

const ProgramCard = React.memo(_ProgramCard);
export default ProgramCard;
