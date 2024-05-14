import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  getTemplateDetails,
  saveToCollections,
  saveToFavourites,
} from "../api";
import MainSpinner from "./MainSpinner";
import { FaHeart, FaHouse } from "react-icons/fa6";
import useUser from "../hooks/useUser";
import {
  BiFolderPlus,
  BiHeart,
  BiSolidFolderMinus,
  BiSolidHeart,
} from "react-icons/bi";
import TemplateDesignPin from "./TemplateDesignPin";
import useTemplates from "../hooks/useTemplates";
import { AnimatePresence } from "framer-motion";

function TemplateDesignPinDetails() {
  const { templateId } = useParams();
  const {
    data: templates,
    isLoading: templateLoading,
    refetch: templateRefetch,
  } = useTemplates();
  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateId],
    () => getTemplateDetails(templateId)
  );

  const { data: user, refetch: userRefetch } = useUser();

  async function addToCollection(e) {
    e.stopPropagation();
    await saveToCollections(user, data);
    userRefetch();
  }
  async function addToFavourite(e) {
    e.stopPropagation();
    await saveToFavourites(user, data);
    refetch();
  }

  if (isLoading) return <MainSpinner />;
  if (isError)
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl">
          Error While Fetching the data. please Try Again...
        </p>
      </div>
    );
  return (
    <div className="w-full flex justify-start items-center flex-col px-6 py-12">
      <div className="w-full flex items-center gap-2 mb-8">
        <Link
          to={"/"}
          className="flex items-center justify-center gap-2 text-gray-600"
        >
          <FaHouse />
          Home
        </Link>
        <p>/</p>
        <Link
          to={"/resume"}
          className="flex items-center justify-center gap-2 text-gray-600"
        >
          resume
        </Link>
        <p>/</p>
        <p>{data?.name}</p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="col-span-1 lg:col-span-8 flex flex-col justify-start">
          <div className="bg-gray-200 px-8 py-8">
            <img src={data?.imageUrl} className="w-full h-auto object-cover" />
          </div>
          <div className="w-full flex items-center justify-between px-2 py-5">
            <p className="">
              Template Name :{" "}
              <span className=" font-semibold uppercase">{data?.title}</span>
            </p>
            <div className="flex justify-end items-center gap-2">
              <FaHeart className="text-red-500" /> {data?.favourites?.length}{" "}
              likes
            </div>
          </div>
          <div className="w-full flex items-center justify-start px-2 gap-5">
            {user?.collections?.includes(data?._id) ? (
              <React.Fragment>
                <div
                  onClick={addToCollection}
                  className="border-2 rounded py-1 px-2 flex items-center gap-2 text-gray-500 justify-center cursor-pointer"
                >
                  Remove from collection
                  <BiSolidFolderMinus />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div
                  onClick={addToCollection}
                  className="border-2 rounded py-1 px-2 flex items-center gap-2 text-gray-500 justify-center cursor-pointer"
                >
                  Add to collection
                  <BiFolderPlus />
                </div>
              </React.Fragment>
            )}
            {data?.favourites?.includes(user?.uid) ? (
              <React.Fragment>
                <div
                  onClick={addToFavourite}
                  className="border-2 rounded py-1 px-2 flex items-center gap-2 text-gray-500 justify-center cursor-pointer"
                >
                  Remove from favourite
                  <BiSolidHeart />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div
                  onClick={addToFavourite}
                  className="border-2 rounded py-1 px-2 flex items-center gap-2 text-gray-500 justify-center cursor-pointer"
                >
                  Add to favourite
                  <BiHeart />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div
            className="w-full h-56 flex flex-col justify-center items-center relative"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/18015848/pexels-photo-18015848/free-photo-of-green-leaves-of-bush.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
              <Link
                to={"/resume"}
                className="text-white border p-2 hover:backdrop-blur-sm"
              >
                Discover More
              </Link>
            </div>
          </div>
          {user && (
            <Link
              to={`/resume/${data?.name}?TemplateId=${templateId}`}
              className="w-full bg-emerald-600 hover:bg-emerald-800
               px-4 py-2 flex justify-center mt-2 text-gray-100"
            >
              Edit This Templates
            </Link>
          )}
        </div>
      </div>
      {templates?.filter((temp) => temp?._id !== data?._id)?.length > 0 && (
        <div className="w-full py-5 mt-5">
          <p className="text-lg font-semibold">You might also look like</p>
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-8 gap-2 py-8">
            <React.Fragment>
              <AnimatePresence>
                {templates
                  ?.filter((temp) => temp?._id !== data?._id)
                  .map((template, index) => (
                    <TemplateDesignPin
                      key={template?._id}
                      data={template}
                      index={index}
                    />
                  ))}
              </AnimatePresence>
            </React.Fragment>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateDesignPinDetails;
