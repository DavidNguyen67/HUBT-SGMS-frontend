'use client';

import StudentGradeForm from '@components/StudentGradeForm';
import TeacherSubjectClassForm from '@components/TeacherSubjectClassForm';
import {
  StudentGradeFormValues,
  TeacherSubjectClassFormValues,
} from '@interfaces';
import { StudentGrade, TeacherSubjectClass } from '@interfaces/response';
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

const TeacherSubjectClassEdit = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps, queryResult } = useForm<
    TeacherSubjectClass,
    HttpError,
    TeacherSubjectClassFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id,
    resource: 'api/v1/teacher-subject-classes',
    updateMutationOptions: {
      meta: {
        method: 'put',
      },
    },
  });

  const initialValues = queryResult?.data?.data
    ? {
        ...queryResult.data.data,
        teacher_id: queryResult.data.data.teacher?.id,
        subject_id: queryResult.data.data.subject?.id,
        class_id: queryResult.data.data.class?.id,
      }
    : undefined;

  console.log('Check initialValues:', initialValues);

  return (
    <Edit
      breadcrumb={null}
      saveButtonProps={saveButtonProps}
      deleteButtonProps={{
        resource: 'api/v1/teacher-subject-classes',
      }}
      title="Chỉnh sửa điểm sinh viên"
      headerButtons={({ listButtonProps, refreshButtonProps }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách điểm sinh viên</ListButton>
          <RefreshButton
            {...refreshButtonProps}
            resource="api/v1/teacher-subject-classes"
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
          <TeacherSubjectClassForm
            formProps={{ ...formProps, initialValues: initialValues }}
          />
        </Col>
      </Row>
    </Edit>
  );
};

export default TeacherSubjectClassEdit;
