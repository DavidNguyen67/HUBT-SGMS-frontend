'use client';

import { Card, Col, Row, Statistic } from 'antd';
import { Show } from '@refinedev/antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { gpa, grades } from './seed';

const chartData = grades.map((grade) => ({
  name: grade.subject_name,
  điểm: grade.grade,
}));

const StudentDashboard = () => {
  return (
    <Show title="Tổng quan sinh viên">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số môn đã học" value={grades.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="GPA hiện tại" value={gpa.toFixed(2)} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Môn đạt điểm cao nhất"
              value={
                grades.reduce((max, curr) =>
                  curr.grade > max.grade ? curr : max
                ).subject_name
              }
            />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 16 }} />

      <Card title="Điểm theo từng môn học">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="điểm"
              stroke="#52c41a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Show>
  );
};

export default StudentDashboard;
