'use client';

import { useShow } from '@refinedev/core';
import { Class } from '@interfaces/response';
import {
  Show,
  DateField,
  ListButton,
  RefreshButton,
  EditButton,
  DeleteButton,
} from '@refinedev/antd';
import { Typography, Divider, Descriptions, Tag } from 'antd';
import { useParams } from 'next/navigation';
import SelectedStudentTable from '@components/SelectedStudentTable';
import SelectedTeacherSubjectClassTable from '@components/SelectedTeacherSubjectClassTable';
import {
  IdcardOutlined,
  UsergroupAddOutlined,
  FieldTimeOutlined,
  KeyOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const ClassShow = () => {
  const { id } = useParams() as { id: string };

  const { queryResult } = useShow<Class>({
    id,
    resource: 'api/v1/classes',
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const studentIds = record?.students?.map((s) => s.id);
  const teacherSubjectClassIds = record?.teacherSubjectClasses?.map(
    (t) => t.id
  );

  return (
    <Show
      isLoading={isLoading}
      breadcrumb={null}
      title="Chi tiết lớp học"
      headerButtons={({
        listButtonProps,
        refreshButtonProps,
        editButtonProps,
        deleteButtonProps,
      }) => (
        <>
          <ListButton {...listButtonProps}>Danh sách lớp học</ListButton>
          <RefreshButton {...refreshButtonProps} resource="api/v1/classes">
            Làm mới
          </RefreshButton>
          {editButtonProps && (
            <EditButton {...editButtonProps}>Chỉnh sửa</EditButton>
          )}
          {deleteButtonProps && (
            <DeleteButton
              {...deleteButtonProps}
              resource="api/v1/classes"
              confirmTitle="Bạn có chắc muốn xóa lớp học này không?"
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
        <UsergroupAddOutlined style={{ marginRight: 8 }} />
        Thông tin chi tiết lớp học
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
              <IdcardOutlined /> Mã lớp
            </>
          }
        >
          <Tag color="geekblue">{record?.class_code}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <UsergroupAddOutlined /> Tên lớp
            </>
          }
        >
          <span style={{ fontWeight: 600 }}>{record?.class_name}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <>
              <FieldTimeOutlined /> Ngày tạo
            </>
          }
        >
          <DateField value={record?.created_at} />
        </Descriptions.Item>
      </Descriptions>

      {record?.students?.length! > 0 && (
        <>
          <Divider />
          <Title level={5}>
            <UsergroupAddOutlined style={{ marginRight: 6 }} />
            Danh sách sinh viên
          </Title>
          <SelectedStudentTable ids={studentIds} />
        </>
      )}

      {record?.teacherSubjectClasses?.length! > 0 && (
        <>
          <Divider />
          <Title level={5}>
            <UsergroupAddOutlined style={{ marginRight: 6 }} />
            Giáo viên - Môn học
          </Title>
          <SelectedTeacherSubjectClassTable ids={teacherSubjectClassIds} />
        </>
      )}
    </Show>
  );
};

export default ClassShow;
