function Layout({ children }) {
  return (
    <div className="flex items-center  ">
      <div className="w-full bg-secondary-0">{children}</div>
    </div>
  );
}

export default Layout;



//! OLD:
// function Layout({ children }) {
//   return (
//     <div className="flex items-center justify-center mt-16 ">
//       <div className="w-full max-w-md p-2 ">{children}</div>
//     </div>
//   );
// }

// export default Layout;
