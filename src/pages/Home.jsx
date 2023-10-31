import CollectionCard from "../components/Card/CollectionCard";
import axiosClient from "../axios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { MdBackspace, MdSearch } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Home = () => {
  const { user } = useContext(AuthContext);
  const [showSearchBox, setShowSearchBox] = useState(0);
  const updateUI = (removeID) => {
    // const remaining = collection?.filter((e) => e._id !== removeID);
    // setCollection(remaining);
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
  const searchBox = (
    <div
      className={`${
        showSearchBox ? "block" : "hidden"
      } absolute w-full px-4 py-4 z-20 bg-black/20 backdrop-blur-sm rounded-sm`}
    >
      <div className="h-screen bg-gray bg-opacity-90 rounded-lg shadow-2xl">
        <div className="px-4 gap-8 py-4 flex justify-between items-center">
          <div>
            <MdSearch className="text-xl"></MdSearch>
          </div>
          <div className="w-full">
            <input
              type="text"
              className="mt-1 px-3 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
            />
          </div>
          <div onClick={() => setShowSearchBox(0)} className="p-1">
            <MdBackspace className="text-xl"></MdBackspace>
          </div>
        </div>
      </div>
    </div>
  );
  const searchBar = (
    <div className="flex justify-center items-center my-4 mb-6">
      <div
        onClick={() => setShowSearchBox(1)}
        className="grid grid-cols-7 justify-between items-center text-black bg-white w-60 border-[2px] shadow-xl py-2 rounded-lg"
      >
        <div className="flex justify-start ml-4">
          <MdSearch className="text-xl"></MdSearch>
        </div>
        <div className="flex justify-center col-span-6">
          <p>Quick Search</p>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {searchBox}
      {user?.email === "tasinoutlook@gamil.com" ||
        (user?.email === "shuaib.cyclist@gmail.com" && (
          <div
            data-aos="flip-up"
            data-aos-duration="1400"
            className="my-3 p-3 font-mono rounded-2xl"
          >
            <div className="bg-black/10 backdrop-blur-sm p-3 border-2 rounded-2xl">
              <h1 className="font-semibold text-center mb-3 font-slab">
                About Latest Update
              </h1>
              <p className="text-sm font-medium">
                1. Loading effect before data showing
              </p>
              <p className="text-sm font-medium">2. Animation on home page</p>
              <p className="text-sm font-medium">3. Error component added</p>
              <p className="text-sm font-medium">4. Overlay-x hidden</p>
              <p className="text-xs font-slab mt-3 font-semibold text-right">
                Data: 2:30 AM Monday, October 30, 2023
              </p>
            </div>
          </div>
        ))}
      {searchBar}
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
    </>
  );
};

export default Home;
