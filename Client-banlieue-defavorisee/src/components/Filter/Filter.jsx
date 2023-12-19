import "./filter.css";
import { Collapse } from "antd";
import React, { useState, useEffect } from "react";
import CheckBox from "./CheckBox.jsx";

function Filter({ apiRoutes }) {
  const { Panel } = Collapse;
  const accordionStyle = {
    border: "none",
    boxShadow: "none",
  };
  const customPanelStyle = {
    border: 0,
    boxShadow: "none",
  };

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const newData = {};
      for (const route of apiRoutes) {
        const response = await fetch(route.path);
        const apiData = await response.json();
        newData[route.name] = apiData;
      }
      setData(newData);
    };

    fetchData();
  }, [apiRoutes]);

  return (
    <div className="ml-5 xl:w-[200px] sm:w-[100px] md:w-[150px]">
      <Collapse accordion expandIconPosition="right" style={accordionStyle}>

        {apiRoutes.map((route, index) => (
          <Panel
            key={index}
            style={customPanelStyle}
            header={route.name}
            className="text-xl text-textColor font-medium"
          >
            {data[route.name] ? (
              data[route.name].map((item, id) => (
                <CheckBox key={id} data={item} />
              ))
            ) : (
              <p>loading...</p>
            )}
          </Panel>
        ))}

      </Collapse>
    </div>
  );
}

export default Filter;
