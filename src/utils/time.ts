import {Schedule} from '../api/home';

export function formatNotificationTime(createdAt: Date) {
  const now = new Date();
  const diff = (+now - +createdAt) / 1000; // Difference in seconds

  if (diff < 60) {
    return '방금 전';
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}분 전`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days}일 전`;
  }
}

export function groupSchedulesByDate(data: Schedule[]): {
  [key: string]: Schedule[];
} {
  return data.reduce((acc, current) => {
    const date = current.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    // 중복된 scheduleId가 없는 경우에만 추가
    if (
      !acc[date].some(schedule => schedule.scheduleId === current.scheduleId)
    ) {
      acc[date].push(current);
    }
    return acc;
  }, {} as {[key: string]: Schedule[]});
}
