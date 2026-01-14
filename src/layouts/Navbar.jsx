import React, { useState } from "react";

const menuData = [
  {
    title: "그린소개",
    items: [
      { label: "총장실", link: "/aboutgreen/president" },
      { label: "대학현황", link: "/aboutgreen/universityoverview" },
      { label: "캠퍼스 안내", link: "/aboutgreen/campusguide" },
    ],
  },
  {
    title: "대학생활",
    items: [
      { label: "공지사항", link: "/campuslife/notices" },
      { label: "행사", link: "/campuslife/events" },
      {
        label: "행정부서/기관",
        link: "/campuslife/administrativeofficesinstitutes",
      },
      { label: "서비스 이용 안내", link: "/campuslife/serviceguide" },
      { label: "자치활동", link: "/campuslife/studentactivities" },
      { label: "교내 분실물 게시판", link: "/campuslife/lostfoundboard" },
    ],
  },
  {
    title: "입학/교육",
    items: [
      { label: "입학안내", link: "/admissioneducation/admissionguide" },
      { label: "대학", link: "/admissioneducation/colleges" },
      { label: "대학원", link: "/admissioneducation/graduateschool" },
      { label: "비학위과정", link: "/admissioneducation/nondegreeprograms" },
    ],
  },
  {
    title: "학사지원",
    items: [
      { label: "학사정보", link: "/academicsupport/academicinformation" },
      {
        label: "학부교육과정",
        link: "/academicsupport/undergraduatecurriculum",
      },
      { label: "등록금", link: "/academicsupport/tuition" },
      { label: "학부장학금", link: "/academicsupport/scholarships" },
      { label: "증명서/발급", link: "/academicsupport/certificatesissuance" },
      {
        label: "각종 신청서 양식 모음",
        link: "/academicsupport/formsapplications",
      },
    ],
  },
  {
    title: "기타안내",
    items: [
      { label: "사이트맵", link: "/information/sitemap" },
      { label: "FAQ", link: "/information/faq" },
      { label: "채용안내", link: "/information/careers" },
    ],
  },
  {
    title: "번외 서비스",
    items: [{ label: "관리자 혹은 실험실", link: "/admin/one" }],
  },
];

const Navbar = ({ open, setOpen, role }) => {
  if (!open) return null;

  console.log(role);
  return (
    <nav
      className="relative bg-sky-400/90 text-white"
      onMouseLeave={() => setOpen(false)} // 밖으로 나가면 닫기
    >
      {/* 🔹 대분류 (flex 가로) */}
      <div className="max-w-7xl mx-auto flex gap-10 px-8 py-4">
        {menuData.map((menu) => (
          <div
            key={menu.title}
            onMouseEnter={() => setOpen(true)} // 열려 있을 때는 유지만
            className="cursor-pointer font-bold hover:underline"
          >
            {menu.title}
          </div>
        ))}
      </div>

      <div className="absolute left-0 w-full bg-sky-300/95 py-8 shadow-lg animate-fadeIn">
        <div className="max-w-7xl mx-auto grid grid-cols-6 gap-12 px-8 text-white">
          {/* 일반적인 경우에는, 마지막 카테고리는 비공개 */}
          {role === "ADMIN" ? (
            <>
              {menuData.map((menu) => (
                <div key={menu.title} className="flex flex-col gap-3">
                  <h3 className="font-bold text-lg">{menu.title}</h3>
                  <ul className="space-y-1 text-sm">
                    {menu.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.link}
                          className="block hover:underline whitespace-nowrap"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <>
              {menuData.slice(0, menuData.length - 1).map((menu) => (
                <div key={menu.title} className="flex flex-col gap-3">
                  <h3 className="font-bold text-lg">{menu.title}</h3>
                  <ul className="space-y-1 text-sm">
                    {menu.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.link}
                          className="block hover:underline whitespace-nowrap"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
