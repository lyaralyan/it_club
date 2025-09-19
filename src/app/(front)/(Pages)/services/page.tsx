"use client";
import ServicesBusiness from "@front/(Pages)/services/ServicesBusiness/ServicesBusiness";
import InfoServices from "@front/(Pages)/services/InfoServices/InfoServices";
import Wrapper from "@front/components/Wrapper";
import { useQuery } from "@apollo/client";
import { GET_SERVICES } from "@/app/requests/query";

const Services = () => {
  const { data, loading, error } = useQuery(GET_SERVICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading data</p>;

  const services = data.Services;

  return (
    <Wrapper className={"mt-[70px]"}>
      <ServicesBusiness params={services} />
      <InfoServices params={services} />
    </Wrapper>
  );
};

export default Services;
