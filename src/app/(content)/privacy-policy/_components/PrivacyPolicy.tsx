import React from 'react'

const TermsAndCondition = () => {
    return (
        <section className='pt-20'>
            {/* <h1 className='text-2xl lg:text-[46.4px] leading-[36px] lg:leading-[69.6px] pb-5 flex flex-col text-center font-semibold'><span>Terms and conditions</span></h1> */}
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg my-10">
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-teal-600 pb-2">
        Images, Videos and Text Policy
      </h1>

      <p className="text-gray-600 mb-6">
        This document outlines Naijazone's policy regarding the use of media and text content across the platform.
      </p>

      {/* ========================================================= */}
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-4 border-t">
          1. Policy Overview and Purpose
        </h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">Policy Context in Nigeria</h3>
        <p className="mb-4 text-gray-600">
          In Nigeria, policy in online marketing is largely driven by the **Federal Competition and Consumer Protection Act (FCCPCA)**, which empowers the FCCPC to safeguard consumer rights. This includes regulations against **unfair or deceptive marketing practices, false advertising, and misleading claims** about products or services.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Naijazone's Intellectual Property Protection</h3>
        <p className="mb-4 text-gray-600">
          Naijazone protects intellectual property rights in alignment with the three main Nigerian legislations: the **Copyright Act**, the **Patents and Designs Act**, and the **Trade Marks Act**.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">Why This Policy Exists</h3>
        <p className="mb-4 text-gray-600">
          The primary purpose is to protect customers against unfair or deceptive marketing practices, false advertising, and misleading claims about products or services.
        </p>

        <p className="font-medium text-gray-800 border-l-4 border-teal-500 pl-3 py-1">
          The images and product details shown here are from Naijazone's product catalog, provided by customers and third parties, and can be used by all sellers for additional product information.
        </p>
      </section>

      {/* ========================================================= */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-4 border-t">
          2. Frequently Asked Questions (FAQ)
        </h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">What content is allowed?</h3>
        <p className="text-gray-600 mb-4">
          You may use images, videos, or text on Naijazone as long as your use of that content does not infringe third-party rights and the content follows our **Offensive materials policy**.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">What if my content is used by another seller?</h3>
        <p className="text-gray-600 mb-4">
          When you create listings, you grant Naijazone and its customers permission (via our User Agreement) to use your images, videos, and product details. Your content may be added to the Naijazone product catalog and used by other sellers. You may contact the seller directly and ask them to remove your image or text if it is **not** part of the Naijazone product catalog.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">Can I copy content from other websites?</h3>
        <p className="text-red-700 font-medium mb-4">
          **No.** You cannot use images or videos from a manufacturer's website, even if it is publicly available. Copying content from other websites or internet searches may be considered copyright infringement.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">Common Reasons for Content Rejection</h3>
        <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600">
          <li>**Exceeding maximum size:** Videos over 150MB are not allowed (videos shorter than 1 minute are recommended).</li>
          <li>**Poor quality:** Blurry, undefined, or distorted content is not allowed.</li>
          <li>**Illegal content:** Content violating the Illegal explicit content policy.</li>
          <li>**Offensive content:** Promotion or glorifying hatred, violence, or discrimination.</li>
          <li>**Nudity and sexual content:** Violates the Adult items policy.</li>
          <li>**Infringing content:** Used without permission from the respective rights owner.</li>
          <li>**Directing buyers off Naijazone:** Content including contact information, web links, URLs, or calls to action to other sites (e.g., "Go to xyz.com to learn more").</li>
          <li>**Personally Identifiable Information:** Publishing any personally identifiable information.</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Using pictures in feedback</h3>
        <p className="text-gray-600">
            When leaving feedback, pictures must accurately represent the item purchased and follow all policies, including the **Feedback policy, Offensive materials policy, Adult items policy, and Illegal explicit content policy.**
        </p>
      </section>

      {/* ========================================================= */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-4 border-t">
          3. Explicit Content Policy
        </h2>

        <p className="text-red-800 font-bold mb-2">
            We never allow any listings or content depicting or describing child pornography, whether real or fictionalized.
        </p>
        <p className="text-red-800 font-bold mb-4">
            We never allow any listings or content depicting or describing bestiality, torture, snuff films, necrophilia, rape, scat, incest, or other illegal or obscene contents, whether real or fictionalized.
        </p>
        
        <p className="text-gray-600">
            Activities on Naijazone must follow this policy, the **Naijazone User Agreement**, and all applicable laws. Failure to comply may result in action, including: **Removing the listing, issuing a warning, restricting activity, or account suspension.**
        </p>
      </section>

      {/* ========================================================= */}

      <section className="pt-4 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          4. Naijazone Feedback Policy
        </h2>

        <p className="text-gray-600 mb-4">
          Our policy ensures that feedback is useful for both buyers and sellers, prohibiting harmful, inappropriate, or irrelevant comments. We encourage sellers to reply to negative feedback professionally.
        </p>
        
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Feedback Removal Process</h3>
        <p className="text-gray-600 mb-4">
            Feedback is proactively reviewed by automation, and unclear cases are manually reviewed. Sellers can request removal through **Seller Help**. If removal qualifies, you will be notified and the feedback removed within 24 hours.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">When We Remove Feedback</h3>
        <p className="text-gray-600 font-bold mt-4">Harmful, Inappropriate or Irrelevant Content:</p>
        <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
            <li>Content promoting hatred, violence, or discrimination.</li>
            <li>Profane, obscene, adult, illegal, or explicit content.</li>
            <li>Opinions on any political, religious, or social issues.</li>
            <li>Implied or explicit threats or intimidation.</li>
            <li>Personally identifiable information.</li>
            <li>Links, URLs, or other content encouraging sales outside of Naijazone.</li>
            <li>Infringement of third-party rights.</li>
            <li>Meaningless content or images that aren’t of the item purchased.</li>
            <li>Comments intended for a different item or seller.</li>
            <li>Negative comments with positive ratings, or vice versa.</li>
            <li>Personal attacks that could harm the reputation of the seller.</li>
            <li>Pictures that violate the **Images, videos and text policy** or other related policies.</li>
        </ul>
        
        <p className="text-gray-600 font-bold mt-4">Extortion and Manipulation:</p>
        <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600">
            <li>Feedback used as a means to extort another member(s).</li>
            <li>Feedback used to manipulate ratings (see our **Feedback manipulation policy**).</li>
        </ul>
      </section>
      
      <div className="mt-8 pt-4 border-t text-sm text-gray-500 text-center">
        <p>This policy is subject to the Naijazone User Agreement and all applicable laws.</p>
      </div>
      
    </div>
        </section>
    )
}

export default TermsAndCondition