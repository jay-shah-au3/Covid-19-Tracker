import React from 'react';
import {HeaderContainer, TitleContainer} from './header.styles';

function Header(props){
    return(
        <HeaderContainer>
            <TitleContainer>
                {props.logo ? <img alt="logo" src={props.logo} style={{width:"30px",paddingRight:"10px"}}/>:''}
                {props.title}
            </TitleContainer>
        </HeaderContainer>
    )
}

export default Header;