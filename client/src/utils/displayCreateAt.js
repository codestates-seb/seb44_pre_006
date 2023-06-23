const displayCreatedAt = createdAt => {
  const time = new Date(createdAt);

  const milliSeconds = new Date() - time;
  const seconds = milliSeconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (seconds < 60) return `${seconds} secs ago`;
  if (minutes < 60) return `${Math.floor(minutes)} min ago`;
  if (hours < 24) return `${Math.floor(hours)} hour ago`;
  if (days < 7) return `${Math.floor(days)} day ago`;
  if (weeks < 5) return `${Math.floor(weeks)} week ago`;
  if (months < 12) return `${Math.floor(months)} month ago`;
  if (years < 2) return `${Math.floor(years)} year ago`;
  return `${time}`;
};

export default displayCreatedAt;