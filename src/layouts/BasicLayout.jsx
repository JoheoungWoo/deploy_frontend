import Header from "./Header";
import Footer from "./Footer";
import LogoLayout from "./LogoLayout";
import Navbar from "./Navbar";
import Logo from "../images/university.jpg";

const BasicLayout = ({ children }) => {
  const datas = {
    aboutGreen: {
      campusguide: "aboutgreen/campusguide",
      president: "aboutgreen/president",
      universityoverview: "aboutgreen/universityoverview",
    },
    academicsupport: {
      academicinformation: "academicsupport/academicinformation",
      certificatesissuance: "academicsupport/certificatesissuance",
      formsapplications: "academicsupport/formsapplications",
      scholarships: "academicsupport/scholarships",
      tuition: "academicsupport/tuition",
      undergraduatecurriculum: "academicsupport/undergraduatecurriculum",
    },
    admissioneducation: {
      admissionguide: "admissioneducation/admissionguide",
      colleges: "admissioneducation/colleges",
      graduateschool: "admissioneducation/graduateschool",
      nondegreeprograms: "admissioneducation/nondegreeprograms",
    },
    campuslife: {
      administrativeofficesinstitutes:
        "campuslife/administrativeofficesinstitutes",
      events: "campuslife/events",
      lostfoundboard: "campuslife/lostfoundboard",
      notices: "campuslife/notices",
      serviceguide: "campuslife/serviceguide",
      studentactivities: "campuslife/studentactivities",
    },
    information: {
      careers: "information/careers",
      faq: "information/faq",
      sitemap: "information/sitemap",
    },
    account: {
      login: "account/login",
      logout: "account/logout",
    },
  };
  return (
    <div className="w-full overflowx--hidden h-screen flex flex-col mt-10">
      <div className="h-10 shrink-0 bg-sky-300">
        <Header />
      </div>
      <div className="w-full h-screen mt-5">{children}</div>
      <div></div>
    </div>
  );
};

export default BasicLayout;
