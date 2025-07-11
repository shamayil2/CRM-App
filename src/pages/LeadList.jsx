import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
const LeadList = () => {
    const [leadsData,setLeadsData] = useState([]);
    const [filtersObj,setFiltersObj] = useState({status:"",salesAgent:""})
    const [salesAgents,setSalesAgents] = useState([]);
    useEffect(()=>{

        async function fetchLeads(){
            try{
                const res = await fetch("http://localhost:3000/leads")

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

    },[])

    async function filterData(event){

        try{
            let param = event.target.name;
            let value = event.target.value;
            const newFiltersObj = {...filtersObj,[param]:value}
            console.log(newFiltersObj)
            setFiltersObj({...filtersObj,[param]:value})
            let defaultApi = "http://localhost:3000/leads?"
            for(const key in newFiltersObj){
                
                if(newFiltersObj[key]!==""){
                     defaultApi+=`${key}=${newFiltersObj[key]}&`
                     console.log(defaultApi)
                     console.log(key)
                }
            }
           console.log(defaultApi)
            
            const  res= await fetch(`${defaultApi}`)
            if(res.ok){
                const data = await res.json();
                console.log(data);
            }else{
                const err = await res.json();
                console.log(err);
            }
        }   

        catch(error){
            console.log(error);
        }
    }


    // console.log(salesAgents)
    
    // console.log(leadsData[0])
    return(
        <>
        <h1 className="text-center mb-4">Lead List</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
            <div className="side-list leads">
          <ul className="leads-sidebar">
          <Link to="/"><li>Back To Dashboard</li></Link>  
        </ul>
        </div>
        <div className="filterLeadsDiv">
            <div>
                <h4>Filter Leads</h4>
                <h5> By Lead Status</h5>
                <select name="status" id="" onChange={(event)=>filterData(event)} >
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
                <select name="salesAgent" id="" onChange={(event)=>filterData(event)} >
                    <option value="">Select Sales Agent</option>
                    {salesAgents.map((agent)=>(
                        <option value={agent._id}>{agent.name}</option>
                    ))}
                </select>
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
                    {lead.name}  <span>({lead.status})</span>
                    </div>
                    <div className="col-md-2">{lead.salesAgent?.name}</div>
                    <div className="col-md-2">{lead.source}</div>
                    <div className="col-md-2">{lead.timeToClose}</div>
                    <div className="col-md-2">{lead.priority}</div>
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