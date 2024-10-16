"use client";

import { useSession } from "next-auth/react";
import Spinner from "../components/spinner";


//This we created our global state

import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
} from "react";
import { Blog, BlogFormData, initialBlogFormData } from "@/utils/types";

//Add State ka type here
type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  formData : BlogFormData;
  setFormData: Dispatch<SetStateAction<BlogFormData>>;
  searchQuery :string;
  setSearchQuery : Dispatch<SetStateAction<string>>;
  searchResults : Blog[];
  setSearchResults : Dispatch<SetStateAction<Blog[]>>
};

//State Initialise ider karo
const initialState = {
  loading: false,
  setLoading: () => {},
  formData :initialBlogFormData,
  setFormData:()=>{},
  searchQuery :'',
  setSearchQuery : ()=>{},
  searchResults : [],
  setSearchResults : ()=>{},
};

export const GlobalContext = createContext<ContextType>(initialState);

//Define the state here
export default function Global({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const {data: session } = useSession();
  const [formData, setFormData] = useState(initialBlogFormData);
  const [searchQuery , setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Blog[]>([]);

  if(session === undefined) return <Spinner></Spinner>
  

  return (
    <GlobalContext.Provider value={{ loading, setLoading ,formData, setFormData ,searchQuery , setSearchQuery,searchResults, setSearchResults}}>
      {children}
    </GlobalContext.Provider>
  );
}
