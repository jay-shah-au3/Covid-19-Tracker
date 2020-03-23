import React from 'react';
import Moment from 'react-moment';
import { CardTileContainer } from './cardTile.styles';

function CardTile({props}){
    return(
        <CardTileContainer>
            <h3>Date : <Moment format="DD/MM/YYYY">{parseInt(props.date)}</Moment></h3>
            <hr/>
            <p style={{color:"#8884d8"}}>Total Confirmed Cases (Indian National) : {props.confirmedIndian}</p>
            <p style={{color:"#ffd700"}}>Total Confirmed Cases (Indian National) : {props.confirmedForeign}</p>
            <p style={{color:"#82ca9d"}}>Total Cured : {props.cured}</p>
            <p style={{color:"#ff6347"}}>Total Death : {props.death}</p>
        </CardTileContainer>
    )
}

export default CardTile