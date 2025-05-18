import {
  Modal,
  Table,
  Button,
  Tag,
  Tooltip,
  Form,
  Select,
  Input,
  Row,
  Col,
  DatePicker,
} from 'antd';
import { CrudFilters, HttpError } from '@refinedev/core';
import { useState } from 'react';
import { StudentTableFilter } from '@interfaces';
import { Student } from '@interfaces/response';
import { DateField, useTable } from '@refinedev/antd';
import {
  DEFAULT_DATE_FORMAT,
  GENDER,
  TAG_GENDER_COLOR_MAPPING,
  TAG_GENDER_MAPPING,
} from '@common';
import { truncateText } from '@common/helper';
import dayjs from 'dayjs';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';

interface StudentTableSelectProps {
  onChange: (selectedRowKeys: React.Key[]) => void;
  selectedRowKeys: React.Key[];
  ignoreIds?: string[];
}

const StudentTableSelect = ({
  onChange,
  selectedRowKeys,
  ignoreIds,
}: StudentTableSelectProps) => {
  const onSearch = (values: StudentTableFilter) => {
    const filters: CrudFilters = [];

    if (values.full_name != null) {
      filters.push({
        field: 'full_name',
        operator: 'contains',
        value: values.full_name || undefined,
      });
    }

    if (values.student_code != null) {
      filters.push({
        field: 'student_code',
        operator: 'contains',
        value: values.student_code || undefined,
      });
    }

    if (values.date_of_birth_range && values.date_of_birth_range.length > 0) {
      const [from, to] = values.date_of_birth_range;

      if (from) {
        filters.push({
          field: 'date_of_birth_from',
          operator: 'gte',
          value: from.add(1, 'day').toISOString(),
        });
      }
      if (to) {
        filters.push({
          field: 'date_of_birth_to',
          operator: 'lte',
          value: to.add(2, 'day').toISOString(),
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
    Student,
    HttpError,
    StudentTableFilter
  >({
    syncWithLocation: false,
    resource: 'api/v1/students',
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
      <Button onClick={handleOpen}>Chọn sinh viên</Button>
      <Modal
        open={open}
        title="Chọn sinh viên"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>,
        ]}
        width={960}
      >
        <Form
          layout="horizontal"
          {...searchFormProps}
          style={{ marginBottom: 16 }}
        >
          <Row gutter={8}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="student_code" label="Mã sinh viên">
                <Input placeholder="Tìm theo mã sinh viên..." allowClear />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="full_name" label="Họ tên">
                <Input placeholder="Tìm theo tên..." allowClear />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item name="date_of_birth_range" label="Ngày sinh">
                <DatePicker.RangePicker
                  format={DEFAULT_DATE_FORMAT}
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={['Từ ngày', 'Đến ngày']}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ marginRight: 8 }}
                >
                  Lọc
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    searchFormProps.form?.resetFields();
                    searchFormProps.form?.submit();
                  }}
                >
                  Đặt lại
                </Button>
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
          dataSource={tableProps.dataSource}
        >
          <Table.Column<Student>
            dataIndex="id"
            title="Mã"
            ellipsis
            width={60}
            render={(value: string) => (
              <Tooltip placement="topLeft" title={value}>
                <div
                  style={{
                    width: 60,
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                  }}
                >
                  {truncateText(value)}
                </div>
              </Tooltip>
            )}
          />
          <Table.Column<Student>
            dataIndex="student_code"
            title="Mã sinh viên"
            width={150}
            sorter={{ multiple: 1 }}
            filters={
              Array.from(
                new Set(tableProps.dataSource?.map((item) => item.student_code))
              ).map((code) => ({ text: code, value: code })) ?? []
            }
            onFilter={(value, record) => record.student_code === value}
          />
          <Table.Column<Student>
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
          <Table.Column<Student>
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
          <Table.Column<Student>
            dataIndex="date_of_birth"
            title="Ngày sinh"
            sorter={{ multiple: 4 }}
            render={(value: string) => (
              <DateField value={value} format={DEFAULT_DATE_FORMAT} />
            )}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.map((item) => item.date_of_birth)
                )
              ).map((date) => ({
                text: dayjs(date).format(DEFAULT_DATE_FORMAT),
                value: date,
              })) ?? []
            }
            onFilter={(value, record) =>
              dayjs(record.date_of_birth).isSameOrBefore(dayjs(value as string))
            }
          />
        </Table>
      </Modal>
    </>
  );
};

export default StudentTableSelect;
