import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
const LeadList = () => {
    const [leadsData,setLeadsData] = useState([]);
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
    console.log(salesAgents)
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
                <h5>Filter Leads By Lead Status</h5>
                <select name="" id="" >
                    <option value="">Select Lead Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <div>
                <h5>Filter Leads By Sales Agent</h5>
                <select name="" id="" >
                    <option value="">Select Sales Agent</option>
                    {salesAgents.map((agent)=>(
                        <option value={agent._id}>{agent.name}</option>
                    ))}
                </select>
            </div>
            

        </div>
            </div>
            <div className="col-md-8">
                <h2 className="text-center" >Lead Overview</h2>
                <ol className="lead-list-ol">
                {leadsData.map((lead)=>(   
                    
                    <li key={lead._id}>
                    {lead.name}  <span>({lead.status})</span>
                    </li>

                ))}
                </ol>
            </div>
        </div>
        </div>
      
        </>
    )

}

export default LeadList;