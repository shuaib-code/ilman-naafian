import { MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex-row justify-center items-center p-8 bg-violet-800 bg-opacity-5 rounded-sm">
        <div className="flex justify-center items-center">
          <MdError className="text-[100px] text-center text-violet-800"></MdError>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-green font-slab text-lg font-semibold mt-4 px-3 py-0.5 bg-green bg-opacity-10 rounded-sm"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
