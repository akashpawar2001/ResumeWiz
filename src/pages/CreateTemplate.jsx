import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { adminId } from "../config/admin";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, db } from "../config/firebase.config";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import useTemplates from "../hooks/useTemplates";
import { useNavigate } from "react-router-dom";
function CreateTemplate() {
  const { data, isLoading } = useUser();
  const handleClick = () => {
    document.getElementById("addNew").classList.remove("hidden");
    document.getElementById("addNew").classList.add("flex");
  };
  const handleClick1 = () => {
    document.getElementById("addNew").classList.add("hidden");
  };
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    imageUrl: null,
    progress: 0,
  });

  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const {
    data: templates,
    isError: templatesError,
    isLoading: templatesIsloading,
    refetch: templatesRefetch,
  } = useTemplates();

  const handleSelectFile = async (e) => {
    setImageAsset((previmg) => ({ ...previmg, isImageLoading: true }));
    const file = e.target.files[0];
    if (file && isAllowed(file)) {
      const storageRef = ref(storage, `Templates/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          setImageAsset((prevAsst) => ({
            ...prevAsst,
            progress: (snapShot.bytesTransferred / snapShot.totalBytes) * 100,
          }));
        },
        (error) => {
          if (error.message.includes("storage/unauthorized")) {
            toast.error(`Error : Authorization Revoked`);
          } else {
            toast.error(`Error : ${error.message}`);
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset((prevAsst) => ({
              ...prevAsst,
              imageUrl: downloadURL,
              isImageLoading: false,
            }));
          });
          toast.success("Image uploaded");
        }
      );
    } else {
      toast.info("invalid File Format");
    }
  };

  const isAllowed = (file) => {
    const allowedType = ["image/jpeg", "image/jpg", "image/png"];
    return allowedType.includes(file.type);
  };

  const deleteAnImage = async () => {
    setImageAsset((previmg) => ({ ...previmg, isImageLoading: true }));
    const deleteRef = ref(storage, imageAsset.imageUrl);
    deleteObject(deleteRef).then(() => {
      setImageAsset((prevAsst) => ({
        ...prevAsst,
        imageUrl: null,
        isImageLoading: false,
        progress: 0,
      }));
      toast.success("Image Removed");
    });
  };

  const pushTOcloud = async () => {
    const timestamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      title: formData.title,
      imageUrl: imageAsset.imageUrl,
      name:
        templates && templates.length > 0
          ? `Template${templates.length + 1}`
          : `Template1`,
      timestamp: timestamp,
    };
    await setDoc(doc(db, "templates", id), _doc)
      .then(() => {
        setFormData((prevData) => ({ ...prevData, title: "", imageUrl: "" }));
        setImageAsset((prevAsst) => ({ ...prevAsst, imageUrl: null }));
        templatesRefetch();
        toast.success("Data pushed to the cloud");
      })
      .catch((error) => {
        toast.error(`Error : ${error.message}`);
      });
  };

  // To remove template data from cloud
  const removeTemplate = async (template) => {
    const deleteRef = ref(storage, template?.imageUrl);
    await deleteObject(deleteRef).then(async () => {
      await deleteDoc(doc(db, "templates", template?._id))
        .then(() => {
          toast.success("Template Remove From Database");
          templatesRefetch();
        })
        .catch((error) => {
          toast.error(`Error : ${error.message}`);
        });
    });
  };

  useEffect(() => {
    if (isLoading && !adminId.includes(data?.id)) {
      navigate("/", { replace: true });
    }
  }, [data, isLoading]);

  return (
    <>
      {adminId.includes(data?.uid) && (
        <>
          <div className="w-full relative py-8 mx-auto">
            {templatesIsloading ? (
              <React.Fragment>
                <div className="w-full h-full flex items-center justify-center">
                  <PuffLoader color="#EC2A00" size={40} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {templates && templates.length > 0 ? (
                  <React.Fragment>
                    <div className="mb-5">
                      <h1 className="text-center text-3xl font-bold">
                        Templates
                      </h1>
                    </div>
                    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-8 px-10 gap-4">
                      {templates?.map((template) => (
                        <div
                          key={template._id}
                          className="relative px-5 bg-gray-300 py-6"
                        >
                          <img
                            src={template?.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          ></img>
                          <p className="text-center text-gray-500 drop-shadow-md">
                            {template?.title}
                          </p>
                          <div onClick={() => removeTemplate(template)}>
                            <button className="absolute top-6 right-6 text-red-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <PuffLoader color="#EC2A00" size={40} />
                      No Data
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
            <button
              onClick={handleClick}
              className="z-20 fixed bottom-14 right-10  bg-sky-700 text-white rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10  h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div
            id="addNew"
            className="main-modal z-50 modal hidden fixed w-full h-screen top-0 left-0 aria-pressed:flex items-center justify-center"
          >
            <div className="modal-overlay absolute w-full h-full bg-gray-900/50 backdrop-blur-sm"></div>
            <div className="modal-container mt-5 bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <p>Create new Template</p>
                <p className="text-gray-500 py-2 text-end">
                  TempID:
                  {templates && templates.length > 0
                    ? `Template${templates.length + 1}`
                    : `Template1`}
                </p>
                <div className="pt-2">
                  <label htmlFor="title">
                    <input
                      type="text"
                      className="border rounded px-2 py-1 w-full"
                      placeholder="Template Title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="pt-2">
                  <div className="border rounded h-[300px] w-full flex justify-center items-center">
                    {imageAsset.isImageLoading ? (
                      <React.Fragment>
                        <div className="flex justify-center flex-col items-center">
                          <PuffLoader size={30} />
                          <p>{imageAsset.progress.toFixed(2)}%</p>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {!imageAsset?.imageUrl ? (
                          <div className="mb-8">
                            <input
                              type="file"
                              name="file"
                              id="file"
                              accept=".jpeg,.jpg,.png"
                              className="sr-only"
                              onChange={handleSelectFile}
                            />
                            <label
                              htmlFor="file"
                              className="relative flex items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center"
                            >
                              <div>
                                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                  Drop files here
                                </span>
                                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                  Or
                                </span>
                                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                  Browse
                                </span>
                              </div>
                            </label>
                          </div>
                        ) : (
                          <React.Fragment>
                            <div className="relative overflow-hidden w-full h-full">
                              <img
                                selectedId={1}
                                src={imageAsset?.imageUrl}
                                className="w-full h-full object-contain"
                              />
                              <button
                                onClick={deleteAnImage}
                                className="absolute top-5 right-5 text-red-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2 justify-end">
                  <button
                    onClick={handleClick1}
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={pushTOcloud}
                    className="mb-2 md:mb-0 bg-[#5356FF] border border-[#5356FF] px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-[#5356FF]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CreateTemplate;
