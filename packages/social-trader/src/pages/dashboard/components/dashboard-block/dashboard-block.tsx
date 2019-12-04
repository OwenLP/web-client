import "./dashboard-block.scss";

import classNames from "classnames";
import DetailsBlock from "components/details/details-block";
import Link from "components/link/link";
import React from "react";

const _DashboardBlock: React.FC<Props> = ({
  label,
  all,
  children,
  className
}) => {
  return (
    <DetailsBlock
      table
      className={classNames("dashboard-block__container", className)}
    >
      {(label || all) && (
        <div className="dashboard-block__header">
          {label && <h3>{label}</h3>}
          {all && (
            <div className="dashboard-block__see-all">
              <Link className="dashboard-block__link" to={all}>
                &rsaquo;
              </Link>
            </div>
          )}
        </div>
      )}
      {children}
    </DetailsBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  all?: string;
}

const DashboardBlock = React.memo(_DashboardBlock);
export default DashboardBlock;
