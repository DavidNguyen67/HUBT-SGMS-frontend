import { MAX_TAGS_DISPLAY } from '@common';
import { Subject } from '@interfaces/response';
import { useSelect } from '@refinedev/antd';
import { Select, Tooltip } from 'antd';
import { SelectProps } from 'antd/lib';
import React from 'react';

interface SubjectPickerProps extends SelectProps {}

const SubjectPicker = ({ ...props }: SubjectPickerProps) => {
  const { selectProps: subjectSelectProps } = useSelect<Subject>({
    resource: 'api/v1/subjects',
    optionLabel: (item) => item?.subject_name,
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
      {...subjectSelectProps}
      placeholder="Chọn môn học"
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

export default SubjectPicker;
