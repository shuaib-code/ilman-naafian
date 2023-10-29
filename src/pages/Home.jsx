import axios from "axios";
import { useEffect, useState } from "react";
import CollectionCard from "../components/Card/CollectionCard";
import axiosClient from "../axios";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  // const [collection, setCollection] = useState(null);
  const updateUI = (removeID) => {
    // const remaining = collection?.filter((e) => e._id !== removeID);
    // setCollection(remaining);
  };
  // useEffect(() => {
  //   axiosClient.get("/collect").then((r) => setCollection(r.data));
  //   // axios
  //   //   .get(
  //   //     "https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app/collect"
  //   //   )
  //   //   .then((d) => setCollection(d.data));
  // }, []);
  const {
    data: collection,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["collectedList"],
    queryFn: () => axiosClient.get("/collect").then((r) => r.data),
  });
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Something is went worng</p>
      </div>
    );
  }
  return (
    <div className="mt-3 mx-3 space-y-2 bg-no-repeat bg-cover bg-fixed bg-[url('https://www.baagroups.com/images/bg-decor-3.png')]">
      {collection?.map((e, i) => (
        <CollectionCard
          key={e._id}
          book={e}
          id={i}
          updateUI={updateUI}
        ></CollectionCard>
      ))}
    </div>
  );
};

export default Home;
