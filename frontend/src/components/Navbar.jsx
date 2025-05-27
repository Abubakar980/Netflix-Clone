// import { LogOut, Search } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "./store/authUser";


// const Navbar = () => {

//     const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const toggleMobileMenu = () =>  setMobileMenuOpen(!isMobileMenuOpen);
//     const {user, logout} = useAuthStore();



//   return (
//     <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
//         <div className="flex items-center gap-10 z-50">
//             <Link to="/">
//               <img src="/netflix-logo.png" alt="Netflix Logo" className="w-32 sm:w-40"/>
//             </Link>

//             <div className="hiddne sm:flex items-center gap-2">
//                 <Link to="/" className="hover:underline">Movies</Link>
//                 <Link to="/" className="hover:underline">Tv Shows</Link>
//                 <Link to="/history" className="hover:underline">Search History</Link>
//             </div>
//         </div>

//         <div className="flex gap-2 items-center z-50">
//             <Link to={"/search"}>
//             <Search className="size-6 cursor-pointer"/>
//             </Link>
//             <img src={user.image} alt="Avatar" className="h-8 rounded cursor-pointer"/>
//             <LogOut className="size-6 cursor-pointer" onClick={logout}/>
//         </div>

//         {isMobileMenuOpen && (
//             <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
//                 <Link to={"/"} className="block hover:underline p-2" onClick={toggleMobileMenu}>Movied</Link>
//                 <Link to={"/"} className="block hover:underline p-2" onClick={toggleMobileMenu}>Tv Shows</Link>
//                 <Link to={"/history"} className="block hover:underline p-2" onClick={toggleMobileMenu}>Search History</Link>
//             </div>
//         )}
      
//     </header>
//   )
// }

// export default Navbar







import { LogOut, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "./store/authUser";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const { user, logout } = useAuthStore();

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20  text-white">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="hover:underline">
            Movies
          </Link>
          <Link to="/" className="hover:underline">
            Tv Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-4 items-center z-50">
        <Link to={"/search"}>
          <Search className="w-6 h-6 cursor-pointer" />
        </Link>
        <img
          src={user?.image || "/avatar2.png"}
          alt="Avatar"
          className="h-8 w-8 rounded-full cursor-pointer"
        />
        <LogOut className="w-6 h-6 cursor-pointer" onClick={logout} />
      
      
      {/* Hamburger button visible only on mobile */}
        <button
          className="sm:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border border-gray-800 rounded">
          <Link
            to="/"
            className="block hover:underline p-3"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="block hover:underline p-3"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to="/history"
            className="block hover:underline p-3"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
