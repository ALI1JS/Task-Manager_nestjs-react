import NavBar from "./navbar.comp"
import UserInfo from "./userprofile.comp"




const Header:React.FC = ()=>{
   
    return (
        <header className="fixed z-10 bg-white w-full shadow-md flex justify-between items-center py-3 px-6">
              <NavBar/>
              <UserInfo/>
        </header>
    )
}

export default Header;