import { Modal, Table, Button, Form, Input, Tag } from 'antd';
import { useState } from 'react';
import { DateField, useTable } from '@refinedev/antd';
import { CrudFilters, HttpError } from '@refinedev/core';
import { Teacher } from '@interfaces/response';
import { GENDER, TAG_GENDER_COLOR_MAPPING, TAG_GENDER_MAPPING } from '@common';

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
  const { tableProps, searchFormProps } = useTable<
    Teacher,
    HttpError,
    {
      full_name?: string;
      teacher_code?: string;
    }
  >({
    syncWithLocation: true,
    resource: 'api/v1/teachers',
    onSearch: (values) => {
      const filters: CrudFilters = [];
      if (values.full_name) {
        filters.push({
          field: 'full_name',
          operator: 'contains',
          value: values.full_name,
        });
      }
      if (values.teacher_code) {
        filters.push({
          field: 'teacher_code',
          operator: 'contains',
          value: values.teacher_code,
        });
      }
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
              style={{ width: 150 }}
              placeholder="Tìm theo tên..."
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="teacher_code"
            label={<div style={{ width: 50, textAlign: 'left' }}>Mã GV</div>}
          >
            <Input
              style={{ width: 150 }}
              placeholder="Tìm mã giáo viên..."
              allowClear
            />
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
        >
          <Table.Column
            dataIndex="teacher_code"
            title="Mã GV"
            width={100}
            ellipsis
            sorter={{ multiple: 1 }}
          />
          <Table.Column
            dataIndex="full_name"
            title="Họ tên"
            width={180}
            ellipsis
            sorter={{ multiple: 2 }}
          />
          <Table.Column
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
          <Table.Column
            dataIndex="date_of_birth"
            title="Ngày sinh"
            sorter={{ multiple: 4 }}
            render={(value: string) => (
              <DateField value={value} format="DD/MM/YYYY" />
            )}
          />
        </Table>
      </Modal>
    </>
  );
};

export default TeacherTableSelect;
