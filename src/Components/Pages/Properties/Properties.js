import React from "react";
import PropertiesList from "./PropertiesList";

const Properties = ({ setAuthModule }) => {
  return (
    <div>
      <PropertiesList setAuthModule={setAuthModule} />
    </div>
  );
};

export default Properties;
