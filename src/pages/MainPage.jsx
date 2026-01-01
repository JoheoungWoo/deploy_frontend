import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LogoLayout from "../layouts/LogoLayout";
import AnimatedBorderBox from "../layouts/AnimatedBorderBox";
import { CiDesktopMouse2 } from "react-icons/ci";
import collegeImg from "../images/college2.png";

const randomTriangleColor = () => {
  const colors = [
    "rgba(239, 68, 68, 0.25)",
    "rgba(59, 130, 246, 0.25)",
    "rgba(34, 197, 94, 0.25)",
    "rgba(234, 179, 8, 0.25)",
    "rgba(168, 85, 247, 0.25)",
    "rgba(236, 72, 153, 0.25)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const specialData = [
  { title: "SPECIAL 1", text: "최대 수료생을 배출한\nIT·디자인 전문교육기관" },
  { title: "SPECIAL 2", text: "전국 23개 지역\n최대 규모 교육기관" },
  { title: "SPECIAL 3", text: "국가·국제자격증\n공식시험센터 운영" },
  { title: "SPECIAL 4", text: "고용노동부 지정\n우수훈련기관" },
  { title: "SPECIAL 5", text: "다양한 국비지원\n교육과정 운영" },
  { title: "SPECIAL 6", text: "체계적인 취업지원\n프로그램 제공" },
  { title: "SPECIAL 7", text: "현장 중심 맞춤형\n전문 인재 양성" },
];

const MainPage = () => {
  const user = useSelector((s) => s.loginSlice);
  console.log("user정보:", user);

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const specialRef = useRef(null);

  const [showSection1, setShowSection1] = useState(false);
  const [showSection2, setShowSection2] = useState(false);
  const [showWaveDot, setShowWaveDot] = useState(false);
  const [showSection3Text, setShowSection3Text] = useState(false);
  const [showSpecial, setShowSpecial] = useState(false);
  const [triangleColor] = useState(randomTriangleColor);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === section1Ref.current) {
            setShowSection1(entry.isIntersecting);
          }

          if (entry.target === section2Ref.current) {
            if (entry.isIntersecting) {
              setShowSection2(true);
              setTimeout(() => setShowWaveDot(true), 1200);
            } else {
              setShowSection2(false);
              setShowWaveDot(false);
            }
          }

          if (entry.target === section3Ref.current) {
            setShowSection3Text(entry.isIntersecting);
          }

          if (entry.target === specialRef.current) {
            setShowSpecial(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.4 }
    );

    [section1Ref, section2Ref, section3Ref, specialRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Logo */}
      <div className="bg-white">
        <a href="http://localhost:3000">
          <LogoLayout />
        </a>
      </div>

      {/* Content */}
      <div className="min-h-screen bg-gradient-to-b from-[#f7f7f4] via-[#e8efe9] to-[#b7c8b5]">
        {/* Mouse */}
        <div className="flex justify-center pb-16 text-gray-500">
          <CiDesktopMouse2 size={32} className="animate-bounce" />
        </div>

        {/* Section 1 */}
        <div ref={section1Ref} className="h-[600px] flex items-center pl-24">
          <div className="relative">
            <AnimatedBorderBox />
            {showSection1 && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: triangleColor,
                  clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                }}
              />
            )}
            <div
              className={`absolute inset-0 flex items-center pl-12
              font-bebas text-5xl tracking-widest uppercase text-gray-800
              transition-all duration-1000
              ${showSection1 ? "opacity-100" : "opacity-0 -translate-x-16"}`}
            >
              DESIGN WITH PURPOSE
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div
          ref={section2Ref}
          className="h-[600px] flex items-center justify-end pr-24"
        >
          <div className="relative">
            <AnimatedBorderBox />
            <div
              className={`absolute top-1/2 right-20 -translate-y-1/2
              font-bebas text-5xl tracking-widest uppercase text-gray-700
              transition-all duration-1000
              ${showSection2 ? "opacity-100" : "opacity-0 translate-x-16"}`}
            >
              STRUCTURE YOUR IDEAS
            </div>
            {showWaveDot && (
              <div className="absolute top-1/2 left-12 -translate-y-1/2">
                <div className="w-4 h-4 bg-gray-800 rounded-full dot-wave-soft" />
              </div>
            )}
          </div>
        </div>

        {/* Section 3 */}
        <div
          ref={section3Ref}
          className="h-[1200px] flex items-center justify-center"
        >
          <div className="relative">
            <AnimatedBorderBox />
            {showSection3Text && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex font-bebas text-4xl tracking-widest uppercase text-gray-800">
                  <span className="text-collide-left">FROM IDEAS&nbsp;</span>
                  <span className="text-collide-right">
                    TO STRUCTURED REALITY
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🔥 NEW SPECIAL BIG BOX */}
        <div
          ref={specialRef}
          className="w-full min-h-screen flex bg-white px-12 py-20"
        >
          {/* LEFT 20% */}
          <div className="w-[20%] space-y-6">
            {specialData.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white border rounded-md p-4 shadow-sm opacity-0
                  ${showSpecial ? "flip-card" : ""}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="text-xs font-bold text-green-700 mb-1">
                  {item.title}
                </div>
                <div className="whitespace-pre-line text-gray-800 leading-relaxed text-sm">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT 80% : IMAGE */}
          <div className="w-[80%] flex items-center justify-center">
            <div className="w-[85%] h-[75%] overflow-hidden rounded-lg shadow-md">
              <img
                src={collegeImg}
                alt="College Campus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
};

export default MainPage;
