import React from 'react';
import Moment from 'react-moment';
import { CardTileContainer } from './cardTile.styles';

function CardTile({props, pastData, index}){
    // const {cured, death, confirmedIndian, confirmedForeign} = props;
    // const totalCases = parseInt(confirmedIndian) + parseInt(confirmedForeign);
    const {cured, death, confirmedCases} = props;
    let oldConfirmedCases = 0;
    if(index>=1)
        oldConfirmedCases = pastData[index-1].confirmedCases;

    const riseInCases = oldConfirmedCases!==0 ? confirmedCases - oldConfirmedCases : 0;
    const riseInCasesFinalString = riseInCases !==0 ? riseInCases < 0 ? riseInCases : "+"+riseInCases : 0;

    return(
        <CardTileContainer>
            <h2>Date : <Moment format="DD/MM/YYYY">{parseInt(props.date)}</Moment></h2>
            <p style={{color:"rgba(255,7,58,.6)",fontWeight:"bold"}}>Total Cases : {confirmedCases} <span style={{color: "#ff073a", fontSize:"0.9em"}}>{riseInCases!==0 ? riseInCasesFinalString : null }</span></p>
            {/* <p style={{color:"#8884d8",fontWeight:"bold"}}>Total Confirmed Cases (Indian National) : {confirmedIndian}</p>
            <p style={{color:"#f2d602",fontWeight:"bold"}}>Total Confirmed Cases (Foreign National) : {confirmedForeign}</p> */}
            <p style={{color:"#82ca9d",fontWeight:"bold"}}>Total Cured : {cured}</p>
            <p style={{color:"#ED2B33FF",fontWeight:"bold"}}>Total Death : {death}</p>
            <p style={{color:"black",fontWeight:"bold"}}>Death Rate : {((parseInt(death)/confirmedCases)*100).toFixed(2)}%</p>
            <p style={{color:"#32CD32",fontWeight:"bold"}}>Cured Rate : {((parseInt(cured)/confirmedCases)*100).toFixed(2)}%</p>
        </CardTileContainer>
    )
}

export default CardTile