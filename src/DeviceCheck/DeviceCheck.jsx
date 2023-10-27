import { FcMultipleDevices } from "react-icons/fc";

const DeviceCheck = ({ children }) => {
  const width = window.innerWidth;
  const error = (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/2 p-7 shadow rounded-2xl">
          <div className="flex justify-center items-center">
            <FcMultipleDevices className="text-9xl"></FcMultipleDevices>
          </div>
          <div>
            <h1 className="text-slate-700 font-semibold text-center">
              This Website is not compitable with your device. Please, use
              mobile phone instead.
            </h1>
          </div>
        </div>
      </div>
    </>
  );

  return width > 501 ? error : children;
};

export default DeviceCheck;
