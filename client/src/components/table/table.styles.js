import styled from 'styled-components';

export const TableDivContainer = styled.div`
    overflow-x:auto;
`
export const TableRow = styled.tr``;

export const TableContainer = styled.table`
    border-collapse: collapse;
    text-align:center;
    margin-left:auto;
    margin-right:auto;
    margin-top:30px;
    margin-bottom:30px;
    padding:10px;
    ${TableRow}:nth-child(even){
        background-color: #f2f2f2;
    }
`;

export const TableBody = styled.tbody``;

export const TableRowHeader = styled.th`
    border: 1px solid #55BCC9;
    padding:10px;    
    background-color:#55BCC9;
    color:white;
`;

export const TableRowCell = styled.td`
    border: 1px solid #55BCC9;
    padding:10px;    
`;