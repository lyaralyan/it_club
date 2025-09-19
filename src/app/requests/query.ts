import { gql } from "@apollo/client";

// TODO: COURSES

export const GET_COURSES = gql`
  query GetCourses {
    Courses {
      id
      title
      image
      photos
      course
      video
      courseProgram
      month
      price
      lessonProcessDescription
    }
  }
`;

export const GET_START_COURSES = gql`
  query GetStartCourses {
    StartCourses {
      id
      title
      image
      photos
      course
      video
      courseProgram
      month
      price
      description
      lessonProcessDescription
      startDate {
        date
        time
      }
    }
  }
`;

export const GET_COURSES_TITLE = gql`
  query GetCourses {
    Courses {
      id
      title
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    Course(id: $id) {
      id
      title
      image
      photos
      video
      course
      courseProgram
      description
      lessonProcessDescription
      month
      price
    }
  }
`;

// TODO: BANNER

export const GET_BANNER = gql`
  query {
    Banner {
      id
      title
      image
      description
    }
  }
`;

// TODO: TEACHER

export const GET_TEACHERS = gql`
  query GetTeachers {
    Teachers {
      id
      skillList {
        label
      }
      teachingCharacteristics
      name
      position
      bio
      orientation {
        label
      }
      educationAndExperience
      quote
      image
      photos
      video
    }
  }
`;

export const GET_TEACHER = gql`
  query GetTeacher($id: ID!) {
    Teacher(id: $id) {
      id
      name
      position
      bio
      skillList {
        label
      }
      orientation {
        label
      }
      teachingCharacteristics
      educationAndExperience
      quote
      image
      photos
      video
    }
  }
`;

// TODO: TEACHER

export const GET_SERVICES = gql`
  query GetAllServices {
    Services {
      id
      title
      description
      video
      ServicesList {
        id
        title
        description
        image
        banner
        bannerDescription
        planningTitle
        planning {
          label
        }
      }
    }
  }
`;

export const GET_SERVICE = gql`
  query GetSingleService($id: ID!) {
    Service(id: $id) {
      id
      title
      description
      image
      banner
      bannerDescription
      planningTitle
      planning {
        label
      }
    }
  }
`;

// TODO: COMBOS

export const GET_COMBOS = gql`
  query GetCombos {
    Combos {
      id
      comboName
      price
      description
      courseProgramList {
        label
      }
      receiveAComputerAsAGift
      aboutTheCourse
      image
      photos
      video
    }
  }
`;

export const GET_COMBO = gql`
  query GetCombo($id: ID!) {
    Combo(id: $id) {
      id
      comboName
      price
      description
      courseProgramList {
        label
      }
      receiveAComputerAsAGift
      aboutTheCourse
      image
      photos
      video
    }
  }
`;

// TODO: ABOUT US

export const GET_ABOUT_US = gql`
  query GetAboutUs {
    getAboutUs {
      first {
        title
        subTitle
        description
        image
      }
      second {
        title
        subTitle
        description
        image
      }
      third {
        title
        subTitle
        description
        image
      }
    }
  }
`;

// TODO: BLOG

export const GET_BLOGS = gql`
  query GetBlogs {
    getBlogs {
      id
      title
      description
      description2
      image
      video
    }
  }
`;

export const GET_BLOG = gql`
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      title
      description
      description2
      image
      video
    }
  }
`;
