import { useContext, useEffect, useState } from "react";
import EditCollect from "./EditCollect";
import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/AuthProvider";
import { MdDelete, MdEditDocument } from "react-icons/md";
import axiosClient from "../../axios";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const CollectionCard = ({ book, id, updateUI }) => {
  const { user } = useContext(AuthContext);
  const { bookName, author, cat, pub, url, _id } = book;
  const [showEditCollectForm, setShowEditCollectForm] = useState(0);
  const [admin, setAdmin] = useState(0);
  useEffect(() => {
    if (
      user?.email === "shuaib.cyclist@gmail.com" ||
      user?.email === "tasinoutlook@gmail.com"
    ) {
      setAdmin(1);
    }
  }, [user]);
  // console.log(admin);
  const handleDelete = () => {
    axiosClient
      .delete(`/collect/${_id}`)
      .then((d) => d.data.deletedCount > 0) && updateUI(_id);
  };
  const deleteToast = () => {
    toast((t) => (
      <div>
        <span className="text-black block font-slab font-medium">
          Are you sure that you want to delete{" "}
          <span className="text-green font-hindi">{bookName}</span>?<br />
        </span>
        <div className="flex justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className={`text-green bg-green bg-opacity-10 px-3 rounded-sm p-1 font-semibold mr-1`}
          >
            NO
          </button>
          <button
            onClick={() => {
              handleDelete();
              toast.dismiss(t.id);
            }}
            className={`text-red-700 bg-red-700 bg-opacity-10 px-3 rounded-sm p-1 font-semibold mr-1`}
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };
  return (
    <>
      <EditCollect
        book={book}
        setShowEditCollectForm={setShowEditCollectForm}
        show={showEditCollectForm}
        id={id}
      ></EditCollect>
      <div
        data-aos={id % 2 === 0 ? "fade-right" : "fade-left"}
        data-aos-duration={id % 2 === 0 ? "600" : "800"}
        className="flex relative items-center justify-start bg-black/5 backdrop-blur-sm rounded-md shadow-md"
      >
        <div>
          <img src={url} className="w-20 rounded-l-md" />
        </div>
        <div className="ml-3 font-hindi p-1">
          <h1 className="text-lg font-semibold mb-1">{bookName}</h1>
          <p className="text-sm font-medium">{author}</p>
          <p className="text-sm font-medium">{pub}</p>
          <p className="text-xs text-green">{cat}</p>
        </div>
        <p className="absolute right-0 top-0 font-medium text-lime-500 px-2 bg-green bg-opacity-10 rounded-sm">
          {id + 1}
        </p>
        {admin ? (
          <div className="bottom-0 space-x-1 absolute right-1 p-1">
            <button
              onClick={() => {
                setShowEditCollectForm(1);
                window.scroll({ top: 10, left: 0, behavior: "smooth" });
              }}
              className="font-slab text-lg font-medium text-green p-1 rounded-sm bg-green bg-opacity-10"
            >
              <MdEditDocument className="text-xl"></MdEditDocument>
            </button>
            <button
              onClick={deleteToast}
              className="font-slab text-lg font-medium text-red-700 p-1 rounded-sm bg-red-700 bg-opacity-10"
            >
              <MdDelete className="text-xl"></MdDelete>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CollectionCard;
