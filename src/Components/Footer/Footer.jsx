import React from "react";
import footerLogo from "../../assets/logo-footer.png"; 

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <img
            src = {footerLogo} 
            alt="Rupsha Logo"
            className="w-28 h-24"
          />
          <p>
            <span className="font-bold text-lg">Rupsha </span>
            <br />
            Connecting global suppliers with bulk buyers.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Categories</h6>
          <a className="link link-hover">Electronics</a>
          <a className="link link-hover">Fashion & Apparel</a>
          <a className="link link-hover">Home Appliances</a>
          <a className="link link-hover">Machinery</a>
        </nav>

        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Support</a>
          <a className="link link-hover">Careers</a>
        </nav>

        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Return Policy</a>
        </nav>
      </footer>

      {/* Copyright Section */}
      <div className="text-center bg-base-300 text-sm text-gray-600 py-4">
        © {new Date().getFullYear()} <span className="font-semibold">Rupsha</span>. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
