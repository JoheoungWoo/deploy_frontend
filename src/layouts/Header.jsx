import React, { useState } from "react";
import { useNavigationTest } from "../hook/useNavigationTest";
import { useSelector } from "react-redux";
import SignedLoginComponent from "../components/auth/SignedLoginComponent";
import UnSignedLoginComponent from "../components/auth/UnSignedLoginComponent";
import logo from "../images/1.png";
import Navbar from "./Navbar";
import { TfiMenu } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Header = () => {
  const { Home } = useNavigationTest();
  const user = useSelector((s) => s.loginSlice);
  const loginState = useSelector((state) => state.loginSlice);

  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-[100] w-full">
      {/* ===== 상단 헤더 ===== */}
      <div className="w-full bg-sky-300 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          {/* 🔹 LEFT: 로고 */}
          <Link to={"https://lms.greenunivercity.store/"}>
            <button
              onClick={Home}
              className="flex items-center gap-2 hover:opacity-90"
            >
              <img src={logo} alt="로고" className="h-9" />
            </button>
          </Link>

          {/* 🔹 CENTER: 메뉴 버튼 */}
          {user.role !== "GUEST" && (
            <button
              onClick={toggleNav}
              className="p-2 rounded-full hover:bg-white/20 transition"
              aria-label="메뉴 열기"
            >
              그린대학교
            </button>
          )}

          {/* 🔹 RIGHT: 유저 / 로그인 */}
          <div className="flex items-center gap-4 text-sm">
            {loginState.email && (
              <span className="hidden sm:block font-medium opacity-90">
                {user.role}
              </span>
            )}

            {/* {loginState.email ? (
              <SignedLoginComponent />
            ) : (
              <UnSignedLoginComponent />
            )} */}
          </div>
        </div>
      </div>

      {/* ===== 네비게이션 ===== */}
      {user.role !== "GUEST" && (
        <Navbar open={navOpen} setOpen={setNavOpen} role={user.role} />
      )}
    </header>
  );
};

export default Header;
