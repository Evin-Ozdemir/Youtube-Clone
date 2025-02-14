import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoIosSearch, IoIosVideocam } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import React, { useState, useEffect } from "react";

const Header = () => {
  // Url'den aratılan kelimeyi al
  const [params] = useSearchParams();
  const query = params.get("search_query");

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // useNavigate kurulumu
  const navigate = useNavigate();

  //form gönderildiğinde
  const handleSumbit = (e) => {
    e.preventDefault();

    // inputa girilen değeri al
    const text = e.target[0].value;

    // arama sayfasına yönlendir
    navigate(`/results?search_query=${text}`);
  };
  // Sayfa yüklendiğinde, kullanıcının tercihini kontrol et
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Tema değiştirme işlevi
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Tema sınıfını ekle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className="px-2 py-[17px] sm:px-4 flex justify-between items-center">
      <Link to="/" className="flex gap-[6px]">
        <img
          src="/youtube.png"
          alt="youtube logo"
          className="w-[41px] sm:w-12"
        />
        <h1 className="text-[21px] sm:text-2xl font-mono">Youtube</h1>
      </Link>

      <form
        onSubmit={handleSumbit}
        className="flex border border-gray-400 rounded-[20px] overflow-hidden"
      >
        <input
          type="text"
          className="bg-[#0F0F0F] dark:text-white px-2 sm:px-5 py-1 sm:py-2 border border-transparent focus:outline-none rounded-l-[20px]"
          defaultValue={query}
        />
        <button className="px-3  sm:px-4 sm:text-2xl bg-zinc-800 hover:bg-zinc-600 transition duration-300">
          <IoIosSearch className="lightIcon" />
        </button>
      </form>
      <div className="flex gap-3 text-xl cursor-pointer max-sm:hidden">
        <FaBell className="hover:text-gray-400 transition" />
        <MdVideoLibrary className="hover:text-gray-400 transition" />
        <IoIosVideocam className="hover:text-gray-400 transition" />
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? "🌙" : "🌞"}
        </button>
      </div>
    </header>
  );
};

export default Header;
