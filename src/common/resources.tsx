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
    meta: {
      label: 'Tổng quan',
      roles: ['admin'],
    },
  },
  {
    name: 'Dashboard',
    list: '/teacher-dashboard',
    icon: <DashboardOutlined />,
    meta: {
      label: 'Tổng quan',
      roles: ['teacher'],
    },
  },
  {
    name: 'Dashboard',
    list: '/student-dashboard',
    icon: <DashboardOutlined />,
    meta: {
      label: 'Tổng quan',
      roles: ['student'],
    },
  },
  {
    name: 'Students',
    list: '/students',
    create: '/students/create',
    edit: '/students/edit/:id',
    show: '/students/show/:id',
    meta: {
      canDelete: true,
      label: 'Sinh viên',
      roles: ['admin', 'teacher'],
    },
    icon: <UserOutlined />,
  },
  {
    name: 'Teachers',
    list: '/teachers',
    create: '/teachers/create',
    edit: '/teachers/edit/:id',
    show: '/teachers/show/:id',
    meta: {
      canDelete: true,
      label: 'Giáo viên',
      roles: ['admin'],
    },
    icon: <UserOutlined />,
  },
  {
    name: 'Classes',
    list: '/classes',
    create: '/classes/create',
    edit: '/classes/edit/:id',
    show: '/classes/show/:id',
    meta: {
      canDelete: true,
      label: 'Lớp học',
      roles: ['admin', 'teacher', 'student'],
    },
    icon: <TableOutlined />,
  },
  {
    name: 'Subjects',
    list: '/subjects',
    create: '/subjects/create',
    edit: '/subjects/edit/:id',
    show: '/subjects/show/:id',
    meta: {
      canDelete: true,
      label: 'Môn học',
      roles: ['admin', 'teacher', 'student'],
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
      label: 'Loại điểm',
      roles: ['admin', 'teacher'],
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
      label: 'Điểm sinh viên',
      roles: ['admin', 'teacher', 'student'],
    },
    icon: <TableOutlined />,
  },
];
