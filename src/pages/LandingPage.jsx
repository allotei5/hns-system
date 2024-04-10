import React, { useEffect, useState } from "react";
import undrawMedicine from "../assets/undraw_medicine_b-1-ol.svg";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  useEffect(() => {
    const myJsonString = localStorage.getItem("auth");
    // Deserialize the string back into a JSON object
    // const myJsonObject = JSON.parse(myJsonString);
    if (myJsonString != "") {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen content-center gap-3">
      <div className=" grid justify-self-center lg:w-8/12">
        <img
          src={undrawMedicine}
          alt="Illustration of two doctors"
          className=""
        />
      </div>
      <div className="grid content-center">
        <h1 className="font-semibold text-2xl md:text-5xl">
          Hearing & Speech Nova Scotia
        </h1>
        <p className="text-xl mt-2 mb-5">Client Consent Platform</p>
        <div className="inline-flex">
          {showLogin ? (
            <LoginModal />
          ) : (
            <div>
              <Link
                to="/consent-list"
                className="border border-1 py-3 px-2 md:px-6 rounded border-[#851B56] bg-[#851B56] text-white mr-3"
              >
                Client Login
              </Link>
              <Link
                to="/consents"
                className="border border-1 py-3 px-2 md:px-6 rounded border-[#851B56] bg-[#fff] text-[#851B56]"
              >
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
