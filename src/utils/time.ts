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
