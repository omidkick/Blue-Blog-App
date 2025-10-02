import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";

// Force static generation
export const dynamic = "force-static";

// Static metadata
export const metadata = {
  title: {
    absolute: "درباره بلو بلاگ",
  },
  description:
    "بلو بلاگ پلتفرمی برای نویسندگان و خوانندگان است تا ایده‌ها و مقالات خود را به اشتراک بگذارند.",
};

function About() {
  return (
    <section className="container xl:max-w-screen-xl px-4 py-6 sm:py-8 md:py-12 text-secondary-600 space-y-20 sm:space-y-24 md:space-y-32">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 sm:gap-12 md:gap-16 text-center md:text-right">
        <div className="flex-1 space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-500 mb-6 sm:mb-8">
            درباره{" "}
            <span className="text-primary-900 text-5xl sm:text-6xl md:text-7xl">
              بلو
            </span>{" "}
            بلاگ
          </h1>
          <p className="text-base sm:text-lg leading-relaxed sm:leading-loose">
            بلو بلاگ یک پلتفرم خلاقانه برای نویسندگان و خوانندگان است. اینجا
            می‌توانید آخرین مقالات را بخوانید، نظرات خود را به اشتراک بگذارید و
            اگر علاقه‌مند به نویسندگی هستید، بلاگ خود را راه‌اندازی کنید.
          </p>
        </div>
        <div className="flex-1 max-w-md mx-auto">
          <img
            src="/images/Woman reading-bro.svg"
            alt="Reading Illustration"
            className="mx-auto w-full h-auto"
          />
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {/* Reading */}
        <div className="p-5 sm:p-6 bg-secondary-100 border border-secondary-200 rounded-2xl shadow text-center space-y-3 sm:space-y-4">
          <img
            src="/images/Reading list-rafiki.svg"
            alt="Reading Blogs"
            className="mx-auto w-full h-auto max-w-xs sm:max-w-sm"
          />
          <h2 className="text-xl sm:text-2xl font-semibold text-secondary-500">
            مطالعه بلاگ‌ها
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            در بلو بلاگ می‌توانید به جدیدترین مقالات در حوزه‌های مختلف مثل
            تکنولوژی، توسعه فردی، سبک زندگی و موضوعات روز دسترسی داشته باشید.
          </p>
        </div>

        {/* Writing */}
        <div className="p-5 sm:p-6 bg-secondary-100 border border-secondary-200 rounded-2xl shadow text-center space-y-3 sm:space-y-4">
          <img
            src="/images/Novelist writing-bro.svg"
            alt="Writing Blogs"
            className="mx-auto w-full h-auto max-w-xs sm:max-w-sm"
          />
          <h2 className="text-xl sm:text-2xl font-semibold text-secondary-500">
            نوشتن بلاگ شخصی
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            اگر علاقه‌مند به نویسندگی هستید، می‌توانید به راحتی بلاگ خود را
            ایجاد کرده و تجربیات و دانش خود را با دیگران به اشتراک بگذارید.
          </p>
        </div>
      </div>

      {/* Founder */}
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-secondary-100 border border-secondary-200 rounded-xl p-5 sm:p-6 shadow">
        <div className="flex-1 max-w-md mx-auto">
          <img
            src="/images/Starting a business project-bro.svg"
            alt="Founder Illustration"
            className="mx-auto w-full h-auto"
          />
        </div>
        <div className="flex-1 text-center md:text-right space-y-3">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-500">
            درباره بنیان‌گذار
          </h3>
          <p className="text-sm sm:text-base leading-relaxed">
            من{" "}
            <strong className="font-black text-primary-900">
              امید جباری
            </strong>{" "}
            هستم، برنامه‌نویس و علاقه‌مند به دنیای وب و تولید محتوا. این پلتفرم
            را با هدف ایجاد فضایی برای رشد نویسندگان و به اشتراک‌گذاری ایده‌ها
            راه‌اندازی کرده‌ام.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 sm:space-y-8">
        <div className="max-w-xs sm:max-w-md mx-auto">
          <img
            src="/images/Creative writing-pana.svg"
            alt="Start Writing"
            className="mx-auto w-full h-auto"
          />
        </div>
        <h4 className="text-lg sm:text-xl font-semibold">
          می‌خواهی بلاگ خودت را شروع کنی؟
        </h4>
        <a
          href="/signin"
          className="inline-flex items-center gap-2 px-5 py-3 text-white bg-primary-900 hover:bg-primary-800 rounded-full text-sm sm:text-base shadow-lg transition"
        >
          <HiPencilSquare className="w-5 h-5" />
          شروع نویسندگی
        </a>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-x-5 sm:gap-x-6 text-secondary-500 mt-8 sm:mt-10">
        <a href="#" className="hover:text-primary-900" aria-label="Instagram">
          <FaInstagram size={22} />
        </a>
        <a href="#" className="hover:text-primary-900" aria-label="Telegram">
          <FaTelegram size={22} />
        </a>
        <a href="#" className="hover:text-primary-900" aria-label="Twitter">
          <FaTwitter size={22} />
        </a>
      </div>
    </section>
  );
}

export default About;
