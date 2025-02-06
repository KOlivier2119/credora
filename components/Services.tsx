import React from "react";

const Services = () => {
  return (
    <div className="w-full p-8">
      <div className="flex justify-center w-full">
        <button className="text-[#4B415F] border border-[#4B415F] rounded-full py-2 px-5 mb-5">
          OUR SERVICES
        </button>
      </div>
      <div>
        <h1 className="text-[#061525] font-bold text-4xl text-center">
          Comprehensive financial solutions tailored to your needs
        </h1>
        <table>
          <tr>
            <td>
              <div>
                <h1>Personal Loans</h1>
                <p>
                  Our Personal Loans offer flexible terms and competitive rates,
                  tailored to meet your individual needs.
                </p>
              </div>
            </td>
            <td>
              <div>
                <h1></h1>
                <p></p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <h1>Business Loans</h1>
                <p>
                  EMpower your business with our flexible financing options.
                  Tailored to meet the unique needs of your enterprise.
                </p>
              </div>
            </td>
            <td>
              <h1></h1>
              <p></p>
            </td>
          </tr>
          <tr>
            <td>
              <h1>Mortage Loans</h1>
              <p>
                Secure your dream home with our competitive mortgage loans.
                ENjoy flexible terms, low interest rates
              </p>
            </td>
            <td>
              <div>
                <h1></h1>
                <p></p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Services;
