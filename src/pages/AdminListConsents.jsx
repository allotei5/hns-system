import { Card, Typography } from "@material-tailwind/react";
import api from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AdminListConsents = () => {
  const TABLE_HEAD = ["Name", "Health Card Number", ""];

  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      job: "Developer",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
  ];

  const fetchData = async () => {
    const res = await api.get('stored-consents/')
    console.log(res)
    return res.data
  }

  const { isPending, error, data } = useQuery({
    queryKey: ['consents'],
    queryFn: fetchData
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error fetching data...</p>
  }

  return (
    <div>
      <h1 className="font-semibold text-2xl md:text-3xl mt-2 mb-20">
        List of Signed Consent Forms
      </h1>

      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-[#851B56] text-white">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map(({ client_name, health_card_number, id }, index) => {
              const isLast = index === data?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {client_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {health_card_number}
                    </Typography>
                  </td>
                  
                  <td className={classes}>
                    <Link to={`/consent/${id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AdminListConsents;
