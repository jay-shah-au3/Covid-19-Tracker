import React from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer} from 'recharts';

function LineChartComponent({data, type, name, color, total}){
    const d = data.map((item) => {
        let obj = {...item, cured:parseInt(item.cured), death:parseInt(item.death), confirmedCases:parseInt(item.confirmedCases), date:moment(parseInt(item.date)).format('DD MMMM, YYYY')}
        return obj;         
    });

    const obj = {...total, cured:parseInt(total.cured), death:parseInt(total.death), confirmedCases:parseInt(total.confirmedCases), date:moment(Date.now()).format('DD MMMM, YYYY')}
    d.push(obj);

    return(
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                data={d}
                margin={{
                top: 100,bottom: 50,left:20, right:30
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey = "date"/>
                <YAxis type="number">
                    <Label
                        value={"Cases"}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                    />                
                </YAxis>        
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey={type} name={name} stroke={color} activeDot={{r:8}} isAnimationActive={false}/>
                {
                    type==='death' 
                    ?
                    <Line type="monotone" dataKey="cured" name="Cured Cases" stroke="#82ca9d" activeDot={{r:8}} isAnimationActive={false}/>
                        :
                    ''
                } 
            </LineChart>
        </ResponsiveContainer>
    )
} 

export default LineChartComponent;