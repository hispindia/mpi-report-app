import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#00acc1",
    color: theme.palette.common.white,
    padding: 8,
  },
  body: {
    fontSize: 14,    
    padding: 8,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  
}))(TableRow);

function createData(name, data) {
  return { name, data };
}
function createGenderData(name,male,female){
  return { name,male,female};
}

let rows = [];

export default function DenseTable(props) {
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
    <TableContainer >
      <Table size="large" aria-label="a dense table">
        <TableHead>
        {report_name ==='gender' && (
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            
              <StyledTableCell>Male</StyledTableCell>
              <StyledTableCell>Female</StyledTableCell>
          </TableRow>)}
          {report_name !=='gender' && (
            <TableRow>
            <StyledTableCell>Name</StyledTableCell>            
              <StyledTableCell>Data</StyledTableCell>
          </TableRow> 
          )}
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell >
                    {(row.name === 'Total' && 
                    <b>{row.name}</b>
                    )}
                    {(row.name !== 'Total' && row.name)}
              </StyledTableCell>
              {report_name !=='gender' && (
                <StyledTableCell >
                    {row.data}
              </StyledTableCell>
              )} 
              {report_name ==='gender' && (
                <>
                <StyledTableCell >{row.male}</StyledTableCell>
                <StyledTableCell >{row.female}</StyledTableCell>
                </>
              )}                
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
