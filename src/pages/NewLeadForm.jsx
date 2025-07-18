import {useState,useEffect} from "react";
const NewLeadForm = () => {

    const [leadData,setLeadData] = useState({leadName:"",
    source:"",
    salesAgent:"",
    status:"",
    tags:[],
    timeToClose:0,
    priority:""})
    const [agents,setAgents] = useState([])

    useEffect(() => {
      async function getAgents() {
        try {
          const res = await fetch("http://localhost:3000/agents");

          if (res.ok) {
            const data = await res.json();
            setAgents(data);
          } else {
            const error = await res.json();
          }
        } catch (error) {
          console.log("Cannot fetch the agents", error);
        }

        

      }
      getAgents();
    }, []);

    function handleTags(event){

        const checked = event.target.checked;
        if(checked){
            setLeadData({...leadData,tags:[...leadData.tags,event.target.value]})
        }else{
            const tagsArr = leadData.tags.filter((tag)=>tag!== event.target.value);
            setLeadData({...leadData,tags:[...tagsArr]})

        }

    }

    async function postLead(event){
        try{
             event.preventDefault();
             event.target.reportValidity(); 


            const leadObj = {...leadData,name:leadData.leadName}
            delete leadObj.leadName;
             const res = await fetch("http://localhost:3000/leads",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(leadObj)
             })
             console.log(leadObj)
             if(res.ok){
                const data = await res.json();
                console.log(data)
             }else{
                const error = await res.json();
                console.log("Error while adding Lead",error)
             }



        }
       catch(error){
        console.log("Cannot Add Lead",error)
       }

    }

    return(
        <>
        <div className="container">
            <div className="row text-center">
            <div className="add-lead">
                <h1>Add New Lead</h1>
            </div>
            <div className="addlead-form">
                <form action="">
                <label htmlFor="leadName">Lead Name: </label> : 
                <input id="leadName" type="text" onChange={(event)=>setLeadData({...leadData,leadName:event.target.value})} required/><br />
                <label htmlFor="leadSource">Lead Source: </label>
                <select name="" id=""  onChange={(event)=>setLeadData({...leadData,source:event.target.value})}>
                    <option value="">Select Lead Source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                </select><br />
                <label htmlFor="sales-agent">Sales Agent: </label>
                <select name="" id="" onChange={(event)=>setLeadData({...leadData,salesAgent:event.target.value})}>
                    <option value="">Select Agent</option>
                    {agents.map((agent)=>(
                       <option key={agent._id} value={agent._id}>{agent.name}</option>
                    ))}
                </select><br />
                
                <label htmlFor="">Lead Status: </label>
                <select name="" id="" onChange={(event)=>setLeadData({...leadData,status:event.target.value})}>
                    <option value="">Select Lead Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                </select>
                <label htmlFor="priority">Priority: </label>
                <select name="" id="priority" onChange={(event)=>setLeadData({...leadData,priority:event.target.value})}>
                    <option value="">Choose Priority</option>
                    <option value="3">High</option>
                    <option value="2">Medium</option>
                    <option value="1">Low</option>
                </select>
                <label htmlFor="">Time to Close (In Days):</label>
                <input type="number" onChange={(event)=>setLeadData({...leadData,timeToClose:event.target.value})}/><br />
                <label className="tags-label"  htmlFor="tags">Tags: </label>
                <div className="tags-input">
                 <label><input type="checkbox" value="High Value" onChange={(event)=>handleTags(event)}/> High Value </label>  
                <label htmlFor=""><input type="checkbox" value="Follow-up" onChange={(event)=>handleTags(event)}/> Follow Up </label>
                </div>
             
              <br />
                <button type="submit" onClick={(event)=>postLead(event)}>Add the Lead</button>
                </form>
 
            </div>
            </div>
        </div>
        </>
    )


}

export default NewLeadForm;