import { Modal, Table, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useTable } from '@refinedev/antd';
import { CrudFilters, HttpError } from '@refinedev/core';
import { truncateText } from '@common/helper';
import { Class } from '@interfaces/response';

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
  const { tableProps, searchFormProps } = useTable<
    Class,
    HttpError,
    {
      class_name?: string;
      class_code?: string;
      teacher_name?: string;
    }
  >({
    syncWithLocation: true,
    resource: 'api/v1/classes',
    onSearch: (values) => {
      const filters: CrudFilters = [];

      if (values.class_name) {
        filters.push({
          field: 'class_name',
          operator: 'contains',
          value: values.class_name,
        });
      }

      if (values.class_code) {
        filters.push({
          field: 'class_code',
          operator: 'contains',
          value: values.class_code,
        });
      }

      if (values.teacher_name) {
        filters.push({
          field: 'teacher_name',
          operator: 'contains',
          value: values.teacher_name,
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
        <Form
          layout="inline"
          {...searchFormProps}
          style={{ marginBottom: 16, display: 'flex', gap: 16 }}
        >
          <Form.Item
            name="class_name"
            label={<div style={{ width: 100, textAlign: 'left' }}>Tên lớp</div>}
          >
            <Input
              style={{ width: 150 }}
              placeholder="Tìm tên lớp..."
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="class_code"
            label={<div style={{ width: 100, textAlign: 'left' }}>Mã lớp</div>}
          >
            <Input
              style={{ width: 150 }}
              placeholder="Tìm mã lớp..."
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="teacher_name"
            label={
              <div style={{ width: 100, textAlign: 'left' }}>Tên giáo viên</div>
            }
          >
            <Input
              style={{ width: 150 }}
              placeholder="Tìm giáo viên..."
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
            dataIndex="class_code"
            title="Mã lớp"
            width={100}
            ellipsis
          />
          <Table.Column
            dataIndex="class_name"
            title="Tên lớp"
            width={150}
            ellipsis
          />
          <Table.Column
            title="Giáo viên"
            dataIndex="teacher"
            render={(_, record: Class) => {
              const teacher = record.teacherSubjectClasses?.[0]?.teacher;
              return teacher?.full_name || 'Không rõ';
            }}
            width={160}
          />
          <Table.Column
            title="Môn học"
            dataIndex="subject"
            render={(_, record: Class) => {
              const subject = record.teacherSubjectClasses?.[0]?.subject;
              return subject?.subject_name || 'Không rõ';
            }}
            width={160}
          />
          <Table.Column
            title="Số học sinh"
            dataIndex="studentCount"
            width={80}
          />
        </Table>
      </Modal>
    </>
  );
};

export default ClassTableSelect;
