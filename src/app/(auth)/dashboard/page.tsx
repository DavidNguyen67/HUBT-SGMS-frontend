'use client';

import { appConfig } from '@common';
import { useCustom } from '@refinedev/core';
import { Card, Col, Row, Divider, theme, Spin } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { token } = theme.useToken();

  const bgColor = token.colorBgContainer;
  const textColor = token.colorText;
  const gridColor = token.colorBorderSecondary;

  const { data, isLoading } = useCustom<{
    users: number;
    transactions: number;
    categories: number;
    wallets: number;
  }>({
    url: appConfig.BASE_URL + '/api/v1/dashboard',
    method: 'get',
  });

  if (isLoading) return <Spin />;

  const entityColumnOptions: Highcharts.Options = {
    chart: {
      backgroundColor: bgColor,
      style: { fontFamily: 'inherit' },
      type: 'column',
      height: 320,
    },
    title: {
      text: 'Tổng hợp hệ thống',
      style: { color: textColor, fontWeight: '600', fontSize: '16px' },
    },
    xAxis: {
      categories: ['Phân loại giao dịch', 'Giao dịch', 'Ví', 'Người dùng'],
      title: { text: '', style: { color: textColor } },
      labels: { style: { color: textColor } },
      lineColor: gridColor,
      tickColor: gridColor,
    },
    yAxis: {
      min: 0,
      allowDecimals: false,
      title: { text: 'Số lượng', style: { color: textColor } },
      labels: { style: { color: textColor } },
      gridLineColor: gridColor,
    },
    legend: { itemStyle: { color: textColor } },
    credits: { enabled: false },
    series: [
      {
        name: 'Số lượng',
        type: 'column',
        data: [
          data?.data?.categories || 0,
          data?.data?.transactions || 0,
          data?.data?.wallets || 0,
          data?.data?.users || 0,
        ],
        colorByPoint: true,
        colors: [
          token.colorPrimary,
          token.colorSuccess,
          token.colorWarning,
          token.colorError,
        ],
      },
    ],
  };
  return (
    <div className="h-full">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <HighchartsReact
              highcharts={Highcharts}
              options={entityColumnOptions}
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card
            title="Phân loại giao dịch"
            bordered={false}
            style={{ textAlign: 'center' }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: token.colorPrimary,
              }}
            >
              {data?.data?.categories}
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Giao dịch"
            bordered={false}
            style={{ textAlign: 'center' }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: token.colorSuccess,
              }}
            >
              {data?.data?.transactions}
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Ví" bordered={false} style={{ textAlign: 'center' }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: token.colorWarning,
              }}
            >
              {data?.data?.wallets}
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Người dùng"
            bordered={false}
            style={{ textAlign: 'center' }}
          >
            <span
              style={{ fontSize: 32, fontWeight: 700, color: token.colorError }}
            >
              {data?.data?.users}
            </span>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
