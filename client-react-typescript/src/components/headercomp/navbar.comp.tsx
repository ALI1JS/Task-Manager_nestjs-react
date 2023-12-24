import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";


const NavBar:React.FC = ()=>{

  const [visablity, setVisablity] = useState<boolean>(true)
  
   const handleVisibilityMenu = ()=>
   { 
      setVisablity(!visablity);
   } 
  
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisablity(true);
      }
    };

    console.log(visablity);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
    return (
        <div className="w-[70vw] relative">
              <nav className="w-[100%]">
                      <FontAwesomeIcon onClick={handleVisibilityMenu} icon={faBars} className=" cursor-pointer font-bold text-lg lg:hidden"/>
                      {
                        visablity && (
                        <ul className={`flex flex-col w-36 items-center bg-white shadow-md gap-3 rounded mt-5 absolute lg:flex-row lg:-mt-4 lg:w-[80%] lg:gap-3 lg:shadow-none`}>
                        <Link className="font-bold p-2 rounded hover:text-white hover:bg-blue-400" to='/tasks'><li>Home</li></Link>  
                         <Link className="font-bold p-2 rounded hover:text-white hover:bg-blue-400" to='/about'><li>About</li></Link>
                         <Link className="font-bold p-2 rounded hover:text-white hover:bg-blue-400" to='/services'><li>Services</li></Link>
                         <Link className="font-bold p-2 rounded hover:text-white hover:bg-blue-400" to='/Contact'><li>Contact</li></Link>
                        </ul>
                        )
                      }
                     
              </nav>
        </div>
    )
}


export default NavBar;