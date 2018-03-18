import React from 'react';
import inject from 'react-jss';

const style = {
  footerWeek: {
    position: 'absolute',
    top: 293,
    left: 0,
    width: '100%',
    height: 36,
    fontSize: '13.26px',
    fontWeight: 400,
    fontFamily: 'Myriad Pro',
    display: 'flex'
  }
};

const Day = ({ classes, children }) => {
  return <div className={classes.footerWeek}>{children}</div>;
};

export default inject(style)(Day);
