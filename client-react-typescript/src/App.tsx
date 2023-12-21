import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/homecomp/home.comp";
import LoginForm from "./components/logincomp/login.comp";
import NotFoundPage from "./components/notFoundcom";
import SignupForm from "./components/sinupcomp/signup.comp";


function App() {

  return (
    <BrowserRouter>
		<Toaster position="top-center"/>
		<Routes>
			<Route path="*" element= {<NotFoundPage/>} />
			<Route path="/" element={<LoginForm/>} />
			<Route path="/signup" element={<SignupForm/>} />
			   <Route path="/tasks" element={<HomePage/>}/>
		</Routes>
	</BrowserRouter>
  );
}

export default App;
