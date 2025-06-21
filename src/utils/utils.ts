import moment from 'moment'

export function allCaps(text: string | number) {
    return String(text ?? '').toUpperCase()
}
export function allLower(text: string | number) {
    return String(text ?? '').toLowerCase()
}
export const camelCase = (text: string = '') => {
    return String(text).charAt(0).toLowerCase() + String(text).slice(1)
}
export function capCase(text: string = '', splitter: string = ' ') {
    if (text === '' || text == null || text == 'null') {
        return ''
    }
    let newStr = String(text).split(splitter)
    return newStr.map(e => `${allCaps(e[0])}${allLower(e.slice(1))}`).join(' ')
}

export function isObjectPropsEmpty (obj:any = {}) {
    const keys = Object.keys(obj)
    if (keys.length > 0) {
        return keys.every(k => obj[k] == '' || !obj[k])
    }
    return true
}

export const moneyFormat = (amount: string | number, integer?: boolean) => {
    if (amount === 'NIL') {
        return amount
    } else {
        let newAmount = Number(amount) ? Number(amount) : Number(0)
        return newAmount.toLocaleString(undefined, {minimumFractionDigits: integer ? 0 : 2, maximumFractionDigits: integer ? 0 : 2})
    }
}

export const formatNumberToShortForm = (number:number|any, toFixed:number = 0) => {
    if (number >= 1_000_000_000_000) {
        return `${(number / 1_000_000_000_000).toFixed(toFixed)}T`; // Trillions
    } else if (number >= 1_000_000_000) {
        return `${(number / 1_000_000_000).toFixed(toFixed)}B`; // Billions
    } else if (number >= 1_000_000) {
        return `${(number / 1_000_000).toFixed(1)}M`; // Millions
    } else if (number >= 1_000) {
        return `${(number / 1_000).toFixed(1)}k`; // Thousands
    }
    return number; // Return as-is for numbers below 1000
};

export function momentDate(date = '') {
    return date === '' ? moment().format('YYYY-MM-DDTHH:mm') : moment(date ?? '').format('YYYY-MM-DDTHH:mm')
}
export function inputDateFormat(date = '') {
    return date ? moment(date).format("YYYY-MM-DD") : '' 
}
export function preferDateFormat(date = '') {
    return date ? moment(date).format("ll") : '' 
}
export function prettyDateFormat(date = '') {
    return date ? moment(date).format("ll") : '' 
}

export const parseResError = ( err: any ) => {
    const response = err.response;
    if (typeof response != 'undefined') {
        const statusCode = response.status;
        const data = {
            statusCode,
            status: statusCode,
            statusText: response.statusText,
            message: response.data?.message ? response.data?.message : response?.data?.error || response.statusText,
            error: response?.data?.error || response.statusText,
            errors: response?.data?.errors ,
            hasError: true,
        };

        return data;

    }
    return { hasError: true, statusColor: err.code, message: err.message };
}


export function formAltController(name: string, value: any, type: string, setData: Function, capCased = true) {

    switch (type) {
        case 'number':
            setData((prev: any) => ({ ...prev, [name]: parseFloat(value) === 0 ? 0 : parseFloat(value) }));
            break;
        case 'select-one':
            setData((prev: any) => ({ ...prev, [name]: value }));
            break;
        case 'checkbox':
            setData((prev:any) => {
                if (!prev) {
                  return { [name]: false };
                }
                return { ...prev, [name]: !prev[name] };
            });
            break;
        case 'radio':
            setData((prev: any) => ({ ...prev, [name]: value }));
            break;
        case 'email':
            setData((prev: any) => ({ ...prev, [name]: allLower(value) }));
            break;
        case 'password':
            setData((prev: any) => ({ ...prev, [name]: value }));
            break;
        case 'date':
            setData((prev: any) => ({ ...prev, [name]: momentDate(value) }));
            break
        case 'special':
        case 'special-text':
        case 'object':
            setData((prev: any) => ({ ...prev, [name]: value }));
            break;
        default:
            setData((prev: any) => ({ ...prev, [name]: capCased ? capCase(value) : value }));
    }
}

export function formatDateDifference(start: string | Date, end: string | Date): string {
    const startDate = new Date(start);
    const endDate = new Date(end);

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    // Adjust for negative days
    if (days < 0) {
        months -= 1;
        const temp = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days += temp.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // Handle weeks and remaining days
    let weeks = 0;
    if (years === 0 && months === 0) {
        weeks = Math.floor(days / 7);
        days = days % 7;
    }

    const parts: string[] = [];
    if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (weeks) parts.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
    if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);

    return parts.length > 0 ? parts.join(", ") : "0 days";
}