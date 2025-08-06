import {useState,useEffect} from "react"
import {Link,useSearchParams,useNavigate} from "react-router-dom"
const LeadList = () => {
    const [leadsData,setLeadsData] = useState([]);
    const [filtersObj,setFiltersObj] = useState({})
    const [salesAgents,setSalesAgents] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams();
    console.log(searchParams)
    useEffect(()=>{


        async function fetchLeads(){
            try{

                console.log(searchParams)
                let apiUrl = "http://localhost:3000/leads?";
                let res = null;
                const paramsObj = Object.fromEntries(searchParams.entries());
                console.log(paramsObj)
                if(Object.keys(paramsObj).length!=0){

                    for(const key in paramsObj){
                        apiUrl+=`${key}=${paramsObj[key]}&`
                    }
                    console.log(apiUrl)
                     res = await fetch(`${apiUrl}`)
                }else{
                     res = await fetch(`${apiUrl}`)
                }
                console.log(apiUrl)
                if(res.ok){
                    const data = await res.json();
                    setLeadsData([...data])
                }else{
                    const error = await res.json();
                    console.log(error);
                }
            }
            catch(error){
                console.log("Could not fetch Leads",error)
            }
        }

        async function fetchAgents(){

            try{
                 const res = await fetch("http://localhost:3000/agents");

            if(res.ok){
                const data = await res.json()
                setSalesAgents(data);
            }else{
                const error = data.json();
                console.log(error)
            }
            }

            catch(error){
                console.log(error);
            }
           

        }

        fetchLeads()
        fetchAgents()

    },[searchParams])

    async function filterData(event){

        try{
            let param = event.target.name;
            let value = event.target.value;
            // let defaultApi = "http://localhost:3000/leads?"
            if(param!= "clearFilters"){
                  const newFiltersObj = {...filtersObj,[param]:value}
            console.log(newFiltersObj)
            setFiltersObj({...filtersObj,[param]:value})
            setSearchParams(newFiltersObj)
            //  for(const key in newFiltersObj){
                
            //     if(newFiltersObj[key]!==""){
            //          defaultApi+=`${key}=${newFiltersObj[key]}&`

            //     }
            // }
            }else{
                 setSearchParams({})
            }
          
          
        //    console.log(defaultApi)
            
            // const  res= await fetch(`${defaultApi}`)
            // if(res.ok){
            //     const data = await res.json();
            //      if(param == "timeToClose"){
            //         data.sort((a,b)=>a.timeToClose-b.timeToClose<0)    
            //     }
            //     console.log(data);
            //     setLeadsData(data);
            // }else{
            //     const err = await res.json();
            //     console.log(err);
            // }
        }   

        catch(error){
            console.log(error);
        }
    }

    console.log(searchParams.get("status"))
 
    return(
        <>
        <h1 className="text-center mb-4">Lead List</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
            <div className="side-list leads">
          <ul className="leads-sidebar">
          <Link to="/"><li>Back To Dashboard</li></Link>
          <Link to="/leadstatusview"><li>View Leads By Status</li></Link>  
          <Link to="/addLead"><li>Add New Lead</li></Link> 
        </ul>
        </div>
        <div className="filterLeadsDiv">
            
                <h4>Filter Leads</h4>
                <div>
                <h5> By Lead Status</h5>
                <select value={searchParams.get("status")?searchParams.get("status"):"Select Lead Status"}  name="status" id="" onChange={(event)=>filterData(event)} >
                    <option value="">Select Lead Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <div>
                <h5>By Sales Agent</h5>
                <select value={searchParams.get("salesAgent")?searchParams.get("salesAgent"):"Select Sales Agent"}  name="salesAgent" id="" onChange={(event)=>filterData(event)} >
                    <option value="">Select Sales Agent</option>
                    {salesAgents.map((agent)=>(
                        <option value={agent._id}>{agent.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <h5>By Tags</h5>
                <select value={searchParams.get("tags")?searchParams.get("tags"):"Select Tag"} name="tags" id="" onChange={(event)=>filterData(event)}>
                    <option value="">Select Tag</option>
                    <option value="High Value">High Value</option>
                    <option value="Follow-up">Follow-Up</option>
                </select>
            </div>

            <div>
                <h5>By Source</h5>
                <select value={searchParams.get("source")?searchParams.get("source"):"Select Lead Source"} name="source" id="" onChange={(event)=>filterData(event)}>
                    <option value="">Select Lead Source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                </select>
            </div>

                    <div className="my-2">
                        <h5>Sort By : </h5>
                        <h6>Priority</h6>
                        <select value={searchParams.get("priority")?searchParams.get("priority"):"Select Order"} name="priority" id="" onChange={(event)=>filterData(event)}>
                            <option value="">Select Order</option>
                            <option value="asce">Low To High</option>
                            <option value="desc">High To Low</option>
                        </select>
                        <h6>Time To Close</h6>
                        <select value={searchParams.get("timeToClose")?searchParams.get("timeToClose"):"Select Order"} name="timeToClose" htmlFor="timeToClose" onChange={(event)=>filterData(event)}>
                         <option value="">Select Order</option>   
                        <option value="asc">Low To High</option>
                        <option value="des">High To Low</option>
                        </select> 
                        
                       
                    </div>

            <div className="clearFilters text-center">
                    <button name="clearFilters" className="btn btn-danger" onClick={(event)=>filterData(event)}>Clear Filters</button>
            </div>


            

        </div>
            </div>
            <div className="col-md-8">
                <h2 className="text-center leadListDiv" >Lead Overview</h2>
                    <div className="row">
                     <div className="col-md-2"><b>Lead</b></div>
                     <div className="col-md-2"><b>
                        Agent Name</b></div>
                     <div className="col-md-2"><b>Source</b></div>
                     <div className="col-md-2"><b>Time To Close(in Days)</b></div>
                     <div className="col-md-2"><b>Priority</b></div>
                     <div className="col-md-2"><b>Tags</b></div>
                      </div>
                     <ul>
                       
                {leadsData.map((lead)=>(   
                    <>
                    <li>

                    <div className="row">
                    <div className="col-md-2">
                   <Link to={`/lead-details/${lead._id}`}>{lead.name}  <span>({lead.status})</span></Link> 
                    </div>
                    <div className="col-md-2">{lead.salesAgent?.name}</div>
                    <div className="col-md-2">{lead.source}</div>
                    <div className="col-md-2">{lead.timeToClose}</div>
                    <div className="col-md-2">{lead.priority==1?"Low":lead.property==2?"Medium":"High"}</div>
                    <div className="col-md-2">{lead.tags.join(", ")}</div>
                    </div>
                     </li>
                     
                    </>
                ))}
               </ul>
                
               
            </div>
        </div>
        </div>
      
        </>
    )

}

export default LeadList;