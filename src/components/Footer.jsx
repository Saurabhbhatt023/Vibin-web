import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-10 rounded">
      {/* Navigation Links */}
      <nav
        className="grid grid-flow-col gap-4 text-sm font-medium"
        aria-label="Footer navigation"
      >
        <Link to="/about" className="link link-hover">
          About Us
        </Link>
        <Link to="/privacy-policy" className="link link-hover">
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" className="link link-hover">
          Terms of Service
        </Link>
        <Link to="/refund-policy" className="link link-hover">
          Refund Policy
        </Link>
      </nav>

      {/* Social Media Icons */}
      <nav aria-label="Social media" className="flex gap-6">
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:scale-110 transition-transform duration-200"
        >
          <svg
            className="w-6 h-6 fill-current text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-..." />
          </svg>
        </a>
        <a
          href="https://youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:scale-110 transition-transform duration-200"
        >
          <svg
            className="w-6 h-6 fill-current text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19.615 3.184c-..." />
          </svg>
        </a>
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:scale-110 transition-transform duration-200"
        >
          <svg
            className="w-6 h-6 fill-current text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M9 8h-..." />
          </svg>
        </a>
      </nav>

      {/* Copyright */}
      <aside className="text-sm mt-4 text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} – All rights reserved by{" "}
          <span className="font-semibold text-black">ACME Industries Ltd</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
