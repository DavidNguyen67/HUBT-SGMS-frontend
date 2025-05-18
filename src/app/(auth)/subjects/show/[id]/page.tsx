'use client';

import { DEFAULT_DATE_FORMAT } from '@common';
import { truncateText } from '@common/helper';
import {
  StudentGrade,
  Subject,
  TeacherSubjectClass,
} from '@interfaces/response';
import {
  DateField,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
} from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Table, Tooltip, Typography, Descriptions, Tag } from 'antd';
import { useParams } from 'next/navigation';
import {
  BookOutlined,
  IdcardOutlined,
  FieldTimeOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const SubjectShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<Subject>({
    id,
    resource: 'api/v1/subjects',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      title="Chi tiết môn học"
      isLoading={isLoading}
      breadcrumb={null}
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách môn học</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/subjects">
            Làm mới
          </RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/subjects"
              confirmTitle="Bạn có chắc muốn xóa môn học này không?"
              confirmOkText="Đồng ý"
              confirmCancelText="Hủy"
            >
              Xóa
            </DeleteButton>
          )}
        </>
      )}
    >
      <Title level={4} style={{ marginBottom: 24 }}>
        <BookOutlined style={{ marginRight: 8 }} />
        Thông tin chi tiết môn học
      </Title>
      <Descriptions
        bordered
        column={2}
        size="middle"
        labelStyle={{ fontWeight: 600 }}
      >
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Mã môn học
            </>
          }
        >
          <Tag color="geekblue">{record?.subject_code}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <BookOutlined /> Tên môn học
            </>
          }
        >
          <span style={{ fontWeight: 600 }}>{record?.subject_name}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <FieldTimeOutlined /> Số tín chỉ
            </>
          }
        >
          <Tag color="purple">{record?.credits}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <CalendarOutlined /> Ngày tạo
            </>
          }
        >
          <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />
        </Descriptions.Item>
      </Descriptions>

      <Title level={5} style={{ marginTop: 32 }}>
        <TeamOutlined style={{ marginRight: 6 }} />
        Danh sách lớp và giáo viên giảng dạy
      </Title>
      <Table
        size="small"
        rowKey="id"
        dataSource={record?.teacherSubjectClasses || []}
        pagination={{ pageSize: 5 }}
      >
        <Table.Column<TeacherSubjectClass>
          title="Giáo viên"
          dataIndex={['teacher', 'full_name']}
          render={(value: string) => (
            <Tooltip title={value}>{truncateText(value)}</Tooltip>
          )}
          filters={Array.from(
            new Set(
              (record?.teacherSubjectClasses || []).map(
                (item) => item.teacher?.full_name
              )
            )
          )
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))}
          onFilter={(value, record) => record.teacher?.full_name === value}
          sorter={{ multiple: 1 }}
        />
        <Table.Column<TeacherSubjectClass>
          title="Mã GV"
          dataIndex={['teacher', 'teacher_code']}
          width={100}
          sorter={{ multiple: 2 }}
        />
        <Table.Column<TeacherSubjectClass>
          title="Lớp học"
          dataIndex={['class', 'class_name']}
          filters={Array.from(
            new Set(
              (record?.teacherSubjectClasses || []).map(
                (item) => item.class?.class_name
              )
            )
          )
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))}
          onFilter={(value, record) => record.class?.class_name === value}
          sorter={{ multiple: 3 }}
        />
        <Table.Column<TeacherSubjectClass>
          title="Ngày phân công"
          dataIndex="created_at"
          render={(value) => (
            <DateField value={value} format={DEFAULT_DATE_FORMAT} />
          )}
          sorter={{ multiple: 4 }}
        />
      </Table>

      <Title level={5} style={{ marginTop: 32 }}>
        <UserOutlined style={{ marginRight: 6 }} />
        Danh sách điểm sinh viên
      </Title>
      <Table
        size="small"
        rowKey="id"
        dataSource={record?.studentGrades || []}
        pagination={{ pageSize: 1 }}
      >
        <Table.Column<StudentGrade>
          title="Họ tên sinh viên"
          dataIndex={['student', 'full_name']}
          filters={Array.from(
            new Set(
              (record?.studentGrades || []).map(
                (item) => item.student?.full_name
              )
            )
          )
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))}
          onFilter={(value, record) => record.student?.full_name === value}
          sorter={{ multiple: 2 }}
        />
        <Table.Column<StudentGrade>
          title="Mã sinh viên"
          dataIndex={['student', 'student_code']}
          sorter={{ multiple: 3 }}
        />
        <Table.Column<StudentGrade>
          title="Loại điểm"
          dataIndex={['grade_type', 'grade_name']}
          filters={Array.from(
            new Set(
              (record?.studentGrades || []).map(
                (item) => item.grade_type?.grade_name
              )
            )
          )
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))}
          onFilter={(value, record) => record.grade_type?.grade_name === value}
          sorter={{ multiple: 4 }}
        />
        <Table.Column<StudentGrade>
          title="Điểm"
          dataIndex="score"
          sorter={{ multiple: 5 }}
        />
        <Table.Column<StudentGrade>
          title="Ngày chấm"
          dataIndex="created_at"
          render={(value) => (
            <DateField value={value} format={DEFAULT_DATE_FORMAT} />
          )}
          sorter={{ multiple: 6 }}
        />
      </Table>
    </Show>
  );
};

export default SubjectShow;
