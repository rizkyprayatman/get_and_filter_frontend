import Card from "../Card/Card";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { BACKEND_URL } from "../../utils/constants";

const GetAllData = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [short, setShort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [attachment, setAttachment] = useState("");
  const [discount, setDiscount] = useState("");

  const allData = async (e) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/barang/all`);
      const data = await response.json();

      if (data.data.length === 0) {
        router.push("/");
      }

      setData(data.data);
      setIsFilter(false);
      setShowModal(false);
      setType("");
      setStatus("");
      setAttachment("");
      setDiscount("");
      setShort(false);
    } catch (err) {
      // console.error(err);
    }
  };

  const filterData = async (orderby) => {
    try {
      setShowModal(false);
      setData([]);

      let url = `${BACKEND_URL}/api/barang/filter?`;

      if (orderby == "desc") {
        url += `order=desc&`;
        setShort(true);
        setIsFilter(false);
      }

      if (orderby == "asc") {
        setShort(false);
        setIsFilter(false);
      }

      if (type) {
        url += `type=${type}&`;
        setIsFilter(true);
      }

      if (status) {
        url += `status=${status}&`;
        setIsFilter(true);
      }

      if (attachment) {
        url += `attachment=${attachment}&`;
        setIsFilter(true);
      }

      if (discount) {
        url += `discount=${discount}&`;
        setIsFilter(true);
      }

      url = url.slice(0, -1);

      const response = await fetch(url);
      const data = await response.json();

      setData(data.data);
    } catch (err) {
      // console.error(err);
    }
  };

  const showFilter = async (e) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/category/all`);
      const data = await response.json();

      setCategory(data.data);
      setShowModal(true);
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    allData();
  }, []);

  return (
    <>
      <section className="bg-white antialiased">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-24 sm:py-12 lg:py-18">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              All Data
            </h2>
          </div>

          <button
            className={`${
              isFilter == true ? "bg-blue-500" : "bg-blue-200"
            } text-black font-bold px-6 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 me-3`}
            type="button"
            onClick={() => showFilter()}
          >
            Filter
          </button>
          <button
            className={`${
              short == true ? "bg-yellow-500 " : "bg-yellow-200"
            }  text-black font-bold px-6 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
            type="button"
            onClick={() => filterData(short ? "asc" : "desc")}
          >
            {short == false ? `Ascending` : `Descending`}
          </button>
          {showModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">Filter Data</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                          x
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <form className="rounded w-full">
                        <label className="block text-black text-sm font-bold mb-1">
                          Type
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setType(e.target.value)}
                          value={type}
                        >
                          <option selected>Choose Status</option>
                          {category.map((item) => (
                            <option value={item.id}>{item.title}</option>
                          ))}
                        </select>
                        <label className="block text-black text-sm font-bold mb-1">
                          Status
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setStatus(e.target.value)}
                          value={status}
                        >
                          <option selected>Choose Status</option>
                          <option value="approved">Approved</option>
                          <option value="unapproved">Unapproved</option>
                        </select>
                        <label className="block text-black text-sm font-bold mb-1">
                          Attachment
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setAttachment(e.target.value)}
                          value={attachment}
                        >
                          <option selected>Choose Status</option>
                          <option value="ada">Ada</option>
                          <option value="tidak">Tidak Ada</option>
                        </select>
                        <label className="block text-black text-sm font-bold mb-1">
                          Discount
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setDiscount(e.target.value)}
                          value={discount}
                        >
                          <option selected>Choose Status</option>
                          <option value="ada">Ada</option>
                          <option value="tidak">Tidak Ada</option>
                        </select>
                      </form>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => allData()}
                      >
                        Reset
                      </button>
                      <button
                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => filterData()}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {data.length != 0 ? (
            <>
              <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((barang, index) => (
                  <Card key={index} item={barang} />
                ))}
              </div>
            </>
          ) : (
            <>
              {}
              <div className="text-center">Loading...</div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default GetAllData;
