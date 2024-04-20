'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {

    const metrics = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    let input = req.query.input;
    let arr = input.split('');
    let index = arr.findLastIndex((element) => {
      return /[0-9]/i.test(element);
    });

    let numberInput = arr.slice(0, index + 1).join('');
    let unitInput = arr.slice(index + 1, arr.length).join('');

    //get number from input
    let initNum = convertHandler.getNum(numberInput);
    //get metric from input
    let initUnit = convertHandler.getUnit(unitInput, metrics);
    //check unit and number validity
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.send('invalid number and unit');
    }
    else if (initNum === 'invalid number') {
      res.send('invalid number');
    }
    else if (initUnit === 'invalid unit') {
      res.send('invalid unit');
    }
    else {
      //get return unit
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      //spell out units
      let initialUnitString = convertHandler.spellOutUnit(initUnit);
      let returnUnitString = convertHandler.spellOutUnit(returnUnit);
      //convert value
      let returnNum = convertHandler.convert(initNum, initUnit);
      //convert into string
      let string = convertHandler.getString(initNum, initialUnitString, returnNum, returnUnitString);

      res.send({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      });
    }
  });

};
