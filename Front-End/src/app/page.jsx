
import Button from "@/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "خانه - وب اپلیکیشن مدیریت بلاگ",
};

export default function Home() {
  return (
    <div className="mb-10 md:mb-0 px-4">
      <h1 className="font-extrabold text-center text-3xl md:text-5xl text-secondary-800 py-20">
        اپلیکیشن مدیریت بلاگ
      </h1>

      <div>
        <p className="text-center text-secondary-500  md:text-lg leading-loose">
          جایی که قراره بتونی یه اپلیکیشن بلاگ کامل رو مدیریت کنی!
          <br /> بتونی بلاگ بسازی - کامنت بگذاری و در پنلت همه اتفاقات رو رصد
          کنی!
        </p>
        <div className="flex justify-center gap-x-8 w-full mt-10">
          <Button variant="outline">
            <Link href="/home">بزن بریم!</Link>
          </Button>
          <Button variant="primary">
            <Link href="/profile">مدیریت بلاگ ها</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
