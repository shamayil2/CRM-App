

const Sidebar = ({sidebarItems}) => {
    console.log(sidebarItems)

    return(
        <>
        <div className="side-list">
          <ul>
        {sidebarItems.map((item)=>
            <li>{item}</li>
        )}
        
        </ul>
        </div>
      
        </>
    )

}

export default Sidebar;