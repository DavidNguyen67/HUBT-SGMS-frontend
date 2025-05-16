'use client';

import { Card, Col, Row, Statistic } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { UserOutlined, BookOutlined, TableOutlined } from '@ant-design/icons';
import { COLORS, dataStats, genderData, lineChartData } from './seed';
import { Show } from '@refinedev/antd';

const Dashboard = () => {
  return (
    <div className="h-full">
      <Show title="Dashboard">
        <Row gutter={8}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số sinh viên"
                value={dataStats.students}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số lớp học"
                value={dataStats.classes}
                prefix={<TableOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số môn học"
                value={dataStats.subjects}
                prefix={<BookOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Tổng số điểm" value={dataStats.grades} />
            </Card>
          </Col>
        </Row>

        <div style={{ height: 16 }} />

        <Row gutter={24}>
          <Col span={14}>
            <Card title="Biểu đồ điểm trung bình theo tháng">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="điểm"
                    stroke="#1890ff"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col span={10}>
            <Card title="Tỉ lệ giới tính sinh viên">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Show>
    </div>
  );
};

export default Dashboard;
