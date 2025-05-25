import React from "react";
import Typography from "../../common/Typography";

const Footer = () => {
  return (
    <footer className="mt-5 p-5 w-full flex items-center gap-5">
      <Typography.Label label="Powered by" className="font-bold" />
      <div className="flex gap-5">
        <p>Noroff API</p>
        <p>OPENAI</p>
        <p>Google Maps API</p>
      </div>
    </footer>
  );
};

export default Footer;
