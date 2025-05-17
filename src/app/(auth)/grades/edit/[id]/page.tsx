'use client';

import GradeForm from '@components/GradeForm';
import { GradeFormValues } from '@interfaces';
import { GradeType } from '@interfaces/response';
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

const GradeUpdate = () => {
  const { id } = useParams() as { id: string };

  const { formProps, saveButtonProps } = useForm<
    GradeType,
    HttpError,
    GradeFormValues
  >({
    submitOnEnter: true,
    action: 'edit',
    id,
    resource: 'api/v1/grade-types',
    updateMutationOptions: {
      meta: {
        method: 'put',
      },
    },
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      breadcrumb={null}
      deleteButtonProps={{
        resource: 'api/v1/grade-types',
      }}
      title="Chỉnh sửa loại điểm"
      headerButtons={({ listButtonProps, refreshButtonProps }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách loại điểm</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/students">
            Làm mới
          </RefreshButton>
        </>
      )}
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <DeleteButton
            {...deleteButtonProps}
            confirmTitle="Bạn có chắc muốn xóa loại điểm này không?"
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
          <GradeForm formProps={formProps} />
        </Col>
      </Row>
    </Edit>
  );
};

export default GradeUpdate;
