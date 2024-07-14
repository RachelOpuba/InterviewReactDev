import React from "react";

function ImageModal({ images, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold pb-4">Product Images</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-[40px]"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center ">
          {images.map((image, index) => (
            <div key={index} className="shadow-xl h-[280px] w-[90%] max-w-[300px] rounded-xl relative border">
              <div className="h-[70%] boder-b w-full">
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="ps-4 absolute bottom-5">
                <button className="text-white bg-[#36b3a5] py-2 px-4 rounded-3xl text-sm font-medium">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
