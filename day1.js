const data = require('./day1_data.js');

let count = 0;
let count2 = 0;

for(let i = 0; i < data.length; i++)
{
  // first problem...
  if (data[i] < data[i + 1])
  {
    count++;
  }

  // calculate our window values...
  let window1 = data[i] + data[i + 1] + data[i + 2];
  let window2 = data[i + 1] + data[i + 2] + data[i + 3];
  if (window1 < window2)
  {
    count2++;
  }
}

console.log("Day 1 a Value:", count);
console.log("Day 1 b Value:", count2);
