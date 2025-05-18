'use client';

import StudentGradeForm from '@components/StudentGradeForm';
import { StudentGradeFormValues } from '@interfaces';
import { StudentGrade } from '@interfaces/response';
import {
  DeleteButton,
  Edit,
  ListButton,
  RefreshButton,
  SaveButton,
  useForm,
} from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';
import { useParams } from 'next/navigation';

const StudentGradeEdit = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps, queryResult } = useForm<
    StudentGrade,
    HttpError,
    StudentGradeFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id,
    resource: 'api/v1/student-grades',
    updateMutationOptions: {
      meta: {
        method: 'put',
      },
    },
  });

  const initialValues = queryResult?.data?.data
    ? {
        ...queryResult.data.data,
        grade_type_id: queryResult.data.data.grade_type?.id,
        student_id: queryResult.data.data.student?.id,
        subject_id: queryResult.data.data.subject?.id,
      }
    : undefined;

  return (
    <Edit
      breadcrumb={null}
      saveButtonProps={saveButtonProps}
      deleteButtonProps={{
        resource: 'api/v1/student-grades',
      }}
      title="Chỉnh sửa điểm sinh viên"
      headerButtons={({ listButtonProps, refreshButtonProps }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách điểm sinh viên</ListButton>
          <RefreshButton
            {...refreshButtonProps}
            resource="api/v1/student-grades"
          >
            Làm mới
          </RefreshButton>
        </>
      )}
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <DeleteButton
            {...deleteButtonProps}
            confirmTitle="Bạn có chắc muốn xóa điểm sinh viên này không?"
            confirmOkText="Đồng ý"
            confirmCancelText="Hủy"
          >
            Xóa
          </DeleteButton>
          <SaveButton {...saveButtonProps}>Lưu</SaveButton>
        </>
      )}
    >
      <Row>
        <Col span={6} offset={8}>
          <StudentGradeForm
            formProps={{ ...formProps, initialValues: initialValues }}
          />
        </Col>
      </Row>
    </Edit>
  );
};

export default StudentGradeEdit;
