import {createContext} from "react"
import {useState,useEffect} from "react"
const AgentsContext = createContext();

function AgentsProvider({children}){
const [salesAgentsData,setSalesAgentsData] = useState([]);
const [error,setError] = useState("")
useEffect(()=>{

async function getAgents(){
    const res = await fetch("http://localhost:3000/agents")

    if(res.ok){
        const data = await res.json();
        console.log(data);
        setSalesAgentsData([...data])
    }else{
        const error = await res.json();
        console.log(error);
        setError(error);
    }
}
getAgents();

},[])

return(<>

<AgentsContext.Provider value={{salesAgentsData:salesAgentsData}}>
    {children}
</AgentsContext.Provider>
</>)


}


export default AgentsProvider;
export {AgentsContext}