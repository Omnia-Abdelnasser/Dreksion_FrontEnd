import { Car, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
   return (
      <footer id='contact' className='mt-16 border-t border-border'>
         <div className='mx-auto grid max-w-7xl gap-10 px-6 py-14 text-right md:grid-cols-3'>
            {/* Logo */}
            <div>
               <div className='mb-4 flex items-center justify-end gap-3 text-lg font-bold'>
                  <span className='text-gradient'>القيادة الذكية</span>
                  <span className='bg-gradient-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-md'>
                     <Car className='h-5 w-5 text-primary-foreground' />
                  </span>
               </div>

               <p className='mr-auto max-w-sm text-sm leading-6 text-muted-foreground'>
                  المنصة الأولى لتعليم القيادة في مصر بأحدث الطرق وأكفأ
                  المدربين.
               </p>
            </div>

            {/* Links */}
            <div>
               <h4 className='mb-5 font-bold'>روابط سريعة</h4>

               <ul className='space-y-3 text-sm text-muted-foreground'>
                  {[
                     { href: '#home', label: 'الرئيسية' },
                     { href: '#how-it-works', label: 'كيف تبدأ' },
                     { href: '#basics', label: 'الدروس' },
                  ].map((link, i) => (
                     <li key={i}>
                        <a
                           href={link.href}
                           className='group relative inline-block transition-all'
                        >
                           {link.label}

                           {/* underline animation */}
                           <span className='absolute -bottom-1 right-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full'></span>
                        </a>
                     </li>
                  ))}
               </ul>
            </div>

            {/* Social */}
            <div>
               <h4 className='mb-5 font-bold'>تابعنا</h4>

               <div className='flex justify-end gap-4'>
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                     <a
                        key={i}
                        href='#'
                        className='group flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40'
                     >
                        <Icon className='h-5 w-5 text-muted-foreground transition group-hover:text-primary' />
                     </a>
                  ))}
               </div>
            </div>
         </div>

         {/* Bottom */}
         <div className='border-t border-border py-5 text-center text-xs text-muted-foreground'>
            © {new Date().getFullYear()} القيادة الذكية. جميع الحقوق محفوظة.
         </div>
      </footer>
   );
};

export default Footer;
