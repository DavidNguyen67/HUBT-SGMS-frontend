'use client';

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { CrudFilters, HttpError, type BaseRecord } from '@refinedev/core';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Table,
  Tooltip,
} from 'antd';
import React from 'react';
import { truncateText } from '@common/helper';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { GradeType } from '@interfaces/response';
import { GradeTypeTableFilter } from '@interfaces';
import { DEFAULT_DATE_FORMAT } from '@common';

const GradeManagement = () => {
  const onSearch = (values: GradeTypeTableFilter) => {
    const filters: CrudFilters = [];

    if (values.grade_name != null) {
      filters.push({
        field: 'grade_name',
        operator: 'contains',
        value: values.grade_name,
      });
    }

    filters.push({
      field: 'coefficient',
      operator: 'eq',
      value: values.coefficient,
    });

    if (values.created_at_range && values.created_at_range.length > 0) {
      const [from, to] = values.created_at_range;

      if (from) {
        filters.push({
          field: 'created_at_from',
          operator: 'gte',
          value: from.add(1, 'day').toISOString(),
        });
      }
      if (to) {
        filters.push({
          field: 'created_at_to',
          operator: 'lte',
          value: to.add(2, 'day').toISOString(),
        });
      }
    } else {
      filters.push({
        field: 'created_at_from',
        operator: 'gte',
        value: undefined,
      });
      filters.push({
        field: 'created_at_to',
        operator: 'lte',
        value: undefined,
      });
    }

    return filters;
  };

  const { tableProps, searchFormProps } = useTable<
    GradeType,
    HttpError,
    GradeTypeTableFilter
  >({
    syncWithLocation: true,
    resource: 'api/v1/grade-types',
    onSearch,
  });

  return (
    <List
      title="Quản lý loại điểm"
      createButtonProps={{
        children: 'Thêm loại điểm',
      }}
    >
      <Form layout="vertical" {...searchFormProps}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="grade_name" label="Tên loại điểm">
              <Input placeholder="Tìm theo tên loại điểm..." allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="coefficient" label="Số tín chỉ">
              <InputNumber
                min={0}
                max={10}
                style={{ width: '100%' }}
                placeholder="Nhập số tín chỉ"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Form.Item name="created_at_range" label="Ngày tạo">
              <DatePicker.RangePicker
                format={DEFAULT_DATE_FORMAT}
                allowClear
                style={{ width: '100%' }}
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{ textAlign: 'right' }}
          >
            <Form.Item>
              <Space>
                <Button
                  htmlType="submit"
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ minWidth: 90 }}
                >
                  Lọc
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    searchFormProps.form?.resetFields();
                    searchFormProps.form?.submit();
                  }}
                  style={{ minWidth: 90 }}
                >
                  Đặt lại
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        {...tableProps}
        rowKey="id"
        tableLayout="fixed"
        pagination={{
          ...tableProps.pagination,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15'],
        }}
      >
        <Table.Column<GradeType>
          dataIndex="id"
          title="Mã"
          ellipsis
          width={60}
          render={(value: string) => (
            <Tooltip placement="topLeft" title={value}>
              <div style={{ width: 60, wordWrap: 'break-word' }}>
                {truncateText(value)}
              </div>
            </Tooltip>
          )}
        />
        <Table.Column<GradeType>
          dataIndex="grade_name"
          title="Tên loại điểm"
          sorter={{ multiple: 1 }}
          filters={Array.from(
            new Set(
              tableProps?.dataSource?.map((item: GradeType) => item.grade_name)
            )
          )
            .map((name: string) => name.trim())
            .filter(Boolean)
            .map((name) => ({ text: name, value: name }))}
          onFilter={(value, record) => record.grade_name === value}
        />
        <Table.Column
          dataIndex="coefficient"
          title="Tín chỉ"
          sorter={{ multiple: 2 }}
        />
        <Table.Column
          dataIndex="created_at"
          title="Ngày tạo"
          render={(value: any) => (
            <DateField value={value} format={DEFAULT_DATE_FORMAT} />
          )}
          sorter={{ multiple: 3 }}
        />
        <Table.Column<GradeType>
          title="Thao tác"
          width={100}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                resource="api/v1/grade-types"
                confirmTitle="Bạn có chắc muốn xóa loại điểm này không?"
                confirmOkText="Đồng ý"
                confirmCancelText="Hủy"
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

export default GradeManagement;
