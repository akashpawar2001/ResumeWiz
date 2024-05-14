import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  Auth,
  CreateTemplate,
  UserProfile,
  CreateResume,
  TemplatesPin,
  Resumes,
} from "./pages";
import TemplateDesignPin from "./components/TemplateDesignPin.jsx";
import { TemplateDesignPinDetails } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/resume",
        element: <Resumes />,
      },
      {
        path: "/resumeDetail/:templateId",
        element: <TemplateDesignPinDetails />,
      },
      {
        path: "/templates/create",
        element: <CreateTemplate />,
      },
      {
        path: "/profile/:uid",
        element: <UserProfile />,
      },
      {
        path: "/resume/*",
        element: <CreateResume />,
      },
      {
        path: "/resumeDetail/:template",
        element: <TemplatesPin />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
