import { MAX_TAGS_DISPLAY } from '@common';
import { GradeType, Student } from '@interfaces/response';
import { useSelect } from '@refinedev/antd';
import { Select, Tooltip } from 'antd';
import { SelectProps } from 'antd/lib';
import React from 'react';

interface GradeTypePickerProps extends SelectProps {
  initialId?: string;
}

const GradeTypePicker = ({ initialId, ...props }: GradeTypePickerProps) => {
  const { selectProps: gradeTypeSelectProps } = useSelect<GradeType>({
    resource: 'api/v1/grade-types',
    optionLabel: (item) => item?.grade_name,
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
        initial_id: initialId,
      },
    },
  });

  return (
    <Select
      {...gradeTypeSelectProps}
      placeholder="Chọn loại điểm"
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

export default GradeTypePicker;
