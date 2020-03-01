"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var intl_format_cache_1 = __importDefault(require("intl-format-cache"));
/**
 * Creating instances of these Intl formats is an expensive operation,
 * and the APIs are designed such that developers should re-use format instances instead of always creating new ones.
 * This package is simply to make it easier to create a cache of format instances of a particular type to aid in their reuse.
 */
var NumberFormat = intl_format_cache_1.default(Intl.NumberFormat);
/**
 * Format Numbers using Intl
 * @param {number} Digits
 * @return {any}
 */
exports.getNumberFormatter = function (Digits) {
    return NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: Digits <= 5 ? Digits : 0, minimumFractionDigits: Digits <= 5 ? Digits : 0 });
};
/**
 * Format Numbers using Intl 0 Digits
 * @type {any}
 */
exports.defaultFormatter = exports.getNumberFormatter(0);
/**
 * Convert value object to a formatted string
 * @param {Object} valueObject
 * @param {boolean} isThousands
 * @param {string} naLabel
 * @returns {string}
 */
exports.formatValueObject = function (_a, isThousands, naLabel) {
    var Value = _a.Value, Unit = _a.Unit, Digits = _a.Digits, NA = _a.NA, Sign = _a.Sign;
    if (naLabel === void 0) { naLabel = 'N/A'; }
    var number = Value;
    var prefix = '';
    // When NA is not present. we will assume the value is TRUE.
    if (NA !== false) {
        return naLabel;
    }
    if (Unit === 'Signed Number') {
        prefix = Math.sign(number) === 1 ? '+' : '';
    }
    if (!isThousands && (Unit === 'Number' || Unit === 'Days' || Unit === 'Dollars' || Unit === 'Signed Number')) {
        number /= 1000;
    }
    else if (Unit === 'Percent') {
        number *= 100;
    }
    else if (Unit === 'Signed Percent') {
        number *= 100;
        prefix = Math.sign(number) === 1 ? '+' : '';
    }
    // Last possible Unit is 'Fixed' and we shouldn't do no formatting for it
    return "" + prefix + exports.getNumberFormatter(Digits).format(number) + Sign;
};
exports.formatValueObjectCS = function (_a, isThousands, naLabel) {
    var id = _a.id, value = _a.value, unit = _a.unit, digits = _a.digits, na = _a.na, sign = _a.sign;
    if (naLabel === void 0) { naLabel = 'N/A'; }
    return exports.formatValueObject({ Id: id, Value: value, Unit: unit, Digits: digits, NA: na, Sign: sign }, isThousands);
};
/**
 * Convert value object to a formatted string
 * @param {number} Value
 * @param {boolean} isThousands
 * @param {number} Digits
 * @returns {string}
 */
exports.formatNumber = function (Value, isThousands, Digits) {
    if (Digits === void 0) { Digits = 1; }
    var number = Value;
    if (!isThousands) {
        number /= 1000;
    }
    return exports.getNumberFormatter(Digits).format(number);
};
/**
 * Convert value object to a formatted string
 * @param {Object} Value
 * @param {number} Digits
 * @returns {string}
 */
exports.formatPercent = function (Value, Digits) {
    if (Digits === void 0) { Digits = 1; }
    var number = Value;
    number *= 100;
    return exports.getNumberFormatter(Digits).format(number);
};
/**
 * @param Value
 * @param {boolean} isThousands
 * @param {boolean} shouldRoundNumbers
 * @return {number}
 */
exports.divideValueByThousands = function (Value, isThousands, shouldRoundNumbers) {
    if (shouldRoundNumbers === void 0) { shouldRoundNumbers = true; }
    var number = Value / (isThousands ? 1 : 1000);
    return shouldRoundNumbers ? Math.round(number) : number;
};
