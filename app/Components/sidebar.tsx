import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
type Props = {};

const Sidebar = (props: Props) => {
  const [layer, setLayer] = useState(10);
  const [channel, setChannel] = useState(10);
  const [octaves, setOctaves] = useState(10);
  const [iterations, setIterations] = useState(10);

  const [isImage, setIsImage] = useState(false);
  const [imageURL, setImageURL] = useState<string>("");
  const [image, setImage] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formdata = new FormData();
    console.log(image);
    formdata.append("file", image);
    formdata.append("type", "image/jpeg");
    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    };

    axios
      .post("http://127.0.0.1:8000/images", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          toast("Image Uploaded Successfully!");
          console.log("Image Uploaded Successfully!");
          //"dear user, please check etc..."
        }
      })
      .catch(function (error) {
        () => toast("Image Uploaded UnSuccessfully!");
      });
  };

  const handleGetOutput = async () => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/out", {
          layers: layer,
          channel: channel,
          octaves: octaves,
          iterations: iterations,
        });
        console.log(response.data);
        if(response.data.message == "Success"){
          toast("Image Converted Successfully! Wait for a while to see the result");
        }

        // setoImage(response.data)
      } catch (error) {
        console.error(error);
        toast("Image UnSuccessfully Converted! Try Changing the parameters and retrying");
      }
    };

    fetchData();
  };

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 lg-[35%] m:w-[80%]  h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-6 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Deep Dreamer
          </span>
          {/* <button onClick={() => toast("Check is /*-!")}>
            Toast checker
          </button> */}

          <div className="mt-4">
            <h4 className="mb-4  text-sm font-semibold text-gray-600 dark:text-gray-300">
              Image Upload
            </h4>
            {isImage ? (
              <>
                {" "}
                <button
                  className="py-2 px-4 shadow-md no-underline rounded-full bg-white hover:bg-black text-black  hover:text-white  font-sans font-semibold text-sm border-orange btn-primary hover:bg-orange-light focus:outline-none active:shadow-none mr-2"
                  onClick={() => setIsImage(false)}
                >
                  Choose Different Image
                </button>{" "}
                <button
                  className="py-2 px-4 shadow-md no-underline rounded-full bg-white hover:bg-black hover:text-white text-black font-sans font-semibold text-sm border-orange btn-primary  hover:bg-orange-light focus:outline-none active:shadow-none mr-2"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <div className="px-12 py-2">
                      <input
                        id="file_input"
                        type="file"
                        accept="image/*"
                        className=""
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                          setImage(e.target.files[0]);
                          setIsImage(true);
                        }}
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}
            <h4 className="mb-4 pt-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
              Layer to Visualize
            </h4>
            <div className="tooltip w-full" data-tip={layer}>
              <input
                type="range"
                min="0"
                max="58"
                value={layer}
                onChange={(e) => setLayer(e.target.value)}
                className="range range-xs"
              />
            </div>
            <div className="flex justify-between">
              <span>0</span> <span>58</span>
            </div>
            <h4 className="mb-4 text-sm font-semibold pt-4 text-gray-600 dark:text-gray-300">
              Channel to Visualize
            </h4>
            <div className="tooltip w-full" data-tip={channel}>
              <input
                type="range"
                min="0"
                max="127"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="range range-xs"
              />
            </div>
            <div className="flex justify-between">
              <span>0</span> <span>127</span>
            </div>

            <h4 className="mb-4 text-sm  pt-4 font-semibold text-gray-600 dark:text-gray-300">
              Octaves
            </h4>
            <div className="tooltip w-full " data-tip={octaves}>
              <input
                type="range"
                min="1"
                max="30"
                value={octaves}
                onChange={(e) => setOctaves(e.target.value)}
                className="range range-xs"
              />
            </div>
            <div className="flex justify-between">
              <span>1</span> <span>30</span>
            </div>

            <h4 className="mb-4 text-sm  pt-4 font-semibold text-gray-600 dark:text-gray-300">
              Iterations Per Octave
            </h4>
            <div className="tooltip w-full " data-tip={iterations}>
              <input
                type="range"
                min="1"
                max="30"
                value={iterations}
                onChange={(e) => setIterations(e.target.value)}
                className="range range-xs"
              />
            </div>
            <div className="flex justify-between">
              <span>1</span> <span>30</span>
            </div>
          </div>
          <div className="mx-20 mt-2	">
            <button
              onClick={() => handleGetOutput()}
              className=" bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 border-b-4 border-black hover:border-gray-500 rounded"
            >
              Get Output
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
