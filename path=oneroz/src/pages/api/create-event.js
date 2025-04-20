const findNextAvailableSlot = (busySlots, requestedStart, requestedEnd) => {
  let attempts = 0;
  const maxAttempts = 96; // Updated from 48 to 96 to cover 48 hours worth of 30-min slots

  while (!found && attempts < maxAttempts) {
    // ... existing code ...
  }

  // ... rest of the function
};

const tomorrow = new Date(phoenixNow);
tomorrow.setHours(tomorrow.getHours() + 48); // Changed from 24 to 48 