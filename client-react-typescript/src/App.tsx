import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home";
import LoginForm from "./components/logincomp/login.comp";
import NotFoundPage from "./components/notFoundcom";
import SignupForm from "./components/sinupcomp/signup.comp";
import Header from "./components/headercomp/header.comp";


function App() {

  return (
    <BrowserRouter>
		<Toaster position="top-center"/>
		<Header/>
		<Routes>
			<Route path="/" element={<LoginForm/>} />
			<Route path="/signup" element={<SignupForm/>} />
			<Route path="/tasks" element={<HomePage/>}/>
			<Route path="*" element= {<NotFoundPage/>} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
