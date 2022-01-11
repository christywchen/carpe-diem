
export function validateEventForm({ validationItems }) {
    const { name, startTime, endTime, description, category, virtualEvent, capacity,
        venueName, venueAddress, venueCity, venueState, venueZip } = validationItems;

    const eventErrors = {};
    let venueErrors;

    if (!name.length) eventErrors.name = 'Please include a name for your event.';
    else if (name.length > 75) eventErrors.name = 'Maximum character length is 75 characters.';

    if (!startTime) eventErrors.startTime = 'Please enter a start time.';
    if (!endTime) eventErrors.endTime = 'Please enter an end time.';
    if (!description) eventErrors.description = 'Please provide a short description about your event.';
    if (!category.length) eventErrors.category = 'Let us know what type of event you\'re hosting.'

    if (!virtualEvent) {
        eventErrors.virtualEvent = 'Let us know if your event is virtual or in-person.';

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
    }

    console.log(eventErrors, venueErrors)
    return [eventErrors, venueErrors];
}

export function validateVenueForm(venueName, venueAddress, venueCity, venueState, venueZip) {
    const errors = {};
    const zipString = /^\d{5}(?:[-\s]?\d{4})?$/;
    const venueStr = String(venueZip);

    if (!venueName) errors.venueName = 'Please provide the name of the venue';
    if (!venueAddress || !venueCity || !venueState || !venueZip) errors.venueAddress = 'Please provide location information for the venue.';
    if (venueState.length > 2) errors.venueState = 'Please provide a two-letter abbreviation for the state.';
    if (!zipString.test(venueStr)) errors.venueZip = 'Please provide zip code in the following formats: 12345, 12345-6789, or 123456789.'

    return errors;
}
