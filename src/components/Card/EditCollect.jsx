import axios from "axios";
import toast from "react-hot-toast";
import { FaBackspace } from "react-icons/fa";

const EditCollect = ({ book, setShowEditCollectForm, show, id }) => {
  const { bookName, author, pub, cat, _id, url } = book;
  const handelForm = (e) => {
    e.preventDefault();
    setShowEditCollectForm(0);
    const form = e.target;
    const bookName = form.bookName.value;
    const author = form.author.value;
    const pub = form.pub.value;
    const cat = form.cat.value;
    const url = form.url.value;
    const book = { bookName, author, pub, cat, url };
    axios
      .put(
        `https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app/collect/${_id}`,
        book
      )
      .then((d) => {
        d.data.modifiedCount > 0 &&
          toast.success(`Modification of ${bookName} is successful.`);
        !d.data.modifiedCount && toast.error("You did not modified anything.");
      });
  };
  const addReadForm = (
    <>
      <div className="mx-4 mt-4 mb-9 p-3 bg-gray bg-opacity-100 rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-green">
            Edit your <span className="text-black">{id + 1}</span> number book
          </h1>
          <div
            onClick={() => setShowEditCollectForm(0)}
            className="bg-white p-1 px-2 rounded-md border-2 border-green"
          >
            <FaBackspace className="text-2xl text-green"></FaBackspace>
          </div>
        </div>
        <div>
          <form onSubmit={handelForm} className="space-y-2 font-hindi">
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
                defaultValue={bookName}
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
                defaultValue={author}
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
                defaultValue={pub}
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
                defaultValue={cat}
              />
            </label>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-semibold text-slate-700">
                URL of the book
              </span>
              <input
                type="text"
                name="url"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                placeholder="Steal URL form Wafilife..."
                required
                defaultValue={url}
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
    </>
  );
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } left-0 top-0 right-0 absolute z-10 h-screen bg-black/20 backdrop-blur-sm`}
    >
      {addReadForm}
    </div>
  );
};

export default EditCollect;
