'use client';

import { Card, Col, Row, Statistic, Table } from 'antd';
import { Show } from '@refinedev/antd';
import {
  BookOutlined,
  UserOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import {
  avgScore,
  classData,
  totalStudents,
  scoreDistributionData,
  topStudents,
} from './seed';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d'];

const TeacherDashboard = () => {
  return (
    <Show title="Tổng quan giáo viên">
      <Row gutter={8}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Lớp đang dạy"
              value={classData.length}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số sinh viên"
              value={totalStudents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Điểm TB sinh viên"
              value={avgScore.toFixed(2)}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }} />

      <Row gutter={24}>
        <Col span={12}>
          <Card title="Phân loại học lực sinh viên">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {scoreDistributionData.map((entry, index) => (
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

        <Col span={12}>
          <Card title="Top 3 sinh viên có điểm cao nhất">
            <Table
              dataSource={topStudents}
              columns={[
                { title: 'Tên', dataIndex: 'name', key: 'name' },
                { title: 'Lớp', dataIndex: 'class', key: 'class' },
                { title: 'Điểm TB', dataIndex: 'average', key: 'average' },
              ]}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </Show>
  );
};

export default TeacherDashboard;
