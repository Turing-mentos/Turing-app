import React from 'react';

import Icon, {IconTypes} from '../common/icons/SvgIcon';
import {category as CATEGORY} from '../../api/notification';

const iconName = {
  HOMEWORK: 'Homework',
  NOTEBOOK: 'Notebook',
  COMMENT: 'Comment',
  QUESTION: 'Question',
  SCHEDULE_CHANGE: 'ScheduleChange',
  NEW_SCHEDULE: 'NewSchedule',
  REPORT: 'Report',
  SESSION: 'Session',
};

interface NotificationIconProps {
  category: keyof typeof CATEGORY;
  width: number;
  height: number;
}

export default function NotificationIcon({
  category,
  width,
  height,
}: NotificationIconProps) {
  return (
    <Icon
      name={iconName[category] as IconTypes}
      width={width}
      height={height}
    />
  );
}
