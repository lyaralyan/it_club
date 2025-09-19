import { gql } from "@apollo/client";

// TODO: LOGIN

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        role
      }
    }
  }
`;

// TODO: COURSES

export const CREATE_COURSE = gql`
  mutation CreateCourses($Courses: [CourseItemInput!]!) {
    createCourses(Courses: $Courses) {
      id
      title
      image
      course
      courseProgram
      description
      month
      price
      lessonProcessDescription
      photos
      video
    }
  }
`;
export const CREATE_START_COURSE = gql`
  mutation AddStartDateToCourse($courseId: ID!, $startDate: StartDateInput!) {
    addStartDateToCourse(courseId: $courseId, startDate: $startDate) {
      id
      title
      image
      course
      courseProgram
      description
      month
      price
      lessonProcessDescription
      photos
      video
      startDate {
        date
        time
      }
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $input: CourseItemInput!) {
    updateCourse(id: $id, input: $input) {
      id
      title
      image
      course
      courseProgram
      description
      month
      price
      lessonProcessDescription
      photos
      video
    }
  }
`;

// TODO: BANNER

export const CREATE_BANNER = gql`
  mutation CreateBanner(
    $image: Upload!
    $description: String!
    $title: String!
  ) {
    createBanner(image: $image, description: $description, title: $title) {
      id
      image
      title
      description
    }
  }
`;

// TODO: TEACHER

export const CREATE_TEACHER = gql`
  mutation createTeachers($inputs: [TeacherItemInput!]!) {
    createTeachers(inputs: $inputs) {
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

export const UPDATE_TEACHER = gql`
  mutation UpdateTeacher($id: ID!, $input: TeacherUpdateInput!) {
    updateTeacher(id: $id, input: $input) {
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

export const DELETE_TEACHER = gql`
  mutation DeleteTeacher($id: ID!) {
    deleteTeacher(id: $id)
  }
`;

// TODO: SERVICES
export const CREATE_SERVICES = gql`
  mutation CreateServices($input: ServicesItemInput!) {
    createService(input: $input) {
      id
      title
      description
      video
    }
  }
`;

export const CREATE_SUB_SERVICE = gql`
  mutation CreateSubService($input: ServicesListItemInput!) {
    createSubService(input: $input) {
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

export const DELETE_SERVICES = gql`
  mutation DeleteSubService($id: ID!) {
    deleteSubService(id: $id)
  }
`;

// TODO: COMBOS

export const CREATE_COMBO = gql`
  mutation createCombos($inputs: [ComboItemInput!]!) {
    createCombos(inputs: $inputs) {
      comboName
      description
      price
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

export const UPDATE_COMBO = gql`
  mutation UpdateCombo($id: ID!, $input: ComboItemInput!) {
    updateCombo(id: $id, input: $input) {
      id
      comboName
      description
      price
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

export const DELETE_COMBO = gql`
  mutation DeleteCombo($id: ID!) {
    deleteCombo(id: $id)
  }
`;

// TODO: ABOUT US

export const CREATE_OR_UPDATE_ABOUT_US = gql`
  mutation CreateOrUpdateAboutUs($input: AboutUsInput!) {
    createOrUpdateAboutUs(input: $input) {
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

export const CREATE_BLOG = gql`
  mutation CreateBlog($inputs: [BlogInput!]!) {
    createBlog(inputs: $inputs) {
      title
      description
      description2
      image
      video
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $input: BlogInput!) {
    updateBlog(id: $id, input: $input) {
      title
      description
      description2
      image
      video
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`;

// TODO: REGISTER_TO_COURSE

export const REGISTER_TO_COURSE = gql`
  mutation RegisterToCourse($input: RegistrationInput!) {
    registerToCourse(input: $input) {
      id
      name
      email
      phone
      course
      date
      time
    }
  }
`;
