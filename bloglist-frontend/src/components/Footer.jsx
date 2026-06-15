import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 mt-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">Blog List</h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              The Bloglist app is a secure and interactive blogging platform where users can create accounts, log in, and manage blog posts. Each blog contains details such as title, author, URL, and number of likes.
               Authenticated users can perform operations based on ownership and permissions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-white transition" href="/">Blogs</a></li>
              <li><a className="hover:text-white transition" href="/">Users</a></li>
              <li><a className="hover:text-white transition" href="/create">New Blog</a></li>
              <li><a className="hover:text-white transition" href="/">Logout</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a className="hover:text-white transition" href="https://github.com/ebuka-fullstack">GitHub</a>
              <a className="hover:text-white transition" href="https://linkedin.com/in/ebukachris">LinkedIn</a>
              <a className="hover:text-white transition" href="https://instagram.com/ebuka_chris">Instagram</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Blog List. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;