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
                    <option value="new">New</option><br />
                    <option value="contacted">Contacted</option><br />
                    <option value="qualified">Qualified</option><br />
                    <option value="proposalSent">Proposal Sent</option><br />
                    <option value="closed">Closed</option><br />
                </select>
                </form>
            </div>
            </div>
        </div>
        </>
    )


}

export default NewLeadForm;