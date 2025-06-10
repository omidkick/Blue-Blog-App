function Logo() {
  return (
    <div className="flex items-center rtl:space-x-reverse gap-x-2">
      <img
        src="/images/Logo.png"
        alt="Logo"
        className="h-6 lg:h-9 w-6 lg:w-9"
      />
      <div className="flex items-center space-x-1 lg:space-x-2 rtl:space-x-reverse">
        <span className="text-primary-900 font-black text-2xl lg:text-3xl">
          بلو
        </span>
        <span className="text-slate-400 font-bold text-base lg:text-2xl">
          بلاگ
        </span>
      </div>
    </div>
  );
}

export default Logo;
