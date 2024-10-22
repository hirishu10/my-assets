/* eslint-disable no-console */
import dayjs from 'dayjs';
import 'dayjs/locale/de'; // German locale
import 'dayjs/locale/en'; // English locale
import 'dayjs/locale/fr'; // French locale
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const _defaultLocale: string | ILocale = "en";
const _defaultTimezone: string = dayjs.tz?.guess()?.length > 0 ? dayjs.tz.guess() : "UTC";
dayjs.extend(utc);
dayjs.extend(timezone);

// Default values
let currentLocale: string | ILocale = 'en';
let currentTimezone: string = dayjs.tz?.guess()?.length > 0 ? dayjs.tz.guess() : "UTC";

/**
 * 
 * @param locale string | ILocale
 * 
 * Set the Locale Globally.
 */
export const setDayjsLocale = (locale: string | ILocale) => {
    try {
        currentLocale = locale;
        dayjs.locale(locale);
    } catch (error) {
        console.error(`Failed to set locale: ${currentLocale}`);
        dayjs.locale(_defaultLocale);
    }
};

/**
 * 
 * @param timezone string
 * 
 * Set the Timezone String
 */
export const setDayjsTimezone = (timezone: string) => {
    currentTimezone = timezone;
};

/**
 * 
 * @returns Dayjs Instance 
 */
export const getDayjsInstance = () => {
    try {
        return dayjs().tz(currentTimezone);
    } catch (error) {
        console.error(`Failed to set timezone: ${currentTimezone}`);
        currentTimezone = _defaultTimezone;
        return dayjs().tz(_defaultTimezone);
    }
};

/**
 * 
 * @returns Dayjs Data Instance 
 */
export const getDayjsDataInstance = (date: string) => {
    try {
        return dayjs(date).tz(currentTimezone);
    } catch (error) {
        console.error(`Failed to set timezone: ${currentTimezone}`);
        currentTimezone = _defaultTimezone;
        return dayjs(date).tz(_defaultTimezone);
    }
};

// Initial set default configuration
setDayjsLocale(_defaultLocale);
setDayjsTimezone(_defaultTimezone);

export default dayjs;