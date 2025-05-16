"use client";

import { useShow } from "@refinedev/core";
import { Class } from "@interfaces/response";
import {
  Show,
  TextField,
  DateField,
  ListButton,
  RefreshButton,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import { Typography, Divider } from "antd";
import { useParams } from "next/navigation";
import SelectedStudentTable from "@components/SelectedStudentTable";
import SelectedTeacherSubjectClassTable from "@components/SelectedTeacherSubjectClassTable";

const { Title } = Typography;

const ClassShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<Class>({
    id,
    resource: "api/v1/classes",
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const studentIds = record?.students?.map((s) => s.id);
  const teacherSubjectClassIds = record?.teacherSubjectClasses?.map(
    (t) => t.id
  );

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết lớp học"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách lớp học</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/classes">
            Làm mới
          </RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/classes"
              confirmTitle="Bạn có chắc muốn xóa lớp học này không?"
              confirmOkText="Đồng ý"
              confirmCancelText="Hủy"
            >
              Xóa
            </DeleteButton>
          )}
        </>
      )}
    >
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />

      <Title level={5}>Mã lớp</Title>
      <TextField value={record?.class_code} />

      <Title level={5}>Tên lớp</Title>
      <TextField value={record?.class_name} />

      <Title level={5}>Ngày tạo</Title>
      <DateField value={record?.created_at} />

      {record?.students?.length! > 0 && (
        <>
          <Divider />
          <Title level={5}>Danh sách sinh viên</Title>
          <SelectedStudentTable ids={studentIds} />
        </>
      )}

      {record?.teacherSubjectClasses?.length! > 0 && (
        <>
          <Divider />
          <Title level={5}>Giáo viên - Môn học</Title>
          <SelectedTeacherSubjectClassTable ids={teacherSubjectClassIds} />
        </>
      )}
    </Show>
  );
};

export default ClassShow;
