import React, { useState, useContext  } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { FaMagnifyingGlass, FaRegBell } from "react-icons/fa6";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { easeInOut, hover, motion } from "framer-motion";
import userContext from "../contexts/userContext";
import Search from "./Search";

function Navbar() {
  const [profileSpaceOpen, setProfileSpaceOpen] = useState(false);
  const [searchOpen , setsearchOpen ] = useState(false);
  
  const [notiOpen , setnotiOpen] = useState(false);
  const navigate = useNavigate();


  const { user, setuser } = useContext(userContext);

  const signOut = () => {
    setuser({ ...user, isLoggedIn: false });
    localStorage.setItem('user', JSON.stringify({ ...user, isLoggedIn: false }));
    navigate('/signin');
  }

  return (
    <div className="fixed top-0 z-20 left-0">
      {(user.isLoggedIn) ? (
      <nav className="w-screen h-[4vw] flex items-center justify-between py-1 bg-[#151515] opacity-98 text-white">
       <div className="flex gap-5 items-center">
          <NavLink to="/browse">
            <img src="images/netflix-logo.png" alt="Netflix Logo" className="h-16 ml-8 mb-2" />
          </NavLink>
          <ul className="flex gap-5 items-center text-sm">
            <NavLink to={"/browse"} className={({isActive}) => `${isActive ? "font-bold" : "" } hover:text-gray-300`}><li>Home</li></NavLink>
            <NavLink to={"/Tvshows"} className={({isActive}) => `${isActive ? "font-bold" : "" } hover:text-gray-300`}><li>TV Shows</li></NavLink>
            <NavLink to={"/Movies"} className={({isActive}) => `${isActive ? "font-bold" : "" } hover:text-gray-300`}><li>Movies</li></NavLink>
            <NavLink to={"/mylist"} className={({isActive}) => `${isActive ? "font-bold" : "" } hover:text-gray-300`}><li>My List</li></NavLink>
          </ul>
        </div>

        <div className={`flex justify-end ${searchOpen ? "gap-5": "gap-8"} items-center mr-[5rem]`}>
          
          {searchOpen ? (
            <Search setsearchOpen={setsearchOpen} searchOpen={searchOpen} />
          ): (<FaMagnifyingGlass className={`hover:cursor-pointer `} size={23} onClick={()=>setsearchOpen(!searchOpen)}/>)}
           
           <FaRegBell className="hover:cursor-pointer" size={23} onClick={()=>setnotiOpen(!notiOpen)} onMouseEnter={()=> setnotiOpen(true)}/>
          {notiOpen && (
            <>
                <TiArrowSortedUp size={25} className="absolute z-10 top-[3.8vw] right-[10rem] text-black" />
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="min-h-[150px] w-[30vw] rounded-xs p-2 flex items-center justify-center bg-[#100f0fdd] absolute z-10 top-[5vw] right-[10rem]"
                    onMouseLeave={() => setnotiOpen(false)}
                >
                <h1 className="text-xl font-light">No Notifications</h1>
            </motion.div>
            </>
          )}
          
          <div
            className="flex items-center hover:cursor-pointer"
            onMouseEnter={() => setProfileSpaceOpen(true)}
            onClick={()=> setProfileSpaceOpen(!profileSpaceOpen)}
          >
            <img src="/images/netflix-avatar.png" alt="Profile" className="w-8 h-8 rounded-sm" />

            {profileSpaceOpen ? (
              <TiArrowSortedUp size={25} className="hover:cursor-pointer" />
            ) : (
              <TiArrowSortedDown size={25} className="hover:cursor-pointer" />
            )}

            {profileSpaceOpen && (
              <>
                <TiArrowSortedUp size={25} className="absolute z-10 top-[3.8vw] right-[7rem] text-black" />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="min-h-[200px] w-40 rounded-xs p-2 bg-[#100f0fdd] absolute z-10 top-[5vw] right-[7rem]"
                  onMouseEnter={() => setProfileSpaceOpen(true)}
                  onMouseLeave={() => setProfileSpaceOpen(false)}
                >
                  <ul className="py-2 text-white">
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Profile 1</li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Profile 2</li>
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Profile 3</li>
                    <hr className="border-gray-900" />
                    <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-400" onClick={signOut}>
                      Sign Out
                    </li>
                  </ul>
                </motion.div>
              </>
            )}
          </div>
        </div> 
      </nav>) : (<nav className="w-screen h-[3vh] absolute z-10 top-0 left-0 bg-transparent text-white">
        <img src="images/netflix-logo.png" alt="Netflix Logo" className="h-25 ml-50 " />
      </nav>)}
    </div>
  );
}

export default Navbar;
