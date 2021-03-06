import React,{useEffect, useState, Fragment} from 'react';
import {API_ORIGIN_URL} from '../../api/config';
import {fetchData} from '../../api/api';
import Chart from '../chart/chart.component';
import LineChartComponent from '../chart/line-chart.component';
import Table from '../table/table.component';
import CardTile from '../cardTile/cardTile.component';
import Header from '../header/header.component';
import TotalCases from './totalCases.component';
import Loader from '../loading/loading.component';
import { CardContainer } from './cases.styles';

function Cases(){
    const [isLoading, setIsLoading] = useState(true);
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
    const [newCases, setNewCases] = useState(0);

    function handleChange(e){
        if(e.target.value==='table'){
            setFilterData({});
            setTableData(data);
            setPastData(historyData);
            setTitle("All States");
            setIsLoading(false);
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
            const len = historyData.length;
            if(len>1){
                const {confirmedCases} = historyData[len-1];     
                const oldTotal = parseInt(confirmedCases); 
                const newTotal = parseInt(total.confirmedCases);
                setNewCases(newTotal - oldTotal);
            }
            setIsLoading(false);
        }
        getData();
    },[]);
    let str = ""
    const len = latest.length;
    let totalCases = parseInt(total.confirmedCases);
    if(len>0)
        str = latest[len-1];
        return(
        isLoading ? <Loader/> :
        <Fragment>
            <div style={{textAlign:"center"}}>
                <TotalCases totalCases={totalCases} newCases={newCases}/>
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
                    tableData.length===0?<Chart data={filterData}/>:<Table restData = {restData} total={total} data={tableData}/>
                }
            </div>
            {
                pastData===undefined || pastData.length===0 ? ''
                :
                <>
                    {
                        tableData.length === 0
                        ?
                        <>
                            <LineChartComponent color="#8884d8" total={filterData} data={pastData} type="confirmedCases" name="Confirmed Cases"/>
                            <LineChartComponent color="#ff6347" total ={filterData} data={pastData} type="death" name="Death Cases"/>
                        </>
                        :
                        <>
                            <LineChartComponent color="#8884d8" total={total} data={pastData} type="confirmedCases" name="Confirmed Cases"/>
                            <LineChartComponent color="#ff6347" total={total} data={pastData} type="death" name="Death Cases"/>
                        </>
                    }
                    {/* <LineChartComponent color="#8884d8" data={pastData} type="confirmedCases" name="Confirmed Cases"/>
                    <LineChartComponent color="#ff6347" data={pastData} type="death" name="Death Cases"/> */}
                    <Header title={`${title} History`}/>
                    <CardContainer>                    
                        {
                            pastData.map( (item,index) =>{                    
                                return(
                                    <CardTile key={`${title}`+index+"who"} props={item} pastData={pastData} index={index}/>
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