'use client';

import ClassForm from '@components/ClassForm';
import { ClassFormValues } from '@interfaces';
import { Class } from '@interfaces/response';
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

const ClassEdit = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps, queryResult } = useForm<
    Class,
    HttpError,
    ClassFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id,
    resource: 'api/v1/classes',
    updateMutationOptions: {
      meta: {
        method: 'put',
      },
    },
  });

  const initialValues = queryResult?.data?.data
    ? {
        ...queryResult.data.data,
        teacherSubjectClassIds: Array.from(
          new Set(
            queryResult.data.data?.teacherSubjectClasses.map((item) => item.id)
          )
        ),
        studentIds: Array.from(
          new Set(queryResult.data.data?.students.map((item) => item.id))
        ),
      }
    : undefined;

  return (
    <Edit
      breadcrumb={null}
      saveButtonProps={saveButtonProps}
      deleteButtonProps={{
        resource: 'api/v1/classes',
      }}
      title="Chỉnh sửa lớp học"
      headerButtons={({ listButtonProps, refreshButtonProps }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách lớp học</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/classes">
            Làm mới
          </RefreshButton>
        </>
      )}
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <DeleteButton
            {...deleteButtonProps}
            confirmTitle="Bạn có chắc muốn xóa lớp học này không?"
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
        <Col span={16}>
          <ClassForm
            formProps={{ ...formProps, initialValues: initialValues }}
          />
        </Col>
      </Row>
    </Edit>
  );
};

export default ClassEdit;
