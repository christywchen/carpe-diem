import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import EventForm from '../EventForm';
import { getEvent } from '../../../store/event';

import { validateEventForm } from '../../../utils/form-validations';

function EventCreate() {
    const formType = 'createNew';

    return (
        <div id='main__narrow'>
            <h1>Host an Event</h1>

            <div id='content'>
                <EventForm formType={formType} />
            </div>
        </div>
    )
}

export default EventCreate;
