import React from 'react'
const GoogleMapEmbed = () => {
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d655.0271751434425!2d7.056251056350324!3d4.831129290522809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cf35a4770d09%3A0x15c43938c6f401f4!2sNaijazone!5e0!3m2!1sen!2sng!4v1772539200207!5m2!1sen!2sng"
        height="450"
        style={{ border: 0, width: '100vw' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Embed"
      ></iframe>
    );
  };

const ContactMap = () => {
  return (
    <div>
        <GoogleMapEmbed />
    </div>
  )
}

export default ContactMap