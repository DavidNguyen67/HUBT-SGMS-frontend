import {
  Modal,
  Table,
  Button,
  Form,
  Input,
  Space,
  Col,
  Select,
  Row,
  Tooltip,
} from 'antd';
import { useState } from 'react';
import { useSelect, useTable } from '@refinedev/antd';
import { CrudFilters, HttpError } from '@refinedev/core';
import {
  Class,
  Student,
  Subject,
  Teacher,
  TeacherSubjectClass,
} from '@interfaces/response';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { MAX_TAGS_DISPLAY } from '@common';
import { ClassTableFilter } from '@interfaces';
import TeacherPicker from '@components/TeacherPicker';
import SubjectPicker from '@components/SubjectPicker';

interface ClassTableSelectProps {
  onChange: (selectedRowKeys: React.Key[]) => void;
  selectedRowKeys: React.Key[];
  ignoreIds?: string[];
}

const ClassTableSelect = ({
  onChange,
  selectedRowKeys,
  ignoreIds,
}: ClassTableSelectProps) => {
  const onSearch = (values: ClassTableFilter) => {
    const filters: CrudFilters = [];

    if (values.class_name != null) {
      filters.push({
        field: 'class_name',
        operator: 'contains',
        value: values.class_name,
      });
    }

    if (values.class_code != null) {
      filters.push({
        field: 'class_code',
        operator: 'contains',
        value: values.class_code,
      });
    }

    if (values.teacher_ids != null) {
      filters.push({
        field: 'teacher_ids',
        operator: 'contains',
        value: values.teacher_ids,
      });
    }

    if (values.subject_ids != null) {
      filters.push({
        field: 'subject_ids',
        operator: 'contains',
        value: values.subject_ids,
      });
    }

    return filters;
  };

  const { tableProps, searchFormProps } = useTable<
    Class,
    HttpError,
    ClassTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/classes',
    onSearch,
    meta: {
      externalFilters: {
        ignoreIds: Array.isArray(ignoreIds) ? ignoreIds.join(',') : ignoreIds,
      },
    },
  });

  const [open, setOpen] = useState(false);
  const [tempSelectedKeys, setTempSelectedKeys] = useState<React.Key[]>([]);

  const handleOpen = () => {
    setTempSelectedKeys(selectedRowKeys);
    setOpen(true);
  };

  const handleConfirm = () => {
    onChange(tempSelectedKeys);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Chọn lớp học</Button>
      <Modal
        open={open}
        title="Chọn lớp học"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>,
        ]}
        width={900}
      >
        <Form layout="vertical" {...searchFormProps}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="class_name" label="Tên lớp">
                <Input placeholder="Tìm theo tên lớp..." allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="class_code" label="Mã lớp">
                <Input placeholder="Tìm theo mã lớp..." allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="teacher_ids" label="Tên giáo viên">
                <TeacherPicker />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="subject_ids" label="Tên môn học">
                <SubjectPicker />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ textAlign: 'left' }}
            >
              <Form.Item>
                <Space>
                  <Button
                    htmlType="submit"
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{ minWidth: 90 }}
                  >
                    Lọc
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      searchFormProps.form?.resetFields();
                      searchFormProps.form?.submit();
                    }}
                    style={{ minWidth: 90 }}
                  >
                    Đặt lại
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Table
          {...tableProps}
          rowKey="id"
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: tempSelectedKeys,
            onChange: setTempSelectedKeys,
          }}
          size="small"
          style={{ marginTop: 12 }}
          pagination={{
            ...tableProps.pagination,
            position: ['bottomCenter'],
            showSizeChanger: true,
          }}
        >
          <Table.Column<Class>
            dataIndex="class_code"
            title="Mã lớp"
            width={120}
            sorter={{ multiple: 1 }}
            filters={
              Array.from(
                new Set(tableProps.dataSource?.map((item) => item.class_code))
              ).map((code) => ({ text: code, value: code })) ?? []
            }
            onFilter={(value, record) => record.class_code === value}
          />

          <Table.Column<Class>
            dataIndex="class_name"
            title="Tên lớp"
            width={200}
            sorter={{ multiple: 2 }}
            filters={
              Array.from(
                new Set(tableProps.dataSource?.map((item) => item.class_name))
              ).map((name) => ({ text: name, value: name })) ?? []
            }
            onFilter={(value, record) => record.class_name === value}
          />

          <Table.Column<Class>
            dataIndex="students"
            title="Số sinh viên"
            width={150}
            render={(items: Student[]) => items?.length ?? 0}
          />

          <Table.Column<Class>
            dataIndex="teacherSubjectClasses"
            title="Giáo viên - Môn học"
            render={(items: TeacherSubjectClass[]) => {
              const tooltipContent = (
                <div>
                  {items?.map((item, idx) => (
                    <div key={idx}>
                      <b>{item.teacher?.full_name || '-'}</b> -{' '}
                      {item.subject?.subject_name || 'Chưa rõ'}
                    </div>
                  )) || '-'}
                </div>
              );

              const displayContent = items
                ?.map(
                  (item) =>
                    `${item.teacher?.full_name} - ${item.subject?.subject_name}`
                )
                .join(' | ');

              return (
                <Tooltip title={tooltipContent}>
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 200,
                    }}
                  >
                    {displayContent}
                  </div>
                </Tooltip>
              );
            }}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.flatMap((item) =>
                    item.teacherSubjectClasses.map((teacherSubjectClass) => ({
                      subject: teacherSubjectClass.subject?.subject_name,
                      teacher: teacherSubjectClass.teacher?.full_name,
                      id: teacherSubjectClass.id,
                    }))
                  )
                )
              ).map((item) => ({
                text: `${item.teacher} - ${item.subject}`,
                value: item.id,
              })) ?? []
            }
            onFilter={(value, record) => {
              return record.teacherSubjectClasses
                .map((item) => item.id)
                .includes(value as string);
            }}
          />
        </Table>
      </Modal>
    </>
  );
};

export default ClassTableSelect;
