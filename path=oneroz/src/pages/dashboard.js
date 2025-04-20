import React, { useState } from 'react';
import EventDetailsModal from '../components/EventDetailsModal';

const Timeline = ({ events, suggestedSlots, onSlotSelect, selectedSlot, currentTime }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const now = new Date(currentTime);

  const formatTime = (hour, minute) => {
    return new Date(now.setHours(hour, minute)).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Phoenix'
    });
  };

  // Generate 48 slots (24 hours * 2 for 30-min intervals)
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return { hour, minute };
  });

  // Calculate current time position
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentPosition = (currentHour * 60 + currentMinute) / 30;

  return (
    <div className="relative w-full bg-dream-800/30 backdrop-blur-sm rounded-xl p-6 mt-6">
      <div className="space-y-6">
        {/* Time blocks row */}
        <div className="relative h-12">
          <div className="absolute inset-x-0 flex">
            {timeSlots.map((slot, index) => (
              <div 
                key={index}
                className="flex-1 border-l border-dream-600/20 first:border-l-0 relative h-12"
              >
                {index % 2 === 0 && (
                  <span className="absolute -top-6 left-0 text-xs text-starlight-400/60 transform -translate-x-1/2">
                    {formatTime(slot.hour, slot.minute)}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Current time indicator */}
          <div 
            className="absolute top-0 h-full z-20 transition-all duration-1000"
            style={{ left: `${(currentPosition / 48) * 100}%` }}
          >
            <div className="absolute h-full w-px bg-cosmic-400/80"></div>
            <div className="absolute -top-2 -translate-x-1/2">
              <div className="w-3 h-3 rounded-full bg-cosmic-400 shadow-glow-sm"></div>
            </div>
          </div>
        </div>

        {/* Events row */}
        <div className="relative min-h-[120px] mt-8">
          {events?.map((event, index) => {
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);
            const startPosition = (startDate.getHours() * 60 + startDate.getMinutes()) / 30;
            const duration = (endDate - startDate) / (30 * 60000); // in 30-min blocks
            
            return (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="absolute h-16 group transition-all duration-300"
                style={{ 
                  left: `${(startPosition / 48) * 100}%`,
                  width: `${(duration / 48) * 100}%`,
                  top: `${index * 20}px`
                }}
              >
                <div 
                  className="relative h-full rounded-lg border border-dream-600/30 overflow-hidden backdrop-blur-sm px-3 py-2"
                  style={{ backgroundColor: event.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cosmic-500/0 via-cosmic-500/5 to-cosmic-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex flex-col justify-between h-full">
                    <span className="text-sm font-medium text-starlight-300/90 truncate">
                      {event.summary}
                    </span>
                    <span className="text-xs text-starlight-300/70">
                      {startDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'America/Phoenix'
                      })}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Available slots */}
        {suggestedSlots?.length > 0 && (
          <div className="relative h-16 mt-4 border-t border-dream-600/20">
            {suggestedSlots.map((slot, index) => {
              const startDate = new Date(slot.start);
              const startPosition = (startDate.getHours() * 60 + startDate.getMinutes()) / 30;
              const isSelected = selectedSlot && selectedSlot.start === slot.start;

              return (
                <button
                  key={index}
                  onClick={() => onSlotSelect(slot)}
                  className={`absolute h-12 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none ${
                    isSelected ? 'z-40' : 'z-30'
                  }`}
                  style={{ 
                    left: `${(startPosition / 48) * 100}%`,
                    width: `${(1 / 48) * 100}%`
                  }}
                >
                  <div className={`
                    relative h-full rounded-lg border backdrop-blur-sm
                    ${isSelected 
                      ? 'bg-cosmic-500/30 border-cosmic-400 shadow-glow-sm' 
                      : 'bg-dream-700/30 border-dream-600/30 hover:bg-dream-700/40'
                    }
                  `}>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <span className="text-xs text-cosmic-300">
                        {startDate.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                          timeZone: 'America/Phoenix'
                        })}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

// Add this CSS class to the timelineStyles
const timelineStyles = `
  // ... existing styles ...
  .grid-cols-48 {
    grid-template-columns: repeat(48, minmax(0, 1fr));
  }
`; 