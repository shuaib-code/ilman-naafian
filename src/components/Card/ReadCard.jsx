import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { FaBackspace } from "react-icons/fa";
import { MdDelete, MdEditSquare, MdNote } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import axiosClient from "../../axios";

const ReadCard = ({ book, id, handleReadList }) => {
  const { bookName, author, pub, cat, islamic, note, _id } = book;
  const { user } = useContext(AuthContext);
  const [showNote, setNote] = useState(0);
  const [noteText, setNoteText] = useState(note);
  const [showEditNote, setShowEditNOte] = useState(0);
  const i = parseInt(islamic);
  const handleDelete = () => {
    axiosClient.delete(`/note/${_id}`).then((d) => {
      if (d.data.deletedCount > 0) {
        handleReadList(_id);
      }
    });
  };
  const handelNote = (e) => {
    e.preventDefault();
    const newNote = e.target.note.value;
    axiosClient.patch(`/note/${_id}`, { newNote }).then((d) => {
      if (d.data.modifiedCount > 0) {
        toast.success(`Note of ${bookName} is updated.`);
        setShowEditNOte(0);
        setNoteText(newNote);
      }
      d.data.modifiedCount == 0 &&
        toast.error("You did not edit your note yet.");
    });
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
              toast.dismiss(t.id);
              handleDelete();
            }}
            className={`text-red-700 bg-red-700 bg-opacity-10 px-3 rounded-sm p-1 font-semibold mr-1`}
          >
            Yes
          </button>
        </div>
      </div>
    ));
  };
  const editNote = (
    <>
      <div
        className={`${
          showEditNote ? "block" : "hidden"
        } p-2  rounded-lg font-hindi mt-4 bg-black/20 backdrop-blur-sm`}
      >
        <div className="p-3 bg-gray bg-opacity-100 rounded-md">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-green">
              Edit note of <span className="text-green ml-2"> {bookName}</span>
            </h1>
            <div
              onClick={() => setShowEditNOte(0)}
              className="bg-white p-1 px-2 rounded-md border-2 border-green"
            >
              <FaBackspace className="text-2xl text-green"></FaBackspace>
            </div>
          </div>
          <div>
            <form onSubmit={handelNote} className="space-y-2 font-hindi">
              <label className="block">
                <span className=" block font-semibold text-slate-700">
                  Notes
                </span>
                <textarea
                  rows={18}
                  type="text"
                  name="note"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                  defaultValue={noteText}
                />
              </label>
              <div className="flex justify-end mt-5 items-center">
                <input
                  type="submit"
                  className="text-xl font-bold text-green py-1 px-3 bg-green rounded border-2 border-green bg-opacity-20"
                  value="Done!"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <div className="font-hindi mx-1 p-2 shadow-md rounded-sm bg-black bg-opacity-5 backdrop-blur-sm">
      <h1 className="text-lg font-semibold">{bookName}</h1>
      <div className="flex justify-between items-center mt-1">
        <div>
          <p className="text-xs font-semibold">{author}</p>
          <p className="font-medium text-xs">{pub}</p>
          <p className="font-medium text-xs text-green">{cat}</p>
        </div>
        <div>
          <button
            onClick={() => setNote(1)}
            className={`${
              i ? "text-green bg-green" : "text-violet-900 bg-violet-900"
            } bg-opacity-10 text-xl rounded-sm p-1 font-semibold mr-1`}
          >
            <MdNote></MdNote>
          </button>
          <button
            onClick={deleteToast}
            className={`text-red-700 bg-red-700 bg-opacity-10 text-xl rounded-sm p-1 font-semibold mr-1`}
          >
            <MdDelete></MdDelete>
          </button>
        </div>
      </div>
      <div
        className={`${
          showNote ? "block" : "hidden"
        }  p-2 bg-black/20 backdrop-blur-lg mt-4 rounded shadow-2xl`}
      >
        <div className="p-3 rounded-md bg-gray">
          <div className="flex justify-between items-center my-1 mb-3 border-b-2 pb-2 rounded-b border-slate-400">
            <div className="flex justify-center items-center">
              <img
                src={user?.photoURL}
                className="w-7 rounded-full mx-1 mr-3 border-2 border-green"
              />
              <h1 className="font-medium">{bookName}</h1>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowEditNOte(1);
                  setNote(0);
                }}
                className={`${
                  i ? "text-green bg-green" : "text-violet-900 bg-violet-900"
                } bg-opacity-10 text-xl rounded-sm p-1 font-semibold mr-1`}
              >
                <MdEditSquare></MdEditSquare>
              </button>
              <button
                onClick={() => setNote(0)}
                className={`text-red-700 bg-red-700 bg-opacity-10 text-xl rounded-sm p-1 font-semibold mr-1`}
              >
                <IoMdCloseCircle></IoMdCloseCircle>
              </button>
            </div>
          </div>
          <p className="font-medium">{noteText}</p>
        </div>
      </div>
      {editNote}
    </div>
  );
};

export default ReadCard;
