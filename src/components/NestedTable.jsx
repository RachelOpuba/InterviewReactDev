

function NestedTable({ subServices }) {
    return (
      <>
        <div className="flex justify-center">
          <h1 className="text-xl font-bold py-4 uppercase text-[#36b3a5]">
            Sub-services offered by Vendor
          </h1>
        </div>
        <table className="w-full mx-auto bg-gray-100  pb-5 shadow-2xl mb-5 rounded-xl">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Service ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Service Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Price
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {subServices && subServices.length > 0 ? (
              subServices.map((subService, index) => (
                <tr
                  key={subService.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-6 py-4 border-b border-gray-200">
                    {subService.id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {subService.description}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {subService.subService.title}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    N{subService.price}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 text-center text-red-500 py-10">
                  No sub-services available for this vendor
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }

  export default NestedTable