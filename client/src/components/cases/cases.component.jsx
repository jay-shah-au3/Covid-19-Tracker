import React,{useEffect, useState, Fragment} from 'react';
import {API_ORIGIN_URL} from '../../api/config';
import {fetchData} from '../../api/api';
import Chart from '../chart/chart.component';
import Table from '../table/table.component';
import CardTile from '../cardTile/cardTile.component';
import { CardContainer } from './cases.styles';
import Header from '../header/header.component';

function Cases(){

    const [latest, setLatest] = useState([]);
    const [states, setStates] = useState([]);
    const [data, setData] = useState([])
    const [total, setTotal] = useState({});
    const [filterData, setFilterData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [historyData, setHistoryData] = useState([]);

    const handleChange = (e) => {
        if(e.target.value==='table'){
            setFilterData({});
            setTableData(data);
        }
        else{
            data.forEach((item)=>{
                if(item.state===e.target.value)
                    setFilterData(item);
                    setTableData([]);
            });
        }
    }

    useEffect(()=>{
        const getData = async() =>{
            let {states, data, total, latest, historyData} = await fetchData(API_ORIGIN_URL+'/cases');
            setStates(states);
            setData(data);
            setTotal(total);
            setLatest(latest);
            setTableData(data);
            setHistoryData(historyData);
        }
        getData();
    },[]);
    let str = ""
    const len = latest.length;
    if(len>0)
        str = latest[len-1];

    return(
        <Fragment>
            <div style={{textAlign:"center"}}>
                <h3>Latest State affected due to Covid-19 in India is {str}</h3>
                <select id="states" onChange={(e)=>handleChange(e)} style={{marginTop:"30px", marginBottom:"30px",padding:"10px"}}>
                    <option key="table" value="table" defaultValue>All States</option>
                    {
                        states.map((state)=>{
                        return <option key={state} value={state}>{state}</option>
                        })
                    }
                </select>
                {
                    tableData.length===0?<Chart data={filterData}/>:<Table total={total} data={tableData}/>
                }
            </div>
            {
                historyData.length===0?''
                :
                <>
                    <Header title="History"/>
                    <CardContainer>                    
                        {
                            historyData.map( item=>{                    
                                return(
                                    <CardTile key={item.cured+"who"} props={item}/>
                                )
                            })
                        }
                    </CardContainer>
                </>
            }
        </Fragment>

    );
}

export default Cases;