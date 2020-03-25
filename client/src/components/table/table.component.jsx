import React,{Fragment} from 'react';
import Chart from '../chart/chart.component';
import {TableDivContainer, TableContainer, TableRow, TableRowHeader, TableRowCell, TableBody} from './table.styles';
function Table({data, total}){
    return(
        <Fragment>
            <TableDivContainer>
                <TableContainer>
                    <TableBody>
                        <TableRow>
                            <TableRowHeader>No</TableRowHeader>
                            <TableRowHeader>States</TableRowHeader>
                            <TableRowHeader>Confirmed(Indian National)</TableRowHeader>
                            <TableRowHeader>Confirmed(Foreign National)</TableRowHeader>
                            <TableRowHeader>Cured</TableRowHeader>
                            <TableRowHeader>Death</TableRowHeader>
                        </TableRow>
                        {
                            data.map((item)=>{
                                return(
                                    <TableRow key={item.no}>
                                        <TableRowCell>{item.no}</TableRowCell>
                                        <TableRowCell>{item.state}</TableRowCell>
                                        <TableRowCell>{item.confirmedIndian}</TableRowCell>
                                        <TableRowCell>{item.confirmedForeign}</TableRowCell>
                                        <TableRowCell>{item.cured}</TableRowCell>
                                        <TableRowCell>{item.death}</TableRowCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </TableContainer>
            </TableDivContainer>
            <Chart data={total}/>
        </Fragment>
    )
}

export default Table;