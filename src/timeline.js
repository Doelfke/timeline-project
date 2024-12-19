import { timelineUtils } from "./timelineUtils";
import './timeline.css'

export const Timeline = ({events}) => {
  const { startDate, endDate } = timelineUtils.getStartAndEnd(events);
  const range = timelineUtils.getDayRange(startDate, endDate);
  const eventsWithTracks = timelineUtils.generateAndGroupByTracks(events);
  const tracks = timelineUtils.generateTimelineTracks(range, eventsWithTracks)

  return (
    <div>
      <div className="timeline">       
       {tracks.map((track, i)=> {
        return <div className="timelineTrack" key={i}>
          {track.map((trackItem)=> {
            if (trackItem.days) {
              const width = trackItem.days * 93
              return <div className="timelineEvent" style={{width: width + 'px'}} key={trackItem.id}>
                {trackItem.name} {timelineUtils.formatDate(trackItem.start)} to {timelineUtils.formatDate(trackItem.end)}
              </div> 
            } else {
              return <div className="blankTimelineEvent" key={trackItem.id}></div> 
            }
          })}
        </div>
       })}
  

      </div>
    </div>
  )
}