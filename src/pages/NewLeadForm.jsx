const NewLeadForm = () => {


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
                <input type="text" /><br />
                <label htmlFor="leadSource">Lead Source: </label>
                <select name="" id="">
                    <option value="website">Website</option><br />
                    <option value="referral">Referral</option><br />
                    <option value="call">Cold Call</option>
                </select><br />
                <label htmlFor="sales-agent">Sales Agent: </label>
                <select name="" id="">
                    <option value="">Agent 1</option>
                    <option value="">Agent 2</option>
                </select><br />
                <label htmlFor="">Lead Status: </label>
                <select name="" id="">
                    <option value="New">New</option><br />
                    <option value="Contacted">Contacted</option><br />
                    <option value="Qualified">Qualified</option><br />
                    <option value="ProposalSent">Proposal Sent</option><br />
                    <option value="Closed">Closed</option><br />
                </select>
                <label htmlFor="priority">Priority: </label>
                <select name="" id="priority">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <label htmlFor="">Time to Close (In Days):</label>
                <input type="number" /><br />
                <label htmlFor="tags">Tags: </label>
                <select name="" id="tags">
                    <option value="High Value">High Value</option>
                    <option value="Follow Up">Follow Up</option>
                    
                </select><br />
                <button>Add the Lead</button>
                </form>
                
            </div>
            </div>
        </div>
        </>
    )


}

export default NewLeadForm;