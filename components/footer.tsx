"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#632c2d]/90 to-[#1e293b]/95 backdrop-blur-sm border-t border-[#F86531]/20 py-12 px-4 md:px-8">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F86531]/10 via-[#C42F35]/10 to-[#13324F]/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">

          {/* Contact Us Section */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold bg-gradient-to-r from-[#F86531] to-[#C42F35] bg-clip-text text-transparent mb-6">
              Contact Us
            </h5>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[#F86531] mt-1 group-hover:text-[#ff7340] transition-colors" />
                <p className="text-sm leading-relaxed">
                  Indian Institute of Technology<br />
                  (Banaras Hindu University)<br />
                  Varanasi, India<br />
                  PIN: 221005
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-[#F86531] group-hover:text-[#ff7340] transition-colors" />
                <a href="mailto:ecell@iitbhu.ac.in" className="text-sm hover:text-[#F86531] transition-colors">
                  ecell@iitbhu.ac.in
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-[#F86531] group-hover:text-[#ff7340] transition-colors" />
                <p className="text-sm">+91 9120787959</p>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold bg-gradient-to-r from-[#F86531] to-[#C42F35] bg-clip-text text-transparent mb-6">
              Important
            </h5>
            <div className="grid grid-cols-2 gap-y-2">
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-slate-300 hover:text-[#F86531] transition-colors hover:translate-x-1 inline-block">Home</Link></li>
                <li><Link href="https://www.ecelliitbhu.com/events/" target="blank" className="text-sm text-slate-300 hover:text-[#F86531] transition-colors hover:translate-x-1 inline-block">Events</Link></li>
                <li><Link href="https://www.ecelliitbhu.com/gallery/" target="blank" className="text-sm text-slate-300 hover:text-[#F86531] transition-colors hover:translate-x-1 inline-block">Gallery</Link></li>
                <li><Link href="https://www.ecelliitbhu.com/contacts/" target="blank" className="text-sm text-slate-300 hover:text-[#F86531] transition-colors hover:translate-x-1 inline-block">Contact Us</Link></li>
              </ul>

              <ul className="space-y-2">
                <li><Link href="https://www.ecelliitbhu.com/who_we_are/" target="blank" className="text-sm text-slate-300 hover:text-[#F86531] transition-colors hover:translate-x-1 inline-block">Who we are?</Link></li>
                <li><Link href="https://www.ecelliitbhu.com/events/" target="blank" className="text-sm text-slate-300 hover:text-[#F86531] transition-colors hover:translate-x-1 inline-block">How E-Cell works</Link></li>
                <li><Link href="https://www.ecelliitbhu.com/team/" target="blank" className="text-sm text-slate-300 hover:text-[#F86531] transition-colors hover:translate-x-1 inline-block">Meet the team</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold bg-gradient-to-r from-[#F86531] to-[#C42F35] bg-clip-text text-transparent mb-6">
              Stay Updated
            </h5>
            <iframe
              src="https://ecelliitbhu.substack.com/embed"
              className="w-full h-[190px] rounded-lg border border-[#F86531]/25 bg-[#0d2035]/60 backdrop-blur-sm shadow-lg shadow-[#F86531]/8"
              scrolling="no"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-8 border-t border-[#F86531]/20">
          <a href="https://www.linkedin.com/company/ecelliitbhu/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#13324F]/60 border border-[#F86531]/25 flex items-center justify-center hover:bg-[#F86531] hover:border-[#F86531] hover:shadow-lg hover:shadow-[#F86531]/40 transition-all duration-300 group">
            <Linkedin className="w-5 h-5 text-[#F86531] group-hover:text-white transition-colors" />
          </a>

          <a href="https://www.instagram.com/ecelliitbhu/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#13324F]/60 border border-[#F86531]/25 flex items-center justify-center hover:bg-[#F86531] hover:border-[#F86531] hover:shadow-lg hover:shadow-[#F86531]/40 transition-all duration-300 group">
            <Instagram className="w-5 h-5 text-[#F86531] group-hover:text-white transition-colors" />
          </a>

          <a href="https://www.facebook.com/ecelliitvaranasi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#13324F]/60 border border-[#F86531]/25 flex items-center justify-center hover:bg-[#F86531] hover:border-[#F86531] hover:shadow-lg hover:shadow-[#F86531]/40 transition-all duration-300 group">
            <Facebook className="w-5 h-5 text-[#F86531] group-hover:text-white transition-colors" />
          </a>

          <a href="https://twitter.com/ecelliitbhu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#13324F]/60 border border-[#F86531]/25 flex items-center justify-center hover:bg-[#F86531] hover:border-[#F86531] hover:shadow-lg hover:shadow-[#F86531]/40 transition-all duration-300 group">
            <Twitter className="w-5 h-5 text-[#F86531] group-hover:text-white transition-colors" />
          </a>

          <a href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#13324F]/60 border border-[#F86531]/25 flex items-center justify-center hover:bg-[#F86531] hover:border-[#F86531] hover:shadow-lg hover:shadow-[#F86531]/40 transition-all duration-300 group">
            <Youtube className="w-5 h-5 text-[#F86531] group-hover:text-white transition-colors" />
          </a>

          <a href="https://discord.com/invite/EPm5mfbCKP" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#13324F]/60 border border-[#F86531]/25 flex items-center justify-center hover:bg-[#F86531] hover:border-[#F86531] hover:shadow-lg hover:shadow-[#F86531]/40 transition-all duration-300 group">
            <FaDiscord className="w-5 h-5 text-[#F86531] group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-[#F86531]/20">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} E-Cell IIT BHU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
