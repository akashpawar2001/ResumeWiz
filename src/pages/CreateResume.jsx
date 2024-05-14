import React from "react";
import { Routes, Route } from "react-router-dom";
import { TemplatesData } from "../util/helper";

function CreateResume() {
  return (
    <div className="w-full py-10">
      <Routes>
        {TemplatesData.map((template) => (
          <Route
            key={template?.id}
            path={`/${template.name}`}
            Component={template.component}
          ></Route>
        ))}
      </Routes>
    </div>
  );
}

export default CreateResume;
