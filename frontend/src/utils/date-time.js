export function getDateTime(day) {
    /*
    This function takes the date object and converts dates deadlines to use in the calendar input.
    */

    let getDay;
    if (day) getDay = new Date(day);
    else getDay = new Date();

    let month = getDay.getMonth() + 1;
    let date = getDay.getDate();
    let year = getDay.getFullYear();
    let hour = getDay.getHours();
    let min = getDay.getMinutes();

    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;

    if (day) {
        console.log(`${year}-${month}-${date}T${hour}:${min}`, 'TESTETST')
        return `${year}-${month}-${date}T${hour}:${min}`;
    } else {
        return `${year}-${month}-${date}T00:00`;
    }
}
