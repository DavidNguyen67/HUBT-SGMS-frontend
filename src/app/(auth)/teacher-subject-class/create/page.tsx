'use client';

import TeacherSubjectClassForm from '@components/TeacherSubjectClassForm';
import { TeacherSubjectClassFormValues } from '@interfaces';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const TeacherSubjectClassCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    TeacherSubjectClassFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/teacher-subject-classes',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm phân công giảng dạy"
      breadcrumb={null}
    >
      <Row>
        <Col span={6} offset={8}>
          <TeacherSubjectClassForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default TeacherSubjectClassCreate;
