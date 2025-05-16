'use client';

import SubjectForm from '@components/SubjectForm';
import { SubjectFormValues } from '@interfaces';
import { Subject } from '@interfaces/response';
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

const SubjectUpdate = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps, queryResult } = useForm<
    Subject,
    HttpError,
    SubjectFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id,
    resource: 'api/v1/subjects',
    updateMutationOptions: {
      meta: {
        method: 'put',
      },
    },
  });

  const initialValues = queryResult?.data?.data
    ? {
        ...queryResult.data.data,
        class_ids: Array.from(
          new Set(
            queryResult.data.data?.teacherSubjectClasses.map(
              (item) => item.class.id
            )
          )
        ),
        teacher_ids: Array.from(
          new Set(
            queryResult.data.data?.teacherSubjectClasses.map(
              (item) => item.teacher.id
            )
          )
        ),
      }
    : undefined;

  return (
    <Edit
      breadcrumb={null}
      saveButtonProps={saveButtonProps}
      deleteButtonProps={{
        resource: 'api/v1/subjects',
      }}
      title="Chỉnh sửa môn học"
      headerButtons={({ listButtonProps, refreshButtonProps }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách môn học</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/subjects">
            Làm mới
          </RefreshButton>
        </>
      )}
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <DeleteButton
            {...deleteButtonProps}
            confirmTitle="Bạn có chắc muốn xóa môn học này không?"
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
          <SubjectForm
            formProps={{ ...formProps, initialValues: initialValues }}
          />
        </Col>
      </Row>
    </Edit>
  );
};

export default SubjectUpdate;
