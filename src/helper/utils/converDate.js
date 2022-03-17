export const ConvertDate = (dt) => {
    const date = new Date(dt * 1000);
    const day = date.getDate();
    return day;
};

export const ConvertHour = (dt) => {
    const date = new Date(dt * 1000);
    const hour = date.getHours();
    return hour;
}