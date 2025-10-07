'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsModalProps {
  contract: boolean; // business.contract
  onAgree?: () => void; // optional callback when user accepts
}

const TermsModal: React.FC<TermsModalProps> = ({ contract, onAgree }) => {
  const [show, setShow] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contract) {
      setShow(true);
    }
  }, [contract]);

  const handleScroll = () => {
    const div = scrollRef.current;
    if (div) {
      const isAtBottom = div.scrollTop + div.clientHeight >= div.scrollHeight - 10;
      setScrolledToBottom(isAtBottom);
    }
  };

  const handleAgree = () => {
    if (onAgree) onAgree();
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-[90%] md:w-[600px] max-h-[80vh] rounded-2xl shadow-xl p-6 overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Vendor Terms & Conditions
            </h2>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto border p-4 rounded-md text-sm space-y-3"
            >
              <p>
                Welcome to our Vendor Agreement. Please read these terms and conditions
                carefully before using our platform or services. By engaging as a vendor,
                you agree to comply with all terms listed below.
              </p>
              <p>
                1. Vendors are responsible for the accuracy and quality of all information
                and products they upload.
              </p>
              <p>
                2. Misleading or false information will lead to suspension or termination
                of your vendor account.
              </p>
              <p>
                3. Vendors agree to abide by all local and international trade laws and
                regulations.
              </p>
              <p>
                4. Payments, refunds, and commissions will be processed according to the
                platform’s financial policy.
              </p>
              <p>
                5. The company reserves the right to review, modify, or terminate vendor
                agreements at any time, with reasonable notice.
              </p>
              <p>
                6. By clicking “Agree”, you acknowledge that you have read, understood,
                and accepted all the terms above.
              </p>

              <p>
                Thank you for being a part of our platform. Please scroll down to confirm
                your agreement.
              </p>
               <p>
                Welcome to our Vendor Agreement. Please read these terms and conditions
                carefully before using our platform or services. By engaging as a vendor,
                you agree to comply with all terms listed below.
              </p>
              <p>
                1. Vendors are responsible for the accuracy and quality of all information
                and products they upload.
              </p>
              <p>
                2. Misleading or false information will lead to suspension or termination
                of your vendor account.
              </p>
              <p>
                3. Vendors agree to abide by all local and international trade laws and
                regulations.
              </p>
              <p>
                4. Payments, refunds, and commissions will be processed according to the
                platform’s financial policy.
              </p>
              <p>
                5. The company reserves the right to review, modify, or terminate vendor
                agreements at any time, with reasonable notice.
              </p>
              <p>
                6. By clicking “Agree”, you acknowledge that you have read, understood,
                and accepted all the terms above.
              </p>

              <p>
                Thank you for being a part of our platform. Please scroll down to confirm
                your agreement.
              </p>
              <p className="font-bold">Last updated: October 2025</p>
            </div>

            <button
              onClick={handleAgree}
              disabled={!scrolledToBottom}
              className={`mt-4 py-2 rounded-lg transition-all ${
                scrolledToBottom
                  ? 'bg-green-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {scrolledToBottom ? 'Agree to Terms & Conditions' : 'Scroll to the bottom to agree'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
