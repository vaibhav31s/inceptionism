"use client";
import React, { useState , useEffect} from "react";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {};
interface oimageSend {
layer: number;
channel: number;
octaves: number;
iterations: number;
}
import 'flowbite'
import Sidebar from "./Components/sidebar";
const  deepDream = (props: Props) => {

  const [oimage, setoImage] = useState(null);
  const [iimage, setiImage] = useState(null);
  

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/image', {
          responseType: 'arraybuffer'
        })
        setiImage(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()     
    const intervalId = setInterval(fetchData, 5000)
   
    
  
    return () => clearInterval(intervalId)
    
  }, [])

  useEffect(() => {
    const fetchOutput = async () => {
      try{
        const res = await axios.get('http://127.0.0.1:8000/out', {
            responseType: 'arraybuffer'
          })
          
          setoImage(res.data)
      }catch(error){
        console.error(error)
  
        }
      }
      fetchOutput()
      
    const outputInterval = setInterval(fetchOutput, 10000)
      return () => clearInterval(outputInterval)
    }, [])
  

  
  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <Sidebar />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <div className="p-4 sm:ml-96">
     
        <div>
          <h1 className="text-center justify-start font-bold text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-black">Current Image</h1>
          
          <div className="m-2  rounded-2xl p-2">
          {iimage ? (
        <img   className="h-auto max-w-lg mx-auto rounded-xl h-[400px] w-[600px]"   src={URL.createObjectURL(new Blob([iimage], { type: 'image/jpeg' }))} />
      ) : (
        <p>Loading...</p>
      )}
          </div>
        </div>
        <div>
          <h1 className="text-center font-bold text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-black">Output Image</h1>
          <div className="m-2 rounded-2xl p-2">
              {oimage ? (
            <img   className="h-auto max-w-lg mx-auto rounded-xl h-[400px] w-[600px]"   src={URL.createObjectURL(new Blob([oimage], { type: 'image/jpeg' }))} />
          ) : (
            <p>Loading...</p>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default deepDream;
