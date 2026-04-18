import { ThemeToggler } from "@/shared/components/theme-toggler";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { id: "home", label: "الرئيسية" },
    { id: "instructors", label: "المدربين" },
    { id: "how-it-works", label: "كيف تبدأ" },
    { id: "features", label: "المميزات" },
    { id: "contact", label: "تواصل معنا" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    setActiveSection(section);

    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });

    setMobileMenuOpen(false);
  };

  return (
    <nav dir="rtl" className="fixed top-0 left-0 w-full z-50">
      {/* Glass Bar */}
      <div
        className="
        backdrop-blur-xl 
        bg-white/70 dark:bg-black/50
        border-b border-gray-200 dark:border-white/10
      "
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="font-semibold text-lg text-gray-800 dark:text-white">
            مدرسة القيادة الذكية
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleSmoothScroll(e, section.id)}
                className={`
                  relative px-3 py-1.5 text-sm font-medium transition
                  ${
                    activeSection === section.id
                      ? "text-[#00E5FF]"
                      : "text-gray-600 dark:text-gray-300 hover:text-[#00E5FF]"
                  }
                `}
              >
                {section.label}

                {activeSection === section.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#00E5FF] rounded-full"
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeToggler />

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-white border border-gray-300 dark:border-white/20 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                تسجيل الدخول
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 text-sm font-medium text-white bg-[#00E5FF] rounded-lg hover:opacity-90 transition"
              >
                إنشاء حساب
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                md:hidden 
                text-white 
                bg-[#00E5FF]
                px-3 py-1.5 
                rounded-lg 
                hover:opacity-90
                transition
              "
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="
          md:hidden 
          bg-white dark:bg-black 
          border-b border-gray-200 dark:border-white/10 
          px-4 py-3
        "
        >
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleSmoothScroll(e, section.id)}
              className={`
                block py-3 border-b border-gray-200 dark:border-white/10
                ${
                  activeSection === section.id
                    ? "text-[#00E5FF]"
                    : "text-gray-600 dark:text-gray-300"
                }
              `}
            >
                {section.label}
            </a>
          ))}

          {/* Auth Buttons (Mobile) */}
          <div className="flex flex-col gap-2 mt-3">
            <Link
              to="/login"
              className="w-full text-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white border border-gray-300 dark:border-white/20 rounded-lg"
            >
              تسجيل الدخول
            </Link>

            <Link
              to="/register"
              className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-[#00E5FF] rounded-lg"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;