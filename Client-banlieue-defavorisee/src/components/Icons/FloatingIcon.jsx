import React from "react";

const FloatingIcons = ({ icons }) => (
  <div className="flex flex-col w-1/3">
    {icons.map((icon, index) => (
      <img
        key={index}
        className={`sm:w-6 md:w-8 lg:w-10 xl:w-12 sm:h-6 md:h-8 lg:h-10 xl:h-12 ${
          index === 1 || index === 4
            ? "self-end"
            : index === 2 || index === 5
            ? "self-center"
            : "self-start"
        } iconAnimate anim-delay-${index}`}
        src={`./icons/icon${icon}.svg`}
        alt=""
      />
    ))}
  </div>
);

export default FloatingIcons;
