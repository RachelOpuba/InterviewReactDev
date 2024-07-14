import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import ImageModal from "./ImageModal";
import NestedTable from "./NestedTable";



function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://apisoftlifetest.woodlodge.com.ng/api/v1/user/vendors"
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const openModal = (images) => {
    setSelectedImages(images);
    setModalOpen(true);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error fetching data: {error.message}
      </p>
    );
  }

  return (
    <div className="flex justify-center py-10 w-full relative overflow-x-auto">
      <div className="w-full max-w-[1320px] mx-auto ">
        <div className="w-full mx-8">
        <div className="w-full flex justify-center">
          <h1 className="text-[#36b3a5] py-5 uppercase font-bold text-xl lg:text-2xl">Vendor Details</h1>
        </div>
        <table className=" w-full mx-4 shadow-xl text-sm text-start text-gray-500  border-separate pb-10 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-[#F2F2F2] ">
            <tr className="">
              <th className="py-3 ps-4 text-start min-w-[80px]"></th>
              <th className="py-3 ps-4 text-start min-w-[80px]">ID</th>
              <th className="py-3 ps-4 text-start min-w-[220px]">FULL Name</th>
              <th className="py-3 ps-4 text-start min-w-[180px]">
                BUSINESS NAME
              </th>
              <th className="py-3 ps-4 text-start min-w-[140px]">
                DATE CREATED
              </th>
              <th className="py-3 ps-4 text-start min-w-[140px]">
                DATE MODIFIED
              </th>
              <th className="py-3 ps-4 text-start min-w-[140px]">
                  PRODUCT IMAGES
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <React.Fragment key={item.id}>
                <tr
                  
                  className={`cursor-pointer ${
                    index % 2 !== 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-4 ps-4 text-start ">
                    <MdKeyboardDoubleArrowRight onClick={() => toggleRow(index)} className="text-[#36b3a5] text-[24px]"/>
                    
                    </td>
                  <td className="py-4 ps-4 text-start ">
                    <span>
                    {item.id}
                    </span>
                    </td>
                  <td className="py-4 ps-4 text-start flex gap-4 items-center">
                    <img
                      src={item.dpUrl}
                      alt="dp picture"
                      className="w-10 h-10 rounded-full"
                    />
                    <p>{item.fullName}</p>
                  </td>
                  <td className="py-4 ps-4 text-start ">{item.businessName}</td>
                  <td className="py-4 ps-4 text-start ">
                    {formatDate(item.dateCreated)}
                  </td>
                  <td className="py-4 ps-4 text-start ">
                    {formatDate(item.dateModified)}
                  </td>
                  <td className="py-4 text-center border">
                  {item.images && item.images.length > 0 && (
                    <button
                      onClick={() => openModal(item.images)}
                      className="bg-[#36b3a5] text-white py-1 px-3 rounded"
                    >
                      View Images
                    </button>
                  )}
                </td>
                </tr>
                {expandedRow === index && (
                  <tr
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td colSpan="7" className="px-6 py-4">
                      <NestedTable subServices={item.subServices} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      {modalOpen && <ImageModal images={selectedImages} onClose={() => setModalOpen(false)} />}

    </div>
  );
}


export default DataTable;
