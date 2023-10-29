import CollectionCard from "../components/Card/CollectionCard";
import axiosClient from "../axios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import generatePDF from "react-to-pdf";

AOS.init();

const Home = () => {
  const pdfRef = useRef();
  const { user } = useContext(AuthContext);
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
  return (
    <>
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
      <div
        ref={pdfRef}
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
