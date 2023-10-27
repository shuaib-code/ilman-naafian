import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBackspace } from "react-icons/fa";
import ReadCard from "../components/Card/ReadCard";

const Read = () => {
  const [readForm, setReadForm] = useState(0);
  const [readList, setReadList] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app/readlist"
      )
      .then((d) => setReadList(d.data));
  }, []);
  const handelForm = (e) => {
    e.preventDefault();
    setReadForm(0);
    const form = e.target;
    const bookName = form.bookName.value;
    const author = form.author.value;
    const pub = form.pub.value;
    const cat = form.cat.value;
    const islamic = form.islamic.value;
    const note = form.note.value;
    const book = { bookName, author, pub, cat, islamic, note };
    axios
      .post(
        "https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app/readlist",
        book
      )
      .then((d) => {
        if (d.data.insertedId) {
          toast.success(`Welcome for completing ${bookName}`);
          setReadList([book, ...readList]);
        }
      });
  };
  const handleReadList = (removeID) => {
    const remaining = readList?.filter((e) => e._id !== removeID);
    setReadList(remaining);
  };
  const addReadForm = (
    <>
      <div className="mx-4 mt-4 mb-9 p-3 bg-gray bg-opacity-100 rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-green">Add read book</h1>
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
                Name of the book
              </span>
              <input
                type="text"
                name="bookName"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                placeholder="Enter your book name..."
                required
              />
            </label>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-semibold text-slate-700">
                Author Name
              </span>
              <input
                type="text"
                name="author"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                placeholder="Enter your book's author name..."
                required
              />
            </label>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-semibold text-slate-700">
                Publication Name
              </span>
              <input
                type="text"
                name="pub"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                placeholder="Enter your book's publication name..."
                required
              />
            </label>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-semibold text-slate-700">
                Catagory
              </span>
              <input
                type="text"
                name="cat"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                placeholder="Enter your book's catagory..."
                required
              />
            </label>
            <label className="flex justify-start items-center my-3">
              <span className="block font-semibold text-slate-700">
                Is it Islamic ?
              </span>
              <select
                className="ml-3 bg-slate-200 p-1 text-lg rounded-sm"
                name="islamic"
                id="islamic"
              >
                <option value="1">Islamic</option>
                <option value="0">Others</option>
              </select>
            </label>
            <label className="block">
              <span className=" block font-semibold text-slate-700">Notes</span>
              <textarea
                type="text"
                name="note"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                placeholder="Your notes..."
              />
            </label>
            <div className="flex justify-end mt-5 items-center">
              <input
                type="submit"
                className="text-xl font-bold text-green py-1 px-3 bg-green rounded border-2 border-green bg-opacity-20"
                value="Submit"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  return (
    <div className="mt-3 px-3">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold text-center">
          You have read
          <span className="text-green text-lg mx-2">{readList?.length}</span>
          books already.
        </h1>
        <button
          onClick={() => setReadForm(1)}
          className="text-sm font-bold text-green py-1 px-2 bg-green rounded border-2 border-green bg-opacity-20"
        >
          Add More
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {readList?.map((e, i) => (
          <ReadCard
            key={e._id}
            book={e}
            id={i}
            handleReadList={handleReadList}
          ></ReadCard>
        ))}
      </div>
      <div
        className={`${
          readForm ? "block" : "hidden"
        } left-0 top-0 right-0 absolute h-screen bg-black/20 backdrop-blur-sm`}
      >
        {addReadForm}
      </div>
    </div>
  );
};

export default Read;
