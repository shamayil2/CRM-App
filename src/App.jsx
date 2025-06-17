
import Sidebar from "./components/Sidebar"
const App = () => {

  return(
    <>
    <header>
      <div className="header-H1">
      <h1>Avanya CRM Dashboard</h1>
      </div>
      
    </header>
    <main>
    <Sidebar sidebarItems={["Leads","Sales","Agents","Reports","Settings"]}/>
    </main>
    </>
  )

}

export default App;