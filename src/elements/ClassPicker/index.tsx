import { MAX_TAGS_DISPLAY } from '@common';
import { Class, Teacher } from '@interfaces/response';
import { useSelect } from '@refinedev/antd';
import { Select, Tooltip } from 'antd';
import { SelectProps } from 'antd/lib';
import React from 'react';

interface ClassPickerProps extends SelectProps {
  initialId?: string;
}

const ClassPicker = ({ initialId, ...props }: ClassPickerProps) => {
  const { selectProps: classSelectProps } = useSelect<Class>({
    resource: 'api/v1/classes',
    optionLabel: 'class_name',
    optionValue: 'id',
    meta: {
      externalFilters: {
        _end: 50,
        initial_id: initialId,
      },
    },
  });
  return (
    <Select
      {...classSelectProps}
      placeholder="Chọn lớp học"
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

export default ClassPicker;
