"use client";
import Wrapper from "@front/components/Wrapper";
import Title from "@front/components/Title";
import React from "react";
import Poster from "@front/assets/images/poster.jpg";
import Image from "next/image";
import { GET_BLOG } from "@/app/requests/query";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const BlogSingle = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_BLOG, {
    variables: { id: id },
    skip: !id,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blog</p>;
  const blog: BlogItemProp = data?.getBlog;

  return (
    <Wrapper className={"mt-[102px]"}>
      <div>
        <Title text={blog.title} />
        {/* <p
          className={
            "font-normal text-[16px] tracking-[0.04px] leading-[28px] text-[#4D4D4D] mt-[42px]"
          }>
          {blog.description}
        </p> */}
        <p
          className={
            "font-normal text-[16px] tracking-[0.04px] leading-[28px] text-[#4D4D4D] mt-[24px]"
          }>
          {blog.description}
        </p>
        <div className={"w-full h-fit relative mt-[96px]"}>
          <video
            className={"w-full h-[767px] rounded-[20px]"}
            controls={true}
            preload="none"
            poster={Poster.src}
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${blog.video}`}
          />
        </div>
      </div>
      <p
        className={
          "font-normal text-[16px] tracking-[0.04px] leading-[28px] text-[#4D4D4D] mt-[24px]"
        }>
        {blog.description2}
      </p>
      <div className={"mt-[96px] min-h-[788px]"}>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${blog.image}`}
          alt="Blog Group"
          className={"w-full object-contain object-center"}
          width={1340}
          height={788}
        />
      </div>
    </Wrapper>
  );
};

export default BlogSingle;
