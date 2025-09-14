import React from 'react'
import {useDrag} from 'react-dnd';

function JobCard() {
    const [{isDragging},dragRef] = useDrag({
        type:'job',
        //when dragging, it needs to know what job is dragging dragged and the current status of the job card
        item: {id: job.id, status: job.status},
        //the monitor is provided by the dnd that queries the current drag/drop interaction
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (

    )
}

export default JobCard