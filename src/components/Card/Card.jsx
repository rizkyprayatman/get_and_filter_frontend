import React, { useState } from "react";

function Card({ item }) {
  const [popup, setPopup] = useState(false);
  const [popupText, setPopupText] = useState("");


  const displayDiscountPopup = (discount, name) => {
    if (discount > 0 && discount < 1000000) {
      // alert("Discount");
      setPopupText("Discount")
      setPopup(true)
    } else if (discount >= 1000000) {
      setPopupText(`Approval Needed ${name}`)
      // alert();
      setPopup(true)
    }
    // Add more conditions as needed
  };

  return (
    <>
      {popup == true ? (
        <>
          <div
            id="info-popup"
            tabindex="-1"
            className="overflow-y-auto overflow-x-hidden fixed top-0 z-50 w-full md:inset-0 h-modal"
          >
            <div className="relative p-4 w-full max-w-lg">
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
                <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                    {popupText}
                  </h3>   
                </div>
                <div className="justify-end items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                  <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                    <button
                      id="confirm-button"
                      type="button"
                      onClick={() => setPopup(false)}
                      className="py-2 px-4 w-full text-sm border border-black font-medium text-center rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="max-w-sm rounded border border-gray-200 shadow-lg">
        <div
          className="py-4"
          onClick={() => displayDiscountPopup(item.discount, item.name)}
        >
          <h1 className="font-bold text-xl mb-2">{item.name}</h1>
          <div className="flex justify-start px-3">
            <span
              className={`${
                item.status != 0
                  ? `bg-green-100 text-green-800 `
                  : `bg-yellow-100 text-yellow-800`
              }  text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}
            >
              {item.status != 0 ? `Approved` : `Unapproved`}
            </span>

            <span
              className={`${
                item.attachment == 0
                  ? `bg-gray-100 text-gray-800`
                  : `bg-blue-100 text-blue-800`
              } text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full me-2 border border-gray-500 `}
            >
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M19.463 5.576c-.688-.75-1.929-.796-2.756.031l-8.1 8.1c-.21.21-.21.476 0 .686.21.21.476.21.686 0l6.7-6.7a1 1 0 0 1 1.414 1.414l-6.7 6.7a2.45 2.45 0 0 1-3.514 0 2.45 2.45 0 0 1 0-3.514l8.1-8.1c1.567-1.568 4.115-1.619 5.63.015 1.552 1.569 1.597 4.104-.03 5.613l-9.486 9.486c-2.19 2.19-5.624 2.19-7.814 0-2.19-2.19-2.19-5.624 0-7.814l8.1-8.1a1 1 0 0 1 1.414 1.414l-8.1 8.1c-1.41 1.41-1.41 3.576 0 4.986 1.41 1.41 3.576 1.41 4.986 0l9.5-9.5.031-.03c.75-.687.796-1.929-.031-2.756l-.03-.031z" />
              </svg>
              {item.attachment != 0 ? `Attachment` : `No Attachment`}
            </span>
          </div>
          <div className="text-start px-3 mt-4">
            <p className="text-gray-700 text-base">Price : Rp. {item.price}</p>
            <p className="text-gray-700 text-base">
              Discount : Rp. {item.discount}
            </p>
          </div>
        </div>

        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Type : {item.category.title}
          </span>
        </div>
      </div>
      {/* <div className="max-w-sw bg-gray-100 border border-gray-200 rounded-lg shadow ">
        <div clasame="text-start ps-5 pt-1 bg-gray-900 rounded-b-lg">
          <p className="text-sm text-white capitalize">
            Kategori : {item.category.nameCategoryPortofolio}
          </p>
        </div>

        <div className="px-5 pt-2 pb-5">
          <a href="#">
            <h5 className="mb-2 text-xl text-left font-bold tracking-tight text-gray-900 h-8">
              {item.name}
            </h5>
          </a>
          <p className="font-normal text-left text-gray-400 h-40">
            {item.description}
          </p>
          <div className="h-2"></div>
          <div className="text-left pb-3">
            <p>Teknologi</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Card;
