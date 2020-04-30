import styled from 'styled-components';

export const TableDivContainer = styled.div`
`
export const TableRow = styled.tr``;

export const TableContainer = styled.table`
    border-collapse: collapse;
    font-weight:bold;
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
    padding:10px;  
    top:0;
    position:sticky;
    background-color:#55BCC9;    
    color:white;
`;

export const TableRowCell = styled.td`
    padding:20px;    
`;