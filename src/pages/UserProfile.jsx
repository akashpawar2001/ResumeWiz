import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import useTemplates from "../hooks/useTemplates";
import { AnimatePresence } from "framer-motion";
import { TemplateDesignPin } from "../components";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getSavedResume } from "../api";
import MainSpinner from "../components/MainSpinner";

function UserProfile() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const {
    data: template,
    isLoading: templateLoading,
    isError: templateError,
  } = useTemplates();
  const [activeTab, setActiveTab] = useState("collections");

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth", { replace: true });
  //   }
  // });
  const { data: savedResume } = useQuery(["savedResume"], () =>
    getSavedResume(user?.uid)
  );
  if (templateLoading) return <MainSpinner />;
  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <div
        className="w-full bg-gray-200 h-[60vh] flex justify-center items-end relative"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2016/11/23/13/40/iphone-1852901_1280.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {user?.photoURL ? (
          <React.Fragment>
            <div className="bg-white w-[150px] h-[150px] rounded-full absolute -bottom-20 overflow-hidden flex justify-center items-center">
              <img
                src={user?.photoURL}
                className="w-full h-full object-cover"
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="bg-white w-[150px] h-[150px] rounded-full absolute -bottom-24 overflow-hidden flex justify-center items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9MYWM3-ZWxEuwecaMxLzaNGwbBDxrPIk-S69Ly6K8RQ&s"
                className="w-full h-full object-cover"
              />
            </div>
          </React.Fragment>
        )}
      </div>
      <p className="py-10 mt-20 text-xl font-semibold">{user?.displayName}</p>
      <div className="flex justify-center items-center gap-5">
        <button
          onClick={() => {
            setActiveTab("collections");
          }}
          className={`relative duration-300 py-2 px-4 border-2 rounded-lg hover:bg-gray-200 ${
            activeTab === "collections" && "text-sky-600 shadow-sm"
          }`}
        >
          Collections
          <span className="absolute bg-blue-500 text-blue-100 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3">
            {user?.collections?.length > 0 ? user?.collections?.length : 0}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab("mysaved");
          }}
          className={`relative  duration-300 py-2 px-4 border-2 rounded-lg hover:bg-gray-200 ${
            activeTab === "mysaved" && "text-sky-600 shadow-sm"
          }`}
        >
          My Resume
        </button>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 py-8 gap-5 px-8">
        <AnimatePresence>
          {activeTab === "collections" && (
            <React.Fragment>
              {user?.collections?.length > 0 && user?.collections ? (
                <React.Fragment>
                  <RenderATemplate
                    templates={template?.filter((temp) =>
                      user?.collections?.includes(temp?._id)
                    )}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="w-full h-[60vh] flex justify-center items-center col-span-12">
                    <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=338&ext=jpg&ga=GA1.1.1887574231.1711843200&semt=ais" />
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </AnimatePresence>
        {/* My Saved Resume section */}
        <AnimatePresence>
          {activeTab === "mysaved" && (
            <React.Fragment>
              {savedResume?.length > 0 && savedResume ? (
                <React.Fragment>
                  <RenderATemplate templates={savedResume} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="w-full h-[60vh] flex justify-center items-center col-span-12">
                    <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=338&ext=jpg&ga=GA1.1.1887574231.1711843200&semt=ais" />
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const RenderATemplate = ({ templates }) => {
  return (
    <React.Fragment>
      {templates && templates.length > 0 ? (
        <React.Fragment>
          <AnimatePresence>
            {templates &&
              templates.map((template, index) => (
                <TemplateDesignPin
                  key={template?._id}
                  data={template}
                  index={index}
                />
              ))}
          </AnimatePresence>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="w-full h-screen col-span-12 flex flex-col items-center justify-center">
            <PuffLoader color="#EC2A00" size={40} />
            No Data
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default UserProfile;
