import React, { useEffect, useRef, useState } from "react";
import MainSpinner from "../MainSpinner";
import { useQuery } from "react-query";
import useUser from "../../hooks/useUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase.config";
import { getTemplateDetailEditByUser } from "../../api";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { CiLink } from "react-icons/ci";

import {
  FaHouse,
  FaTrash,
  FaPenToSquare,
  FaPencil,
  FaPlus,
} from "react-icons/fa6";
import { BiSolidBookmarks } from "react-icons/bi";
import {
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeJpg,
  BsFiletypeSvg,
} from "react-icons/bs";

import { AnimatePresence, motion } from "framer-motion";
import { FadeInOutWIthOpacity, opacityINOut } from "../../animations";
import useTemplates from "../../hooks/useTemplates";

const Template5 = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const templateName = pathname?.split("/")?.slice(-1)[0];
  const searchParams = new URLSearchParams(location.search);
  const loadedTemplateId = searchParams.get("TemplateId");
  // console.log(templateName);

  const [isEdit, setIsEdit] = useState(false);
  const { data: user } = useUser();

  const resumeRef = useRef(null);

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    imageUrl: null,
  });

  const {
    data: resumeData,
    isLoading: resume_isLoading,
    isError: resume_isError,
    refetch: refetch_resumeData,
  } = useQuery(["templateEditedByUser", `${templateName}-${user?.uid}`], () =>
    getTemplateDetailEditByUser(user?.uid, `${templateName}-${user?.uid}`)
  );

  const [formData, setFormData] = useState({
    fullname: "Karen Richards",
    professionalTitle: "Professional Title",
    personalDescription: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alia minus est culpa id corrupti nobis ullam harum, porro veniam facilis, obcaecati nulla magnam beatae quae at eos! Qui, similique laboriosam?`,
    mobile: "+91 0000-0000",
    email: "urname@gmail.com",
    website: "urwebsite.com",
    address: "your street address, ss, street, city/zip code - 1234",
  });

  const [projects, setProjects] = useState([
    {
      title: "L/A Accessions Process Improvement",
      prrojectLink: "www.google.com",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
    {
      title: "Optimizing Value  Added Consortium",
      prrojectLink: "www.google.com",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
    },
  ]);

  const [skills, setSkills] = useState([
    {
      title: "skill1",
      percentage: "75",
    },
    {
      title: "skill2",
      percentage: "75",
    },
    {
      title: "skill3",
      percentage: "75",
    },
    {
      title: "skill4",
      percentage: "75",
    },
    {
      title: "skill5",
      percentage: "75",
    },
  ]);

  const [education, setEducation] = useState([
    {
      major: "ENTER YOUR MAJOR",
      university: "Name of your university / college 2005-2009",
    },
  ]);

  const [certificates, setCertificates] = useState([
    {
      certificateTitle: "ENTER YOUR MAJOR",
      certificateDetails: "Name of your university / college 2005-2009",
      certificateLink: "link",
    },
  ]);
  const handleCertificateChange = (index, e) => {
    const { name, value } = e.target;
    // Create a copy of the workExperiences array
    const updatedCertificate = [...certificates];
    // Update the specific field for the experience at the given index
    updatedCertificate[index][name] = value;
    // Update the state with the modified array
    setCertificates(updatedCertificate);
  };

  const removeCertificates = (index) => {
    const updatedCertificate = [...certificates];
    updatedCertificate.splice(index, 1);
    setCertificates(updatedCertificate);
  };

  const addCertificate = () => {
    toggleEditable();
    toast.info("Adding education please reselect edit to make changes");
    const updatedCertificate = [
      ...certificates,
      {
        certificateTitle: "ENTER YOUR MAJOR",
        certificateDetails: "Name of your university / college 2005-2009",
      },
    ];
    setCertificates(updatedCertificate);
  };

  useEffect(() => {
    if (resumeData?.formData) {
      setFormData({ ...resumeData?.formData });
    }
    if (resumeData?.projects) {
      setProjects(resumeData?.projects);
    }
    if (resumeData?.skills) {
      setSkills(resumeData?.skills);
    }
    if (resumeData?.education) {
      setEducation(resumeData?.education);
    }
    if (resumeData?.certificates) {
      setCertificates(resumeData?.certificates);
    }
    if (resumeData?.userProfilePic) {
      setImageAsset((prevAsset) => ({
        ...prevAsset,
        imageURL: resumeData?.userProfilePic,
      }));
    }
  }, [resumeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEditable = () => {
    setIsEdit(!isEdit);
    var inputs = document.querySelectorAll("input");
    var textarea = document.querySelectorAll("textarea");

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].readOnly = !inputs[i].readOnly;
    }

    for (var i = 0; i < textarea.length; i++) {
      textarea[i].readOnly = !textarea[i].readOnly;
    }
  };

  const handleAutoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleExpChange = (index, e) => {
    const { name, value } = e.target;
    // Create a copy of the workExperiences array
    const updatedProjects = [...projects];
    // Update the specific field for the experience at the given index
    updatedProjects[index][name] = value;
    // Update the state with the modified array
    setProjects(updatedProjects);
  };

  const removeProjects = (index) => {
    // Create a copy of the workExperiences array and remove the experience at the given index
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    // Update the state with the modified array
    setProjects(updatedProjects);
  };

  const addProjects = () => {
    toggleEditable();
    toast.info("Adding education please reselect edit to make changes");
    // Create a copy of the workExperiences array and add a new experience
    const updatedProjects = [
      ...projects,
      {
        title: "Job Position Here",
        prrojectLink: "hello",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis voluptatibus minima tenetur nostrum quo aliquam dolorum incidunt.",
      },
    ];
    // Update the state with the modified array
    setProjects(updatedProjects);
  };

  const handleSkillsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSkills = [...skills];
    updatedSkills[index][name] = value;
    setSkills(updatedSkills);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    toggleEditable();
    toast.info("Adding education please reselect edit to make changes");
    const updatedSkills = [
      ...skills,
      {
        title: "skill1",
        percentage: "75",
      },
    ];
    setSkills(updatedSkills);
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEdu = [...education];
    updatedEdu[index][name] = value;
    setEducation(updatedEdu);
  };

  const removeEducation = (index) => {
    const updatedEdu = [...education];
    updatedEdu.splice(index, 1);
    setEducation(updatedEdu);
  };

  const addEducation = () => {
    toggleEditable();
    toast.info("Adding education please reselect edit to make changes");
    const updatedEdu = [
      ...education,
      {
        major: "ENTER YOUR MAJOR",
        university: "Name of your university / college 2005-2009",
      },
    ];
    setEducation(updatedEdu);
  };

  const saveFormData = async () => {
    const timeStamp = serverTimestamp();
    const resume_id = `${templateName}-${user?.uid}`;
    const imageUrl = await getImage();
    const _doc = {
      _id: loadedTemplateId,
      resume_id,
      formData,
      education,
      projects,
      skills,
      certificates,
      timeStamp,
      imageUrl,
    };
    console.log(_doc);
    setDoc(doc(db, "users", user?.uid, "resumes", resume_id), _doc)
      .then(() => {
        toast.success(`Data Saved`);
        refetch_resumeData();
      })
      .catch((err) => {
        toast.error(`Error : ${err.message}`);
      });
  };

  const getImage = async () => {
    const element = resumeRef.current;
    element.onload = async () => {
      // Call the image capture code here
    };
    element.onerror = (error) => {
      console.error("Image loading error:", error);
    };
    if (!element) {
      console.error("Unable to capture content. The DOM element is null.");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toJpeg(element);
      console.log(dataUrl);
      return dataUrl;
    } catch (error) {
      console.error("Oops, something went wrong!", error.message);
      return null; // Return a default value or handle the error appropriately
    }
  };

  const generatePDF = useReactToPrint({
    content: () => resumeRef.current,
  });

  const generateImage = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("unable To Capture the content at a moment");
      return;
    }
    htmlToImage.toJpeg(element).then((dataUrl) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "resume.jpeg";
      a.click();
    });
  };

  const generatePng = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("unable To Capture the content at a moment");
      return;
    }
    htmlToImage.toPng(element).then((dataUrl) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "resume.png";
      a.click();
    });
  };

  const generateSvg = async () => {
    const element = resumeRef.current;
    if (!element) {
      toast.info("unable To Capture the content at a moment");
      return;
    }
    htmlToImage.toSvg(element).then((dataUrl) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "resume.svg";
      a.click();
    });
  };

  if (resume_isLoading) return <MainSpinner />;

  if (resume_isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <p className="text-lg text-txtPrimary font-semibold">
          Error While fetching the data
        </p>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-start gap-4">
      {/* bread crump */}
      <div className="w-full flex items-center gap-2 px-4">
        <Link
          to={"/"}
          className="flex items-center justify-center gap-2 text-txtPrimary"
        >
          <FaHouse />
          Home
        </Link>
        <Link
          to={"/resume"}
          className="flex items-center justify-center gap-2 text-txtPrimary"
        >
          / Resume
        </Link>
        <p
          className="text-txtPrimary cursor-pointer"
          onClick={() => navigate(-1)}
        >
          / Template5 /
        </p>
        <p>Edit</p>
      </div>

      <div className="w-full lg:w-[1200px] grid grid-cols-1 lg:grid-cols-12 px-6 lg:px-32 bg-gray-100 rounded-lg">
        {/* template design */}
        <div className="col-span-12 px-4 py-6">
          <div className="flex items-center justify-end w-full gap-12 mb-4">
            <div
              className="flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
              onClick={toggleEditable}
            >
              {isEdit ? (
                <FaPenToSquare className="text-sm text-txtPrimary" />
              ) : (
                <FaPencil className="text-sm text-txtPrimary" />
              )}
              <p className="text-sm text-txtPrimary">Edit</p>
            </div>

            <div
              className="flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-gray-200 cursor-pointer"
              onClick={saveFormData}
            >
              <BiSolidBookmarks className="text-sm text-txtPrimary" />
              <p className="text-sm text-txtPrimary">Save</p>
            </div>

            <div className=" flex items-center justify-center gap-2">
              <p className="text-sm text-txtPrimary">Download : </p>
              <BsFiletypePdf
                className="text-2xl text-txtPrimary cursor-pointer"
                onClick={generatePDF}
              />
              <BsFiletypePng
                onClick={generatePng}
                className="text-2xl text-txtPrimary cursor-pointer"
              />
              <BsFiletypeJpg
                className="text-2xl text-txtPrimary cursor-pointer"
                onClick={generateImage}
              />
              <BsFiletypeSvg
                onClick={generateSvg}
                className="text-2xl text-txtPrimary cursor-pointer"
              />
            </div>
          </div>
          <div
            id="resume-content"
            className="w-full h-auto bg-white px-8 py-4"
            style={{ fontFamily: "Lora" }}
            ref={resumeRef}
          >
            {/* title */}
            <div className="w-full">
              <input
                type="text"
                readOnly={true}
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className={`bg-transparent outline-none w-full  border-none text-2xl uppercase tracking-wide font-extrabold ${
                  isEdit && "text-black w-full"
                }`}
              />

              <input
                value={formData.professionalTitle}
                onChange={(e) => handleChange(e)}
                name="professionalTitle"
                type="text"
                readOnly={true}
                className={`bg-transparent outline-none border-none text-xl tracking-wide capitalize font-semibold w-full ${
                  isEdit && "text-black"
                }`}
              />
              <div className="flex gap-2">
                <input
                  value={formData.mobile}
                  onChange={(e) => handleChange(e)}
                  name="mobile"
                  type="text"
                  readOnly={true}
                  className={`outline-none border-none text-xs ${
                    isEdit ? "bg-gray-200" : "bg-transparent"
                  }`}
                />

                {/* email */}
                <input
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                  name="email"
                  type="text"
                  readOnly={true}
                  className={`outline-none border-none w-1/2 text-xs ${
                    isEdit ? "bg-gray-200" : "bg-transparent"
                  }`}
                />

                {/* website */}

                <input
                  value={formData.website}
                  onChange={(e) => handleChange(e)}
                  name="website"
                  type="text"
                  readOnly={true}
                  className={`outline-none border-none w-full text-xs ${
                    isEdit ? "bg-gray-200" : "bg-transparent"
                  }`}
                />
              </div>

              {/* address */}

              <input
                readOnly={true}
                className={`text-xs w-full  outline-none border-none ${
                  isEdit ? "bg-gray-200" : "bg-transparent"
                }`}
                name="address"
                value={formData.address}
                onChange={(e) => handleChange(e)}
                style={{
                  maxHeight: "auto",
                  resize: "none",
                }}
              />
            </div>

            <div className="w-full flex flex-col items-center justify-start pt-3 gap-3">
              <div className="w-full">
                <p className="capitalize font-bold text-xl tracking-wider flex gap-2 items-center justify-start text-txtPrimary">
                  Summary
                </p>
                <div className="w-full h-[1px] bg-black mt-2"></div>
                <textarea
                  readOnly={true}
                  onInput={(e) => handleAutoResize(e)}
                  className={`resize-none text-txtPrimary w-full text-sm outline-none border-none mt-3 ${
                    isEdit ? "bg-gray-200" : "bg-transparent"
                  }`}
                  name="personalDescription"
                  value={formData.personalDescription}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {/* Education */}
              <div className="w-full">
                <p className="capitalize font-bold text-xl tracking-wider flex gap-2 justify-start items-center">
                  Education
                </p>
                <div className="w-full h-[1px] bg-black"></div>
                <AnimatePresence>
                  {education &&
                    education?.map((edu, i) => (
                      <motion.div
                        key={i}
                        {...opacityINOut(i)}
                        className="w-full mt-3 relative"
                      >
                        <input
                          type="text"
                          readOnly={true}
                          name="major"
                          value={edu.major}
                          onChange={(e) => handleEducationChange(i, e)}
                          className={` outline-none border-none text-sm w-full font-semibold uppercase   ${
                            isEdit ? "bg-gray-200" : "bg-transparent"
                          }`}
                        />

                        <textarea
                          readOnly={true}
                          onInput={(e) => handleAutoResize(e)}
                          className={`text-xs  mt-2  w-full  outline-none border-none ${
                            isEdit ? "bg-gray-200" : "bg-transparent"
                          }`}
                          name="university"
                          value={edu.university}
                          onChange={(e) => handleEducationChange(i, e)}
                          style={{
                            maxHeight: "auto",
                            resize: "none",
                          }}
                        />
                        <AnimatePresence>
                          {isEdit && (
                            <motion.div
                              {...FadeInOutWIthOpacity}
                              onClick={() => removeEducation(i)}
                              className="cursor-pointer absolute right-2 top-0"
                            >
                              <FaTrash className="text-sm " />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                </AnimatePresence>

                <AnimatePresence>
                  {isEdit && (
                    <motion.div
                      {...FadeInOutWIthOpacity}
                      onClick={addEducation}
                      className="cursor-pointer flex justify-center w-full"
                    >
                      <FaPlus className="text-base" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* skills */}
              <div className="w-full">
                <p className="capitalize font-bold text-xl tracking-wider flex items-center justify-start">
                  Skills
                </p>
                <div className="w-full h-[1px] bg-black mt-2"></div>
                <div className="w-full mt-3 flex flex-col justify-start gap-1">
                  <AnimatePresence>
                    {skills &&
                      skills?.map((skill, i) => (
                        <motion.div
                          key={i}
                          {...opacityINOut(i)}
                          className="flex-1"
                          style={{ minWidth: 225 }}
                        >
                          <textarea
                            value={skill.title}
                            onInput={(e) => handleAutoResize(e)}
                            onChange={(e) => handleSkillsChange(i, e)}
                            name="title"
                            type="text"
                            readOnly={true}
                            className={`resize-none outline-none border-none tracking-wide capitalize text-sm w-full ${
                              isEdit ? "bg-gray-200" : "bg-transparent"
                            }`}
                            style={{
                              height: "30px",
                            }}
                          />

                          <AnimatePresence>
                            {isEdit && (
                              <motion.div
                                {...FadeInOutWIthOpacity}
                                onClick={() => removeSkill(i)}
                                className="cursor-pointer "
                              >
                                <FaTrash className="text-base text-txtPrimary" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {isEdit && (
                    <div className="w-full  flex items-center justify-center">
                      <motion.div
                        {...FadeInOutWIthOpacity}
                        onClick={addSkill}
                        className="cursor-pointer"
                      >
                        <FaPlus className="text-base text-txtPrimary" />
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="w-full h-full flex flex-col items-start justify-start">
              {/* Projects */}
              <div className="w-full">
                <p className="capitalize font-bold text-xl tracking-wider flex items-center justify-start">
                  Projects
                </p>
                <div className="w-full h-[1px] bg-black mt-2"></div>
                <div className="w-full mt-3 flex flex-col items-center justify-start">
                  <AnimatePresence>
                    {projects &&
                      projects?.map((exp, i) => (
                        <motion.div
                          {...opacityINOut(i)}
                          className="w-full h-fit flex flex-col justify-start gap-2"
                          key={i}
                        >
                          <div className="relative">
                            <AnimatePresence>
                              {isEdit && (
                                <motion.div
                                  {...FadeInOutWIthOpacity}
                                  onClick={() => removeProjects(i)}
                                  className="cursor-pointer absolute right-0 top-2"
                                >
                                  <FaTrash className="text-base text-txtPrimary" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <div className="flex gap-2 mb-1">
                              <input
                                value={exp.title}
                                onChange={(e) => handleExpChange(i, e)}
                                name="title"
                                type="text"
                                readOnly={true}
                                className={` outline-none border-none text-sm tracking-wide capitalize font-semibold w-full ${
                                  isEdit ? "bg-gray-200" : "bg-transparent"
                                }`}
                              />
                              {isEdit === true ? (
                                <React.Fragment>
                                  <input
                                    value={exp.prrojectLink}
                                    onChange={(e) => handleExpChange(i, e)}
                                    name="prrojectLink"
                                    type="text"
                                    className={` outline-none border-none text-sm tracking-wide  text-txtPrimary w-full ${
                                      isEdit ? "bg-gray-200" : "bg-transparent"
                                    }`}
                                  />
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <Link
                                    to={`//${exp.prrojectLink}`}
                                    target="_blank"
                                    className="start w-full"
                                  >
                                    <CiLink
                                      className={`${
                                        exp.prrojectLink === ""
                                          ? "hidden"
                                          : "inline"
                                      }`}
                                    />
                                  </Link>
                                </React.Fragment>
                              )}
                            </div>

                            <textarea
                              readOnly={true}
                              onInput={(e) => handleAutoResize(e)}
                              className={`text-xs text-txtPrimary tracking-wider w-full h-full outline-none border-none ${
                                isEdit ? "bg-gray-200" : "bg-transparent"
                              }`}
                              name="description"
                              value={exp.description}
                              onChange={(e) => handleExpChange(i, e)}
                              style={{
                                resize: "none" /* Disable resizing */,
                                overflowY:
                                  "hidden" /* Hide vertical scrollbar */,
                                minHeight: "50px",
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                  <AnimatePresence>
                    {isEdit && (
                      <motion.div
                        {...FadeInOutWIthOpacity}
                        onClick={addProjects}
                        className="cursor-pointer"
                      >
                        <FaPlus className="text-base text-txtPrimary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start">
              {/* Certificates */}
              <div className="w-full py-3">
                <p className="capitalize font-bold text-xl tracking-wider flex items-center justify-start">
                  Certificates
                </p>
                <div className="w-full h-[1px] bg-black mt-2"></div>
                <div className="w-full mt-3 flex flex-col items-center justify-start">
                  <AnimatePresence>
                    {certificates &&
                      certificates?.map((exp, i) => (
                        <motion.div
                          {...opacityINOut(i)}
                          className="w-full flex flex-col justify-start gap-2"
                          key={i}
                        >
                          <div className="relative">
                            <AnimatePresence>
                              {isEdit && (
                                <motion.div
                                  {...FadeInOutWIthOpacity}
                                  onClick={() => removeCertificates(i)}
                                  className="cursor-pointer absolute right-0 top-2"
                                >
                                  <FaTrash className="text-base text-txtPrimary" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <div className="flex gap-2 mb-1">
                              <input
                                value={exp.certificateTitle}
                                onChange={(e) => handleCertificateChange(i, e)}
                                name="certificateTitle"
                                type="text"
                                readOnly={true}
                                className={` outline-none border-none text-sm tracking-wide capitalize text-txtDark w-full ${
                                  isEdit ? "bg-gray-200" : "bg-transparent"
                                }`}
                              />
                              {isEdit === true ? (
                                <React.Fragment>
                                  <input
                                    value={exp.certificateLink}
                                    onChange={(e) =>
                                      handleCertificateChange(i, e)
                                    }
                                    name="certificateLink"
                                    type="text"
                                    className={` outline-none border-none text-sm tracking-wide text-txtPrimary w-full ${
                                      isEdit ? "bg-gray-200" : "bg-transparent"
                                    }`}
                                  />
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <Link
                                    to={`://${exp.certificateLink}`}
                                    target="_blank"
                                    className="start w-full"
                                  >
                                    <CiLink
                                      className={`${
                                        exp.certificateLink === ""
                                          ? "hidden"
                                          : "inline"
                                      }`}
                                    />
                                  </Link>
                                </React.Fragment>
                              )}
                            </div>

                            <textarea
                              readOnly={true}
                              onInput={(e) => handleAutoResize(e)}
                              className={`text-xs  text-txtPrimary tracking-wider w-full  outline-none border-none ${
                                isEdit ? "bg-gray-200" : "bg-transparent"
                              }`}
                              name="certificateDetails"
                              value={exp.certificateDetails}
                              onChange={(e) => handleCertificateChange(i, e)}
                              style={{
                                maxHeight: "auto",
                                resize: "none",
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                  <AnimatePresence>
                    {isEdit && (
                      <motion.div
                        {...FadeInOutWIthOpacity}
                        onClick={addCertificate}
                        className="cursor-pointer"
                      >
                        <FaPlus className="text-base text-txtPrimary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template5;
