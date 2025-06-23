const NewAgentForm = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <main>
            <div className="text-center"> 
                <h1>Add New Sales Agent</h1>
            </div>
            <div className="new-agent-form">
                <form action="">
                    <label htmlFor="name">Agent Name:</label>
                    <input type="text" id="name"/><br />
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email"/><br />
                    <button>Create Agent</button>

                </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default NewAgentForm;