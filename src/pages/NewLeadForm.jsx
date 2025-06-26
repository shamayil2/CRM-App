import {useState,useEffect} from "react";
const NewLeadForm = () => {

    const [leadData,setLeadData] = useState({leadName:"",
    source:"",
    salesAgent:"",
    status:"",
    tags:[],
    timeToClose:0,
    priority:""})



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
                <input type="text" onChange={(event)=>setLeadData({...leadData,leadName:event.target.value})} /><br />
                <label htmlFor="leadSource">Lead Source: </label>
                <select name="" id=""  onChange={(event)=>setLeadData({...leadData,source:event.target.value})}>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                </select><br />
                <label htmlFor="sales-agent">Sales Agent: </label>
                <select name="" id="" onChange={(event)=>setLeadData({...leadData,salesAgent:event.target.value})}>
                    <option value="">Agent 1</option>
                    <option value="">Agent 2</option>
                </select><br />
                <label htmlFor="">Lead Status: </label>
                <select name="" id="" onChange={(event)=>setLeadData({...leadData,status:event.target.value})}>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="ProposalSent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                </select>
                <label htmlFor="priority">Priority: </label>
                <select name="" id="priority" onChange={(event)=>setLeadData({...leadData,priority:event.target.value})}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <label htmlFor="">Time to Close (In Days):</label>
                <input type="number" onChange={(event)=>setLeadData({...leadData,timeToClose:event.target.value})}/><br />
                <label className="tags-label"  htmlFor="tags">Tags: </label>
                <div className="tags-input">
                 <label><input type="checkbox" value="High Value"/> High Value </label>  
                <label htmlFor=""><input type="checkbox" value="Follow Up" /> Follow Up </label>
                </div>
             
              <br />
                <button>Add the Lead</button>
                </form>
                <p>{leadData.leadName}</p>
                <p>{leadData.source}</p>
            </div>
            </div>
        </div>
        </>
    )


}

export default NewLeadForm;