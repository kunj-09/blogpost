import { FormControlItem, MenuItem, Option } from "./types";

export const menuItems: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      path: "/",
    },
    {
      id: "category",
      label: "Category",
      path: "/category/application",
    },
    {
      id: "blogs",
      label: "Blogs",
      path: "/blogs",
    },
    {
      id: "search",
      label: "Search",
      path: "/search",
    },
  ];

  export const categories: Option[] = [
    {
      value: "application",
      label: "Application",
    },
    {
      value: "data",
      label: "Data",
    },
    {
      value: "software",
      label: "Software",
    },
    {
      value: "tech",
      label: "Technology",
    },
    {
      value: "science",
      label: "Science",
    },
  ];
  
  export const formControls: FormControlItem[] = [
    {
      id: "title",
      label: "Title",
      placeholder: "Enter Blog Title",
      type: "text",
      component: "input",
      options: [],
    },
    {
      id: "description",
      label: "Description",
      placeholder: "Enter Blog Description",
      type: "text",
      component: "textarea",
      options: [],
    },
    {
      id: "category",
      label: "Category",
      placeholder: "Choose Blog Category",
      type: "",
      component: "select",
      options: categories,
    },
  ];

  export const firebaseConfig = {
    apiKey: "AIzaSyD0lNpwNiS96xsoybMHDBaSC1hCIyWZ-bc",
    authDomain: "nextjs-blogpost.firebaseapp.com",
    projectId: "nextjs-blogpost",
    storageBucket: "nextjs-blogpost.appspot.com",
    messagingSenderId: "725582802536",
    appId: "1:725582802536:web:be1dafe5b72fc8f86055dd",
    measurementId: "G-584DH8B6NR"
  };
  

//   // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);