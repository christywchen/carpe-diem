
export function validateEventForm({ validationItems }) {
    const { name, startTime, endTime, description, categoryId, virtualEvent, capacity,
        venueName, venueAddress, venueCity, venueState, venueZip } = validationItems;

    const eventErrors = {};
    let venueErrors = {};

    if (!name) eventErrors.name = 'Include a name for your event.';
    else if (name.length > 50) eventErrors.name = 'Maximum character length is 50.';

    if (!startTime.length) eventErrors.startTime = 'Please enter a start time.';
    if (!endTime.length) eventErrors.endTime = 'Please enter an end time.';
    if (!description) eventErrors.description = 'Provide a short description about your event.';
    if (!categoryId) eventErrors.categoryId = 'Tell us what type of event you\'re hosting.'

    if (virtualEvent === 'empty') {
        eventErrors.virtualEvent = 'Tell us whether your event is virtual or in-person.';
    }

    if (virtualEvent === false) {
        venueErrors = validateVenueForm(
            venueName,
            venueAddress,
            venueCity,
            venueState,
            venueZip
        );

        if (!capacity) eventErrors.capacity = 'Attendee capacity is required.';
    }


    return [eventErrors, venueErrors];
}

export function validateVenueForm(venueName, venueAddress, venueCity, venueState, venueZip) {
    const errors = {};
    const zipString = /^\d{5}(?:[-\s]?\d{4})?$/;
    const stateString = /^[a-zA-Z]{2}$/;
    const venueStr = String(venueZip);

    if (!venueName) errors.venueName = 'Venue name is required.';
    else if (venueName.length > 50) errors.venueName = 'Maximum character length is 50.';

    if (!venueAddress.length) errors.venueAddress = 'Venue address is required.';
    else if (venueAddress.length > 100) errors.venueAddress = 'Maximum character length is 100.';


    if (!venueCity.length) errors.venueCity = 'Venue city is required.';
    else if (venueCity.length > 50) errors.venueCity = 'Maximum character length is 50.'

    if (!stateString.test(venueState)) errors.venueState = 'Provide a two-letter state abbreviation.';
    if (!zipString.test(venueStr)) errors.venueZip = 'Must be a standard postal code.'

    return errors;
}
