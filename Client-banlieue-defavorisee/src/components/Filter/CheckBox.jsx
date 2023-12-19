import React from "react";
import { Checkbox } from "antd";

function CheckBox({ data }) {
  const checkboxStyle = {
    color: "#354ACE",
    marginBottom: "8px",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Checkbox
        key={data.id}
        style={checkboxStyle}
        className="font-regular font-medium text-base custom-checkbox"
      >
        <span className="custom-checkmark"></span>
        {data.access_type ||
          data.price_type ||
          data.audience ||
          data.group ||
          data.tag}
      </Checkbox>
    </div>
  );
}

export default CheckBox;
