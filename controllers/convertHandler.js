function ConvertHandler() {

  this.getNum = (input) => {
    if (input === '') {return input = 1};
    if (/[a-z]+/i.test(input)) {
      return 'invalid number'
    }
    let numbers = [];
    let arr = input.split('');
    arr.filter((value) => {
      if (/[0-9]|[/]|[.]/.test(value)) {
        return numbers.push(value);
      };
    });
    let formula = numbers.join('')
    if (/\/\d?[.]?\d?\//.test(formula)) {return 'invalid number'}
    let result = eval(formula);
    return result
  };

  this.getUnit = (input, metrics) => {
    let letters = [];
    let arr = input.split('');
    arr.filter((value) => {
      if (/[a-z]/i.test(value)) {
        return letters.push(value);
      };
    });
    let unit = letters.join('');
    if ( unit === 'l' || unit === 'L') {
      return unit.toUpperCase();
    }
    let isMetric = metrics.includes(unit.toLowerCase());
    return isMetric ? unit.toLowerCase() : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    return result = 
      initUnit === 'gal'
      ? 'L'
      : initUnit === 'L'
      ? 'gal'
      : initUnit === 'mi'
      ? 'km'
      : initUnit === 'km'
      ? 'mi'
      : initUnit === 'lbs'
      ? 'kg'
      : 'lbs'
  };

  this.spellOutUnit = function(unit) {
    return string = unit === 'gal'
    ? 'gallons'
    : unit === 'L'
    ? 'liters'
    : unit === 'mi'
    ? 'miles'
    : unit === 'km'
    ? 'kilometers'
    : unit === 'lbs'
    ? 'pounds'
    : 'kilograms'
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if (initUnit === 'gal') {
      return Number((initNum * galToL).toFixed(5));
    }
    else if (initUnit === 'L') {
      return Number((initNum / galToL).toFixed(5));
    }
    else if (initUnit === 'mi') {
      return Number((initNum * miToKm).toFixed(5));
    }
    else if (initUnit === 'km') {
      return Number((initNum / miToKm).toFixed(5));
    }
    else if (initUnit === 'lbs') {
      return Number((initNum * lbsToKg).toFixed(5));
    }
    else if (initUnit === 'kg') {
      return Number((initNum / lbsToKg).toFixed(5));
    };
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
  };
  
}

module.exports = ConvertHandler;
