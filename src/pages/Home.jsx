import React, { useEffect } from "react";
import { toast } from "react-toastify";
import useTemplates from "../hooks/useTemplates";
import { PuffLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const {
    data: templates,
    isError: templatesError,
    isLoading: templatesIsloading,
    refetch: templatesRefetch,
  } = useTemplates();
  return (
    <div className="w-full py-10 px-10">
      <div className="w-full px-10 flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-semibold w-1/2 tracking-wider text-center font-sans mb-8">
          Easy and Free Online Resume Builder
        </h1>
        <p className="w-2/3 text-center text-xl">
          Create your resume in minutes with ResumeWiz free resume builder.
          Download it to your computer or use it to apply for any job.
        </p>
      </div>
      <div className="w-full px-10 flex flex-col items-center justify-center py-10">
        <span>Ready to start?</span>
        <button
          type="button"
          onClick={() => navigate("/resume")}
          className="py-2 px-3 bg-blue-500 text-white mt-3 rounded-md hover:bg-blue-800 mb-10"
        >
          Build Your Free Resume
        </button>
      </div>

      <section className="grid place-content-center mb-10">
        <h2 className="font-heading mb-8 text-2xl font-bold lg:text-3xl">
          How does ResumeWiz resume builder work?
        </h2>

        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-800 "
                >
                  <path d="M12 5l0 14"></path>
                  <path d="M18 13l-6 6"></path>
                  <path d="M6 13l6 6"></path>
                </svg>
              </div>
            </div>
            <div className="h-full w-px bg-gray-300 "></div>
          </div>
          <div className="pt-1 pb-8">
            <p className="mb-2 text-xl font-bold text-gray-900 ">Build</p>
            <p className="text-gray-600 ">
              Build a resume using our expert tips and advice or get a head
              start by uploading an existing resume.
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-800"
                >
                  <path d="M12 5l0 14"></path>
                  <path d="M18 13l-6 6"></path>
                  <path d="M6 13l6 6"></path>
                </svg>
              </div>
            </div>
            <div className="h-full w-px bg-gray-300 "></div>
          </div>
          <div className="pt-1 pb-8">
            <p className="mb-2 text-xl font-bold text-gray-900">
              Select a Template
            </p>
            <p className="text-gray-600">
              Choose a professional and visually appealing template or layout
              that suits your industry and personal style.
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-800 "
                >
                  <path d="M12 5l0 14"></path>
                  <path d="M18 13l-6 6"></path>
                  <path d="M6 13l6 6"></path>
                </svg>
              </div>
            </div>
            <div className="h-full w-px bg-gray-300 "></div>
          </div>
          <div className="pt-1 pb-8">
            <p className="mb-2 text-xl font-bold text-gray-900 ">
              Customize and Format
            </p>
            <p className="text-gray-600">
              Customize the formatting of your resume, including font styles and
              layout elements.
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white "
                >
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="pt-1 ">
            <p className="mb-2 text-xl font-bold text-gray-900">Ready!</p>
            <p className="text-gray-600">
              download or export it in a common file format such as PDF or
              PNG/JPEG.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 grid place-content-center">
        <h1 className="text-3xl text-center font-semibold tracking-wider">
          Featured resume templates
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="w-full col-span-1 flex items-center justify-center flex-col">
            <div className="px-10">
              <h2 className="text-2xl font-semibold py-5">Classic</h2>
              <p className="text-lg py-2">
                An excellent choice for those with an extensive work history and
                clear career trajectory
              </p>
              <button
                onClick={() =>
                  navigate(`/resume/Template2?TemplateId=1711963825365`)
                }
                className="bg-yellow-500 py-2 px-3 rounded-md mt-5 hover:bg-yellow-400"
              >
                Start with this template
              </button>
            </div>
          </div>

          <div className="w-full col-span-1">
            {templatesIsloading ? (
              <React.Fragment>
                <div className="w-full h-[500px] flex items-center justify-center">
                  <PuffLoader color="#EC2A00" size={40} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="py-8 px-16">
                  {templates &&
                    templates
                      .filter((template) => template.title.includes("classic"))
                      .map((filteredData) => (
                        <div
                          key={filteredData?._id}
                          className="px-8 h-[500px] py-8 bg-yellow-50"
                        >
                          <img
                            src={filteredData?.imageUrl}
                            className="w-full h-full object-contain"
                          ></img>
                        </div>
                      ))}
                </div>
              </React.Fragment>
            )}
          </div>

          <div className="w-full col-span-1">
            {templatesIsloading ? (
              <React.Fragment>
                <div className="w-full h-[500px] flex items-center justify-center">
                  <PuffLoader color="#EC2A00" size={40} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="py-8 px-16">
                  {templates &&
                    templates
                      .filter((template) => template.title.includes("modern"))
                      .map((filteredData) => (
                        <div
                          key={filteredData?._id}
                          className="px-8 h-[500px] py-8 bg-yellow-50"
                        >
                          <img
                            src={filteredData?.imageUrl}
                            className="w-full h-full object-contain"
                          ></img>
                        </div>
                      ))}
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="w-full col-span-1 flex items-center justify-center flex-col">
            <div className="px-10">
              <h2 className="text-2xl font-semibold py-5">Modern</h2>
              <p className="text-lg py-2">
                An excellent choice for those with an extensive work history and
                clear career trajectory
              </p>
              <button
                onClick={() =>
                  navigate(`/resume/Template1?TemplateId=1711904101039`)
                }
                className="bg-yellow-500 py-2 px-3 rounded-md mt-5 hover:bg-yellow-400"
              >
                Start with this template
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full px-10 flex flex-col items-center justify-center py-5">
          <h1 className="text-4xl font-semibold tracking-wider text-center font-sans mb-8">
            Jump start your resume with resume templates
          </h1>
          <p className="w-2/3 text-center text-xl">
            Don’t create your resume from scratch. Use one of our proven resume
            templates and kick start your search from the beginning.
          </p>
        </div>
        <div className="w-full px-10 flex flex-col items-center justify-center py-5">
          <button
            type="button"
            onClick={() => navigate("/resume")}
            className="py-2 px-3 bg-blue-500 text-white mt-3 rounded-md hover:bg-blue-800 mb-10"
          >
            Build a resume with a template
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
