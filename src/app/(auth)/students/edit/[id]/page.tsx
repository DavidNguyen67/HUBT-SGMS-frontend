'use client';

import StudentForm from '@components/StudentForm';
import { StudentFormValues } from '@interfaces';
import { Student } from '@interfaces/response';
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

const StudentUpdate = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps, queryResult } = useForm<
    Student,
    HttpError,
    StudentFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id,
    resource: 'api/v1/students',
    updateMutationOptions: {
      meta: {
        method: 'put',
      },
    },
  });

  const initialValues = queryResult?.data?.data
    ? {
        ...queryResult.data.data,
        class_id: queryResult.data.data.class?.id,
      }
    : undefined;

  return (
    <Edit
      breadcrumb={null}
      saveButtonProps={saveButtonProps}
      deleteButtonProps={{
        resource: 'api/v1/students',
      }}
      title="Chỉnh sửa sinh viên"
      headerButtons={({ listButtonProps, refreshButtonProps }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách sinh viên</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/students">
            Làm mới
          </RefreshButton>
        </>
      )}
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <DeleteButton
            {...deleteButtonProps}
            confirmTitle="Bạn có chắc muốn xóa sinh viên này không?"
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
          <StudentForm
            formProps={{ ...formProps, initialValues: initialValues }}
          />
        </Col>
      </Row>
    </Edit>
  );
};

export default StudentUpdate;
