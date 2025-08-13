import {createContext,useState,useEffect} from "react"

const LeadsContext = createContext();

function LeadsProvider({children}){
    const [leadsData,setLeadsData] = useState([]);
    useEffect(()=>{

        async function getLeads(){
            const res = await fetch("http://localhost:3000/leads?")

            if(res.ok){
                const data = await res.json();
                console.log("Leads Context:" , data)

                setLeadsData([...data])
            }else{
                const error = await res.json();
                console.log(error)
            }
        }
        getLeads()


    },[])
                    console.log(leadsData)

    return(
        <>
         <LeadsContext.Provider value={{leadsData:leadsData,setLeadsData}}>
            {children}
        </LeadsContext.Provider >   
        </>
    )

}

export {LeadsContext}
export default LeadsProvider;
