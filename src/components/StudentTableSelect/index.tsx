import { Modal, Table, Button, Tag, Tooltip, Form, Select, Input } from 'antd';
import { CrudFilters, HttpError } from '@refinedev/core';
import { useMemo, useState } from 'react';
import { StudentTableFilter } from '@interfaces';
import { Student } from '@interfaces/response';
import { DateField, useTable } from '@refinedev/antd';
import { GENDER, TAG_GENDER_COLOR_MAPPING, TAG_GENDER_MAPPING } from '@common';
import { truncateText } from '@common/helper';

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
  const { tableProps, searchFormProps } = useTable<
    Student,
    HttpError,
    StudentTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/students',
    onSearch: (values) => {
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

      filters.push({
        field: 'gender',
        operator: 'eq',
        value: values.gender ?? undefined,
      });

      return filters;
    },
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
        width={800}
      >
        <Form
          layout="inline"
          {...searchFormProps}
          style={{ marginBottom: 16, display: 'flex', gap: 16 }}
        >
          <Form.Item
            name="full_name"
            label={<div style={{ width: 50, textAlign: 'left' }}>Họ tên</div>}
          >
            <Input
              style={{ width: 120 }}
              placeholder="Tìm theo tên..."
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="student_code"
            label={
              <div style={{ width: 80, textAlign: 'left' }}>Mã sinh viên</div>
            }
          >
            <Input
              style={{ width: 120 }}
              placeholder="Tìm theo mã sinh viên..."
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label={
              <div style={{ width: 50, textAlign: 'left' }}>Giới tính</div>
            }
          >
            <Select
              placeholder="Chọn giới tính"
              allowClear
              style={{ width: 120 }}
            >
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
              <Select.Option value="other">Khác</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Lọc
            </Button>
          </Form.Item>
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
            showTotal: (total) => `Tổng cộng ${total} bản ghi`,
          }}
          dataSource={tableProps.dataSource}
        >
          <Table.Column
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
          <Table.Column
            dataIndex="student_code"
            title="Mã sinh viên"
            width={120}
            sorter={{ multiple: 1 }}
          />
          <Table.Column
            dataIndex="full_name"
            title="Họ tên"
            sorter={{ multiple: 2 }}
            width={200}
          />
          <Table.Column
            dataIndex="gender"
            title="Giới tính"
            render={(value: GENDER) => (
              <Tag color={TAG_GENDER_COLOR_MAPPING[value]}>
                {TAG_GENDER_MAPPING[value]}
              </Tag>
            )}
            sorter
          />
          <Table.Column
            dataIndex="date_of_birth"
            title="Ngày sinh"
            sorter={{ multiple: 3 }}
            render={(value: string) => (
              <DateField value={value} format="DD/MM/YYYY" />
            )}
          />
        </Table>
      </Modal>
    </>
  );
};

export default StudentTableSelect;
