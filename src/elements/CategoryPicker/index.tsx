import { MAX_TAGS_DISPLAY } from '@common';
import { Category, User } from '@interfaces/response';
import { useSelect } from '@refinedev/antd';
import { Select, Tooltip } from 'antd';
import { SelectProps } from 'antd/lib';
import React from 'react';

interface CategoryPickerProps extends SelectProps {
  initialId?: string;
}

const CategoryPicker = ({ initialId, ...props }: CategoryPickerProps) => {
  const { selectProps: teacherSelectProps } = useSelect<Category>({
    resource: 'api/v1/categories/all',
    optionLabel: (item) => item?.name,
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
      {...teacherSelectProps}
      placeholder="Chọn người dùng"
      allowClear
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

export default CategoryPicker;
