let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const getDay = (timestamp) => {
    let date = new Date(timestamp);

    return `${days[date.getDay()].charAt(0).toUpperCase() + days[date.getDay()].slice(1)} ${date.getDate()} ${months[date.getMonth()]}`
}


export const getFullDay = (timestamp) => {
    let date = new Date(timestamp);

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}