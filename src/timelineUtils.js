const getStartAndEnd = (events) => {
    let startDate;
    let endDate;

    events.forEach((event) => {
        const parsedStartDate = new Date(event.start);
        if (!startDate || parsedStartDate.getTime() < startDate.getTime()){
            startDate = parsedStartDate
        }

        const parsedEndDate = new Date(event.end);
        if (!endDate || parsedStartDate.getTime() > endDate.getTime()) {
            endDate = parsedEndDate
        }
    })

    return {
        startDate,
        endDate
    }
}

const formatDate = (date) => {
    const dayWithOffset = new Date(date);
    dayWithOffset.setHours(dayWithOffset.getHours() - 20);

    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dayWithOffset);
    let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(dayWithOffset);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dayWithOffset);

    return `${year}-${month}-${day}`;
}

const getDayRange = (startDate, endDate) => {
    const range = [];
    let current = startDate;
   
    while (current <= endDate) {
     range.push(current);
     current = new Date(current.setDate(current.getDate() + 1))
    }
   
    return range;
}

const generateAndGroupByTracks = (events) => {
    const eventsWithParsedDates = events.map((event)=> {
        const start = new Date(event.start);
        start.setHours(start.getHours() + 20);
        const end = new Date(event.end);
        end.setHours(end.getHours() + 20);

        return {
            ...event,
            start,
            end,
            overlap_count: 0,
            track: 0
        }
    }).sort((a,b)=> { return a.start > b.start ? 1 : -1  })

    for(let i = 0; i < eventsWithParsedDates.length; i++) {     
        // This is NOT the most efficient, one side of should be a map      
        for(let j= i + 1; j < eventsWithParsedDates.length; j++) {
            if(eventsWithParsedDates[i].end > eventsWithParsedDates[j].start) {
                eventsWithParsedDates[i].overlap_count++;
                eventsWithParsedDates[j].overlap_count++;

                if(eventsWithParsedDates[j].track == eventsWithParsedDates[i].track) {
                    eventsWithParsedDates[j].track++;               
                }     
            }
        }
    }
    
    const groupedEvents = new Map();
    eventsWithParsedDates.forEach((event) => {
        if (!groupedEvents.has(event.track)) {
            groupedEvents.set(event.track, []);
        }

       const trackEvents = groupedEvents.get(event.track);
       trackEvents.push(event);
       groupedEvents.set(event.track, trackEvents);

    })

    return groupedEvents
}

const generateTimelineTracks = (range, tracks) => {
    const ONE_DAY = 24 * 60 * 60 * 1000;

    return Array.from(tracks.keys()).map((trackLevel) => {
        const trackMap = new Map()
        const track = tracks.get(trackLevel);
        track.forEach((trackEvent) => {
            trackMap.set(formatDate(trackEvent.start), { ...trackEvent })
        })

        const trackItems = []
        let skip = 0;

        range.forEach((day) => {
            if (skip > 0) {
                skip--;
                return;
            }
            const foundTrackItem = trackMap.get(formatDate(day));

            if (foundTrackItem) {
                const diffDays = Math.round(Math.abs((foundTrackItem.start - foundTrackItem.end) / ONE_DAY)) + 1;
                skip = diffDays -1;
                trackItems.push({
                    ...foundTrackItem,
                    days: diffDays
                });

                return;
            } else {
                trackItems.push({
                    id: trackLevel + "" + day
                });
            }
        })
        return trackItems
    });
}

export const timelineUtils = {
    getStartAndEnd,
    formatDate,
    getDayRange,
    generateAndGroupByTracks,
    generateTimelineTracks
}