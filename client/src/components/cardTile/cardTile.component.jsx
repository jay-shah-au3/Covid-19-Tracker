import React from 'react';
import Moment from 'react-moment';
import { CardTileContainer } from './cardTile.styles';

function CardTile({props}){
    const {cured, death, confirmedIndian, confirmedForeign} = props;
    const totalCases = parseInt(confirmedIndian) + parseInt(confirmedForeign);
    return(
        <CardTileContainer>
            <h2>Date : <Moment format="DD/MM/YYYY">{parseInt(props.date)}</Moment></h2>
            <p style={{color:"rgba(255,7,58,.6)",fontWeight:"bold"}}>Total Cases : {totalCases}</p>
            <p style={{color:"#8884d8",fontWeight:"bold"}}>Total Confirmed Cases (Indian National) : {confirmedIndian}</p>
            <p style={{color:"#f2d602",fontWeight:"bold"}}>Total Confirmed Cases (Foreign National) : {confirmedForeign}</p>
            <p style={{color:"#82ca9d",fontWeight:"bold"}}>Total Cured : {cured}</p>
            <p style={{color:"#ED2B33FF",fontWeight:"bold"}}>Total Death : {death}</p>
            <p style={{color:"black",fontWeight:"bold"}}>Death Rate : {((parseInt(death)/totalCases)*100).toFixed(2)}%</p>
        </CardTileContainer>
    )
}

export default CardTile