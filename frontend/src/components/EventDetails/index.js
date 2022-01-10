import React from "react";
import { useParams } from "react-router-dom";

function EventDetails() {
    const { eventId } = useParams();



    console.log('event details')
    return (
        <>
            <p>
                Test

            </p>
        </>
    )
}

export default EventDetails;
