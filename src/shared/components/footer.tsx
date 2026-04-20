import { Car, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10 text-right">
        
        {/* Logo */}
        <div>
          <div className="flex items-center justify-end gap-3 font-bold text-lg mb-4">
            <span className="text-gradient">دركسيون</span>
            <span className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <Car className="w-5 h-5 text-primary-foreground" />
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-6 max-w-sm mr-auto">
            المنصة الأولى لتعليم القيادة في مصر بأحدث الطرق وأكفأ المدربين.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-5">روابط سريعة</h4>

          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              { href: "#home", label: "الرئيسية" },
              { href: "#how-it-works", label: "كيف تبدأ" },
              { href: "#basics", label: "الدروس" },
            ].map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="relative inline-block group transition-all"
                >
                  {link.label}

                  {/* underline animation */}
                  <span className="absolute right-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-bold mb-5">تابعنا</h4>

          <div className="flex justify-end gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="group w-11 h-11 rounded-xl border border-border flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} القيادة الذكية. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;