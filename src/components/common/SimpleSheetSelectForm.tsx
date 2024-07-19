import React, {useState} from 'react';
import styled from '@emotion/native';

import RadioItem from './RadioItem';
import SimpleSheetContainer from './SimpleSheetContainer';

interface SelectOption {
  key: string | number;
  value: string | number;
  label: string;
}

interface SelectFormProps {
  title: string;
  defaultValue: any;
  selectOptions: SelectOption[];
  onSelect: (arg: any) => void;
  close: () => void;
}

export default function SimpleSheetSelectForm({
  title,
  defaultValue,
  selectOptions,
  onSelect,
  close,
}: SelectFormProps) {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleComplete = () => {
    onSelect(selectedOption);
  };

  return (
    <SimpleSheetContainer
      title={title}
      isCompleted={selectedOption}
      onComplete={handleComplete}
      close={close}>
      <ScrollViewContainer>
        <ContentContainer>
          {selectOptions &&
            selectOptions.map(item => (
              <RadioItem
                key={item.key}
                label={item.label}
                onPress={() => setSelectedOption(item.value)}
                selected={item.value === selectedOption}
              />
            ))}
        </ContentContainer>
      </ScrollViewContainer>
    </SimpleSheetContainer>
  );
}

const ContentContainer = styled.View`
  gap: 12px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ScrollViewContainer = styled.ScrollView`
  height: 200px;
`;
