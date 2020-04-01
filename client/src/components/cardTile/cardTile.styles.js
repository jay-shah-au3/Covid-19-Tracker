import styled from 'styled-components';

export const CardTileContainer = styled.div`
    margin-bottom:25px;
    margin:25px;
    border-radius:15px;    
    padding:10px;
    width:28.5%;
    font-family:monospace;
    font-size:1.2em;
    h2 {
        margin:0px;
        padding:15px;
        color:white;
        background-color:#55BCC9;
        border-radius:25px;
    }
    p{
        padding-left:15px;
        padding-right:15px;
    }

    @media (max-width:768px){
        width:100%;
    }
`