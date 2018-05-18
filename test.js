"use strict";

function add(first, second) {
  return first + second;
}

function sub(first, second) {
  return first - second;
}

function mul(first, second) {
  return first * second;
}

console.log("**************************************************************************************************************");

// write a function identityf that takes an argument
// and returns a function that returns that argument
function identityf(x) {
  return function() {
    return x;
  };
}

var three = identityf(3);
console.log(three());

console.log("**************************************************************************************************************");

// write a function addf that adds from two invocations
function addf(first) {
  return function(second) {
    return first + second;
  };
}

console.log(addf(3)(4));

console.log("**************************************************************************************************************");

// write a function liftf that takes a binary function
// and makes it callable with two invocations
function liftf(binary) {
  return function(first) {
    return function(second) {
      return binary(first, second);
    };
  };
}

console.log("**************************************************************************************************************");

// write a function curry that takes a binary function and
// an argument and returns a function that can take a second argument
function curry(binary, first) {
  return function(second) {
    return binary(first, second);
  };
}

// what is currying: The process of taking a function
// with multiple arguments and turning it into multiple
// functions that take a single argument is called currying

// below is the es6 syntax for passing multiple number of arguments
// function curry(binary, ...first) {
//   return function(...second) {
//     return binary(...first, ...second);
//   };
// }

console.log("**************************************************************************************************************");

// write a function twice that takes a binary function
// and returns a unary function that passes
// its argument to the binary function twice.
function twice(binary) {
  return function(first) {
    return binary(first, first);
  };
}

var doubl = twice(add);
console.log(doubl(11));

var square = twice(mul);
console.log(square(11));

console.log("**************************************************************************************************************");

// write reverse, a function that reverses the
// arguments of a binary function
function reverse(binary) {
  return function(first, second) {
    return binary(second, first);
  };
}

var bus = reverse(sub);
console.log("reverse " + bus(3, 2));

console.log("**************************************************************************************************************");

// write a function composeu that takes two unary functions
// and returns a unary function that calls them both.
function composeu(fun1, fun2) {
  return function(first) {
    return fun2(fun1(first));
  };
}

console.log("composeu " + composeu(doubl, square)(5));

console.log("**************************************************************************************************************");

// write a function composeb that takes two binary functions and
// returns a funtions that calls them both
function composeb(fun1, fun2) {
  return function(first, second, third) {
    return fun2(fun1(first, second), third);
  };
}

console.log("composeb " + composeb(add, mul)(2, 3, 7));

console.log("**************************************************************************************************************");

// Write a limit function that allows a binary function to be
// called a limited number of times.
function limit(fun1, count) {
  return function(first, second) {
    if (count >= 1) {
      count -= 1;
      return fun1(first, second);
    }
    return undefined;
  };
}

var add_ltd = limit(add, 1);
console.log("limit " + add_ltd(3, 4));

// below code will return undefined as its called second time
console.log("limit " + add_ltd(3, 4));

console.log("**************************************************************************************************************");

// write a from function that produces a generator that will
// produce a series of values
function from(startValue) {
  return function() {
    return (startValue += 1);
  };
}

var index = from(0);
console.log("from generator 1 " + index());
console.log("from generator 2 " + index());
console.log("from generator 3 " + index());

console.log("**************************************************************************************************************");

// write a to function that takes a generator and an end value,
// and returns a generator that will produce numbers up to that limit

function to(generator, endValue) {
  return function() {
    var value = generator();
    if (value < endValue) {
      return value;
    }
    return undefined;
  };
}

var index2 = to(from(0), 3);
console.log("to 1 " + index2()); // 1
console.log("to 2 " + index2()); // 2

// this will return undefined as the max limit is reached
console.log("to 3 " + index2()); // undefined

console.log("**************************************************************************************************************");

// write a fromTo function that produce a generator
// that will produce values in a range

