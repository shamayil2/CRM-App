import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
const LeadDetails = () => {
  const param = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [agents,setAgents] = useState([]);
  const [updateDetailsObj,setUpdateDetailsObj] = useState({});
  const [detailsUpdated,setDetailsUpdates] = useState({});
  const [comment,setComment] = useState("");
  const [leadComments,setLeadComments] = useState([])
  const [commentAdded,setCommentAdded] = useState(false)
  const [commentAuthor,setCommentAuthor] = useState("")
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

    async function getComments(){

      try{

        const res = await fetch(`http://localhost:3000/leads/${param.leadId}/comments`)
        if(res.ok){
          const data = await res.json();
          console.log(data)
          setLeadComments([...data])
          
        }else{
          const error = await res.json();
          console.log("Error fetching comments",error)
        }

      }
      catch(error){
        console.log("Error Getting Comments for the lead.",error)
      }

    }
    getComments();
    getLead();
    getAgents();
  }, [detailsUpdated,commentAdded]);

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

  async function postComment(){
  try {
    console.log(data.leadId,data.salesAgent._id)
    const res = await fetch(`http://localhost:3000/leads/${param.leadId}/comments`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        lead:param.leadId,
        salesAgent:commentAuthor,
        commentText:comment
      })
    });

    if(res.ok){
      const data = await res.json();
      setCommentAdded(!commentAdded)
      console.log("Comment Posted Succesfully",data)
    }else{
      console.log("Error in Posting Comment.")
    }

  } catch (error) {
    console.log("Cannot Post the Comments",error) 
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
              <div className="comment-section col-md-6 pt-4">
                <div className="add-comment">
                <textarea name="" id="" onChange={(event)=>setComment(event.target.value)}></textarea>
                  <select name="" id="" onChange={(event)=>setCommentAuthor(event.target.value)}>
                    {agents.map((agent)=>(
                      <option value={agent._id}>{agent.name}</option>
                    ))}
                  </select>
                <button onClick={()=>postComment()}>Add Comment</button>
                </div>
                
                  <div >
                    <h6 className="text-center pt-2">Comments:</h6>
                    <ol>
                      {leadComments.map((comment)=>(
                          <li style={{margin:"5px",padding:"5px",backgroundColor:"#e2bc8c",borderRadius:"10px"}}>{comment.commentText}<span > : {comment.salesAgent.name} ({new Date(comment.updatedAt).toLocaleString()})</span></li>
                      ))}
                    </ol> 
                  </div>
                
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
