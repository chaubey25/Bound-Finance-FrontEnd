import React, { useState } from "react";
import { approveChanges } from "./Functions";
import Swal from "sweetalert2";
import info from '../assests/images/info.png'

export default function TreasuryApproveChange() {
  const [ID, setID] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setID(e.target.value);
  };
  const handleApproveChange = async () => {
    setIsLoading(true);

    await approveChanges(ID);

    setIsLoading(false);
  };

  const Cards_Data = [
    {
      id: 1,
      heading: "Approve Proposal Change",
      title: "Proposal ID",
      inputTitle: "0",
      button: "Approve",
      onChangeInput: handleOnChange,
      onClick: handleApproveChange,
      img:info
    },
  ];

  return (
    <div>
      {Cards_Data.map((item, index) => {
        return (
          <div key={index} className="card-backgorund p-3">
            <p className="text-15 font-bold font-mont bck-color">
              {item.heading}
            </p>
            <div className="d-flex justify-content-center image-for">
              <img src={item?.img} alt=""/>
            </div>
            <div className="flex flex-col">
              <p className="mt-3 mb-3">{item.title}:</p>
              <input
                type="number"
                onChange={(e) => item.onChangeInput(e)}
                placeholder={item.inputTitle}
                className="rounded-md text-14 focus:ring-2 input-max py-2 px-3 flex-grow"
              />
              <button
                onClick={item.onClick}
                className="BoxGradient-button-max drop-shadow-xl hover:drop-shadow-sm mt-4"
              >
                {item.button}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
