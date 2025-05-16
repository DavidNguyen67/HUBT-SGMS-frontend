import { Modal, Table, Button, Tooltip, Form, Input } from 'antd';
import { CrudFilters, HttpError } from '@refinedev/core';
import { useState } from 'react';
import { TeacherSubjectClassTableFilter } from '@interfaces';
import { TeacherSubjectClass } from '@interfaces/response';
import { DateField, useTable } from '@refinedev/antd';
import { truncateText } from '@common/helper';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

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
    syncWithLocation: false,
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
      <Button onClick={handleOpen}>Chọn giáo viên - môn học</Button>
      <Modal
        open={open}
        title="Chọn giáo viên - môn học"
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
            label={<div style={{ width: 60, textAlign: 'left' }}>Tên lớp</div>}
          >
            <Input
              placeholder="Tìm theo tên lớp..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="class_code"
            label={<div style={{ width: 60, textAlign: 'left' }}>Mã lớp</div>}
          >
            <Input
              placeholder="Tìm theo mã lớp..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="subject_name"
            label={<div style={{ width: 60, textAlign: 'left' }}>Tên môn</div>}
          >
            <Input
              placeholder="Tìm theo tên môn..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="subject_code"
            label={<div style={{ width: 60, textAlign: 'left' }}>Mã môn</div>}
          >
            <Input
              placeholder="Tìm theo mã môn..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="teacher_name"
            label={<div style={{ width: 60, textAlign: 'left' }}>Tên GV</div>}
          >
            <Input
              placeholder="Tìm theo tên GV..."
              allowClear
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item
            name="teacher_code"
            label={<div style={{ width: 60, textAlign: 'left' }}>Mã GV</div>}
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
            selectedRowKeys: tempSelectedKeys,
            onChange: setTempSelectedKeys,
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
          <Table.Column<TeacherSubjectClass>
            title="Giáo viên"
            dataIndex={['teacher', 'full_name']}
            render={(value: string) => (
              <Tooltip title={value}>{truncateText(value, 24)}</Tooltip>
            )}
            sorter={{ multiple: 1 }}
            width={200}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.map((item) => item.teacher.full_name)
                )
              ).map((name) => ({ text: name, value: name })) ?? []
            }
            onFilter={(value, record) => record.teacher?.full_name === value}
          />
          <Table.Column<TeacherSubjectClass>
            title="Mã GV"
            dataIndex={['teacher', 'teacher_code']}
            sorter={{ multiple: 2 }}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.map(
                    (item) => item.teacher?.teacher_code
                  )
                )
              ).map((code) => ({ text: code, value: code })) ?? []
            }
            onFilter={(value, record) => record.teacher?.teacher_code === value}
            width={150}
          />
          <Table.Column<TeacherSubjectClass>
            title="Môn học"
            dataIndex={['subject', 'subject_name']}
            render={(value: string) => (
              <Tooltip title={value}>{truncateText(value, 24)}</Tooltip>
            )}
            sorter={{ multiple: 3 }}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.map(
                    (item) => item.subject.subject_name
                  )
                )
              ).map((name) => ({ text: name, value: name })) ?? []
            }
            onFilter={(value, record) => record.subject?.subject_name === value}
          />
          <Table.Column<TeacherSubjectClass>
            title="Mã môn"
            dataIndex={['subject', 'subject_code']}
            width={100}
            sorter={{ multiple: 4 }}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.map(
                    (item) => item.subject.subject_code
                  )
                )
              ).map((code) => ({ text: code, value: code })) ?? []
            }
            onFilter={(value, record) => record.subject?.subject_code === value}
          />
          <Table.Column<TeacherSubjectClass>
            title="Lớp"
            dataIndex={['class', 'class_name']}
            render={(value: string) => (
              <Tooltip title={value}>{truncateText(value, 24)}</Tooltip>
            )}
            sorter={{ multiple: 5 }}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.map((item) => item.class?.class_name)
                )
              ).map((name) => ({ text: name, value: name })) ?? []
            }
            onFilter={(value, record) => record.class?.class_name === value}
          />
          <Table.Column<TeacherSubjectClass>
            title="Mã lớp"
            dataIndex={['class', 'class_code']}
            width={100}
            sorter={{ multiple: 6 }}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.map((item) => item.class?.class_code)
                )
              ).map((code) => ({ text: code, value: code })) ?? []
            }
            onFilter={(value, record) => record.class?.class_code === value}
          />
          <Table.Column<TeacherSubjectClass>
            title="Ngày tạo"
            dataIndex="created_at"
            render={(value: string) => (
              <DateField value={value} format="DD/MM/YYYY" />
            )}
            width={120}
            sorter={{ multiple: 7 }}
            filters={
              Array.from(
                new Set(
                  tableProps.dataSource?.map((item) =>
                    dayjs(item.created_at).format('DD/MM/YYYY')
                  )
                )
              ).map((date) => ({
                text: date,
                value: date,
              })) ?? []
            }
            onFilter={(value, record) =>
              dayjs(record.created_at, 'DD/MM/YYYY').isSameOrBefore(
                dayjs(value as string, 'DD/MM/YYYY'),
                'day'
              )
            }
          />
        </Table>
      </Modal>
    </>
  );
};

export default TeacherSubjectClassTableSelect;
