import { Modal, Table, Button, Tooltip, Form, Input, Row, Col } from 'antd';
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
          layout="horizontal"
          {...searchFormProps}
          style={{ marginBottom: 16 }}
        >
          <Row gutter={8}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item name="class_name" label="Tên lớp">
                <Input placeholder="Tìm theo tên lớp..." allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item name="class_code" label="Mã lớp">
                <Input placeholder="Tìm theo mã lớp..." allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item name="subject_name" label="Tên môn">
                <Input placeholder="Tìm theo tên môn..." allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item name="subject_code" label="Mã môn">
                <Input placeholder="Tìm theo mã môn..." allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item name="teacher_name" label="Tên GV">
                <Input placeholder="Tìm theo tên GV..." allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item name="teacher_code" label="Mã GV">
                <Input placeholder="Tìm theo mã GV..." allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                  }}
                >
                  <Button htmlType="submit" type="primary" style={{ flex: 1 }}>
                    Lọc
                  </Button>
                  <Button
                    onClick={() => {
                      searchFormProps.form?.resetFields();
                      searchFormProps.form?.submit();
                    }}
                    style={{ flex: 1 }}
                  >
                    Đặt lại
                  </Button>
                </div>
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
          dataSource={tableProps.dataSource}
          pagination={{
            ...tableProps.pagination,
            position: ['bottomCenter'],
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
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
                    (item) => item.subject?.subject_name
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
                    (item) => item.subject?.subject_code
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
        </Table>
      </Modal>
    </>
  );
};

export default TeacherSubjectClassTableSelect;
