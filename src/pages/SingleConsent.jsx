import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const SingleConsent = () => {
  const { id } = useParams();

  const fetchData = async () => {
    const res = await api.get(`stored-consents/${id}`);
    return res.data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["consent", id],
    queryFn: fetchData,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data...</p>;
  }

  console.log(data);
  return (
    <div>
      <p>Client name: {data.client_name}</p>
      <p>Health Card #: {data.health_card_number}</p>
      <iframe className="w-full min-h-screen" allowFullScreen webkitallowfullscreen src={data.pdf_url}></iframe>
    </div>
  );
};

export default SingleConsent;
