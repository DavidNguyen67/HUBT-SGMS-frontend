'use client';

import StudentGradeForm from '@components/StudentGradeForm';
import { StudentGradeFormValues } from '@interfaces';
import { Create, useForm } from '@refinedev/antd';
import { HttpError } from '@refinedev/core';
import { Col, Row } from 'antd';

const StudentGradeCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    Record<string, unknown>,
    HttpError,
    StudentGradeFormValues
  >({
    submitOnEnter: true,
    action: 'create',
    resource: 'api/v1/student-grades',
  });

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Thêm điểm sinh viên"
      breadcrumb={null}
    >
      <Row>
        <Col span={6} offset={8}>
          <StudentGradeForm formProps={formProps} />
        </Col>
      </Row>
    </Create>
  );
};

export default StudentGradeCreate;
