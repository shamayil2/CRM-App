import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AgentsContext } from "../context/AgentsContext";
export default function SalesAgents() {
  const { salesAgentsData } = useContext(AgentsContext);
  console.log(salesAgentsData);
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="text-center">Sales Agents Management </h1>
          <div className="col-md-4">
            <div className="side-list leads">
              <ul className="leads-sidebar">
                <Link to="/">
                  <li>Back To Dashboard</li>
                </Link>
                 <Link to="/addagent">
                  <li>Add New Agent</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="col-md-8 pt-4 ">
            <h2 className="text-center">Sales Agents Data</h2>
            <div className="row">
              <div className="col-md-6">
                <h5>Agent Name</h5>
              </div>
              <div className="col-md-6">
                <h5>Email</h5>
              </div>
            
            {salesAgentsData.map((agent) => (
              <>
               <div className="col-md-6">{agent.name}</div>
               <div className="col-md-6">{agent.email}</div>
              </>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
