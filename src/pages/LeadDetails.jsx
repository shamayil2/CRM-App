import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const LeadDetails = () => {
  const param = useParams();
  console.log(param);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [agents,setAgents] = useState([]);
  const [updateDetailsObj,setUpdateDetailsObj] = useState({});
  const [detailsUpdated,setDetailsUpdates] = useState({})
  useEffect(() => {
    async function getLead() {
      try {
        const res = await fetch(`http://localhost:3000/leads/${param.leadId}`);

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setData({ ...data });
          setLoading(false);
        } else {
          const error = await res.json();
          console.log(error);
          setError(error);
        }
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    }

    async function getAgents(){
        try{
              const res = await fetch("http://localhost:3000/agents")

        if(res.ok){
            const data = await res.json();
            setAgents(data);
        }else{
            const error = await res.json();
            console.log(error)
        }
        }
        catch(error){
            console.log("An error occured while fetching agents",error);
        }
      



    }

    getLead();
    getAgents();
  }, [detailsUpdated]);
 
  function updateDetails(event){
   const param = event.target.name;
   const value = event.target.value;

   setUpdateDetailsObj({...updateDetailsObj,[param]:value})   


  }

  async function postUpdatedDetails(event){
    try{
      console.log(updateDetailsObj)
      const res = await fetch(`http://localhost:3000/leads/${param.leadId}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(
          {...updateDetailsObj}
        )
      })

      if(res.ok){
        const data = await res.json();
        setData({...data})
      }

    }
    catch(error){
      console.log("Error Updating Details",error)
    }

  }

 console.log(updateDetailsObj)


  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="container">
            <div className="text-center lead-details">
              <h1>{data.name}</h1>
              <h5>Agent Assigned: {data.salesAgent && data.salesAgent.name}</h5>
              <h5>Source: {data.source}</h5>
              <h5>Status: {data.status}</h5>
              <h5>Time To Close : {data.timeToClose} Days</h5>
              <h5>
                Priority:{" "}
                {data.priority == 1
                  ? "Low"
                  : data.priority == 2
                  ? "Medium"
                  : "High"}
              </h5>
              <h5>Tags: {data.tags.join(", ")}</h5>
            </div>
            <div className="row section-two">
              <div className="comment-section col-md-6">
                <h3>Add Comment</h3>
                <textarea name="" id="" ></textarea>
                <br />
                <label htmlFor="authorName">
                  Your Name: <input id="authorName" type="text" />
                </label>
                <button>Add Comment</button>
              </div>
              <div className="update-lead col-md-6">
                <h3>Update Lead Details</h3>
                <label htmlFor=""> Lead Status: </label>
                <select name="status" id="" onChange={(event)=>updateDetails(event)}>
                  <option value="">Select Lead Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select><br />
                <label htmlFor=""> Assigned Agent: </label>
                <select name="salesAgent" id="" onChange={(event)=>updateDetails(event)}>
                  <option value="">Select Agent</option>
                    {agents.map((agent)=>(
                        <option value={agent._id}>{agent.name}</option>
                    ))}
                </select><br />
                <label htmlFor=""> Priority: </label>
                <select name="priority" id="" onChange={(event)=>updateDetails(event)}>
                  <option value="">Update Priority</option>
                    <option value="3">High</option>
                    <option value="2">Medium</option>
                    <option value="1">Low</option>
                </select>
                <br />
                <button onClick={(event)=>postUpdatedDetails(event)}>Update Details</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LeadDetails;
