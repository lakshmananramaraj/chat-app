import React from "react";
import { clsx } from "clsx";
import ContactsList from "./ContactsList";

const openClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0"
};

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full"
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0"
};

const Drawer = ({ open, setOpen, side = "right" }) => {
  return (
    <div
      id={`dialog-${side}`}
      className="relative z-10"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(!open)}
    >
      <div
        className={clsx(
          "fixed inset-0 bg-gray-500 bg-opacity-75 transition-all",
          {
            "opacity-100 duration-500 ease-in-out visible": open
          },
          { "opacity-0 duration-500 ease-in-out invisible": !open }
        )}
      ></div>
      <div className={clsx({ "fixed inset-0 overflow-hidden": open })}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              "pointer-events-none fixed max-w-full",
              classNames[side]
            )}
          >
            <div
              className={clsx(
                "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                { [closeClassNames[side]]: !open },
                { [openClassNames[side]]: open }
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div
                className={clsx(
                  "flex flex-col h-full overflow-y-scroll bg-white shadow-xl pr-4 rounded-r-lg"
                )}
              >
                <ContactsList setOpen={setOpen} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
