import { ResourceProps } from '@refinedev/core';
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  FileTextOutlined,
  TableOutlined,
} from '@ant-design/icons';

export const resources: Array<ResourceProps> = [
  {
    name: 'Dashboard',
    list: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    name: 'Students',
    list: '/students',
    create: '/students/create',
    edit: '/students/edit/:id',
    show: '/students/show/:id',
    meta: {
      canDelete: true,
    },
    icon: <UserOutlined />,
  },
  {
    name: 'Subjects',
    list: '/subjects',
    create: '/subjects/create',
    edit: '/subjects/edit/:id',
    show: '/subjects/show/:id',
    meta: {
      canDelete: true,
    },
    icon: <BookOutlined />,
  },
  {
    name: 'Grades',
    list: '/grades',
    create: '/grades/create',
    edit: '/grades/edit/:id',
    show: '/grades/show/:id',
    meta: {
      canDelete: true,
    },
    icon: <FileTextOutlined />,
  },
  {
    name: 'Student Grades',
    list: '/student-grades',
    create: '/student-grades/create',
    edit: '/student-grades/edit/:id',
    show: '/student-grades/show/:id',
    meta: {
      canDelete: true,
    },
    icon: <TableOutlined />,
  },
];
