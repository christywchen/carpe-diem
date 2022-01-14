export function getDateTime(day) {
    /*
    This function takes the date object and converts dates deadlines to use in the calendar input.
    */

    let getDay;
    if (day) getDay = new Date(day);
    else getDay = new Date();

    let month = getDay.getUTCMonth() + 1;
    let date = getDay.getUTCDate();
    let year = getDay.getUTCFullYear();
    let hour = getDay.getUTCHours();
    let min = getDay.getUTCMinutes();

    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;

    if (day) {
        return `${year}-${month}-${date}T${hour}:${min}`;
    } else {
        return `${year}-${month}-${date}T00:00`;
    }
}

export function getDateShort(date) {
    /*
    This function gets takes a standard date input and returns it in MM/DD format.
    */
    const dateObj = getDateTime(date);
    const [year, month, day] = dateObj.split('T')[0].split('-');

    return `${month}/${day}`;
}

export function getDateString(date) {
    /*
    This function takes a standard date input and returns it in readable string format.
    Time is formatted as 12 hour periods.
    */
    const dateObj = new Date(date);
    const [dayStr, dayNum, month, year, time] = dateObj.toUTCString().split(' ');
    let [hour, minute, second] = time.split(':');
    let timePeriod = 'AM';

    if (hour > 12) {
        hour -= 12;
        timePeriod = 'PM';
    }

    return [`${dayStr} ${month} ${dayNum}`, `${hour}:${minute} ${timePeriod}`, `${year}`];
}

export function sortByDate(eventsArr) {
    const sorted = eventsArr?.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    return sorted;
}
