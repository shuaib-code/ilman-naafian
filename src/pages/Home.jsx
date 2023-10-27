import axios from "axios";
import { useEffect, useState } from "react";
import CollectionCard from "../components/Card/CollectionCard";

const Home = () => {
  const [collection, setCollection] = useState(null);
  const updateUI = (removeID) => {
    const remaining = collection?.filter((e) => e._id !== removeID);
    setCollection(remaining);
  };
  useEffect(() => {
    axios
      .get(
        "https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app/collect"
      )
      .then((d) => setCollection(d.data));
  }, []);
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
