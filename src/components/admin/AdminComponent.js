import React, { useState } from "react";
import { useSelector } from "react-redux";

import AdminLayout from "../../layouts/AdminLayout";

import AssignmentApi from "../../api/AssignmentApi";
import AttendanceApi from "../../api/AttendanceApi";
import BoardApi from "../../api/BoardApi";
import ClassroomApi from "../../api/ClassroomApi";
import ClassSectionApi from "../../api/ClassSectionApi";
import CommentApi from "../../api/CommentApi";
import CourseApi from "../../api/CourseApi";
import CourseOfferingApi from "../../api/CourseOfferingApi";
import DepartmentApi from "../../api/DepartmentApi";
import EnrollmentApi from "../../api/EnrollmentApi";
import GradeApi from "../../api/GradeApi";
import NoticeApi from "../../api/NoticeApi";
import PostApi from "../../api/PostApi";
import ReviewApi from "../../api/ReviewApi";
import SubmissionApi from "../../api/SubmissionApi";
import TimeTableApi from "../../api/TimeTableApi";
import userApi from "../../api/userApi";
import FileAttachmentApi from "../../api/FileAttachmentApi";
import SearchHistoryApi from "../../api/SearchHistoryApi";

import AdminSelectedContext from "./AdminSelectContext";
import SSHistoryApi from "../../api/SSHistoryApi";
import TermApi from "../../api/TermApi";
import { typeEnum } from "../../api/commonApi";

const AdminComponent = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const userEmail = loginState.email;

  console.log("현재 로그인된 사용자 이메일:", userEmail);

  // 상태 통합
  const [selectedIds, setSelectedIds] = useState({
    assignment: "none",
    attendance: "none",
    board: "none",
    classroom: "none",
    classSection: "none",
    comment: "none",
    course: "none",
    courseOffering: "none",
    department: "none",
    enrollment: "none",
    grade: "none",
    notice: "none",
    post: "none",
    review: "none",
    submission: "none",
    timeTable: "none",
    user: "none",
    fileAttachment: "none",
    searchHistory: "none",
    term: "none",
    sshistory: "none",
  });

  const setSelectId = (tableKey, id) => {
    setSelectedIds((prev) => ({ ...prev, [tableKey]: id }));
  };

  const tableApis = {
    Assignment: AssignmentApi,
    attendance: AttendanceApi,
    board: BoardApi,
    classroom: ClassroomApi,
    classSection: ClassSectionApi,
    comment: CommentApi,
    course: CourseApi,
    courseOffering: CourseOfferingApi,
    department: DepartmentApi,
    enrollment: EnrollmentApi,
    grade: GradeApi,
    notice: NoticeApi,
    post: PostApi,
    review: ReviewApi,
    timeTable: TimeTableApi,
    submission: SubmissionApi,
    user: userApi,
    file: FileAttachmentApi,
    search: SearchHistoryApi,
    sshistory: SSHistoryApi,
    term: TermApi,
  };

  return (
    <div>
      {/* --소개글-- */}
      <h1 className="text-2xl font-bold mb-6">
        개발 편의를 위한 자동화 페이지
      </h1>
      <h2>
        프론트엔드와 백엔드 통신을 해야할 때, 실제로 해보는 장소입니다. 양식에
        맞게, 데이터를 세팅하면, 연동이 됩니다.
      </h2>

      <AdminSelectedContext.Provider value={{ selectedIds, setSelectId }}>
        {Object.keys(tableApis).map((key) => {
          // 1. 원본 설정 가져오기
          const originalConfig = tableApis[key].config;
          const originalFuncs = originalConfig.funcs;

          // 2. 이메일을 주입한 '새로운 함수'들을 미리 정의
          const wrappedReadAll = () => originalFuncs.readAll(userEmail);

          // 3. funcs 객체 재구성
          const newFuncs = {
            ...originalFuncs,
            readAll: wrappedReadAll, // 여기서 정의한 함수 사용
            readOne: (id) => originalFuncs.readOne(id, userEmail),
            writeOne: (dto) => originalFuncs.writeOne(dto, userEmail),
            deleteOne: (dto) => originalFuncs.deleteOne(dto, userEmail),
            updateOne: (dto) => originalFuncs.updateOne(dto, userEmail),
          };

          const newButtonDataList = originalConfig.buttonDataList.map((btn) => {
            if (btn.enumType === typeEnum.read || btn.label === "모두읽기") {
              return { ...btn, action: wrappedReadAll };
            }
            return btn;
          });

          return (
            <AdminLayout
              key={key}
              config={{
                ...originalConfig,
                funcs: newFuncs,
                buttonDataList: newButtonDataList,
              }}
            />
          );
        })}
      </AdminSelectedContext.Provider>
    </div>
  );
};

export default AdminComponent;
