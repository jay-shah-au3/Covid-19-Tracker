import React from 'react';
import Moment from 'react-moment';
import { CardTileContainer } from './cardTile.styles';

function CardTile({props,keys}){
    const {cured, death, confirmedIndian, confirmedForeign} = props
    return(
        <CardTileContainer key={keys}>
            <h2>Date : <Moment format="DD/MM/YYYY">{parseInt(props.date)}</Moment></h2>
            <p style={{color:"#8884d8",fontWeight:"bold"}}>Total Confirmed Cases (Indian National) : {confirmedIndian}</p>
            <p style={{color:"#f2d602",fontWeight:"bold"}}>Total Confirmed Cases (Foreign National) : {confirmedForeign}</p>
            <p style={{color:"#82ca9d",fontWeight:"bold"}}>Total Cured : {cured}</p>
            <p style={{color:"#ED2B33FF",fontWeight:"bold"}}>Total Death : {death}</p>
            <p style={{color:"black",fontWeight:"bold"}}>Death Rate : {((parseInt(death)/(parseInt(confirmedIndian)+parseInt(confirmedForeign)))*100).toFixed(2)}%</p>
        </CardTileContainer>
    )
}

export default CardTile