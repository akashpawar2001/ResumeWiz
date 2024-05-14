import React from "react";
import useTemplates from "../hooks/useTemplates";
import MainSpinner from "../components/MainSpinner";
import { PuffLoader } from "react-spinners";
import { AnimatePresence } from "framer-motion";
import { TemplateDesignPin } from "../components";

function Resumes() {
  const {
    data: templates,
    isError: templatesError,
    isLoading: templatesIsloading,
    refetch: templatesRefetch,
  } = useTemplates();
  if (templatesIsloading) return <MainSpinner />;
  return (
    <div className="w-full h-full px-6 py-5 grid grid-cols-4 2xl:grid-cols-8 gap-8">
      {templatesError ? (
        <React.Fragment>
          <p className="text-lg text-black">
            Something Went Wrong. Please Try Again...
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <RenderATemplate templates={templates} />
        </React.Fragment>
      )}
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
export default Resumes;
