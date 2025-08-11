import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AgentsContext } from "../context/AgentsContext";
const LeadStatusView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { salesAgentsData } = useContext(AgentsContext);
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    async function fetchLeads() {
      try {
        let apiUrl = "http://localhost:3000/leads?";
        let searchParamsObj = Object.fromEntries(searchParams.entries());
        console.log(searchParamsObj);
        for (const param in searchParamsObj) {
          apiUrl += `${param}=${searchParamsObj[param]}&`;
        }    
        const res = await fetch(`${apiUrl}`);
        if (res.ok) {
          const data = await res.json();
          setData(data);
          setLoading(false);
        } else {
          const error = await res.json();
          console.log(error);
        }
      } catch (error) {
        console.log("Error in fetching leads.");
      }
    }

    fetchLeads();
  }, [searchParams,salesAgentsData]);


  function filterLeads(event) {
    const param = event.target.name;
    const value = event.target.value;
    setSearchParams({ [param]: value });
  }

  function filterByAgent(event) {
    const param = event.target.name;
    const value = event.target.value;
    let searchParamsObj = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...searchParamsObj, [param]: value });
  }

  function clearAgentFilter(){
    let searchParamsObj = Object.fromEntries(searchParams.entries());
    console.log(searchParamsObj)
    delete searchParamsObj["salesAgent"];
        console.log(searchParamsObj)

    setSearchParams({...searchParamsObj})

  }

  return (
    <>
      <h1 className="text-center">Leads By Status</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="side-list leads">
              <ul className="leads-sidebar">
                <Link to="/">
                  <li>Back To Dashboard</li>
                </Link>
              </ul>
            </div>
            <div className="side-list leads">
              <div className="filterLeadsDiv">
                <h4>Filter Leads</h4>
                <h6>Filter By Sales Agent</h6>
                <select
                  name="salesAgent"
                  id=""
                  onChange={(event) => filterByAgent(event)}
                  value={searchParams.get("salesAgent")?searchParams.get("salesAgent"):"Select Agent"}
                >
                  <option value="">Select Agent</option>
                  {salesAgentsData.map((agent) => (
                    <option data-name={agent.name} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
                <div className="text-center">
                   <button onClick={()=>clearAgentFilter()} className="btn btn-danger btn-sm">Clear Filter</button>
                </div>
               
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h3 className="text-center pt-4">Lead List by Status</h3>
            <div className="statusSelect text-center">
              <select
                value={
                  searchParams.get("status")
                    ? searchParams.get("status")
                    : "Select Status"
                }
                name="status"
                onChange={(event) => filterLeads(event)}
              >
                <option value="">All Leads</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="leadsView">
              <div className="container">
                <div className="row lead-status-list">
                  <div className="col-md-3">
                    <b>Lead Name</b>
                  </div>
                  <div className="col-md-3">
                    <b>Assigned Sales Agent</b>
                  </div>
                  <div className="col-md-3">
                    <b>Time To Close</b>
                  </div>
                  <div className="col-md-3">
                    <b>Priority</b>
                  </div>
                  {loading ? (
                    <p>Loading Leads....</p>
                  ) : data.length==0?<h3 className="text-center py-4">No Leads Found!</h3> :(
                    data.map((lead) => (
                      <>
                        <div className="col-md-3">{lead.name}</div>
                        <div className="col-md-3">{lead.salesAgent.name}</div>
                        <div className="col-md-3">{lead.timeToClose}</div>
                        <div className="col-md-3"><div className="col-md-3">{lead.priority==1?"Low":lead.priority==2?"Medium":"High"}</div></div>
                      </>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadStatusView;
