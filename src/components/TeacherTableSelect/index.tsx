import {
  Modal,
  Table,
  Button,
  Form,
  Input,
  Tag,
  DatePicker,
  Row,
  Col,
  Space,
} from 'antd';
import { useState } from 'react';
import { DateField, useTable } from '@refinedev/antd';
import { CrudFilters, HttpError } from '@refinedev/core';
import { Teacher } from '@interfaces/response';
import {
  DEFAULT_DATE_FORMAT,
  GENDER,
  TAG_GENDER_COLOR_MAPPING,
  TAG_GENDER_MAPPING,
} from '@common';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { TeacherTableFilter } from '@interfaces';
import dayjs from 'dayjs';

interface TeacherTableSelectProps {
  onChange: (selectedRowKeys: React.Key[]) => void;
  selectedRowKeys: React.Key[];
  ignoreIds?: string[];
}

const TeacherTableSelect = ({
  onChange,
  selectedRowKeys,
  ignoreIds,
}: TeacherTableSelectProps) => {
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
    Teacher,
    HttpError,
    TeacherTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/teachers',
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
      <Button onClick={handleOpen}>Chọn giáo viên</Button>
      <Modal
        open={open}
        title="Chọn giáo viên"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Hủy
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>,
        ]}
        width={800}
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
                  format={DEFAULT_DATE_FORMAT}
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
              <DateField value={value} format={DEFAULT_DATE_FORMAT} />
            )}
            sorter={{ multiple: 4 }}
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

export default TeacherTableSelect;
