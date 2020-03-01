/**
 * This is a core object and should not be changed. API and DB must always serve it in this current format. if not. they should fix it on their side.
 */
export interface ValueObjectType {
    Digits: number;
    Id?: number;
    NA?: boolean;
    Sign: string;
    Unit: 'Number' | 'Days' | 'Dollars' | 'Percent' | 'Signed Percent' | 'Signed Number';
    Value: number;
}
export interface ValueObjectTypeCS {
    digits: number;
    id?: number;
    na?: boolean;
    sign: string;
    unit: 'Number' | 'Days' | 'Dollars' | 'Percent' | 'Signed Percent' | 'Signed Number';
    value: number;
}
/**
 * Format Numbers using Intl
 * @param {number} Digits
 * @return {any}
 */
export declare const getNumberFormatter: (Digits: number) => any;
/**
 * Format Numbers using Intl 0 Digits
 * @type {any}
 */
export declare const defaultFormatter: any;
/**
 * Convert value object to a formatted string
 * @param {Object} valueObject
 * @param {boolean} isThousands
 * @param {string} naLabel
 * @returns {string}
 */
export declare const formatValueObject: ({ Value, Unit, Digits, NA, Sign }: ValueObjectType, isThousands: boolean, naLabel?: string) => string;
export declare const formatValueObjectCS: ({ id, value, unit, digits, na, sign }: ValueObjectTypeCS, isThousands: boolean, naLabel?: string) => string;
/**
 * Convert value object to a formatted string
 * @param {number} Value
 * @param {boolean} isThousands
 * @param {number} Digits
 * @returns {string}
 */
export declare const formatNumber: (Value: number, isThousands: boolean, Digits?: number) => string;
/**
 * Convert value object to a formatted string
 * @param {Object} Value
 * @param {number} Digits
 * @returns {string}
 */
export declare const formatPercent: (Value: number, Digits?: number) => string;
/**
 * @param Value
 * @param {boolean} isThousands
 * @param {boolean} shouldRoundNumbers
 * @return {number}
 */
export declare const divideValueByThousands: (Value: number, isThousands: boolean, shouldRoundNumbers?: boolean) => number;
