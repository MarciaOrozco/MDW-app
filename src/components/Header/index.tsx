import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase"; // Importa tu configuración de Firebase
import { headerList, tokenList } from "./consts";

const Header = () => {
  const navigate = useNavigate();

  const path = window.location.pathname;

  const handleClick = (link: string) => {
    navigate(link);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <header className="top-0 flex flex-row justify-between w-full bg-gray-50 p-4">
      <div
        className="text-2xl flex-nowrap font-mono cursor-pointer hover:text-[#bb7b85]"
        onClick={() => navigate("/")}
      >
        bookstore
      </div>
      <nav className="flex justify-end w-auto items-center font-mono">
        <ul className="flex flex-row gap-3">
          {token
            ? tokenList.map((item, index) => (
                <li
                  className={
                    (path === item.link ? "underline font-bold" : "") +
                    " cursor-pointer hover:text-[#bb7b85]"
                  }
                  key={index}
                  onClick={() =>
                    item.title === "logout"
                      ? handleSignOut()
                      : handleClick(item.link)
                  }
                >
                  {item.title}
                </li>
              ))
            : headerList.map((item, index) => (
                <li
                  className={
                    (path === item.link ? "underline font-bold" : "") +
                    " cursor-pointer hover:text-[#bb7b85]"
                  }
                  key={index}
                  onClick={() => handleClick(item.link)}
                >
                  {item.title}
                </li>
              ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
