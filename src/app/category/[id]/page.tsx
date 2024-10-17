

import CateegoryList from "@/app/components/category";


async function getAllListsByCategory(getId: string) {
  const res = await fetch(`${process.env.URL}/api/category?categoryID=${getId}`, {
    method: "GET",
    cache: "no-store", // ensures that this fetch request does not cache the response, meaning it will always fetch fresh data.
  });

  const data = await res.json();

  if (data.success) return data.data;
}

export default async function Category({ params }: { params: any }) {
  const { id } = params; //here the id is being fetched from the url using params 

  const getAllList = await getAllListsByCategory(id);// the id is sent to getAllListByCategory function and from there the data is being fetched samjo 

  return <CateegoryList list={getAllList} />;
}