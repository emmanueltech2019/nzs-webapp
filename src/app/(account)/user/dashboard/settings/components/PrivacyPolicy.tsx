'use client'
import TagHeader from '@/components/header/TagHeader';
import TransactionTab from '@/components/tabs/PolicyTab';
import { useState } from 'react';
import openSansFont from '@/fonts/OpenSans';

const Transactions = () => {


  const [activeTab, setActiveTab] = useState('policy');

  return (
    <div className={`max-w-2xl mx-auto px-4 py-6 ${openSansFont}`}>
      <TagHeader title='Privacy Policy' />

      <TransactionTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == 'policy' ?
        (<div className='incoming'>
           <section>
        <h2>1. Introduction</h2>
        <p>Welcome to [Your Company Name]! We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
    </section>

    <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect both personal and non-personal information from you when you use our website. This may include:</p>
        <ul>
            <li><strong>Personal Information:</strong> Such as your name, email address, phone number, and any other details you provide when you contact us or sign up.</li>
            <li><strong>Usage Data:</strong> Information about your interactions with our website, including IP address, browser type, and browsing activity.</li>
            <li><strong>Cookies:</strong> Our website may use cookies to enhance user experience. You may disable cookies in your browser settings if you wish.</li>
        </ul>
    </section>

    <section>
        <h2>3. How We Use Your Information</h2>
        <p>We may use the information we collect for the following purposes:</p>
        <ul>
            <li>To provide, operate, and maintain our website.</li>
            <li>To improve, personalize, and expand our website functionality.</li>
            <li>To communicate with you, including responding to your inquiries and customer service requests.</li>
            <li>To send you updates, promotional materials, and other information you may be interested in, unless you opt out.</li>
        </ul>
    </section>

    <section>
        <h2>4. How We Protect Your Information</h2>
        <p>Your privacy is important to us. We employ industry-standard security measures to protect your information from unauthorized access, use, or disclosure.</p>
    </section>

    <section>
        <h2>5. Third-Party Disclosure</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except as required by law or with your consent. However, we may share data with trusted service providers who assist us in operating our website, provided they agree to keep this information confidential.</p>
    </section>

    <section>
        <h2>6. Your Privacy Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information. These may include the right to access, correct, or delete your data. To exercise these rights, please contact us at info@naijazoneonline.com.</p>
    </section>

    <section>
        <h2>7. Children's Privacy</h2>
        <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe that a child under 13 has provided us with personal information, please contact us so that we can take appropriate action.</p>
    </section>

    <section>
        <h2>8. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the date at the top will be updated accordingly. We encourage you to review this policy periodically for any updates.</p>
    </section>

    <section>
        <h2>9. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:info@naijazoneonline.com">info@naijazoneonline.com</a></p>
        <p>Address: ...</p>
    </section>
        </div>)
        : activeTab == 'security' ?
          (<div className='security'>
                      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to [Your Company Name]! We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
    </section>

    <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect both personal and non-personal information from you when you use our website. This may include:</p>
        <ul>
            <li><strong>Personal Information:</strong> Such as your name, email address, phone number, and any other details you provide when you contact us or sign up.</li>
            <li><strong>Usage Data:</strong> Information about your interactions with our website, including IP address, browser type, and browsing activity.</li>
            <li><strong>Cookies:</strong> Our website may use cookies to enhance user experience. You may disable cookies in your browser settings if you wish.</li>
        </ul>
    </section>

    <section>
        <h2>3. How We Use Your Information</h2>
        <p>We may use the information we collect for the following purposes:</p>
        <ul>
            <li>To provide, operate, and maintain our website.</li>
            <li>To improve, personalize, and expand our website functionality.</li>
            <li>To communicate with you, including responding to your inquiries and customer service requests.</li>
            <li>To send you updates, promotional materials, and other information you may be interested in, unless you opt out.</li>
        </ul>
    </section>

    <section>
        <h2>4. How We Protect Your Information</h2>
        <p>Your privacy is important to us. We employ industry-standard security measures to protect your information from unauthorized access, use, or disclosure.</p>
    </section>

    <section>
        <h2>5. Third-Party Disclosure</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except as required by law or with your consent. However, we may share data with trusted service providers who assist us in operating our website, provided they agree to keep this information confidential.</p>
    </section>

    <section>
        <h2>6. Your Privacy Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information. These may include the right to access, correct, or delete your data. To exercise these rights, please contact us at info@naijazoneonline.com.</p>
    </section>

    <section>
        <h2>7. Children's Privacy</h2>
        <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe that a child under 13 has provided us with personal information, please contact us so that we can take appropriate action.</p>
    </section>

    <section>
        <h2>8. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the date at the top will be updated accordingly. We encourage you to review this policy periodically for any updates.</p>
    </section>

    <section>
        <h2>9. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:info@naijazoneonline.com">info@naijazoneonline.com</a></p>
        <p>Address: ...</p>
    </section>
          </div>)
          : (
            <div>
              
            </div>
          )}


    </div>
  );
};

export default Transactions;
