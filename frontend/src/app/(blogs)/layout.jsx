import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SidebarWrapper from "@/components/SidebarWrapper";
import { SidebarProvider } from "@/context/SidebarContext";

function layout({children}) {
  return (
    <>
      <SidebarProvider>
        <Header />
        <SidebarWrapper />
        <div className="container xl:max-w-screen-xl">{children}</div>
        <Footer/>
      </SidebarProvider>
    </>
  );
}

export default layout;
