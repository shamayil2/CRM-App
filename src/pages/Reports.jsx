import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { LeadsContext } from "../context/LeadsContext";
import { AgentsContext } from "../context/AgentsContext";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function Reports() {
  const { leadsData } = useContext(LeadsContext);
  console.log(leadsData);

  const newLeads = leadsData.filter((lead) => lead.status == "New").length;
  const contactedLeads = leadsData.filter(
    (lead) => lead.status == "Contacted"
  ).length;
  const qualifiedLeads = leadsData.filter(
    (lead) => lead.status == "Qualified"
  ).length;
  const proposedLeads = leadsData.filter(
    (lead) => lead.status == "Proposal Sent"
  ).length;
  const closedLeads = leadsData.filter(
    (lead) => lead.status == "Closed"
  ).length;

  const data1 = {
    labels: ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
    datasets: [
      {
        label: "Number of Sales",
        data: [
          newLeads,
          contactedLeads,
          qualifiedLeads,
          proposedLeads,
          closedLeads,
        ],
        backgroundColor: "rgba(16, 47, 12, 0.87)",
      },
    ],
  };

  const options = {
    responsive: true,
    title: {
      display: true,
      text: "Leads by Status",
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Lead Status ",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Sales",
        },
      },
    },
  };


    //Second Chart
  const leadsClosed = leadsData.filter((lead) => lead.status == "Closed");
  const closedSalesAgents = [];
  leadsClosed.map((lead) => {
    if (!closedSalesAgents.includes(lead.salesAgent.name)) {
      closedSalesAgents.push(lead.salesAgent.name);
    }
  });

  const leadsArr2 = {};
  leadsClosed.map((lead)=>{
    
    if(lead.salesAgent.name in leadsArr2){
      leadsArr2[lead.salesAgent.name]++;
    }else{
      leadsArr2[lead.salesAgent.name]=1
    }

  })

  const closedLeadsAgents = Object.keys(leadsArr2);
  const closedLeadsNumber = Object.values(leadsArr2);


  function leadsBySalesAgents(agents) {
    const leadsArr = [];
    agents.map((agent) => {
      const agentLeads = leadsData.filter(
        (lead) => lead.salesAgent.name == agent
      ).length;
      console.log(agentLeads);
      leadsArr.push(agentLeads);
    });

    return leadsArr;
  }
  const leadsArray = leadsBySalesAgents(closedSalesAgents);
  console.log(leadsArray);

  const data2 = {
    labels: [...closedLeadsAgents],
    datasets: [
      {
        label: "Leads Closed",
        data: closedLeadsNumber,
        backgroundColor: "#d41b1bff",
      },
    ],
  };

  const options1 = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const index = context.dataIndex; // which bar is hovered
            const leadName = leadsClosed[index].name; // use same index
            return `Lead Name : ${leadName}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Sales Agents",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Leads",
        },
        ticks: {
          stepSize: 1,
          color: "black",
          font: {
            size: 20,
          },
        },
      },
    },
  };

  //Third Chart

  return (
    <>
      <div className="row">
        <div className="col-md-6 my-4 text-center">
          <h1>Total Leads in the Pipeline</h1>
          <Bar data={data1} options={options} />
        </div>
        <div className="col-md-6 my-4 text-center">
          <h1>Leads Closed By Sales Agents</h1>
          <Bar data={data2} options={options1} />
        </div>
      </div>
    </>
  );
}
