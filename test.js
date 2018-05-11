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

function identityf(x) {
  return function() {
    return x;
  };
}

var three = identityf(3);
console.log(three());

function addf(first) {
  return function(second) {
    return first + second;
  };
}

console.log(addf(3)(4));

function liftf(binary) {
  return function(first) {
    return function(second) {
      return binary(first, second);
    };
  };
}

// currying
function curry(binary, first) {
  return function(second) {
    return binary(first, second);
  };
}

// below is the es6 syntax for passing multiple number of arguments
// function curry(binary, ...first) {
//   return function(...second) {
//     return binary(...first, ...second);
//   };
// }

function twice(binary) {
  return function(first) {
    return binary(first, first);
  };
}

var doubl = twice(add);
console.log(doubl(11));

var square = twice(mul);
console.log(square(11));

// ---------------------------------------------------------------------------------------------
// write reverse, a function that reverses the arguments of a binary function
function reverse(binary) {
  return function(first, second) {
    return binary(second, first);
  };
}

var bus = reverse(sub);
console.log(bus(3, 2));

// ***********************************************************************************
// write a function composeu that takes two unary functions and
// returns a unary function that calls them both.
function composeu(fun1, fun2) {
  return function(first) {
    return fun2(fun1(first));
  };
}

console.log(composeu(doubl, square)(5));

// **********************************************************************************
// write a function composeb that takes two binary functions and
// returns a funtions that calls them both
function composeb(fun1, fun2) {
  return function(first, second, third) {
    return fun2(fun1(first, second), third);
  };
}

console.log(composeb(add, mul)(2, 3, 7));

// write a limit function that allows a binary function to be
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
