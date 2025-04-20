// Helper to get time range for calendar
function getCalendarTimeRange() {
  const now = new Date(getPhoenixTime());
  const start = now;
  
  // Set end time to day after tomorrow at midnight
  const end = new Date(now);
  end.setDate(end.getDate() + 2); // Changed from +1 to +2
  end.setHours(0, 0, 0, 0);
  
  return {
    start: start.toISOString(),
    end: end.toISOString()
  };
} 