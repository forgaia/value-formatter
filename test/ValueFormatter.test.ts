/* eslint-disable no-undef */
import { ValueObjectType, divideValueByThousands, formatValueObject, formatNumber, formatPercent } from '../src/ValueFormatter';

describe('Value Formatter', () => {
  const PercentValueObject: ValueObjectType = { Id: 1, Value: 0.7478864369786458, Unit: 'Percent', Digits: 1, NA: false, Sign: 'ppt' };
  const SignedPercentValueObject: ValueObjectType = { Id: 1, Value: 0.06489682277999889, Unit: 'Signed Percent', Digits: 1, NA: false, Sign: '%' };
  const NumberValueObject: ValueObjectType = { Id: 1, Value: 718179.0826179998, Unit: 'Number', Digits: 0, NA: false, Sign: '' };

  it('formatValueObject - Signed Percent', () => {
    expect(formatValueObject(SignedPercentValueObject, true)).toStrictEqual('+6.5%');
    expect(formatValueObject(SignedPercentValueObject, false)).toStrictEqual('+6.5%');
  });

  it('formatValueObject - Number', () => {
    expect(formatValueObject(NumberValueObject, true)).toStrictEqual('718,179');
    expect(formatValueObject(NumberValueObject, false)).toStrictEqual('718');
  });

  it('formatValueObject - Percent', () => {
    expect(formatValueObject(PercentValueObject, true)).toStrictEqual('74.8ppt');
    expect(formatValueObject(PercentValueObject, false)).toStrictEqual('74.8ppt');
  });

  it('formatNumber', () => {
    expect(formatNumber(NumberValueObject.Value, true, 0)).toStrictEqual('718,179');
    expect(formatNumber(NumberValueObject.Value, false, 0)).toStrictEqual('718');
  });

  it('formatPercent', () => {
    expect(formatPercent(PercentValueObject.Value, 0)).toStrictEqual('75');
  });

  it('divideValueByThousands', () => {
    expect(divideValueByThousands(NumberValueObject.Value, true)).toStrictEqual(718179);
    expect(divideValueByThousands(NumberValueObject.Value, false)).toStrictEqual(718);
  });
});
