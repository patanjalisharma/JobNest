import React from "react";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://facebook.com",
      label: "Facebook",
      path: "M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24h11.495v-9.293H9.413v-3.622h3.406V8.413c0-3.377 2.066-5.22 5.085-5.22 1.444 0 2.686.108 3.049.156v3.534l-2.094.001c-1.641 0-1.96.781-1.96 1.924v2.524h3.922l-.511 3.622h-3.411V24h6.689C23.408 24 24 23.408 24 22.676V1.324C24 .592 23.408 0 22.676 0z",
    },
    {
      href: "https://twitter.com",
      label: "Twitter",
      path: "M24 4.557a9.83 9.83 0 01-2.828.775 4.931 4.931 0 002.165-2.724 9.868 9.868 0 01-3.127 1.195 4.916 4.916 0 00-8.374 4.482A13.957 13.957 0 011.671 3.149a4.916 4.916 0 001.523 6.557 4.903 4.903 0 01-2.225-.616v.061a4.917 4.917 0 003.941 4.827 4.902 4.902 0 01-2.212.085 4.917 4.917 0 004.59 3.417A9.867 9.867 0 010 19.539a13.943 13.943 0 007.548 2.209c9.056 0 14.007-7.496 14.007-13.986 0-.21-.005-.423-.014-.633A9.936 9.936 0 0024 4.557z",
    },
    {
      href: "https://linkedin.com",
      label: "LinkedIn",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.04-1.851-3.04-1.853 0-2.136 1.446-2.136 2.938v5.671H9.352V9.551h3.414v1.482h.049c.477-.9 1.637-1.85 3.368-1.85 3.6 0 4.268 2.37 4.268 5.451v5.819zM5.337 8.069c-1.144 0-2.07-.927-2.07-2.07s.926-2.07 2.07-2.07c1.143 0 2.07.927 2.07 2.07s-.927 2.07-2.07 2.07zM7.119 20.452H3.555V9.551h3.564v10.901zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.542C0 23.226.792 24 1.771 24h20.454C23.205 24 24 23.226 24 22.27V1.728C24 .774 23.205 0 22.225 0z",
    },
  ];

  return (
    <footer className="py-10 border-t border-zinc-800 bg-[rgb(9,9,11)]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-white">JobNest</h2>
          <p className="text-sm text-gray-500 mt-1">
            © 2024 JobNest. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
