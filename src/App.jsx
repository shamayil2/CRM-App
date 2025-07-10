import {Link} from "react-router-dom"
const App = () => {

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
            <li>Agents</li>
            <li>Reports</li>
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
      <li><h6><span>New: 5 Leads</span> </h6></li>
      <li><h6><span>Contacted: 2 Leads</span> </h6></li>
      <li><h6><span>Qualified: 3 Leads</span> </h6></li>
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

export default App;