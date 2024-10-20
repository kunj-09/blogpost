"use client";

import { firebaseConfig, formControls } from "@/utils";
import Button from "../components/button";
import { useContext, useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import Spinner from "../components/spinner";
import { GlobalContext } from "../context";
import { BlogFormData, initialBlogFormData } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://nextjs-blogpost.appspot.com");

async function handleImageSaveToFireBase(file: any) {
  const extractUniqueFileName = createUniqueFileName(file?.name);
  const storageRef = ref(storage, `blog/${extractUniqueFileName}`); //The ref function creates a reference to where the file will be stored in Firebase
  const uploadImg = uploadBytesResumable(storageRef, file); //uploadBytesResumable --> This function starts the file upload to Firebase, tracking the upload progress.

  return new Promise((resolve, reject) => {
    uploadImg.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadImg.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      }
    );
  });
  ///Start the upload using uploadBytesResumable.
  //Track progress with snapshot to see how much of the file is uploaded.
  //Handle errors if anything goes wrong (network issues, file type restrictions, etc.).
  //On success, retrieve the download URL to use the image in your app.
}

//Imaage apan compree karte hai online toh name ke sath piche kuch add ho jata hai - usse  malum padta hai ke yeh naya image hai compress kiya hua -> yeh function iske liye hai . name change karne because database sab image unique name se save ho jaye !
function createUniqueFileName(fileName: string) {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);

  return `${fileName}-${timeStamp}-${randomString}`;
}

export default function Create() {
  const [imageLodaing, setImageLoading] = useState<boolean>(false);
  const {formData , setFormData}= useContext(GlobalContext);
  const {data :session} = useSession();
  const router = useRouter();

  console.log(session,'session');

  async function handleBlogImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) return; /// event:React.ChangeEvent<HTMLInputElement => This is the specific TypeScript type that ensures event is recognized as a change event from an HTML input element
    setImageLoading(true);
    const saveImageToFirebase :any = await handleImageSaveToFireBase(
      event.target.files[0]
    );

    if (saveImageToFirebase !== "") {
      setImageLoading(false);
      console.log(saveImageToFirebase, "saveImageToFirebase");
      setFormData({
        ...formData,
        image: saveImageToFirebase
      })
    }
  }
  async function handleSaveBlogPost() {
    console.log(formData);
  
    // Fallback for when session is not available
    const userId = session?.user?.name || "Anonymous"; // Fallback to 'Anonymous' if user is not logged in
    const userImage =
      session?.user?.image ||
      "https://in.pinterest.com/pin/5770305768209793"; // Provide a default user image if session is not available
  
    const res = await fetch("/api/blog-post/add-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userid: userId, // Use the session value or fallback
        userimage: userImage, // Use the session value or fallback
        comments: [], // Empty comments array initially
      }),
    });
  
    const data = await res.json();
  
    console.log(data, "data123");
  
    if (data && data.success) {
      setFormData(initialBlogFormData); // Reset the form data after successful submission
      router.push("/blogs"); // Navigate to the blogs page
    }
  }
  

  console.log(formData,'formData');

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[3%] py-10 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] px-8">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Create Your Own Blog Post
              </h2>
              <div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className={`${imageLodaing ? "w-1/2" : "w-full"}`}>
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Upload Blog Image
                      </label>
                      <input
                        id="fileinput"
                        accept="image/*"
                        max={1000000}
                        onChange={handleBlogImageChange}
                        type="file"
                        className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                    {imageLodaing ? (
                      <div className="w-1/2">
                        <Spinner />
                      </div>
                    ) : null}
                  </div>
                  <div className="-mx-4 flex flex-wrap">
                    {formControls.map((control) => (
                      <div key={control.id} className="w-full px-4">
                        <label className="mb-3 block text-sm font-medium text-dark">
                          {control.label}
                        </label>
                        {control.component === "input" ? (
                          <input
                            type={control.type}
                            name={control.id}
                            placeholder={control.placeholder}
                            onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                                setFormData({
                                    ...formData,
                                    [control.id] : event.target.value
                                })
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        ) : control.component === "textarea" ? (
                          <textarea
                            name={control.id}
                            placeholder={control.placeholder}
                            rows={5}
                            onChange={(event:React.ChangeEvent<HTMLTextAreaElement>)=>{
                                setFormData({
                                    ...formData,
                                    [control.id] : event.target.value
                                })
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        ) : control.component === "select" ? (
                          <select
                            name={control.id}
                            // placeholder={control.placeholder}
                            onChange={(event:React.ChangeEvent<HTMLSelectElement>)=>{
                                setFormData({
                                    ...formData,
                                    [control.id] : event.target.value
                                })
                            }}
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          >
                            <option value={""} id="">
                              Select
                            </option>
                            {control.options.map((optionItem) => (
                              <option
                                key={optionItem.value}
                                id={optionItem.value}
                                value={optionItem.value}
                              >
                                {optionItem.label}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    ))}
                    <div className="w-full px-4">
                      <Button
                        text="Create New Blog"
                        onClick={handleSaveBlogPost}
                      ></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
