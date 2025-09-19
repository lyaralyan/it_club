"use client";
import Title from "@front/components/Title";
import Wrapper from "@front/components/Wrapper";
import BlogItems from "@front/(Pages)/blog/BlogItems";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "@/app/requests/query";

const BlogPage = () => {
  const { data, loading, error } = useQuery(GET_BLOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Data</p>;

  const blogData = (data?.getBlogs as BlogItemProp[]) ?? [];

  return (
    <Wrapper className={"mt-[70px]"}>
      <Title
        text="Մեր բլոգը"
        titleYellowStyle={{ width: "165px" }}
      />
      {/* <BlogNews /> */}

      {blogData.map((item, index) => (
        <BlogItems
          item={item}
          index={index}
          key={item.id ?? index}
        />
      ))}
    </Wrapper>
  );
};

export default BlogPage;
