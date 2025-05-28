import { MAX_TAGS_DISPLAY } from '@common';
import { User, Wallet } from '@interfaces/response';
import { useSelect } from '@refinedev/antd';
import { Select, Tooltip } from 'antd';
import { SelectProps } from 'antd/lib';
import React from 'react';

interface WalletPickerProps extends SelectProps {
  initialId?: string;
}

const WalletPicker = ({ initialId, ...props }: WalletPickerProps) => {
  const { selectProps: teacherSelectProps } = useSelect<Wallet>({
    resource: 'api/v1/wallets/all',
    optionLabel: (item) => item?.name,
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

export default WalletPicker;
