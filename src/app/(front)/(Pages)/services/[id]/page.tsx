"use client";
import CreateWebsite from "@front/(Pages)/services/[id]/CreateWebsite/CreateWebsite";
import BannerServices from "@front/(Pages)/services/[id]/BannerServices/BannerServices";
import Wrapper from "@front/components/Wrapper";
import ApplyForService from "@front/(Pages)/services/[id]/ApplyForService/ApplyForService";
import OurPortfolio from "@front/(Pages)/services/[id]/OurPortfolio/OurPortfolio";
import { useQuery } from "@apollo/client";
import { GET_SERVICE } from "@/app/requests/query";
import { useParams } from "next/navigation";

const SingleServices = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_SERVICE, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading service</p>;

  const service = data.Service;

  console.log("📢 [page.tsx:21]", data);
  return (
    <Wrapper>
      <BannerServices params={service} />
      <CreateWebsite params={service} />
      <ApplyForService params={service}/>
      <OurPortfolio />
    </Wrapper>
  );
};

export default SingleServices;
