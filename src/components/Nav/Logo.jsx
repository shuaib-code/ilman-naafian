import { FaBookOpen } from "react-icons/fa";
const Logo = () => {
  return (
    <div className="flex justify-center items-center border-2 border-green rounded bg-white">
      <FaBookOpen className="text-xl text-green mx-2"></FaBookOpen>
      <h1 className="bg-green py-0.5 px-2 text-white font-hindi font-medium">
        ইলমান নাফিআন
      </h1>
    </div>
  );
};

export default Logo;
