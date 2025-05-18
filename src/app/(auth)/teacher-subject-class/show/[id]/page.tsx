'use client';

import { useShow } from '@refinedev/core';
import {
  Show,
  DateField,
  ListButton,
  RefreshButton,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { Typography, Descriptions, Tag, Badge } from 'antd';
import { useParams } from 'next/navigation';
import { StudentGrade } from '@interfaces/response';
import { DEFAULT_DATE_FORMAT } from '@common';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  BookOutlined,
  UserOutlined,
  IdcardOutlined,
  FieldTimeOutlined,
  KeyOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const getScoreColor = (score?: number) => {
  if (score === undefined || score === null) return 'default';
  if (score >= 8) return 'green';
  if (score >= 5) return 'blue';
  return 'red';
};

const StudentGradeShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<StudentGrade>({
    id,
    resource: 'api/v1/student-grades',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết điểm sinh viên"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách điểm sinh viên</ListButton>
          <RefreshButton
            {...refreshButtonProps}
            resource="api/v1/student-grades"
          >
            Làm mới
          </RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/student-grades"
              confirmTitle="Bạn có chắc muốn xóa điểm sinh viên này không?"
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
        Thông tin chi tiết điểm sinh viên
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
              <KeyOutlined /> ID
            </>
          }
        >
          {record?.id}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <FieldTimeOutlined /> Ngày tạo
            </>
          }
        >
          <DateField value={record?.created_at} format={DEFAULT_DATE_FORMAT} />
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <UserOutlined /> Sinh viên
            </>
          }
        >
          <Tag color="blue">{record?.student?.full_name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Mã sinh viên
            </>
          }
        >
          <Tag>{record?.student?.student_code}</Tag>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <BookOutlined /> Môn học
            </>
          }
        >
          <Tag color="purple">{record?.subject?.subject_name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <IdcardOutlined /> Mã môn học
            </>
          }
        >
          <Tag>{record?.subject?.subject_code}</Tag>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <BookOutlined /> Loại điểm
            </>
          }
        >
          <Tag color="orange">{record?.grade_type?.grade_name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <FieldTimeOutlined /> Hệ số
            </>
          }
        >
          <Badge
            count={record?.grade_type?.coefficient}
            style={{ backgroundColor: '#52c41a' }}
          />
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <>
              <BookOutlined /> Điểm
            </>
          }
        >
          <Tag
            color={getScoreColor(record?.score)}
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            {record?.score}
          </Tag>
          {record?.score !== undefined && record?.score >= 5 ? (
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              style={{ marginLeft: 8 }}
            />
          ) : (
            <CloseCircleTwoTone
              twoToneColor="#ff4d4f"
              style={{ marginLeft: 8 }}
            />
          )}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};

export default StudentGradeShow;
