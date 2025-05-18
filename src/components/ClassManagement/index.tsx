'use client';

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useSelect,
  useTable,
} from '@refinedev/antd';
import { CrudFilters, HttpError, BaseRecord } from '@refinedev/core';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import { truncateText } from '@common/helper';
import {
  Class,
  Student,
  Subject,
  Teacher,
  TeacherSubjectClass,
} from '@interfaces/response';
import { ClassTableFilter } from '@interfaces';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { MAX_TAGS_DISPLAY } from '@common';
import TeacherPicker from '@elements/TeacherPicker';
import SubjectPicker from '@elements/SubjectPicker';

const ClassesManagement = () => {
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
  });

  return (
    <List
      title="Quản lý lớp học"
      createButtonProps={{
        children: 'Thêm lớp học',
      }}
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
            style={{ textAlign: 'right' }}
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
        tableLayout="fixed"
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        size="small"
      >
        <Table.Column<Class>
          dataIndex="id"
          title="Mã"
          width={60}
          ellipsis
          render={(value: string) => (
            <Tooltip title={value}>
              <div style={{ width: 60, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />

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
          // sorter={{ multiple: 3 }}
          render={(items: Student[]) => items?.length ?? 0}
          // filters={
          //   Array.from(
          //     new Set(
          //       tableProps.dataSource?.map((item) => item.students?.length ?? 0)
          //     )
          //   ).map((count) => ({
          //     text: count,
          //     value: count,
          //   })) ?? []
          // }
          // onFilter={(value, record) => {
          //   return record.students?.length === value;
          // }}
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

        <Table.Column<Class>
          fixed="right"
          title="Thao tác"
          width={100}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="api/v1/classes"
                confirmTitle="Bạn có chắc muốn xóa lớp học này không?"
                confirmOkText="Đồng ý"
                confirmCancelText="Hủy"
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default ClassesManagement;
