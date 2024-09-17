import React from 'react'
const GoogleMapEmbed = () => {
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.4729100739933!2d7.022166680562655!3d4.860128682521301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d3356c536691%3A0x545520791186f2d3!2sPristine%20Medical%20Consultants!5e0!3m2!1sen!2sng!4v1726304749925!5m2!1sen!2sng"
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