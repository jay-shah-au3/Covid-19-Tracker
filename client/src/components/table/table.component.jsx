import React,{Fragment} from 'react';
import Chart from '../chart/chart.component';
import {TableDivContainer, TableContainer, TableRow, TableRowHeader, TableRowCell, TableBody} from './table.styles';
function Table({data, total, restData}){
    return(
        <Fragment>
            <TableDivContainer>
                <TableContainer>
                    <TableBody>
                        <TableRow>
                            <TableRowHeader>No</TableRowHeader>
                            <TableRowHeader>States</TableRowHeader>
                            <TableRowHeader>Confirmed Cases</TableRowHeader>
                            {/* <TableRowHeader>Confirmed(Indian National)</TableRowHeader> */}
                            {/* <TableRowHeader>Confirmed(Foreign National)</TableRowHeader> */}
                            <TableRowHeader>Cured</TableRowHeader>
                            <TableRowHeader>Death</TableRowHeader>
                        </TableRow>
                        {
                            data.map((item)=>{
                                let state = item.state;
                                let len = restData[state]!==undefined ? restData[state].length : -1;
                                let oldCases = len!==-1 && len > 1? parseInt(restData[state][len-1].confirmedCases) : 0;
                                let newCases = parseInt(item.confirmedCases);
                                let riseCases = newCases - oldCases;
                                return(
                                    <TableRow key={item.no}>
                                        <TableRowCell>{item.no}</TableRowCell>
                                        <TableRowCell>{item.state}</TableRowCell>
                                        <TableRowCell>{item.confirmedCases} {riseCases !==0 ? <span style={{color: "#ff073a", fontSize:"0.8em"}}>+{riseCases}</span> : ''}</TableRowCell>
                                        {/* <TableRowCell>{item.confirmedIndian}</TableRowCell>
                                        <TableRowCell>{item.confirmedForeign}</TableRowCell> */}
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