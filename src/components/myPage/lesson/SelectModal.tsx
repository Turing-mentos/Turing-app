import React, {useState, useMemo, forwardRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import styled from '@emotion/native';
import RadioItem from '../../common/RadioItem';

interface SelectOption {
  key: string | number;
  value: string | number;
  label: string;
}

interface SelectModalProps {
  onSelect: (args: any) => any;
  selectOptions: SelectOption[];
}

const SelectModal = forwardRef<BottomSheetModal, SelectModalProps>(
  ({onSelect, selectOptions}, ref) => {
    const [selectedOption, setSelectedOption] = useState<string | number>();
    const snapPoints = useMemo(() => ['50%'], []);

    return (
      <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
        <ScrollViewContainer>
          <ContentContainer>
            {selectOptions.map(item => (
              <RadioItem
                key={item.key}
                label={item.label}
                onPress={() => {
                  setSelectedOption(item.value);
                  onSelect(item.value);
                }}
                selected={item.value === selectedOption}
              />
            ))}
          </ContentContainer>
        </ScrollViewContainer>
      </BottomSheetModal>
    );
  },
);

export default SelectModal;

const ContentContainer = styled.View`
  padding: 16px 20px;
  gap: 12px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ScrollViewContainer = styled.ScrollView``;
