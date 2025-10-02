import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary-100 py-10 px-4 mt-16 border-t border-secondary-300 rounded-xl">
      <div className="container xl:max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: About Blue Blog */}
        <div>
          <h3 className="text-2xl font-semibold text-secondary-700 mb-4">
            درباره <span className="text-primary-900 font-black">بلو</span> بلاگ
          </h3>

          <p className="text-sm text-secondary-600 leading-relaxed mb-4">
            بلو بلاگ جایی‌ست برای اشتراک دانش، تجربه و داستان‌های الهام‌بخش در
            حوزه توسعه وب، طراحی و فریلنسینگ. اینجا می‌تونید مقالات تخصصی،
            آموزش‌ها و دیدگاه‌های تازه رو پیدا کنید.
          </p>
          <p className="text-sm text-secondary-600 leading-relaxed">
            هدف ما، ساخت یک جامعه حرفه‌ای و پرانرژی برای توسعه‌دهندگان و
            خلاق‌هاست.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-5 mt-6">
            <a
              href="#"
              className="text-secondary-400 hover:text-primary-900 transition duration-300"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-secondary-400 hover:text-primary-900 transition duration-300"
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-secondary-400 hover:text-primary-900 transition duration-300"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-secondary-400 hover:text-primary-900 transition duration-300"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-700 mb-4">
            لینک‌های مفید
          </h3>
          <ul className="space-y-2 text-sm text-secondary-600 text-right leading-6">
            <li>
              <a href="/blogs" className="hover:text-primary-800">
                بلاگ‌ها
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-primary-800">
                دسته‌بندی‌ها
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-primary-800">
                درباره ما
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-primary-800">
                تماس با ما
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-primary-800">
                قوانین و حریم خصوصی
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Popular Topics */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-700 mb-4">
            موضوعات پرطرفدار
          </h3>
          <ul className="space-y-2 text-sm text-secondary-600 text-right leading-6">
            <li>
              <a href="/tags/react" className="hover:text-primary-800">
                React.js
              </a>
            </li>
            <li>
              <a href="/tags/freelancing" className="hover:text-primary-800">
                فریلنسینگ
              </a>
            </li>
            <li>
              <a href="/tags/ui-ux" className="hover:text-primary-800">
                طراحی UI/UX
              </a>
            </li>
            <li>
              <a href="/tags/javascript" className="hover:text-primary-800">
                JavaScript
              </a>
            </li>
            <li>
              <a href="/tags/portfolio" className="hover:text-primary-800">
                ساخت پورتفولیو
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Trust & Certification */}
        <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:mt-0">
          <img
            src="/images/zplogo.jpg"
            alt="زرین پال"
            className="w-24 h-auto rounded cursor-pointer hover:scale-105 transition-transform"
          />
          <img
            src="/images/ENAMAD.png"
            alt="نماد اعتماد"
            className="w-24 h-auto rounded cursor-pointer hover:scale-105 transition-transform"
          />
        </div>
      </div>

      <div className="text-center text-sm text-secondary-600 mt-10 border-t pt-6 border-secondary-200">
        <p>&copy; 2025 بلو بلاگ. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}
