import {useState,useContext,useEffect} from "react"
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar,Pie } from "react-chartjs-2";
import { AgentsContext } from "../context/AgentsContext";
import axios from "axios"
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement);
export default function Reports() {

  const [leadsInPipeline,setLeadsInPipeline] = useState([])
  const [agentsClosedLeads,setAgentsClosedLeads] = useState([])
  const {salesAgentsData} = useContext(AgentsContext)
  useEffect(()=>{

    async function getLeadsInPipeline(){

      try{

        const response = await axios.get("http://localhost:3000/report/pipeline");
        setLeadsInPipeline(response.data.totalLeadsInPipeline)

      }
      catch(error){
        console.log("Can't Get Reports for Leads in Pipeline",error.message)
      }

    }

    async function getAgentsClosedLeads(){
      try{

        const response = await axios("http://localhost:3000/report/closed-by-agent");
        setAgentsClosedLeads(response.data.leads)

      }
      catch(error){
        console.log("Cannot Fetch Leads closed by agents",error.message)
      }
    }

    getLeadsInPipeline();
    getAgentsClosedLeads();

  },[])

  console.log(agentsClosedLeads)
  const data1 = {
    labels: leadsInPipeline &&  Object.keys(leadsInPipeline),
    datasets: [
      {
        label: "Number of Sales",
        data: leadsInPipeline && Object.values(leadsInPipeline),
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
     const data2 = {
    labels: agentsClosedLeads && salesAgentsData.filter((lead))  ,
    datasets: [
      {
        label: "Number of Sales",
        data: agentsClosedLeads && Object.values(agentsClosedLeads),
        backgroundColor: "rgba(23, 107, 12, 0.87)",
      },
    ],
  };

  const options2 = {
    responsive: true,
    title: {
      display: true,
      text: "Leads Closed by Sales Agents",
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Leads Closed by Sales Agents ",
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

console.log(salesAgentsData)

  // function leadsBySalesAgents(agents) {
  //   const leadsArr = [];
  //   agents.map((agent) => {
  //     const agentLeads = leadsData.filter(
  //       (lead) => lead.salesAgent.name == agent
  //     ).length;
  //     console.log(agentLeads);
  //     leadsArr.push(agentLeads);
  //   });

  //   return leadsArr;
  // }
  // const leadsArray = leadsBySalesAgents(closedSalesAgents);
  // console.log(leadsArray);

  // const data2 = {
  //   labels: [...closedLeadsAgents],
  //   datasets: [
  //     {
  //       label: "Leads Closed",
  //       data: closedLeadsNumber,
  //       backgroundColor: "#d41b1bff",
  //     },
  //   ],
  // };

  // const options1 = {
  //   responsive: true,
  //   plugins: {
  //     tooltip: {
  //       enabled: true,
  //       callbacks: {
  //         label: function (context) {
  //           const index = context.dataIndex; // which bar is hovered
  //           const leadName = leadsClosed[index].name; // use same index
  //           return `Lead Name : ${leadName}`;
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Sales Agents",
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: "Number of Leads",
  //       },
  //       ticks: {
  //         stepSize: 1,
  //         color: "black",
  //         font: {
  //           size: 20,
  //         },
  //       },
  //     },
  //   },
  // };

  // //Third Chart

  // const data3 = {
  //   labels: ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
  //   datasets: [
  //     {
  //       data: [
  //         newLeads,
  //         contactedLeads,
  //         qualifiedLeads,
  //         proposedLeads,
  //         closedLeads,
  //       ],
  //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','#1a9740ff', '#820d80ff'],
  //       borderColor: ['#fff', '#fff', '#fff','#fff','#fff'],
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  //   const options3 = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Leads By Status',
  //     },
  //   },
  // };

  return (
    <>
      <div className="row">
        <div className="col-md-6 my-4 text-center">
          <h1>Total Leads in the Pipeline</h1>
         { leadsInPipeline && <Bar data={data1} options={options} />}
        </div>
        <div className="col-md-6 my-4 text-center">
          <h1>Leads Closed By Sales Agents</h1>
          <Bar data={data2} options={options2} />
        </div>{/*
        <div className="col-md-4 my-4 text-center">
          <h1>Leads By Status</h1>
          <Pie data={data3} options={options3} />
        </div> */}
      </div>
    </>
  );
}
