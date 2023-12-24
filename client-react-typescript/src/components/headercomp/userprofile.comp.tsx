import { useDispatch,useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Button from "../formcomp/button.comp";
import { removeToken } from "../../utlitis/token_storage";
import { logout} from "../../store/reducers/user-reducer";
import { useNavigate } from "react-router-dom";



const UserInfo: React.FC = ()=>{
  
  const user = useSelector((state:RootState)=> state.userReducer.user);
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout =()=>{
    console.log(user);
       removeToken();
       dispatch(logout());
       navigate('/');
  }

    return (
        <div className="flex justify-end  items-center gap-5">

            <div className="">
                <Button name="Logout" bg="bg-red-500" hoverColor="bg-red-600" onClick={handleLogout}/>
           </div>

          <div>
            <img className="w-10 h-10 rounded-full" alt="user_avatar" src={user.avatar}/>
             <h2 className="text-bold">{user.username}</h2>  
          </div> 
        
        </div>
    )
} 
export default UserInfo;