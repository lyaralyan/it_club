"use client";
import OurCourses from "@front/components/OurCourses/OurCourses";
import CoursesTime from "@front/(Pages)/teacher/CoursesTime";
import CoursesVideo from "@front/components/CoursesVideo/CoursesVideo";
import DescriptionTeacher from "@front/(Pages)/teacher/DescriptionTeacher";
import TeacherInfo from "@front/(Pages)/teacher/TeacherInfo";
import Wrapper from "@front/components/Wrapper";
import { useQuery } from "@apollo/client";
import { GET_TEACHER } from "@/app/requests/query";
import { useParams } from "next/navigation";

const TeacherProfile = () => {
  const { id } = useParams() as { id: string };
  const { data, loading, error } = useQuery(GET_TEACHER, {
    variables: { id },
    skip: !id,
  });

  const teacher = data?.Teacher;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;
  if (!teacher) return <p>Teacher not found</p>;

  return (
    <Wrapper>
      <TeacherInfo params={teacher} />
      <DescriptionTeacher params={teacher} />
      <CoursesVideo video={teacher.video} />
      <CoursesTime />
      <OurCourses currentID={teacher.id} />
    </Wrapper>
  );
};

export default TeacherProfile;
