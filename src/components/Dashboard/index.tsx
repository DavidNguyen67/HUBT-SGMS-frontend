'use client';

import { Card, Col, Row, Divider, theme } from 'antd';
import { Show } from '@refinedev/antd';
import { useCustom } from '@refinedev/core';
import { appConfig } from '@common';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  DashboardAvgScoreBySubject,
  DashboardNewStudentsByMonth,
  DashboardStudentByClass,
  DashboardStudentPerformance,
  DashboardTeacherCountBySubject,
} from '@interfaces/response';

const Dashboard = () => {
  const { token } = theme.useToken();

  const isDark =
    token.colorBgBase === '#141414' || token.colorBgBase === '#000';

  const bgColor = token.colorBgContainer;
  const textColor = token.colorText;
  const gridColor = token.colorBorderSecondary;

  const { data: studentsByClass } = useCustom<DashboardStudentByClass[]>({
    url: appConfig.BASE_URL + '/api/v1/dashboard/students-by-class',
    method: 'get',
  });
  const { data: avgScoreBySubject } = useCustom<DashboardAvgScoreBySubject[]>({
    url: appConfig.BASE_URL + '/api/v1/dashboard/avg-score-by-subject',
    method: 'get',
  });
  const { data: teacherCountBySubject } = useCustom<
    DashboardTeacherCountBySubject[]
  >({
    url: appConfig.BASE_URL + '/api/v1/dashboard/teacher-count-by-subject',
    method: 'get',
  });
  const { data: studentPerformance } = useCustom<DashboardStudentPerformance[]>(
    {
      url: appConfig.BASE_URL + '/api/v1/dashboard/student-performance',
      method: 'get',
    }
  );
  const { data: newStudentsByMonth } = useCustom<DashboardNewStudentsByMonth[]>(
    {
      url: appConfig.BASE_URL + '/api/v1/dashboard/new-students-by-month',
      method: 'get',
    }
  );

  // Chart options
  const baseChartStyle = {
    chart: {
      backgroundColor: bgColor,
      style: { fontFamily: 'inherit' },
    },
    title: { style: { color: textColor, fontWeight: '600', fontSize: '16px' } },
    xAxis: {
      labels: { style: { color: textColor } },
      lineColor: gridColor,
      tickColor: gridColor,
    },
    yAxis: {
      labels: { style: { color: textColor } },
      gridLineColor: gridColor,
      title: { style: { color: textColor } },
    },
    legend: { itemStyle: { color: textColor } },
    credits: { enabled: false },
  };

  const studentsByClassOptions: Highcharts.Options = {
    ...baseChartStyle,
    chart: { ...baseChartStyle.chart, type: 'column', height: 320 },
    title: {
      ...baseChartStyle.title,
      text: 'Sinh viên theo lớp',
      style: { ...baseChartStyle.title?.style, fontWeight: '600' },
    },
    xAxis: {
      ...baseChartStyle.xAxis,
      categories: studentsByClass?.data?.map((item) => item.className),
      title: { text: 'Lớp', style: { color: textColor } },
    },
    yAxis: {
      ...baseChartStyle.yAxis,
      min: 0,
      title: { text: 'Số SV', style: { color: textColor } },
      allowDecimals: false,
    },
    series: [
      {
        name: 'Số SV',
        type: 'column',
        data: studentsByClass?.data?.map((item) => +item.studentCount) || [],
        color: token.colorPrimary,
      },
    ],
  };

  const avgScoreBySubjectOptions: Highcharts.Options = {
    ...baseChartStyle,
    chart: { ...baseChartStyle.chart, type: 'bar', height: 320 },
    title: {
      ...baseChartStyle.title,
      text: 'Điểm TB theo môn',
      style: { ...baseChartStyle.title?.style, fontWeight: '600' },
    },
    xAxis: {
      ...baseChartStyle.xAxis,
      categories: avgScoreBySubject?.data?.map((item) => item.subjectName),
      title: { text: 'Môn', style: { color: textColor } },
    },
    yAxis: {
      ...baseChartStyle.yAxis,
      min: 0,
      max: 10,
      title: { text: 'Điểm TB', style: { color: textColor } },
    },
    series: [
      {
        name: 'Điểm TB',
        type: 'bar',
        data:
          avgScoreBySubject?.data?.map((item) =>
            Number(item.avgScore?.toFixed(2) ?? 0)
          ) || [],
        color: token.colorWarning,
      },
    ],
  };

  const teacherCountBySubjectOptions: Highcharts.Options = {
    ...baseChartStyle,
    chart: { ...baseChartStyle.chart, type: 'column', height: 320 },
    title: {
      ...baseChartStyle.title,
      text: 'GV theo môn',
      style: { ...baseChartStyle.title?.style, fontWeight: '600' },
    },
    xAxis: {
      ...baseChartStyle.xAxis,
      categories: teacherCountBySubject?.data?.map((item) => item.subjectName),
      title: { text: 'Môn', style: { color: textColor } },
    },
    yAxis: {
      ...baseChartStyle.yAxis,
      min: 0,
      title: { text: 'Số GV', style: { color: textColor } },
      allowDecimals: false,
    },
    series: [
      {
        name: 'Số GV',
        type: 'column',
        data:
          teacherCountBySubject?.data?.map((item) => +item.teacherCount) || [],
        color: token.colorSuccess,
      },
    ],
  };

  const studentPerformanceOptions: Highcharts.Options = {
    ...baseChartStyle,
    chart: { ...baseChartStyle.chart, type: 'pie', height: 320 },
    title: {
      ...baseChartStyle.title,
      text: 'Phân loại học lực',
      style: { ...baseChartStyle.title?.style, fontWeight: '600' },
    },
    tooltip: { pointFormat: '{series.name}: <b>{point.y}</b>' },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y}' },
      },
    },
    series: [
      {
        name: 'Số lượng',
        type: 'pie',
        data:
          studentPerformance?.data?.map((item) => ({
            name:
              item.type === 'excellent'
                ? 'Xuất sắc'
                : item.type === 'good'
                ? 'Giỏi'
                : item.type === 'average'
                ? 'Trung bình'
                : item.type === 'poor'
                ? 'Yếu'
                : item.type,
            y: item.value,
          })) || [],
      },
    ],
  };

  const newStudentsByMonthOptions: Highcharts.Options = {
    ...baseChartStyle,
    chart: { ...baseChartStyle.chart, type: 'line', height: 320 },
    title: {
      ...baseChartStyle.title,
      text: 'SV mới theo tháng',
      style: { ...baseChartStyle.title?.style, fontWeight: '600' },
    },
    xAxis: {
      ...baseChartStyle.xAxis,
      categories: newStudentsByMonth?.data?.map((item) => item.month),
      title: { text: 'Tháng', style: { color: textColor } },
    },
    yAxis: {
      ...baseChartStyle.yAxis,
      min: 0,
      title: { text: 'Số SV mới', style: { color: textColor } },
      allowDecimals: false,
    },
    series: [
      {
        name: 'SV mới',
        type: 'line',
        data: newStudentsByMonth?.data?.map((item) => +item.count) || [],
        color: token.colorError,
      },
    ],
  };

  return (
    <div className="h-full">
      <Show
        title="Dashboard"
        headerButtonProps={{ style: { display: 'none' } }}
      >
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Card>
              <HighchartsReact
                highcharts={Highcharts}
                options={studentsByClassOptions}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <HighchartsReact
                highcharts={Highcharts}
                options={avgScoreBySubjectOptions}
              />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Card>
              <HighchartsReact
                highcharts={Highcharts}
                options={teacherCountBySubjectOptions}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <HighchartsReact
                highcharts={Highcharts}
                options={studentPerformanceOptions}
              />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card>
              <HighchartsReact
                highcharts={Highcharts}
                options={newStudentsByMonthOptions}
              />
            </Card>
          </Col>
        </Row>
      </Show>
    </div>
  );
};

export default Dashboard;
