/* eslint-disable no-extend-native */


export { };
declare global {
    interface Date {
        toUTCDate(): Date;
    }
}

Date.prototype.toUTCDate = function (this: Date) {
    return Date.toUTCDate(this);
}

