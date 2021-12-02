const data = require('./day2_data.js');

let depth = 0;
let horizontal = 0;

for(let i=0; i<data.length; i++)
{
  if(data[i].includes('forward'))
  {
    horizontal += parseInt(data[i].split(' ')[1]);
  }
  if(data[i].includes('down'))
  {
    depth += parseInt(data[i].split(' ')[1]);
  }
  if(data[i].includes('up'))
  {
    depth -= parseInt(data[i].split(' ')[1]);
  }
}

console.log("Day 2 a Value:", horizontal*depth);

let aim = 0;
let depth2 = 0;
let horizontal2 = 0;

for(let i=0; i<data.length; i++)
{
  if(data[i].includes('forward'))
  {
    horizontal2 += parseInt(data[i].split(' ')[1]);
    if(aim>0)
    {
      depth2 += aim * parseInt(data[i].split(' ')[1]);
    }
  }
  if(data[i].includes('down'))
  {
    aim += parseInt(data[i].split(' ')[1]);
    depth += parseInt(data[i].split(' ')[1]);
  }
  if(data[i].includes('up'))
  {
    aim -= parseInt(data[i].split(' ')[1]);
    depth -= parseInt(data[i].split(' ')[1]);
  }
}

console.log("Day 2 a Value:", horizontal2*depth2);
