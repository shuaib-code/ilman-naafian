import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";

const Root = () => {
  return (
    <div className="relative font-slab bg-yellow bg-no-repeat bg-fixed bg-cover bg-[url('https://template.winnertheme.com/encox/img/background/bg4.png')]">
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
      <div className="text-base font-medium font-hindi">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Root;
