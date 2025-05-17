import { MAX_TAGS_DISPLAY } from '@common';
import { Teacher } from '@interfaces/response';
import { useSelect } from '@refinedev/antd';
import { Select, Tooltip } from 'antd';
import { SelectProps } from 'antd/lib';
import React from 'react';

interface TeacherPickerProps extends SelectProps {}

const TeacherPicker = ({ ...props }: TeacherPickerProps) => {
  const { selectProps: teacherSelectProps } = useSelect<Teacher>({
    resource: 'api/v1/teachers',
    optionLabel: (item) => item?.full_name,
    optionValue: 'id',
    onSearch: (value) => [
      {
        field: 'value',
        operator: 'contains',
        value,
      },
    ],
    meta: {
      externalFilters: {
        _end: 50,
      },
    },
  });

  return (
    <Select
      {...teacherSelectProps}
      placeholder="Chọn giáo viên"
      allowClear
      mode="multiple"
      maxTagCount={MAX_TAGS_DISPLAY}
      maxTagPlaceholder={(omittedValues) => (
        <Tooltip title={omittedValues.map((val) => val.label).join(', ')}>
          +{omittedValues.length}
        </Tooltip>
      )}
      virtual
      {...props}
    />
  );
};

export default TeacherPicker;
