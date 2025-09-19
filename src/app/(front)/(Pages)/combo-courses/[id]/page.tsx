"use client";
import CoursesVideo from "@/app/(front)/components/CoursesVideo/CoursesVideo";
import { GET_COMBO } from "@/app/requests/query";
import { useQuery } from "@apollo/client";
import ComboGift from "@front/(Pages)/combo-courses/ComboGift/ComboGift";
import ComboName from "@front/(Pages)/combo-courses/ComboName/ComboName";
import Wrapper from "@front/components/Wrapper";
import { useParams } from "next/navigation";

const ComboCourses = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_COMBO, {
    variables: { id: id },
    skip: !id,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Data</p>;

  const combo = data.Combo;

  return (
    <Wrapper className={"mt-[70px]"}>
      <ComboName combo={combo} />
      <ComboGift combo={combo} />
      <h2 className={"mt-[122px] font-semibold text-[32px] text-[var(--dark)]"}>
        Դասընթացի մասին
      </h2>
      <p className={"font-normal text-[16px] text-[#4D4D4D]"}>
        {combo.aboutTheCourse}
      </p>
      <CoursesVideo
        video={`${process.env.NEXT_PUBLIC_STORAGE_URL}${combo.video}`}
      />
    </Wrapper>
  );
};

export default ComboCourses;
