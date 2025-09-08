import {Link} from "react-router-dom"
import {useState,useEffect} from "react"
const Home = () => {

  const [leads,setLeads] = useState([]);

  useEffect(()=>{

    async function fetchLeads(){

      const res = await fetch("http://localhost:3000/leads");

      if(res.ok){
        const data = await res.json();
        setLeads([...data])
      }else{
        const  error = await res.json();
        console.log(error)
      }

    }

    fetchLeads()

  },[])

  return(
    <>
    <header>
      <div className="header-H1 my-4 text-center">
      <h1>Flux CRM Dashboard</h1>
      </div>
      
    </header>
    <main>
      <div className="container">
     <div className="row">
    <div className="col-md-3 ">
      <div className="side-list">
          <ul>
          <Link to="/leadList"><li>Leads</li></Link>  
            <li>Sales</li>
           <Link to="/salesagents"><li>Agents</li></Link> 
          <Link to="/reports"><li>Reports</li></Link> 
            <li>Settings</li>
        
        </ul>
        </div>
    </div>
    <div className="col-md-9">
    <div className="main-content">
     <h4>Manage Your Leads easily and effectively!</h4> 
    </div>
    <div className="lead-status">
    <h5>Lead Status</h5>
    <ul>
      <li><h6><span>New: {leads.filter((lead)=>lead.status=="New").length} Leads</span> </h6></li>
      <li><h6><span>Contacted: {leads.filter((lead)=>lead.status=="Contacted").length} Leads</span> </h6></li>
      <li><h6><span>Qualified: {leads.filter((lead)=>lead.status=="Qualified").length} Leads</span> </h6></li>
    </ul>
    </div>
    <div className="filterDiv">

    <label htmlFor="">Quick Filters: </label>
     <label> <input type="radio" name="filter" value="new"/> New </label>
      <label><input type="radio" name="filter" value="contacted"/> Contacted </label>

     </div>
     <div className="newLeadBtn">
       <Link to="/addlead"> <button>Add New Lead</button></Link>
     </div>
    </div>
    
    
      </div>
      </div>
     
    </main>
    </>
  )

}

export default Home;