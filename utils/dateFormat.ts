const dateFormat = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1
        ? `about ${interval} ${unit} ago`
        : `about ${interval} ${unit}s ago`;
    }
  }

  return "just now";
};

export { dateFormat };