function fromTo(start, end) {
  return function() {
    if (start < end) {
      return (start += 1);
    }
    return undefined;
  };
}

var index3 = fromTo(0, 3);
console.log("fromTo 1 " + index3()); // 1
console.log("fromTo 2 " + index3()); // 2
console.log("fromTo 3 " + index3()); // 3

console.log("**************************************************************************************************************");

// write an element function that takes an array
// and a generator and returns a generator that
// produce elements from the array.

/*
function element(array, gen) {
  return function(){
    var index = gen();
    if(index !== undefined) {
      return array[index];
    }
  }
}


var ele = element(["a", "b", "c", "d"], fromTo(1, 3));
console.log("ele " + ele()); // 'b'
console.log("ele " + ele()); // 'c'
console.log("ele " + ele()); // undefined
*/

console.log("**************************************************************************************************************");

// Modify the element function so that the
// generator argument is optional.
// if a generator is not provided,
// then each of the elements of the array will be produced

function element(array, generator) {
  let index;
  if (generator !== undefined) {
    return function() {
      index = generator();
      if (index) {
        return array[index];
      }
    };
  } else {
    let i = 0;
    return function() {
      let el = array[i];
      i += 1;
      if (el) {
        return el;
      }
    };
  }
}

var elem = element(["a", "b", "c", "d"]);

console.log("element after modification " + elem());
console.log("element after modification " + elem());
console.log("element after modification " + elem());
console.log("element after modification " + elem());
console.log("element after modification " + elem());

console.log("**************************************************************************************************************");

// write a collect() function that takes a generator and
// an array  and produces a function that will collect
// the results in the array

function collect(generator, array) {
  return function() {
    let num = generator();
    if (num !== undefined) {
      array.push(num);
    }
    return num;
  };
}

var array = [],
  col = collect(fromTo(0, 2), array);

console.log("collect " + col()); // 1
console.log("collect " + col()); // 2
console.log("collect " + col()); // undefined
console.log(array); // [1, 2]

console.log("**************************************************************************************************************");

// Write a filter() function that takes a geenrator and a predicate
// and produces a generator that produces only the values approved
// by the predicate

// Method 1:
/*
function filter(gen, predicate) {
  return function() {
    var value;
    do {
      value = gen();
    } while (value !== undefined && !predicate(value));
    return value;
  };
}
*/

// Method 2:
function filter(gen, predicate) {
  return function recur() {
    var value = gen();
    if (value === undefined || predicate(value)) {
      return value;
    }
    return recur();
  };
}

var fil = filter(fromTo(0, 5), function third(value) {
  return value % 3 === 0;
});
console.log("fil " + fil()); // 3
console.log("fil " + fil()); // undefined

console.log("**************************************************************************************************************");

// write a concat() function that takes two generators
// and produces a generator the combines the sequences.

function concat(gen1, gen2) {
  var gen = gen1;
  return function() {
    var value = gen();
    if (value !== undefined) {
      return value;
    }
    gen = gen2;
    return gen();
  };
}

var con = concat(fromTo(0, 3), fromTo(0, 2));
console.log("concat " + con()); // 1
console.log("concat " + con()); // 2
console.log("concat " + con()); // 3
console.log("concat " + con()); // 1
console.log("concat " + con()); // 2
console.log("concat " + con()); // undefined

console.log("**************************************************************************************************************");

// Make a function gensymf() that makes a function that
// generates unique symbols.
function gensymf(str) {
  var count = 0;
  return function() {
    count += 1;
    return str + count;
  };
}

var geng = gensymf("G"), genh = gensymf("H");

console.log("gensymf " + geng());
console.log("gensymf " + genh());
console.log("gensymf " + geng());
console.log("gensymf " + genh());

console.log("**************************************************************************************************************");

// Write a function gensymff() that takes a 
// unary function and a seed and returns a gensymf.

function gensymff(unary, seed) {
  return gensymf;
}

