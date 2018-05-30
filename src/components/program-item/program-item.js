import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import PIChart from "./pi-chart/pi-chart";
import PIBookmark from "./pi-bookmark/pi-bookmark";
import { PROGRAM_ROUTE } from "../../modules/program/program.constants";
import { LOGIN_ROUTE } from "../../modules/login/login.constants";
import replaceParams from "../../utils/replace-params";
import Button from "../button/button";
import "./program-item.css";
import PeriodLeft from "./period-left/period-left";
import PIAvatar from "./pi-avatar/pi-avatar";

const ProgramItem = ({
  program,
  isAuthenticated,
  openInvestPopup,
  toggleFavoriteProgram,
  statistic: Statistic,
  order,
  showBookmark = true
}) => {
  const programRoute = replaceParams(PROGRAM_ROUTE, {
    ":programId": program.id
  });

  return (
    <div
      className={classnames("program-item", {
        "program-item--inactive": !program.isEnabled
      })}
    >
      <div className="program-item__order">{order || program.order}</div>
      <Link to={programRoute}>
        <PIAvatar
          className="program-item__avatar"
          url={program.logo}
          level={program.level}
          isTournament={program.isTournament}
        />
      </Link>
      <div className="program-item__info">
        <div className="program-item__title">
          {showBookmark &&
            isAuthenticated && (
              <PIBookmark
                className="program-item__bookmark"
                isFavorite={program.isFavorite}
                onClick={toggleFavoriteProgram(program)}
              />
            )}
          <Link className="program-item__link" to={programRoute}>
            {program.title}
          </Link>
        </div>
        <PeriodLeft
          className="program-item__time-left"
          isEnabled={program.isEnabled}
          startOfPeriod={program.startOfPeriod}
          endOfPeriod={program.endOfPeriod}
        />
      </div>
      <div className="program-item__chart">
        <PIChart data={program.equityChart} />
      </div>
      <hr className="program-item__hr" />
      <div className="program-item__buttons">
        <Button
          primary
          href={programRoute}
          className="program-item__button"
          label="View Profile"
        />
        <Button
          primary
          className="program-item__button"
          label="Invest"
          onClick={openInvestPopup(program.id)}
          href={isAuthenticated ? "" : LOGIN_ROUTE}
        />
      </div>
      <div className="program-item__stats">
        <Statistic trader={program} />
      </div>
    </div>
  );
};

export default ProgramItem;
