const Sidebar = ({sidebarItems}) => {
    console.log(sidebarItems)

    return(
        <>
        <h2>Sidebar</h2>
        <ul>
        {sidebarItems.map((item)=>
            <li>{item}</li>
        )}
        
        </ul>
        </>
    )

}

export default Sidebar;