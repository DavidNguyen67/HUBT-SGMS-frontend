"use client";

import { Button, Table, Tag, Tooltip } from "antd";
import {
  GENDER,
  PAGE_SIZE_OPTIONS,
  TAG_GENDER_COLOR_MAPPING,
  TAG_GENDER_MAPPING,
} from "@common";
import { DateField, DeleteButton, useTable } from "@refinedev/antd";
import { Student } from "@interfaces/response";
import { truncateText } from "@common/helper";
import { HttpError } from "@refinedev/core";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

interface SelectedStudentTableProps {
  ids?: string[];
  onRemoveId?: (id: string) => void;
}

const SelectedStudentTable = ({
  ids,
  onRemoveId,
}: SelectedStudentTableProps) => {
  const { tableProps } = useTable<Student, HttpError>({
    resource: "api/v1/students",
    syncWithLocation: false,
    meta: {
      externalFilters: {
        ids: Array.isArray(ids) ? ids.join(",") : ids,
      },
    },
  });

  return (
    <Table
      {...tableProps}
      size="small"
      rowKey="id"
      style={{ marginTop: 12 }}
      pagination={{
        ...tableProps.pagination,
        position: ["bottomCenter"],
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        defaultPageSize: +PAGE_SIZE_OPTIONS[0],
        showTotal: (total) => `Tổng cộng ${total} bản ghi`,
      }}
    >
      <Table.Column
        dataIndex="id"
        title="Mã"
        ellipsis
        width={60}
        render={(value: string) => (
          <Tooltip title={value}>
            <div style={{ width: 60 }}>{truncateText(value)}</div>
          </Tooltip>
        )}
      />
      <Table.Column
        dataIndex="student_code"
        title="Mã sinh viên"
        width={120}
        sorter={(a, b) => a.student_code.localeCompare(b.student_code)}
        filters={
          tableProps.dataSource?.map((s) => ({
            text: s.student_code,
            value: s.student_code,
          })) ?? []
        }
        onFilter={(value, record) => record.student_code.includes(value)}
      />
      <Table.Column
        dataIndex="full_name"
        title="Họ tên"
        width={200}
        sorter={(a, b) => a.full_name.localeCompare(b.full_name)}
        filters={
          tableProps.dataSource?.map((s) => ({
            text: s.full_name,
            value: s.full_name,
          })) ?? []
        }
        onFilter={(value, record) => record.full_name.includes(value)}
      />
      <Table.Column
        dataIndex="gender"
        title="Giới tính"
        filters={[
          { text: "Nam", value: "male" },
          { text: "Nữ", value: "female" },
          { text: "Khác", value: "other" },
        ]}
        onFilter={(value, record) => record.gender === value}
        render={(value: GENDER) => (
          <Tag color={TAG_GENDER_COLOR_MAPPING[value]}>
            {TAG_GENDER_MAPPING[value]}
          </Tag>
        )}
      />
      <Table.Column
        dataIndex="date_of_birth"
        title="Ngày sinh"
        render={(value: string) => (
          <DateField value={value} format="DD/MM/YYYY" />
        )}
        sorter={(a, b) =>
          new Date(a.date_of_birth).getTime() -
          new Date(b.date_of_birth).getTime()
        }
      />
      <Table.Column
        title="Hành động"
        key="action"
        fixed="right"
        width={100}
        render={(_, record: Student) => (
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              onRemoveId?.(record.id);
            }}
          />
        )}
      />
    </Table>
  );
};

export default SelectedStudentTable;
