
export function validateEventForm({ validationItems }) {
    const { name, startTime, endTime, description, category, virtualEvent, capacity,
        venueName, venueAddress, venueCity, venueState, venueZip } = validationItems;

    const eventErrors = {};
    let venueErrors = {};

    if (!name.length) eventErrors.name = 'Please include a name for your event.';
    else if (name.length > 50) eventErrors.name = 'Maximum character length is 50.';

    if (!startTime.length) eventErrors.startTime = 'Please enter a start time.';
    if (!endTime.length) eventErrors.endTime = 'Please enter an end time.';
    if (!description) eventErrors.description = 'Please provide a short description about your event.';
    if (!category.length) eventErrors.category = 'Let us know what type of event you\'re hosting.'

    if (virtualEvent === 'empty') {
        eventErrors.virtualEvent = 'Let us know if your event is virtual or in-person.';
    }

    if (virtualEvent === false) {
        venueErrors = validateVenueForm(
            venueName,
            venueAddress,
            venueCity,
            venueState,
            venueZip
        );

        if (!capacity) eventErrors.capacity = 'Please provide an attendee capacity for your event.';
    }


    return [eventErrors, venueErrors];
}

export function validateVenueForm(venueName, venueAddress, venueCity, venueState, venueZip) {
    const errors = {};
    const zipString = /^\d{5}(?:[-\s]?\d{4})?$/;
    const stateString = /^[a-zA-Z]{2}$/;
    const venueStr = String(venueZip);

    if (!venueName) errors.venueName = 'Please provide the name of the venue';
    else if (venueName.length > 50) errors.venueName = 'Maximum character length is 50.';

    if (!venueAddress.length || !venueCity.length || !venueState.length || !venueZip.length) {
        errors.venueInfo = 'Please provide location information for the venue.';
    }

    if (venueAddress.length > 100) errors.venueAddress = 'Maximum character length is 100.';
    if (venueCity.length > 50) errors.venueCity = 'Maximum character length is 50.'
    if (!stateString.test(venueState)) errors.venueState = 'Please provide a two-letter abbreviation for the state.';
    if (!zipString.test(venueStr)) errors.venueZip = 'Please provide zip code in the following formats: 12345, 12345-6789, or 123456789.'

    return errors;
}
