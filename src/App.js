import './App.css';
import {useState,useEffect} from "react";
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import axios from 'axios';
import { connect } from "react-redux";
import {  SortFn,SortId, SortLn,SortFnDEC,SortIdDEC, SortLnDEC ,getData} from "./actions/index";

function App(props) {
  props.getData()
  const [data,setData]=useState();
  const [popup,setPopup]=useState(false);
  const [startdate,setStartDate]=useState();
  useEffect(()=>{
    axios.get("http://localhost:3001/data").then(e=>setData(e.data));
  },[])
  const sortbyId=()=>{
    props.SortId()
    setData(props.data)
  }
  const sortbyFn=()=>{
    props.SortFn()
    setData(props.data)
  }
  const sortbyLn=()=>{
    props.SortLn()
    setData(props.data)
  }
  const sortbyIdDEC=()=>{
    props.SortIdDEC();
    setData(props.data)
  }
  const sortbyFnDEC=()=>{
    props.SortFnDEC();
    setData(props.data)
  }
  const sortbyLnDEC=()=>{
    props.SortLnDEC()
    setData(props.data)
  }
  return (
    <div className="App">
      <button className="filter" onClick={()=>setPopup(!popup)}>Filter</button>
      {
        popup ?<div className="popup">

          <input type="date" className="date" onChange={e=>console.log(e)}/>
          <button className="filter-btn" onClick={props.SortFn}>Filter</button>
          <button className="filter-btn" onClick={()=>setPopup(false)}>close</button>

        </div>:<></>
      }
      <br></br>
        <table>
          <thead></thead>
          <tbody>
        <tr>
            <th><div className="sort"><p>Si no</p> <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyId}/><ArrowDropDownTwoToneIcon onClick={sortbyIdDEC}/></div></div></th>
            <th><div className="sort"><p>First name</p> <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyFn}/><ArrowDropDownTwoToneIcon onClick={sortbyFnDEC}/></div></div></th>
            <th><div className="sort"><p>Last name</p>  <div className="sort-icons"><ArrowDropUpTwoToneIcon onClick={sortbyLn}/><ArrowDropDownTwoToneIcon onClick={sortbyLnDEC}/></div></div></th>
            <th>DOB</th>
        </tr>
        {data?.map((i,j)=>{
          return(
            <tr key={i?.id}>
              <td>{i?.id}</td>
              <td>{i?.first_name}</td>
              <td>{i?.last_name}</td>
              <td>{i?.DOB}</td>
            </tr>
          )
        })
        }
        </tbody>
    </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SortId: () => dispatch(SortId()),
    SortFn: () => dispatch(SortFn()),
    SortLn:() => dispatch(SortLn()),
    getData:()=>dispatch(getData()),
    SortIdDEC: () => dispatch(SortIdDEC()),
    SortFnDEC: () => dispatch(SortFnDEC()),
    SortLnDEC:() => dispatch(SortLnDEC()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);