declare type OurLessonsProp = {
  title: string;
  course: Array<string>;
  info: string;
  month: string;
  price: string;
  id: string;
  image: string;
  startDate: {
    date: string;
    time: string;
  };
};

declare type OurStartsProp = {
  title: string;
  course: Array<string>;
  description: string;
  month: string;
  price: string;
  id: string;
  image: string;
  startDate: StartCourses;
};

declare type StartCourses = {
  date: string;
  time: string;
};

declare type OurComboProp = {
  id: string;
  comboName: string;
  price: string;
  month: string;
  image: StaticImageData;
};

type OurTrainersProp = {
  id: string;
  name: string;
  experience: string;
  experienceDetails: string;
  teachingStyle: string;
  orientation: { label: string };
  educationAndExperience: string;
  quote: string;
  image: string;
  photos: string;
  video: string;
};

type TrainerItemProps = {
  item: OurTrainersProp;
};

type ServiceListItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  banner?: string;
  bannerDescription: string;
  planningTitle: string;
  planning: { label: string }[];
};

type OurPortfolioProp = {
  id?: string;
  description: string;
  title: string;
  image: StaticImageData;
};

declare type AboutItemProp = {
  id: number | string;
  title: string;
  subTitle: string;
  description: string;
  image: StaticImageData;
};

declare type BlogItemProp = {
  id?: number | string;
  title: string;
  description?: string;
  description2?: string;
  image?: StaticImageData;
  video?: string | File;
};
