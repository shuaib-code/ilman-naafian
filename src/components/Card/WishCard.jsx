import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaBackspace } from "react-icons/fa";

const WishCard = ({ book, id, updateUI }) => {
  const [readForm, setReadForm] = useState(0);
  const { bookName, author, pub, cat, islamic, _id } = book;
  const i = parseInt(islamic);
  const handelForm = (e) => {
    e.preventDefault();
    setReadForm(0);
    const url = e.target.url.value;
    const book = { bookName, author, pub, cat, url };
    axios
      .post(
        "https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app/collect",
        book
      )
      .then((d) => {
        if (d.data.insertedId) {
          toast.success(`Welcome for collecting ${bookName}`);
          axios
            .delete(
              `https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app/wishlist/${_id}`
            )
            .then((d) => {
              if (d.data.deletedCount > 0) {
                updateUI(_id);
              }
            });
        }
      });
  };
  const addReadForm = (
    <>
      <div
        className={`${
          readForm ? "block" : "hidden"
        } mt-4 p-3 bg-gray bg-opacity-100 rounded-md`}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-green">Give me URL</h1>
          <div
            onClick={() => setReadForm(0)}
            className="bg-white p-1 px-2 rounded-md border-2 border-green"
          >
            <FaBackspace className="text-2xl text-green"></FaBackspace>
          </div>
        </div>
        <div>
          <form onSubmit={handelForm} className="space-y-2">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-semibold text-slate-700">
                URL of the book
              </span>
              <input
                type="text"
                name="url"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                placeholder="Steal URL from Wafilife..."
                required
              />
            </label>
            <div className="flex justify-end pt-2 items-center">
              <input
                type="submit"
                className="text-lg font-semibold text-green py-0.5 px-3 bg-green rounded border-2 border-green bg-opacity-20"
                value="Collect"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  return (
    <div className="font-hindi relative mx-1 p-2 shadow-md rounded-sm bg-black bg-opacity-5 backdrop-blur-sm">
      <h1 className="text-lg font-semibold">{bookName}</h1>
      <div className="flex justify-between items-center mt-1">
        <div>
          <p className="text-xs font-semibold">{author}</p>
          <p className="font-medium text-xs">{pub}</p>
          <p className="font-medium text-xs text-green">{cat}</p>
        </div>
        <button
          onClick={() => setReadForm(1)}
          className={`${
            i ? "text-green bg-green" : "text-violet-900 bg-violet-900"
          } bg-opacity-10 text-lg rounded px-3 font-semibold mr-1`}
        >
          Collect
        </button>
      </div>
      {addReadForm}
    </div>
  );
};

export default WishCard;
