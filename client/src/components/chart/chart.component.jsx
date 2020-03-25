import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer} from 'recharts';
function Chart({data}){
    const d = [];
    d.push(data);
    return(
        <ResponsiveContainer  width='100%' height={500}>
            <BarChart
                data={d}
                margin={{
                top: 100,bottom: 50,left:20
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis>
                    <Label
                        value={"Cases"}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                    />                
                </YAxis>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="confirmedIndian" name="Confirmed Cases (Indian National)" fill="#8884d8" />
                <Bar dataKey="confirmedForeign" name="Confirmed Cases (Foreign National)" fill="#ffd700" />
                <Bar dataKey="cured" name="Cured" fill="#82ca9d" />
                <Bar dataKey="death" name="Death" fill="#ff6347" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Chart;