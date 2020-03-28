import React from 'react';

function TotalCases({totalCases, newCases}){
    return(
        <h2 style={{color:"rgba(255,7,58,.6)"}}>Total Cases : 
            { 
                isNaN(totalCases) 
                ? 
                '' 
                : 
                newCases!==0 
                    ?    
                    <span> {totalCases+" ["}<span style={{color: "#ff073a", fontSize:"0.8em"}}>{"+"+newCases}</span>{"]"}</span>
                    : 
                    " "+totalCases 
            } 
        </h2>
    )
}

export default TotalCases;
