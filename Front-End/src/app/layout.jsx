import iranYekanFont from "@/constants/localFont";
import AuthProvider from "@/context/AuthContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import NextThemeProvider from "@/context/ThemeProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata = {
  title: {
    template: "%s |  بلو بلاگ",
    default: "بلو بلاگ",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${iranYekanFont.variable} font-sans min-h-screen `}>
        <NextThemeProvider>
          <Toaster position="top-center" />
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
