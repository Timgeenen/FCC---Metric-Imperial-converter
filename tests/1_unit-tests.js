const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    const metrics = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

    test('convertHandler should correctly read a whole number input.', () => {
        assert.isNumber(convertHandler.getNum('10') , 'is a number');
    });
    test('convertHandler should correctly read a decimal number input.', () => {
        assert.isNumber(convertHandler.getNum('5.912'), 'returns a valid number');
    });
    test('convertHandler should correctly read a fractional input.', () => {
        assert.isNumber(convertHandler.getNum('1/2'), 'returns a valid number')
    });
    test('convertHandler should correctly read a fractional input with a decimal.', () => {
        assert.isNumber(convertHandler.getNum('5.9/3.192'), 'returns a valid number');
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
        assert.isNotNumber(convertHandler.getNum('90/2/5'), 'returns an error');
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
        assert.equal(convertHandler.getNum(''), 1, ('output equals value'));
    });
    test('convertHandler should correctly read each valid input unit.', () => {
        assert.include(metrics, convertHandler.getUnit('gal', metrics));
        assert.include(metrics, convertHandler.getUnit('L', metrics));
        assert.include(metrics, convertHandler.getUnit('mi', metrics));
        assert.include(metrics, convertHandler.getUnit('km', metrics));
        assert.include(metrics, convertHandler.getUnit('lbs', metrics));
        assert.include(metrics, convertHandler.getUnit('kg', metrics));

    });
    test('convertHandler should correctly return an error for an invalid input unit.', () => {
        assert.equal(convertHandler.getUnit('129me', metrics), 'invalid unit');
    });
    test('convertHandler should return the correct return unit for each valid input unit.', () => {
        assert.equal(convertHandler.getReturnUnit('gal', metrics), 'L');
        assert.equal(convertHandler.getReturnUnit('L', metrics), 'gal');
        assert.equal(convertHandler.getReturnUnit('mi', metrics), 'km');
        assert.equal(convertHandler.getReturnUnit('km', metrics), 'mi');
        assert.equal(convertHandler.getReturnUnit('lbs', metrics), 'kg');
        assert.equal(convertHandler.getReturnUnit('kg', metrics), 'lbs');

    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });
    test('convertHandler should correctly convert gal to L.', () => {
        assert.equal(convertHandler.convert('1', 'gal'), 3.78541);
    });
    test('convertHandler should correctly convert L to gal.', () => {
        assert.equal(convertHandler.convert('3.78541', 'L'), 1);
    });
    test('convertHandler should correctly convert mi to km.', () => {
        assert.equal(convertHandler.convert('1', 'mi'), 1.60934);
    });
    test('convertHandler should correctly convert km to mi.', () => {
        assert.equal(convertHandler.convert('1.60934', 'km'), 1);
    });
    test('convertHandler should correctly convert lbs to kg.', () => {
        assert.equal(convertHandler.convert('1', 'lbs'), 0.45359);
    });
    test('convertHandler should correctly convert kg to lbs.', () => {
        assert.equal(convertHandler.convert('0.453592', 'kg'), 1);
    });
});