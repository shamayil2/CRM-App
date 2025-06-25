import {useState,useEffect} from "react";

const NewAgentForm = () => {

  const [agentName,setAgentName] = useState("");
  const [agentEmail,setAgentEmail] = useState("")
  const [agentAdded,setAgentAdded] = useState(false)

  useEffect(()=>{
    setTimeout(() => {
      setAgentAdded(false)  
    }, 3000);
  },[agentAdded])

  function agentNameHandler(event){
    setAgentName(event.target.value)
  }

  function agentEmailHandler(event){
    setAgentEmail(event.target.value)
  }

  async function addAgent(event){
    try{
      event.preventDefault();
        const agentObj = {
      name:agentName,
      email:agentEmail
    }

    console.log(agentObj)

   const res =  await fetch("http://localhost:3000/agents",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(agentObj)

    })

    if(!res.ok){
      const error = await res.json();
      console.log("Error occured",error.message)
    }

    const data = await res.json()
    console.log("Agent Added: ",data)

    setAgentAdded(true)
    setAgentName("")
    setAgentEmail("")

    }

    catch(error){
      console.log("Cannot Add Agent",error)
    }
  

  }

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
                    <input value={agentName} onChange={(e)=>agentNameHandler(e)} type="text" id="name"/><br />
                    <label htmlFor="email">Email: </label>
                    <input value={agentEmail} onChange={(e)=>agentEmailHandler(e)} type="email" id="email"/><br />
                    <button onClick={(e)=>addAgent(e)}>Create Agent</button>

                </form>
            </div>
            {
              agentAdded && <>
                  <div className="text-center alert-message-agent">
                <p>Agent Added Successfully</p>
            </div>
              </>
            }
          
            
          </main>
        </div>
      </div>
    </>
  );
};

export default NewAgentForm;