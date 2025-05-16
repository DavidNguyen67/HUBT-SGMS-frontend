import { Modal, Table, Button, Tooltip, Form, Input } from 'antd';
import { CrudFilters, HttpError } from '@refinedev/core';
import { useState } from 'react';
import { TeacherSubjectClassTableFilter } from '@interfaces';
import { TeacherSubjectClass } from '@interfaces/response';
import { DateField, useTable } from '@refinedev/antd';
import { truncateText } from '@common/helper';

interface TeacherSubjectClassTableSelectProps {
  onChange: (selectedRowKeys: React.Key[]) => void;
  selectedRowKeys: React.Key[];
  ignoreIds?: string[];
}

const TeacherSubjectClassTableSelect = ({
  onChange,
  selectedRowKeys,
  ignoreIds,
}: TeacherSubjectClassTableSelectProps) => {
  const { tableProps, searchFormProps } = useTable<
    TeacherSubjectClass,
    HttpError,
    TeacherSubjectClassTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/teacher-subject-classes',
    onSearch: (values) => {
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
      if (values.subject_name != null) {
        filters.push({
          field: 'subject_name',
          operator: 'contains',
          value: values.subject_name,
        });
      }
      if (values.subject_code != null) {
        filters.push({
          field: 'subject_code',
          operator: 'contains',
          value: values.subject_code,
        });
      }
      if (values.teacher_name != null) {
        filters.push({
          field: 'teacher_name',
          operator: 'contains',
          value: values.teacher_name,
        });
      }
      if (values.teacher_code != null) {
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
        ignoreIds: ignoreIds?.join(','),
      },
    },
  });

  const [open, setOpen] = useState(false);

  const rowSelection = {
    selectedRowKeys,
    onChange,
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Chọn giáo viên - môn học</Button>
      <Modal
        open={open}
        title="Chọn giáo viên - môn học"
        onCancel={() => setOpen(false)}
        footer={null}
        width={900}
      >
        <Form
          layout="inline"
          {...searchFormProps}
          style={{ marginBottom: 16, display: 'flex', gap: 16 }}
        >
          <Form.Item
            name="class_name"
            label={<div style={{ width: 50 }}>Tên lớp</div>}
          >
            <Input
              placeholder="Tìm theo tên lớp..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="class_code"
            label={<div style={{ width: 50 }}>Mã lớp</div>}
          >
            <Input
              placeholder="Tìm theo mã lớp..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="subject_name"
            label={<div style={{ width: 50 }}>Tên môn</div>}
          >
            <Input
              placeholder="Tìm theo tên môn..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="subject_code"
            label={<div style={{ width: 50 }}>Mã môn</div>}
          >
            <Input
              placeholder="Tìm theo mã môn..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="teacher_name"
            label={<div style={{ width: 50 }}>Tên GV</div>}
          >
            <Input
              placeholder="Tìm theo tên GV..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="teacher_code"
            label={<div style={{ width: 50 }}>Mã GV</div>}
          >
            <Input
              placeholder="Tìm theo mã GV..."
              allowClear
              style={{ width: 150 }}
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
            ...rowSelection,
          }}
          dataSource={tableProps.dataSource}
          pagination={{
            ...tableProps.pagination,
            position: ['bottomCenter'],
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
            showTotal: (total) => `Tổng cộng ${total} bản ghi`,
          }}
        >
          <Table.Column
            title="Giáo viên"
            dataIndex={['teacher', 'full_name']}
            render={(value: string) => (
              <Tooltip title={value}>{truncateText(value, 24)}</Tooltip>
            )}
          />
          <Table.Column
            title="Mã GV"
            dataIndex={['teacher', 'teacher_code']}
            width={100}
          />
          <Table.Column
            title="Môn học"
            dataIndex={['subject', 'subject_name']}
            render={(value: string) => (
              <Tooltip title={value}>{truncateText(value, 24)}</Tooltip>
            )}
          />
          <Table.Column
            title="Mã môn"
            dataIndex={['subject', 'subject_code']}
            width={100}
          />
          <Table.Column
            title="Lớp"
            dataIndex={['class', 'class_name']}
            render={(value: string) => (
              <Tooltip title={value}>{truncateText(value, 24)}</Tooltip>
            )}
          />
          <Table.Column
            title="Mã lớp"
            dataIndex={['class', 'class_code']}
            width={100}
          />
          <Table.Column
            title="Ngày tạo"
            dataIndex="created_at"
            render={(value: string) => (
              <DateField value={value} format="DD/MM/YYYY" />
            )}
            width={120}
          />
        </Table>
      </Modal>
    </>
  );
};
export default TeacherSubjectClassTableSelect;
