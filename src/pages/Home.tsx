import { Button } from "../components/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";


export const Home = () => {
  const navigate = useNavigate();
  const setIsAuth = authStore((state) => state.setIsAuth);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="h-1/2 max-h-[400px] flex flex-col items-center">
        <h1 className="text-[120px] mb-5">PokeTyping</h1>
        <Button url="/game">Start</Button>
        <button className="bg-blue-500 hover:bg-blue-300 rounded h-[40px] w-[100px] text-[22px] text-white mt-3" onClick={signOutUser}>SignOut</button>
      </div>
    </div>
  );
};
