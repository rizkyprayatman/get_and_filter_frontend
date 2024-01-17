import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BACKEND_URL } from "../../utils/constants";
import GetAllData from "../Data/GetAllData";

const Beranda = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [importProcess, setImportProcess] = useState(false);
  const [isData, setIsData] = useState(false);

  const checkData = async (e) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/barang/check-data`);
      const data = await response.json();

      if (data.message == "Ada Data") {
        setIsData(true);
      } else {
        setIsData(false);
      }
    } catch (err) {
      // console.error(err);
    }
  };

  const importData = async (e) => {
    try {
      setImportProcess(true);
      const response = await fetch(`${BACKEND_URL}/api/barang/import-data`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = response;
      console.log(data);

      if (response.status == 201) {
        alert("Import Data Berhasil");
        setImportProcess(false);
        window.location.reload();
      }
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    checkData();
  }, []);

  return (
    <>
      {isData == false ? (
        <>
          {importProcess == false ? (
            <>
              <section className="">
                <div className="mt-12 text-center">
                  <h1 className="font-bold">Import Data</h1>
                </div>
                <div>
                  <p className="text-center">
                    Lakukan import, masukkan email dan lakukan import.{" "}
                  </p>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="mb-6 w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Email
                    </label>
                    <input
                      type="text"
                      id="default-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <button
                      className="text-white mt-5 bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => importData()}
                    >
                      Import Data
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section>
                <h1 className="text-center mt-12">
                  Sedang Prosses Import Data ...
                </h1>
              </section>
            </>
          )}
        </>
      ) : (
        <>
          <GetAllData />
        </>
      )}
    </>
  );
};

export default Beranda;
