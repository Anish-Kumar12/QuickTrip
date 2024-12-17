import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelref = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);

  const submithandler = (e) => {
    e.preventDefault();
    console.log(pickUp, destination);
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelref.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelref.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://th.bing.com/th/id/OIP.Ait2P0IoB2I1wCLskLuvsQHaFw?rs=1&pid=ImgDetMain"
          alt=""
        />
      </div>
      <div className="flex flex-col h-screen justify-end top-0 w-full absolute">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => submithandler(e)}>
            <div className="line absolute h-16 w-1 top-[31.5%] left-10 bg-gray-800 rounded-full"></div>
            <input
              type="text"
              value={pickUp}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              placeholder="Add a pick up location"
              onChange={(e) => setPickUp(e.target.value)}
              onClick={() => setPanelOpen(true)}
            />
            <input
              type="text"
              value={destination}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              placeholder="Enter your destination"
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelOpen(true)}
            />
          </form>
        </div>
        <div ref={panelref} className="h-0 bg-white overflow-hidden">
          <LocationSearchPanel />
        </div>
      </div>
      <div className="fixed z-10 bottom-0 px-3 py-10 pt-12 bg-white w-full">
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
      <div className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-between'>
        <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹198.4</h2>
    </div>
    <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
        <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
        <div className='-ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>3 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹100</h2>
    </div>
    <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-between'>
        <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>3 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹32.3</h2>
    </div>
       </div>
    </div>
  );
};

export default Home;
