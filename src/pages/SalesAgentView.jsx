import {Link,useSearchParams} from "react-router-dom"
import {AgentsContext} from "../context/AgentsContext"
import {useState,useContext,useEffect} from "react"

const SalesAgentView = () => {
    const [leadsData,setLeadsData] = useState([]);
    const {salesAgentsData} = useContext(AgentsContext)
    const [searchParams,setSearchParams] = useSearchParams({})
    useEffect(()=>{
    
      async function fetchLeads(){
        let apiUrl = "http://localhost:3000/leads?";
         const searchParamsObj = Object.fromEntries(searchParams.entries());
        console.log(searchParamsObj)
        for(const key in searchParamsObj){
            apiUrl+=`${key}=${searchParamsObj[key]}&`
        }
        console.log(apiUrl)
        const res = await fetch(apiUrl)
       
        
        if(res.ok){
            const data = await res.json();
            console.log(data)
            setLeadsData([...data]);
        }else{
            const error = await res.json();
            console.log(error)
        }

      }  
      fetchLeads()

    },[searchParams])

    function filterLeads(event){
        const param = event.target.name;
        const value = event.target.value
        const searchParamsObj = Object.fromEntries(searchParams.entries());

        setSearchParams({...searchParamsObj,[param]:value});
        
    }
    function filterByStatus(event){
      const param = event.target.name;
      const value = event.target.value;
      const searchParamsObj = Object.fromEntries(searchParams.entries());
      console.log(searchParamsObj)
      setSearchParams({...searchParamsObj,[param]:value});



    }
    function sortByPriority(event){
      const param = event.target.name;
      const value= event.target.value;
      console.log(param,value)
      const searchParamsObj = Object.fromEntries(searchParams.entries());
      setSearchParams({...searchParamsObj,[param]:value})

    } 

    console.log(leadsData)
  return (
    <>
      <div className="container">
        <div>
          <h1 className="text-center my-4">Leads By Agent</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="side-list">
              <ul className="leads-sidebar">
                <Link to="/">
                  <li>Back To Dashboard</li>
                </Link>
              </ul>
            </div>
            <div className="side-list">
                <div className="filterLeadsDiv">
                <h4>Filter Leads</h4>
                <h6>Filter By Status</h6>
                <select value={searchParams.get("status")?searchParams.get("status"):"Select Status"} name="status" id="" onChange={(event)=>filterByStatus(event)}>
                    <option value="">All Leads</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                </select>

                <h6>Sort By Priority</h6>
                <select name="priority" value={searchParams.get("priority")?searchParams.get("priority"):"Select Sorting Order"} id="" onChange={(event)=>sortByPriority(event)}>
                  <option value="">Select Sorting Order</option>
                    <option value="asce">Low To High</option>
                    <option value="desc">High To Low</option>
                </select>
                </div>
            </div>
          </div>
          <div className="col-md-8">
            <select value={searchParams.get("salesAgent")?searchParams.get("salesAgent"):"Select Agent"} name="salesAgent" id="" style={{width:"100%"}} onChange={(event)=>filterLeads(event)}>
                <option value="">All Agents</option>
                {salesAgentsData.map((agent)=>(
                    <option value={agent._id}>{agent.name}</option>
                ))}
            </select>
            <div>
                <div className="row my-4">
                    <div className="col-md-3"><b>Lead Name</b></div>
                    <div className="col-md-3"><b>Status</b></div>
                    <div className="col-md-3"><b>Time To Close</b></div>
                    <div className="col-md-3"><b>Priority</b></div>

                    {leadsData.length!=0 ? leadsData.map((lead)=>(
                        <>
                        <div className="col-md-3">{lead.name}</div>
                        <div className="col-md-3">{lead.status}</div>
                        <div className="col-md-3">{lead.timeToClose}</div>
                        <div className="col-md-3">{lead.priority==1?"Low":lead.priority==2?"Medium":"High"}</div>
                        </>
                    )):<h1 className="text-center my-4">No Leads Found</h1>}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAgentView;
