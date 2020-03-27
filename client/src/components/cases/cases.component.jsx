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
    const [pastData, setPastData] = useState([]);
    const [restData, setRestData] = useState({});
    const [title, setTitle] = useState("All States");

    function handleChange(e){
        if(e.target.value==='table'){
            setFilterData({});
            setTableData(data);
            setPastData(historyData);
            setTitle("All States");
        }
        else{
            let itemDetails = {};
            data.every((item)=>{
                if(item.state===e.target.value){
                    itemDetails = {...item};
                    return false;
                }
                else 
                    return true;
            });
            const state = itemDetails.state;
            setTableData([]);
            setFilterData(itemDetails);
            setPastData(restData[state]);
            setTitle(state);
        }
    }

    useEffect(()=>{
        const getData = async() =>{
            let {states, data, total, latest, historyData,...restObj} = await fetchData(API_ORIGIN_URL+'/cases');
            setStates(states);
            setData(data);
            setTotal(total);
            setLatest(latest);
            setTableData(data);
            setHistoryData(historyData);
            setPastData(historyData);
            setRestData(restObj);
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
                pastData===undefined || pastData.length===0?''
                :
                <>
                    <Header title={`${title} History`}/>
                    <CardContainer>                    
                        {
                            pastData.map( (item,index) =>{                    
                                return(
                                    <CardTile keys={`${title}`+index+"who"} props={item}/>
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