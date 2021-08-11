import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PieChart from '@material-ui/icons/PieChart';
import BorderAll from '@material-ui/icons/BorderAll';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Print from '@material-ui/icons/Print';

const useStyles = makeStyles({
    root: {
      width: 500,
    },
  });


export default function SimpleListMenu() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
      <BottomNavigation backgroundColor="red" value={value} onChange={handleChange} className={classes.root}>
  <BottomNavigationAction label="Tabular Data" value="tabular" icon={<BorderAll />} />
  <BottomNavigationAction label="Save as PDF" value="pdf" icon={<PictureAsPdf />} />
  <BottomNavigationAction label="Print" value="print" icon={<Print />} />
  <BottomNavigationAction label="Pie Chart" value="pie" icon={<PieChart />} />
</BottomNavigation>
    </>
  );
}
