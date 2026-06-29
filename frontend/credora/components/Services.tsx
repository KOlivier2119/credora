import React from "react";

const Services = () => {
  return (
    <div className="w-full p-8 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-center w-full">
        <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-5 mb-8">
          OUR SERVICES
        </button>
      </div>

      {/* Title */}
      <h1 className="text-[#061525] font-bold text-4xl text-center mb-12">
        Comprehensive financial solutions tailored to your needs
      </h1>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="max-w-screen-2xl mx-auto border-collapse border-spacing-4">
          <tbody>
            {/* Row 1 */}
            <tr className="flex flex-wrap md:table-row">
              <td className="md:w-1/2 p-8 border border-gray-300">
                <div>
                  <h2 className="text-lg font-bold text-[#061525]">Personal Loans</h2>
                  <p className="text-gray-600">
                    Our Personal Loans offer flexible terms and competitive rates, tailored to meet your individual needs.
                  </p>
                </div>
              </td>
              <td className="md:w-1/2 p-8 border border-gray-300">
                <div>
                  <h2 className="text-lg font-bold text-[#061525]">Emergency Loans</h2>
                  <p className="text-gray-600">Quick and reliable emergency loans, providing fast access to funds when you need them most. Apply now for instant relief.</p>
                </div>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="flex flex-wrap md:table-row">
              <td className="md:w-1/2 p-8 border border-gray-300">
                <div>
                  <h2 className="text-lg font-bold text-[#061525]">Business Loans</h2>
                  <p className="text-gray-600">
                    Empower your business with our flexible financing options. Tailored to meet the unique needs of your enterprise.
                  </p>
                </div>
              </td>
              <td className="md:w-1/2 p-8 border border-gray-300">
                <div>
                  <h2 className="text-lg font-bold text-[#061525]">Student Loans</h2>
                  <p className="text-gray-600">Student loans open doors to education but can also become a heavy financial burden if not managed wisely. Plan carefully.</p>
                </div>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="flex flex-wrap md:table-row">
              <td className="md:w-1/2 p-8 border border-gray-300">
                <div>
                  <h2 className="text-lg font-bold text-[#061525]">Mortgage Loans</h2>
                  <p className="text-gray-600">
                    Secure your dream home with our competitive mortgage loans. Enjoy flexible terms and low interest rates.
                  </p>
                </div>
              </td>
              <td className="md:w-1/2 p-8 border border-gray-300">
                <div>
                  <h2 className="text-lg font-bold text-[#061525]">Small business Loans</h2>
                  <p className="text-gray-600">This content highlights the key benefits of your small business loan offerings, appealing to entrepreneurs seeking financial support.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center py-4">
        <button className="bg-[#061525] hover:bg-[#172c42] transition-all duration-500  py-2 px-5 text-white rounded-full">
          View More
        </button>
      </div>
    </div>
  );
};

export default Services;
