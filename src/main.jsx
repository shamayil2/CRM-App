import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import NewLeadForm from "./pages/NewLeadForm"
import NewAgentForm from "./pages/NewAgentForm"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([{

  path:"/",element:<App/>

},
{
  path:"/addlead",element:<NewLeadForm/>
},{
  path:"/addagent",element:<NewAgentForm/>
}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
