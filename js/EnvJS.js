var k1T = process.env.k1T;

console.log (k1T);

var tmpk1T ="21";
if (k1T <= tmpk1T) {
    process.env.k1T = tmpk1T;
}
 
console.log (k1T);