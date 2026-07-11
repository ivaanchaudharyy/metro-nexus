import { useState, useEffect } from 'react';
import { METRO_LINES, PAST_ARCHIVES } from '../data/metroNexusData';

const STORAGE_KEY_COUNTERS = 'metro_nexus_ride_counters';
const STORAGE_KEY_PAST = 'metro_nexus_past_archives';

export function useArchiveSimulation() {
  const [lines, setLines] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_COUNTERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved counters', e);
      }
    }
    return METRO_LINES.map(line => ({
      id: line.id,
      name: line.name,
      genre: line.genre,
      district: line.district,
      rationale: line.rationale,
      color: line.color,
      accentClass: line.accentClass,
      bgAccentClass: line.bgAccentClass,
      borderAccentClass: line.borderAccentClass,
      glowClass: line.glowClass,
      hoverGlowClass: line.hoverGlowClass,
      gradientFrom: line.gradientFrom,
      gradientTo: line.gradientTo,
      icon: line.icon,
      imagePlaceholder: line.imagePlaceholder,
      targetRides: line.targetRides,
      journalPages: line.journalPages,
      rides: line.initialRides,
      completed: false,
    }));
  });

  const [pastArchives, setPastArchives] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PAST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved past archives', e);
      }
    }
    return PAST_ARCHIVES;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COUNTERS, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PAST, JSON.stringify(pastArchives));
  }, [pastArchives]);

  // Simulate real-time ride updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prevLines => {
        let changed = false;
        const newLines = prevLines.map(line => {
          if (line.completed || line.rides >= line.targetRides) {
            if (!line.completed) {
              // Mark as completed/archived
              changed = true;
              triggerArchiveEvent(line);
              return { ...line, completed: true, rides: line.targetRides };
            }
            return line;
          }

          // Add a random number of rides: 12 to 45
          const addedRides = Math.floor(Math.random() * (45 - 12 + 1)) + 12;
          const nextRides = Math.min(line.rides + addedRides, line.targetRides);
          
          if (nextRides >= line.targetRides) {
            changed = true;
            triggerArchiveEvent(line);
            return { ...line, completed: true, rides: line.targetRides };
          }

          return { ...line, rides: nextRides };
        });

        return newLines;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const triggerArchiveEvent = (completedLine) => {
    // Add to past archives list dynamically if not already there
    setPastArchives(prev => {
      if (prev.some(arch => arch.id === `completed-${completedLine.id}`)) {
        return prev;
      }
      const newArch = {
        id: `completed-${completedLine.id}`,
        name: `The Compiled Volume: ${completedLine.district} Chronicles`,
        line: completedLine.name,
        genre: completedLine.genre,
        completedDate: new Date().toISOString().split('T')[0],
        finalRides: completedLine.targetRides,
        summary: `A complete, archived compilation of exactly 5,000,000 rider-submitted journal notes and system-level telemetry reports from the ${completedLine.district} area.`,
        coverColor: `${completedLine.gradientFrom} border-white/20 text-white`
      };
      return [newArch, ...prev];
    });
  };

  const resetLine = (lineId) => {
    setLines(prevLines => {
      const originalLine = METRO_LINES.find(l => l.id === lineId);
      return prevLines.map(line => {
        if (line.id === lineId) {
          return {
            ...line,
            rides: originalLine ? originalLine.initialRides : line.targetRides - 2000,
            completed: false
          };
        }
        return line;
      });
    });

    // Remove from past archives if dynamically added
    setPastArchives(prev => prev.filter(arch => arch.id !== `completed-${lineId}`));
  };

  const addManualRide = (lineId) => {
    setLines(prevLines => {
      return prevLines.map(line => {
        if (line.id === lineId && !line.completed) {
          // Add 1000 rides instantly for testing completion
          const nextRides = Math.min(line.rides + 1000, line.targetRides);
          const isCompleted = nextRides >= line.targetRides;
          if (isCompleted) {
            triggerArchiveEvent(line);
          }
          return {
            ...line,
            rides: nextRides,
            completed: isCompleted
          };
        }
        return line;
      });
    });
  };

  return {
    lines,
    pastArchives,
    resetLine,
    addManualRide
  };
}
