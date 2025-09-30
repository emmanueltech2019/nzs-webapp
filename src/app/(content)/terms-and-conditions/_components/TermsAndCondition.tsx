import React from 'react'

const TermsAndCondition = () => {
    return (
        <section className='pt-20'>
            {/* <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] pb-5 flex flex-col text-center font-semibold'><span>Terms and conditions</span></h1> */}
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg my-10">
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-teal-600 pb-2">
        Terms and Conditions Agreement
      </h1>

      <p className="text-gray-600 mb-6">
        By clicking "I Agree" or making a purchase, the Customer acknowledges that they have read, understand, and agree to be bound by this Agreement.
      </p>

      {/* ========================================================= */}
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-4 border-t">
          1. Warranty and Guarantee
        </h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">COVERAGE & REMEDY</h3>
        <p className="mb-4">
          This warranty/guarantee covers defects in **material and workmanship only**. If a defect is found, **NAIJAZONE** will, at its option, repair or replace the product/service free of charge.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">EXCLUSIONS (Not Covered)</h3>
        <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
          <li>Normal wear and tear</li>
          <li>Misuse or neglect</li>
          <li>Damage caused by external factors (e.g., accidents, natural disasters)</li>
          <li>Products/services modified or repaired by unauthorized parties</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">CLAIMS PROCESS</h3>
        <p className="text-gray-600">
          Contact customer service via email at <a href="mailto:naijazoneonline@gmail.com" className="text-teal-600 hover:text-teal-800 font-medium">naijazoneonline@gmail.com</a>. Provide **proof of purchase** and a detailed description of the issue.
        </p>
      </section>

      {/* ========================================================= */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-4 border-t">
          2. Return and Refund Policy
        </h2>

        <p className="mb-4">
          At NAIJAZONE, we want you to be satisfied with your purchase. If for any reason you're not, we offer the following return and refund policy:
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">ELIGIBILITY FOR RETURNS</h3>
        <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
          <li>Items must be returned within **7 working days** of delivery.</li>
          <li>Items must be in **original condition** with all tags, packaging, and accessories included.</li>
          <li>Items must not have been worn, used, or altered.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">RETURN PROCEDURE</h3>
        <p className="text-gray-600">
          Contact customer service via email at <a href="mailto:info@naijazoneonline.com" className="text-teal-600 hover:text-teal-800 font-medium">info@naijazoneonline.com</a> or call **+2348187314225** to initiate the return process. You will need to provide the order number, reason for return, and your preference (refund, exchange, or store credit).
        </p>
        
        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">REFUND TIMING & FEES</h3>
        <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
            <li>Refunds will be processed within **7-10 business working days** of receiving the returned item.</li>
            <li>A **15% restocking fee** may apply to returns.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">EXCEPTIONS</h3>
        <p className="text-gray-600">
            **Final sale items** and **personalized or customized items** are non-returnable.
        </p>
      </section>

      {/* ========================================================= */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-4 border-t">
          3. General Legal Provisions
        </h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">CANCELLATION POLICY</h3>
        <p className="text-gray-600 mb-4">
          Orders may be cancelled within **2 days before delivery with a fee**.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">INTELLECTUAL PROPERTY</h3>
        <p className="text-gray-600 mb-4">
          The Product is owned by the Company or its licensors.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">DISCLAIMER OF WARRANTIES</h3>
        <p className="text-red-700 font-bold mb-4">
          THE PRODUCT IS PROVIDED **"AS-IS"** AND **"AS-AVAILABLE"** WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
        </p>
        <p className="text-gray-600 mb-4">
            This includes disclaimers of implied warranties of merchantability, fitness for a particular purpose, title, and noninfringement. The Company does not warrant that the product will meet your requirements or be error-free.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">LIMITATION OF LIABILITY</h3>
        <p className="text-gray-600 mb-4">
          The Company is not liable for any damages arising from the Customer's use of the Product, nor for any consequential or incidental damages.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">GOVERNING LAW</h3>
        <p className="text-gray-600">
          This Agreement is governed by the laws of **Nigeria** and various states where products or services may be delivered.
        </p>

      </section>

      {/* ========================================================= */}

      <section className="pt-4 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          4. Terms of Service (TOS) & Licenses
        </h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">ACCEPTANCE & ACCOUNTS</h3>
        <p className="text-gray-600 mb-4">
          By using our services, you agree to be bound by these TOS. You must create an account to use our services and are responsible for maintaining the confidentiality of your account information.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-700 mb-2">DIGITAL PRODUCT LICENSES</h3>
        <p className="text-gray-600">
            We grant you a **non-exclusive license** to use our digital product. You may not **resell or distribute** our digital product.
        </p>
      </section>

      {/* ========================================================= */}

      <div className="mt-8 pt-4 border-t text-sm text-gray-500 text-center">
        <p>The Company may modify this Agreement at any time without notice.</p>
      </div>
      
    </div>
        </section>
    )
}

export default TermsAndCondition