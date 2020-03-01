import memoizeFormatConstructor from 'intl-format-cache';

/**
 * This is a core object and should not be changed. API and DB must always serve it in this current format. if not. they should fix it on their side.
 */
export interface ValueObjectType {
  Digits: number;
  Id?: number;
  NA?: boolean; // When NA is not present. we will assume the value is TRUE.
  Sign: string;
  Unit: 'Number' | 'Days' | 'Dollars' | 'Percent' | 'Signed Percent' | 'Signed Number';
  Value: number;
}

export interface ValueObjectTypeCS {
  digits: number;
  id?: number;
  na?: boolean; // When NA is not present. we will assume the value is TRUE.
  sign: string;
  unit: 'Number' | 'Days' | 'Dollars' | 'Percent' | 'Signed Percent' | 'Signed Number';
  value: number;
}

/**
 * Creating instances of these Intl formats is an expensive operation,
 * and the APIs are designed such that developers should re-use format instances instead of always creating new ones.
 * This package is simply to make it easier to create a cache of format instances of a particular type to aid in their reuse.
 */
const NumberFormat = memoizeFormatConstructor(Intl.NumberFormat);

/**
 * Format Numbers using Intl
 * @param {number} Digits
 * @return {any}
 */
export const getNumberFormatter = (Digits: number) => {
  return NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: Digits <= 5 ? Digits : 0, minimumFractionDigits: Digits <= 5 ? Digits : 0 });
};

/**
 * Format Numbers using Intl 0 Digits
 * @type {any}
 */
export const defaultFormatter = getNumberFormatter(0);

/**
 * Convert value object to a formatted string
 * @param {Object} valueObject
 * @param {boolean} isThousands
 * @param {string} naLabel
 * @returns {string}
 */
export const formatValueObject = ({ Value, Unit, Digits, NA, Sign }: ValueObjectType, isThousands: boolean, naLabel: string = 'N/A'): string => {
  let number: number = Value;
  let prefix = '';

  // When NA is not present. we will assume the value is TRUE.
  if (NA !== false) {
    return naLabel;
  }

  if (Unit === 'Signed Number') {
    prefix = Math.sign(number) === 1 ? '+' : '';
  }

  if (!isThousands && (Unit === 'Number' || Unit === 'Days' || Unit === 'Dollars' || Unit === 'Signed Number')) {
    number /= 1000;
  } else if (Unit === 'Percent') {
    number *= 100;
  } else if (Unit === 'Signed Percent') {
    number *= 100;
    prefix = Math.sign(number) === 1 ? '+' : '';
  }

  // Last possible Unit is 'Fixed' and we shouldn't do no formatting for it
  return `${prefix}${getNumberFormatter(Digits).format(number)}${Sign}`;
};

export const formatValueObjectCS = ({ id, value, unit, digits, na, sign }: ValueObjectTypeCS, isThousands: boolean, naLabel: string = 'N/A'): string =>
  formatValueObject({ Id: id, Value: value, Unit: unit, Digits: digits, NA: na, Sign: sign }, isThousands);

/**
 * Convert value object to a formatted string
 * @param {number} Value
 * @param {boolean} isThousands
 * @param {number} Digits
 * @returns {string}
 */
export const formatNumber = (Value: number, isThousands: boolean, Digits: number = 1): string => {
  let number: number = Value;
  if (!isThousands) {
    number /= 1000;
  }
  return getNumberFormatter(Digits).format(number);
};

/**
 * Convert value object to a formatted string
 * @param {Object} Value
 * @param {number} Digits
 * @returns {string}
 */
export const formatPercent = (Value: number, Digits: number = 1): string => {
  let number: number = Value;
  number *= 100;
  return getNumberFormatter(Digits).format(number);
};

/**
 * @param Value
 * @param {boolean} isThousands
 * @param {boolean} shouldRoundNumbers
 * @return {number}
 */
export const divideValueByThousands = (Value: number, isThousands: boolean, shouldRoundNumbers: boolean = true): number => {
  const number = Value / (isThousands ? 1 : 1000);
  return shouldRoundNumbers ? Math.round(number) : number;
};
