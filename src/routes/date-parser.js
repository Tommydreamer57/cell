
export function convertDate(datestring) {
    let date = new Date(datestring);
    let offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date;
}

export function toTime(datestring) {
    return convertDate(datestring).toLocaleTimeString().replace(/(\d)(:\d\d)(:\d\d)/, '$1$2');
}

export function toDate(datestring) {
    let convertedDate = convertDate(datestring);
    let month, day, date;
    switch (convertedDate.getMonth()) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April'
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June'
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;
    }
    switch (convertedDate.getDay()) {
        case 0:
            day = 'Monday';
            break;
        case 1:
            day = 'Tuesday';
            break;
        case 2:
            day = 'Wednesday';
            break;
        case 3:
            day = 'Thursday';
            break;
        case 4:
            day = 'Friday';
            break;
        case 5:
            day = 'Saturday';
            break;
        case 6:
            day = 'Sunday';
            break;
    }
    switch (+String(convertedDate.getDate()).split('').reverse()[0]) {
        case 0:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            date = convertedDate.getDate() + 'th';
            break;
        case 1:
            date = convertedDate.getDate() + 'st';
            break;
        case 2:
            date = convertedDate.getDate() + 'nd';
            break;
        case 3:
            date = convertedDate.getDate() + 'rd';
            break;
    }
    return `${day}, ${month} ${date}`;
}
