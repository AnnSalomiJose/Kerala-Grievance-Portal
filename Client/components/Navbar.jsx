
// import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
// import { useState } from "react";

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", link: "#home" },
//     { name: "About Us", link: "#about" },
//     { name: "How It Works", link: "#how-it-works" },
//     { name: "Departments", link: "#departments" },
//     { name: "Contact", link: "#contact" },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

//         <a href="#home" className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-xl font-bold text-white">
//             CM
//           </div>

//           <div>
//             <h1 className="text-lg font-bold text-blue-950">
//               CM Kerala
//             </h1>
//             <p className="text-xs text-gray-500">
//               Public Grievance Portal
//             </p>
//           </div>
//         </a>

//         <div className="hidden items-center gap-7 lg:flex">
//           {navLinks.map((item) => (
//             <a
//               key={item.name}
//               href={item.link}
//               className="text-sm font-medium text-gray-600 transition hover:text-blue-800"
//             >
//               {item.name}
//             </a>
//           ))}
//         </div>

//         <div className="hidden items-center gap-3 lg:flex">
//           <a
//             href="#login"
//             className="rounded-lg border border-blue-900 px-5 py-2.5 text-sm font-semibold text-blue-900 hover:bg-blue-50"
//           >
//             Login
//           </a>

//           <a
//             href="#register"
//             className="flex items-center gap-2 rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
//           >
//             Register
//             <FiArrowUpRight />
//           </a>
//         </div>

//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="text-2xl text-blue-950 lg:hidden"
//           aria-label="Toggle navigation"
//         >
//           {menuOpen ? <FiX /> : <FiMenu />}
//         </button>
//       </div>

//       {menuOpen && (
//         <div className="border-t border-gray-200 bg-white px-5 py-5 lg:hidden">
//           <div className="flex flex-col gap-4">
//             {navLinks.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.link}
//                 onClick={() => setMenuOpen(false)}
//                 className="font-medium text-gray-700"
//               >
//                 {item.name}
//               </a>
//             ))}

//             <a href="#login" className="font-semibold text-blue-900">
//               Login
//             </a>

//             <a
//               href="#register"
//               className="rounded-lg bg-blue-900 px-4 py-3 text-center font-semibold text-white"
//             >
//               Register
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "How It Works", link: "/how-it-works" },
    { name: "Departments", link: "/departments" },
     { name: "FAQ", link: "/faq" },
    { name: "Contact", link: "/contact" },
    
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-xl font-bold text-white">
            CM
          </div>

          <div>
            <h1 className="text-lg font-bold text-blue-950">
              CM Kerala
            </h1>
            <p className="text-xs text-gray-500">
              Public Grievance Portal
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="text-sm font-medium text-gray-600 transition hover:text-blue-800"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="rounded-lg border border-blue-900 px-5 py-2.5 text-sm font-semibold text-blue-900 hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Register
            <FiArrowUpRight />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-blue-950 lg:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-blue-900"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-blue-900 px-4 py-3 text-center font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
