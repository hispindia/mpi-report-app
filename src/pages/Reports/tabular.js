import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
    maxWidth: 680,
    padding: 8
  },
});

function createData(name, data) {
  return { name, data };
}
function createGenderData(name,male,female){
  return { name,male,female};
}

let rows = [];

export default function DenseTable(props) {
  const classes = useStyles();
  const data = props.data;
  const name = props.labelName;
  const report_name = props.reportName;
  const male = props.maleData;
  const female = props.femaleData;
  let total = 0; 
  rows.length = 0;
  if(report_name === 'gender')
  {
    let maletotal = 0;
    let femaletotal = 0;
    for(var i=0;i<= name.length-1 ;i++ ){      
      maletotal = maletotal + male[i];
      femaletotal = femaletotal + female[i];
      rows.push(createGenderData(name[i],male[i],female[i]))        
    }
    rows.push(createGenderData('Total',maletotal,femaletotal));
  }
  else{
    for(var i=0;i<= data.length-1 ;i++ ){      
      total = total + data[i];
      rows.push(createData(name[i],data[i]))        
    }
    rows.push(createData('Total',total));
  }
    
  return (
    <TableContainer className={classes.table}>
      <Table size="medium" aria-label="a dense table">
        <TableHead>
        {report_name ==='gender' && (
          <TableRow>
            <TableCell>Name</TableCell>
            
              <TableCell>Male</TableCell>
              <TableCell>Female</TableCell>
          </TableRow>)}
          {report_name !=='gender' && (
            <TableRow>
            <TableCell>Name</TableCell>            
              <TableCell>Data</TableCell>
          </TableRow> 
          )}
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell >
                    {(row.name === 'Total' && 
                    <b>{row.name}</b>
                    )}
                    {(row.name !== 'Total' && row.name)}
              </TableCell>
              {report_name !=='gender' && (
                <TableCell >
                    {row.data}
              </TableCell>
              )} 
              {report_name ==='gender' && (
                <>
                <TableCell >{row.male}</TableCell>
                <TableCell >{row.female}</TableCell>
                </>
              )}                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
