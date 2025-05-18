import { ResourceProps } from '@refinedev/core';
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  FileTextOutlined,
  TableOutlined,
} from '@ant-design/icons';

export const resources: Array<ResourceProps> = [
  // Dashboard cho từng vai trò
  {
    name: 'Dashboard',
    list: '/dashboard',
    icon: <DashboardOutlined />,
    meta: { label: 'Tổng quan', roles: ['admin'] },
  },
  {
    name: 'Dashboard',
    list: '/teacher-dashboard',
    icon: <DashboardOutlined />,
    meta: { label: 'Tổng quan', roles: ['teacher'] },
  },
  {
    name: 'Dashboard',
    list: '/student-dashboard',
    icon: <DashboardOutlined />,
    meta: { label: 'Tổng quan', roles: ['student'] },
  },

  // Menu cha "Quản lý hệ thống" - chỉ admin thấy
  {
    name: 'Management',
    icon: <TableOutlined />,
    meta: { label: 'Quản lý hệ thống', roles: ['admin', 'teacher'] },
  },

  {
    name: 'Management',
    icon: <TableOutlined />,
    meta: { label: 'Quản lý thông tin', roles: ['student'] },
  },
  // Các resource con
  {
    name: 'Students',
    list: '/students',
    create: '/students/create',
    edit: '/students/edit/:id',
    show: '/students/show/:id',
    meta: {
      parent: 'Management',
      canDelete: true,
      label: 'Sinh viên',
      roles: ['admin'], // chỉ admin
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
      parent: 'Management',
      canDelete: true,
      label: 'Giáo viên',
      roles: ['admin'], // chỉ admin
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
      parent: 'Management',
      canDelete: true,
      label: 'Lớp học',
      roles: ['admin', 'teacher'], // chỉ admin và teacher
    },
    icon: <TableOutlined />,
  },

  // Mục cha "Môn học" - cho cả admin, teacher, student
  {
    name: 'Subjects',
    icon: <BookOutlined />,
    meta: {
      parent: 'Management',
      label: 'Môn học',
      roles: ['admin', 'teacher', 'student'],
    },
  },
  // Các mục con của "Môn học"
  {
    name: 'Quản lý môn học',
    list: '/subjects',
    create: '/subjects/create',
    edit: '/subjects/edit/:id',
    show: '/subjects/show/:id',
    meta: {
      parent: 'Subjects',
      canDelete: true,
      label: 'Quản lý môn học',
      roles: ['admin', 'teacher'], // student chỉ xem, không tạo/sửa/xóa
    },
    icon: <BookOutlined />,
  },
  {
    name: 'Đăng ký môn học',
    list: '/teacher-subject-class',
    create: '/teacher-subject-class/create',
    edit: '/teacher-subject-class/edit/:id',
    show: '/teacher-subject-class/show/:id',
    meta: {
      parent: 'Subjects',
      canDelete: true,
      label: 'Đăng ký môn học',
      roles: ['admin', 'teacher', 'student'],
    },
    icon: <BookOutlined />,
  },

  // Loại điểm và điểm sinh viên
  {
    name: 'Grades',
    list: '/grades',
    create: '/grades/create',
    edit: '/grades/edit/:id',
    show: '/grades/show/:id',
    meta: {
      parent: 'Management',
      canDelete: true,
      label: 'Loại điểm',
      roles: ['admin', 'teacher'], // chỉ admin, teacher
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
      parent: 'Management',
      canDelete: true,
      label: 'Điểm sinh viên',
      roles: ['admin', 'teacher', 'student'],
    },
    icon: <TableOutlined />,
  },
];
