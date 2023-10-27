import Logo from "./Logo";
import { HiMenu } from "react-icons/hi";
import { FaBackspace } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Nav = () => {
  const [nav, setNav] = useState(false);
  const [readForm, setReadForm] = useState(false);
  const { user, googleSignIn, logOut } = useContext(AuthContext);
  const logout = () => {
    logOut()
      .then(toast.success("Log out successful."), setNav(0))
      .catch((e) => toast.error(e.massage));
  };
  const navlink = (
    <>
      <div className="bg-black bg-opacity-30 px-2 rounded border">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-green" : "text-white")}
        >
          Home
        </NavLink>
      </div>
      <div className="bg-black bg-opacity-30 px-2 rounded border">
        <NavLink
          to="/read"
          className={({ isActive }) => (isActive ? "text-green" : "text-white")}
        >
          Read list
        </NavLink>
      </div>
      <div className="bg-black bg-opacity-30 px-2 rounded border">
        <NavLink
          to="/wishlist"
          className={({ isActive }) => (isActive ? "text-green" : "text-white")}
        >
          Wishlist
        </NavLink>
      </div>
    </>
  );
  const popNav = (
    <div
      className={`${
        nav ? "block" : "hidden"
      } w-screen absolute h-screen z-10 bg-black/20 backdrop-blur-sm`}
    >
      <div className="mx-4 mt-4 mb-9 p-3 bg-black bg-opacity-20 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <Logo></Logo>
          </div>
          <div
            onClick={() => setNav(false)}
            className="bg-white p-1 px-2 rounded-md border-2 border-green"
          >
            <FaBackspace className="text-2xl text-green"></FaBackspace>
          </div>
        </div>
        <div className="mt-5">
          <div>
            <div
              onClick={() => setNav(false)}
              className="flex justify-between text-lg font-medium mx-3"
            >
              {navlink}
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                disabled={
                  user?.email === "shuaib.cyclist@gmail.com" ||
                  user?.email === "tasinoutlook@gmail.com"
                    ? false
                    : true
                }
                onClick={() => setReadForm(1)}
                className="text-lg rounded-3xl text-black font-bold px-6 py-2 bg-green border-2 active:text-white border-slate-800"
              >
                Make Collection
              </button>
            </div>
          </div>
        </div>
        <div className="flex-row justify-between items-center mt-5 p-3 bg-black bg-opacity-40 rounded-lg">
          <div className="flex justify-start items-center">
            <div className="mr-2">
              <img src={user?.photoURL} className="w-9 rounded-md" />
            </div>
            <div className="flex-row justify-between items-center">
              <h1 className="font-medium text-white">{user?.displayName}</h1>
              <p className="text-xs font-normal text-green">{user?.email}</p>
            </div>
          </div>
          <div className="flex justify-end items-center mt-2">
            <button
              onClick={logout}
              className="font-semibold bg-green text-white rounded px-3 py-1"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const logIn = () => {
    googleSignIn()
      .then((r) =>
        toast.success(`${r.user.displayName}, Welcome to Ilman Naafian`)
      )
      .catch((e) => toast.error(e.massage));
  };
  const handelForm = (e) => {
    e.preventDefault();
    setReadForm(0);
    setNav(0);
    const form = e.target;
    const bookName = form.bookName.value;
    const author = form.author.value;
    const pub = form.pub.value;
    const cat = form.cat.value;
    const islamic = form.islamic.value;
    const url = form.url.value;
    const book = { bookName, author, pub, cat, islamic, url };
    console.log(book);
    axios
      .post(
        "https://ilman-naafian-j1vgz4qm4-mohammad-shuaibs-projects.vercel.app/collect",
        book
      )
      .then((d) => {
        if (d.data.insertedId) {
          toast.success(`${bookName} is added to your collection.`);
          window.location.reload();
        }
      });
  };

  const addReadForm = (
    <>
      <div className="mx-4 mt-4 mb-9 p-3 bg-gray bg-opacity-100 rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-green">
            Contribute to your Library
          </h1>
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
                Book photo URL
              </span>
              <input
                type="text"
                name="url"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded focus:ring-1"
                placeholder="Steal URL form Wafilife..."
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
            <div className="flex justify-end mt-5 items-center">
              <input
                type="submit"
                className="text-xl font-bold text-green py-1 px-3 bg-green rounded border-2 border-green bg-opacity-20"
                value="Collect"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  return (
    <div className="flex justify-between">
      <div className="px-2 py-2">
        <Logo></Logo>
      </div>
      <div
        className={`${
          user ? "flex" : "hidden"
        } justify-between items-center gap-1`}
      >
        <div className="rounded-full border-2 border-green">
          <img src={user?.photoURL} className="w-7 rounded-full" />
        </div>
        <div
          onClick={() => setNav(true)}
          className="flex justify-center items-center pl-2 mr-2"
        >
          <HiMenu className="text-3xl bg-green bg-opacity-10 rounded border-2 border-green text-green"></HiMenu>
        </div>
      </div>
      <div
        className={`${
          user ? "hidden" : "flex"
        } justify-center items-center mx-4`}
      >
        <button
          onClick={logIn}
          className="text-lg font-semibold px-3 py-0.5 rounded bg-gray text-green border-2 border-green"
        >
          Log In
        </button>
      </div>
      {popNav}
      <div
        className={`${
          readForm ? "block" : "hidden"
        } left-0 top-0 right-0 z-20 absolute h-screen bg-black/20 backdrop-blur-sm`}
      >
        {addReadForm}
      </div>
    </div>
  );
};

export default Nav;
