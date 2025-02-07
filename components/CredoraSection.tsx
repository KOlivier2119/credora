// components/CredoraSection.js

export default function CredoraSection() {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Our expertise is the key reason.</h1>
        <p className="text-gray-600 mb-6">Up to $20,000 limit</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Choose Credora for personalized loans,</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Competitive rates</li>
              <li>Quick approval</li>
              <li>Expert guidance</li>
              <li>Flexible repayment options</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Lowest bank fees</h2>
            <p className="text-gray-600 mb-4">Benefit from our lowest bank fees, ensuring more savings and better financial management for your needs.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Easy in 3 steps
            </button>
          </div>
        </div>
      </div>
    );
  }