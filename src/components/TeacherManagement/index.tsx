'use client';

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { CrudFilters, HttpError, BaseRecord } from '@refinedev/core';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import { GENDER, TAG_GENDER_COLOR_MAPPING, TAG_GENDER_MAPPING } from '@common';
import { truncateText } from '@common/helper';
import { Teacher, TeacherSubjectClass } from '@interfaces/response';
import { TeacherTableFilter } from '@interfaces';
import dayjs from 'dayjs';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';

const TeachersManagement = () => {
  const onSearch = (values: TeacherTableFilter) => {
    const filters: CrudFilters = [];

    if (values.full_name != null) {
      filters.push({
        field: 'full_name',
        operator: 'contains',
        value: values.full_name,
      });
    }

    if (values.teacher_code != null) {
      filters.push({
        field: 'teacher_code',
        operator: 'contains',
        value: values.teacher_code || undefined,
      });
    }

    if (values.teacher_subject_class != null) {
      filters.push({
        field: 'teacher_subject_class',
        operator: 'contains',
        value: values.teacher_subject_class,
      });
    }

    if (values.date_of_birth_range && values.date_of_birth_range.length > 0) {
      const [from, to] = values.date_of_birth_range;

      if (from) {
        filters.push({
          field: 'date_of_birth_from',
          operator: 'gte',
          value: from.toISOString(),
        });
      }
      if (to) {
        filters.push({
          field: 'date_of_birth_to',
          operator: 'lte',
          value: to.toISOString(),
        });
      }
    } else {
      filters.push({
        field: 'date_of_birth_from',
        operator: 'gte',
        value: undefined,
      });
      filters.push({
        field: 'date_of_birth_to',
        operator: 'lte',
        value: undefined,
      });
    }

    filters.push({
      field: 'gender',
      operator: 'eq',
      value: values.gender ?? undefined,
    });

    return filters;
  };

  const { tableProps, searchFormProps } = useTable<
    Teacher,
    HttpError,
    TeacherTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/teachers',
    onSearch,
  });

  return (
    <List
      title="Quản lý giáo viên"
      createButtonProps={{
        children: 'Thêm giáo viên',
      }}
    >
      <Form layout="vertical" {...searchFormProps}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="full_name" label="Họ tên">
              <Input placeholder="Tìm theo tên..." allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="teacher_code" label="Mã giáo viên">
              <Input placeholder="Tìm theo mã giáo viên..." allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="date_of_birth_range" label="Ngày sinh">
              <DatePicker.RangePicker
                format="DD/MM/YYYY"
                allowClear
                style={{ width: '100%' }}
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="teacher_subject_class" label="Môn học - Lớp học">
              <Input
                placeholder="Tìm theo tên hoặc mã của môn học - lớp học..."
                allowClear
              />
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
      >
        <Table.Column<Teacher>
          dataIndex="id"
          title="Mã"
          width={60}
          ellipsis
          render={(value: string) => (
            <Tooltip placement="topLeft" title={value}>
              <div style={{ width: 60, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column<Teacher>
          dataIndex="teacher_code"
          title="Mã giáo viên"
          width={150}
          sorter={{ multiple: 1 }}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.teacher_code))
            ).map((code) => ({ text: code, value: code })) ?? []
          }
          onFilter={(value, record) => record.teacher_code === value}
        />
        <Table.Column<Teacher>
          dataIndex="full_name"
          title="Họ tên"
          sorter={{ multiple: 2 }}
          width={200}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.full_name))
            ).map((name) => ({ text: name, value: name })) ?? []
          }
          onFilter={(value, record) => record.full_name === value}
        />
        <Table.Column<Teacher>
          dataIndex="gender"
          title="Giới tính"
          render={(value: GENDER) => (
            <Tag color={TAG_GENDER_COLOR_MAPPING[value]}>
              {TAG_GENDER_MAPPING[value]}
            </Tag>
          )}
          sorter={{ multiple: 3 }}
          filters={[
            { text: 'Nam', value: 'male' },
            { text: 'Nữ', value: 'female' },
            { text: 'Khác', value: 'other' },
          ]}
          onFilter={(value, record) => record.gender === value}
          width={120}
        />
        <Table.Column<Teacher>
          dataIndex="date_of_birth"
          title="Ngày sinh"
          render={(value: string) => (
            <DateField value={value} format="DD/MM/YYYY" />
          )}
          sorter={{ multiple: 4 }}
          filters={
            Array.from(
              new Set(tableProps.dataSource?.map((item) => item.date_of_birth))
            ).map((date) => ({
              text: dayjs(date).format('DD/MM/YYYY'),
              value: date,
            })) ?? []
          }
          onFilter={(value, record) =>
            dayjs(record.date_of_birth).isSameOrBefore(dayjs(value as string))
          }
        />
        <Table.Column<Teacher>
          dataIndex="teacherSubjectClasses"
          title="Môn học - Lớp học"
          render={(items: TeacherSubjectClass[]) => {
            const tooltipContent = (
              <div>
                {items?.map((item, idx) => (
                  <div key={idx}>
                    <b>{item.subject.subject_name}</b> - {item.class.class_name}
                  </div>
                )) || '-'}
              </div>
            );

            const displayContent = items
              ?.map(
                (item) =>
                  `${item.subject.subject_name} - ${item.class.class_name}`
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
                  item.teacherSubjectClasses.map((subItem) => ({
                    subject: subItem.subject.subject_name,
                    class: subItem.class.class_name,
                    id: subItem.id,
                  }))
                )
              )
            ).map((item) => ({
              text: `${item.subject} - ${item.class}`,
              value: item.id,
            })) ?? []
          }
          onFilter={(value, record) => {
            return record.teacherSubjectClasses
              .map((item) => item.id)
              .includes(value as string);
          }}
        />

        <Table.Column<Teacher>
          title="Thao tác"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="api/v1/teachers"
                confirmTitle="Bạn có chắc muốn xóa giáo viên này không?"
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

export default TeachersManagement;
