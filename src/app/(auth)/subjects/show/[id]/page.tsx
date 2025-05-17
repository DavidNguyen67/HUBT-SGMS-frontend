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
  TextField,
} from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Table, Tooltip, Typography } from 'antd';
import { useParams } from 'next/navigation';

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
      <Title level={5}>Mã môn học</Title>
      <TextField value={record?.subject_code} />

      <Title level={5}>Tên môn học</Title>
      <TextField value={record?.subject_name} />

      <Title level={5}>Số tín chỉ</Title>
      <TextField value={record?.credits} />

      <Title level={5}>Ngày tạo</Title>
      <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />

      <Title level={5}>Danh sách lớp và giáo viên giảng dạy</Title>
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
          sorter={(a, b) =>
            (a.teacher?.full_name || '').localeCompare(
              b.teacher?.full_name || ''
            )
          }
        />
        <Table.Column<TeacherSubjectClass>
          title="Mã GV"
          dataIndex={['teacher', 'teacher_code']}
          width={100}
          sorter={(a, b) =>
            (a.teacher?.teacher_code || '').localeCompare(
              b.teacher?.teacher_code || ''
            )
          }
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
          sorter={(a, b) =>
            (a.class?.class_name || '').localeCompare(b.class?.class_name || '')
          }
        />
        <Table.Column<TeacherSubjectClass>
          title="Ngày phân công"
          dataIndex="created_at"
          render={(value) => (
            <DateField value={value} format={DEFAULT_DATE_FORMAT} />
          )}
          sorter={(a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          }
        />
      </Table>

      <Title level={5} style={{ marginTop: 32 }}>
        Danh sách điểm sinh viên
      </Title>
      <Table
        size="small"
        rowKey="id"
        dataSource={record?.studentGrades || []}
        pagination={{ pageSize: 5 }}
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
          sorter={(a, b) =>
            (a.student?.full_name || '').localeCompare(
              b.student?.full_name || ''
            )
          }
        />
        <Table.Column<StudentGrade>
          title="Mã sinh viên"
          dataIndex={['student', 'student_code']}
          sorter={(a, b) =>
            (a.student?.student_code || '').localeCompare(
              b.student?.student_code || ''
            )
          }
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
          sorter={(a, b) =>
            (a.grade_type?.grade_name || '').localeCompare(
              b.grade_type?.grade_name || ''
            )
          }
        />
        <Table.Column<StudentGrade>
          title="Điểm"
          dataIndex="score"
          sorter={(a, b) => (a.score ?? 0) - (b.score ?? 0)}
        />
        <Table.Column<StudentGrade>
          title="Ngày chấm"
          dataIndex="created_at"
          render={(value) => (
            <DateField value={value} format={DEFAULT_DATE_FORMAT} />
          )}
          sorter={(a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          }
        />
      </Table>
    </Show>
  );
};

export default SubjectShow;
