import {useParams} from "react-router-dom"
import {useEffect,useState} from "react"
const LeadDetails = () => {
    const param = useParams();
    console.log(param)
    const [data,setData] = useState({});
    const [error,setError] =  useState("");
    const [loading,setLoading] = useState(true);

    useEffect(()=>{

        async function getLead(){
            try{

                const res = await fetch(`http://localhost:3000/leads/${param.leadId}`)

                if(res.ok){
                    const data = await res.json();
                    console.log(data)
                    setData({...data})
                    setLoading(false)
                }else{
                    const error = await res.json();
                    console.log(error);
                    setError(error);
                }

            }
            catch(error){
                console.log("Error Fetching Data",error)
            }
        }

        getLead()

    },[])
    console.log(data.name);
    console.log(data.status)
    return(
        <>
        {loading?<p>Loading...</p>:<>
        <div className="container">
            <div className="text-center lead-details">
            <h1>{data.name}</h1>
            <h5>Agent Assigned: {data.salesAgent && data.salesAgent.name}</h5>
            <h5>Source: {data.source}</h5>
            <h5>Status: {data.status}</h5>
            <h5>Time To Close : {data.timeToClose} Days</h5>
            <h5>Priority: {data.priority == 1? "Low" : data.priority==2?"Medium":"High"}</h5>
            <h5>Tags: {data.tags.join(", ")}</h5>
        </div>

        <div className="comment-section">
            <h3>Add Comment</h3>
            <textarea name="" id="" cols="80" rows="4"></textarea>
        </div>
        </div>
        
        </>}
        </>
    )
}

export default LeadDetails;