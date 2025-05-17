import { MAX_TAGS_DISPLAY } from '@common';
import { Student } from '@interfaces/response';
import { useSelect } from '@refinedev/antd';
import { Select, Tooltip } from 'antd';
import { SelectProps } from 'antd/lib';
import React from 'react';

interface StudentPickerProps extends SelectProps {}

const StudentPicker = ({ ...props }: StudentPickerProps) => {
  const { selectProps: studentSelectProps } = useSelect<Student>({
    resource: 'api/v1/students',
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
      {...studentSelectProps}
      placeholder="Chọn sinh viên"
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

export default StudentPicker;
