import { useNavigate } from "react-router-dom";
import { headerList, tokenList } from "./consts";

const Header = () => {
  const navigate = useNavigate();

  const path = window.location.pathname;

  const handleClick = (link: string) => {
    navigate(link);
  };

  const token = localStorage.getItem("token");

  return (
    <header className="top-0 flex flex-row justify-between w-full bg-gray-50 p-4">
      <div className="text-2xl flex-nowrap font-mono">bookstore</div>
      <nav className="flex justify-end w-auto items-center font-mono">
        <ul className="flex flex-row gap-3">
          {token
            ? tokenList.map((item, index) => (
                <li
                  className={
                    (path === item.link ? "underline font-bold" : "") +
                    " cursor-pointer"
                  }
                  key={index}
                  onClick={() => handleClick(item.link)}
                >
                  {item.title}
                </li>
              ))
            : headerList.map((item, index) => (
                <li
                  className={
                    (path === item.link ? "underline font-bold" : "") +
                    " cursor-pointer"
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
