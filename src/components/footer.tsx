import { Car, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-right">
        <div>
          <div className="flex items-center justify-end gap-2 font-bold text-lg mb-3">
            <span className="text-gradient">القيادة الذكية</span>
            <span className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Car className="w-5 h-5 text-primary-foreground" />
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            المنصة الأولى لتعليم القيادة في مصر بأحدث الطرق وأكفأ المدربين.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#home" className="hover:text-primary transition-smooth">الرئيسية</a></li>
            <li><a href="#how-it-works" className="hover:text-primary transition-smooth">كيف تبدأ</a></li>
            <li><a href="#basics" className="hover:text-primary transition-smooth">الدروس</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3">تابعنا</h4>
          <div className="flex justify-end gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:shadow-glow transition-smooth">
                <Icon className="w-4 h-4 text-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} القيادة الذكية. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer