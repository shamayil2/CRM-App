import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import NewLeadForm from "./pages/NewLeadForm"
import NewAgentForm from "./pages/NewAgentForm"
import LeadList from "./pages/LeadList"
import LeadDetails from "./pages/LeadDetails"
import LeadStatusView from "./pages/LeadStatusView"
import AgentsProvider from "./context/AgentsContext"
import SalesAgentView from "./pages/SalesAgentView"
const App = () => {


  return(
    <>
    <BrowserRouter>
    <AgentsProvider>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addlead" element={<NewLeadForm/>}/>
      <Route path="/addagent" element={<NewAgentForm/>}/>
      <Route path="/leadlist" element={<LeadList/>}/>
      <Route path="/lead-details/:leadId" element={<LeadDetails/>}/>
      <Route path="/leadstatusview" element={<LeadStatusView/>}/>
      <Route path="/salesagentview" element= {<SalesAgentView/>}/>
    </Routes>
    </AgentsProvider>
    </BrowserRouter>

    </>
  )

}

export default App;