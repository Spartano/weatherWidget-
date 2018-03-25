import React from "react";
import inject from "react-jss";
import classNames from "classnames";

const style = {
  footerDay: {
    flex: "1",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1799b0",
    cursor: "pointer"
  },
  footerDayText: {
    zIndex: 2
  },
  footerDayBorderRight: {
    borderRight: "1.5px solid #48c3d9"
  },
  footerDayBorderLeft: {
    borderLeft: "1.5px solid #48c3d9"
  },
  currentDay: {
    backgroundColor: "#48c3d9",
    height: "36px",

    position: "absolute",
    width: "39px",
    zIndex: 1
  }
};

const Day = ({ classes, currentDay, day, borderLeft, borderRight }) => {
  let dayClass = classNames({
    [classes.currentDay]: currentDay === day
  });

  let footerDayClass = classNames({
    [classes.footerDayBorderLeft]: borderLeft,
    [classes.footerDayBorderRight]: borderRight,
    [classes.footerDay]: true
  });

  return (
    <div className={footerDayClass}>
      <div className={classes.footerDayText}>{day}</div>
      <span className={dayClass} />
    </div>
  );
};

export default inject(style)(Day);
