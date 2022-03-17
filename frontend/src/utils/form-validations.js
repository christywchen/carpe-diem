export function validateImage(type) {
    if (type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
        return false;
    } else {
        return true;
    }
}

export function validateEventForm({ validationItems }, published) {
    const { name, startTime, endTime, description, categoryId, virtualEvent, capacity,
        venueName, venueAddress, venueCity, venueState, venueZip, image } = validationItems;

    const eventErrors = {};
    let venueErrors = {};

    if (!name && published) eventErrors.name = 'Include a name for your event.';
    else if (name.length > 50) eventErrors.name = 'Maximum character length is 50.';

    if (!startTime.length && published) eventErrors.startTime = 'Please enter a start time.';
    if (!endTime.length && published) eventErrors.endTime = 'Please enter an end time.';
    if (!description && published) eventErrors.description = 'Provide a short description about your event.';
    if (!categoryId && published) eventErrors.categoryId = 'Tell us what type of event you\'re hosting.'

    if (virtualEvent === 'empty' && published) {
        eventErrors.virtualEvent = 'Tell us whether your event is virtual or in-person.';
    }

    if (virtualEvent === false) {
        venueErrors = validateVenueForm(
            venueName,
            venueAddress,
            venueCity,
            venueState,
            venueZip,
            published
        );

        if (!capacity && published) eventErrors.capacity = 'Event capacity is required.';
        else if (capacity <= 0 && published) eventErrors.capacity = 'Event capacity cannot be less than 1.'
    }


    return [eventErrors, venueErrors];
}

export function validateVenueForm(venueName, venueAddress, venueCity, venueState, venueZip, published) {
    const errors = {};
    const zipString = /^\d{5}(?:[-\s]?\d{4})?$/;
    const stateString = /^[a-zA-Z]{2}$/;
    const venueStr = String(venueZip);

    if (!venueName && published) errors.venueName = 'Venue name is required.';
    else if (venueName.length > 50) errors.venueName = 'Maximum character length is 50.';

    if (!venueAddress.length && published) errors.venueAddress = 'Venue address is required.';
    else if (venueAddress.length > 100) errors.venueAddress = 'Maximum character length is 100.';

    if (!venueCity.length && published) errors.venueCity = 'Venue city is required.';
    else if (venueCity.length > 50) errors.venueCity = 'Maximum character length is 50.'

    if (!stateString.test(venueState) && published) errors.venueState = 'Provide a two-letter state abbreviation.';
    if (!zipString.test(venueStr) && published) errors.venueZip = 'Must be a standard postal code.'

    return errors;
}
