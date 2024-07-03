import CollectionCard from "../components/Card/CollectionCard";
import axiosClient from "../axios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Home = () => {
  const { user } = useContext(AuthContext);
  const updateUI = (removeID) => {
    window.location.reload();
  };
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
    <>
      {user?.email === "tasinoutlook@gamil.com" ||
        (user?.email === "shuaib.cyclist@gmail.com" && (
          <div
            data-aos="fade-in"
            data-aos-duration="1400"
            className="my-3 p-3 font-mono rounded-2xl"
          >
            <div className="bg-black/10 backdrop-blur-sm p-3 border-2 rounded-2xl">
              <h1 className="font-semibold text-center mb-3 font-slab">
                About Latest Update
              </h1>
              <p className="text-sm font-medium">1. Animation Removed</p>
              <p className="text-xs font-slab mt-3 font-semibold text-right">
                Data: 7:30 PM Thursday, November 2, 2023
              </p>
            </div>
          </div>
        ))}
      <div
        id="collectionList"
        className="mt-3 mx-3 space-y-2 bg-no-repeat bg-cover bg-fixed bg-[url('https://www.baagroups.com/images/bg-decor-3.png')]"
      >
        {collection?.map((e, i) => (
          <CollectionCard
            key={e._id}
            book={e}
            id={i}
            updateUI={updateUI}
          ></CollectionCard>
        ))}
      </div>
    </>
  );
};

export default Home;
