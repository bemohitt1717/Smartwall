import { Camera, CirclePlay, Globe, Music2, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/icons/smartwall-logo.svg";

const columns = [
  {
    title: "Explore",
    links: ["Find Your Color", "Paint Visualizer", "Color Collections", "About Us"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "FAQs", "Live Chat"],
  },
  {
    title: "Company",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Careers"],
  },
];

const socialLinks = [
  { icon: Camera, label: "Instagram", href: "#instagram" },
  { icon: Music2, label: "Pinterest", href: "#pinterest" },
  { icon: Globe, label: "Website", href: "#website" },
  { icon: CirclePlay, label: "YouTube", href: "#youtube" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#e8ecf4] bg-gradient-to-b from-white to-[#f9fafc] pb-[30px] pt-[70px]" id="about">
      {/* Decorative gradient orbs */}
      <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-[#6457ff]/10 to-transparent blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-80px] h-[250px] w-[250px] rounded-full bg-gradient-to-br from-[#7a7dff]/10 to-transparent blur-3xl" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              className="inline-flex w-max items-center gap-[10px] text-[22px] font-extrabold text-[#16213e] transition-transform duration-200 hover:scale-105"
              href="/"
              aria-label="SmartWall home"
            >
              <img src={logo} alt="" className="h-[32px] w-[32px]" />
              <span>SmartWall</span>
            </a>
            <p className="mt-[18px] max-w-[280px] text-[14px] font-semibold leading-[1.7] text-[#6d7688]">
              Transform your space with AI-powered color visualization. See before you paint.
            </p>

            {/* Contact info */}
            <div className="mt-[24px] space-y-[12px]">
              <a href="mailto:hello@smartwall.com" className="flex items-center gap-[10px] text-[13px] font-medium text-[#6d7688] transition-colors duration-200 hover:text-[#6457ff]">
                <Mail size={16} className="text-[#6457ff]" />
                hello@smartwall.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-[10px] text-[13px] font-medium text-[#6d7688] transition-colors duration-200 hover:text-[#6457ff]">
                <Phone size={16} className="text-[#6457ff]" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-[10px] text-[13px] font-medium text-[#6d7688]">
                <MapPin size={16} className="text-[#6457ff]" />
                San Francisco, CA
              </div>
            </div>

            {/* Social Links */}
            <div
              className="mt-[26px] flex items-center gap-[12px]"
              aria-label="Social links"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-[38px] w-[38px] place-items-center rounded-full border border-[#e8ecf4] bg-white text-[#5c6577] shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#6457ff] hover:text-[#6457ff] hover:shadow-[0_8px_20px_rgba(100,87,255,0.15)]"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* All 3 Link Columns together */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-[30px] sm:gap-[40px]">
            {columns.map((column, colIndex) => (
              <motion.div
                key={column.title}
                className="grid content-start gap-[14px] sm:gap-[16px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (colIndex + 1) }}
              >
                <h3 className="mb-[4px] sm:mb-[6px] text-[13px] sm:text-[15px] font-extrabold text-[#17213d]">
                  {column.title}
                </h3>
                {column.links.map((link) => (
                  <a
                    className="text-[12px] sm:text-[14px] font-medium text-[#6d7688] transition-colors duration-200 hover:text-[#6457ff]"
                    href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                    key={link}
                  >
                    {link}
                  </a>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-[60px] flex flex-col items-center justify-between gap-[20px] border-t border-[#e8ecf4] pt-[28px] md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="m-0 text-[13px] font-medium text-[#8a92a2]">
            &copy; 2024 SmartWall. All rights reserved.
          </p>
          <div className="flex items-center gap-[24px]">
            <a href="#privacy" className="text-[13px] font-medium text-[#8a92a2] transition-colors duration-200 hover:text-[#6457ff]">
              Privacy
            </a>
            <a href="#terms" className="text-[13px] font-medium text-[#8a92a2] transition-colors duration-200 hover:text-[#6457ff]">
              Terms
            </a>
            <a href="#cookies" className="text-[13px] font-medium text-[#8a92a2] transition-colors duration-200 hover:text-[#6457ff]">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
