const data = require('./day8_data.js');

/*
// test data...
let data = [
'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
]
*/

let count = 0;

for(let i = 0; i < data.length; i++)
{
  let parts = data[i].split('|');
  let digit = parts[1].split(' ');
  for(let x=0;x<digit.length;x++)
  { 
    switch(digit[x].length)
    {
      case 2:
      case 4:
      case 3:
      case 7:
        count++;
        break;
      default:
        //console.log('ambiguous digit');
    }
    
    //console.log(digit[x]);
  }
  
}

//console.log("part1:", count);

// this is a template of a known 'good' number set -- see if we can match the numbers against them?
//                 0        1      2        3       4        5        6        7        8         9
let template = ["cagedb", "ab", "gcdfa", "fbcad", "eafb", "cdfbe", "cdfgeb", "dab", "acedgfb", "cefabd"]

// 1 is in 3, 4, 7, 8, 9, 0
// 4 - 1 is in 5, 6, 8, 9
// 7 is in 0, 3, 8, 9
// 8 

// 0, 6, and 9 are all length 6
// 2, 3, and 5 are all length 5
// 6 and 5 are both missing half of 1; 2 is missing the other half...

/*
5 char codes:
3 contains the same chars as 7
5 contains the chars in 4 which are not in 1
otherwise it's 2


6 char codes:
6 does not contain one of the chars in 1
9 contains the chars in 4
otherwise it's 0
*/

let total = 0;
let num_decode = {}

for(let i = 0; i < data.length; i++)
{
  let parts = data[i].split('|');
  let digit = parts[0].split(' ');
  for(let x=0;x<digit.length;x++)
  { 
    //get numbers we know from length...
    if(digit[x].length == 2)
    {
      num_decode[1] = digit[x].split('').sort().join('');
    }
    if(digit[x].length == 3)
    {
      num_decode[7] = digit[x].split('').sort().join('');
    }
    if(digit[x].length == 4)
    {
      num_decode[4] = digit[x].split('').sort().join('');
    }
    if(digit[x].length == 7)
    {
      num_decode[8] = digit[x].split('').sort().join('');
    }
  }


  for(let x=0;x<digit.length;x++)
  {
    let testArr = Array.from(digit[x]);

    if(digit[x].length == 5)
    {
      //find 3; contains 7...
      let intersection = testArr.filter(x => num_decode[7].includes(x));
      if(intersection.length == 3)
      {
        num_decode[3] = digit[x].split('').sort().join('');
      }else{
        //find 5 and 2 depending on how much of 4 they contain...
        let intersection = testArr.filter(x => num_decode[4].includes(x));
        if(intersection.length == 3)
        {
          num_decode[5] = digit[x].split('').sort().join('');
        }else{
          num_decode[2] = digit[x].split('').sort().join('');
        }
      }
    }
    if(digit[x].length == 6)
      {
        //find 9; it contains all of 4
        let intersection = testArr.filter(x => num_decode[4].includes(x));
        if(intersection.length == 4)
        {
          num_decode[9] = digit[x].split('').sort().join('');
        }else{
          //find zero and that leaves 6 left...
          let intersection2 = testArr.filter(x => num_decode[1].includes(x));
          if(intersection2.length == 2)
          {
            num_decode[0] = digit[x].split('').sort().join('');
          }else{
            num_decode[6] = digit[x].split('').sort().join('');
          }
        }
      }
  }

  let val = parts[1].split(' ');
  let outputNum = '';
  for(let i=1;i<val.length;i++)
  {
    //sort our test...
    let numtest = val[i].split('').sort().join('');
    let num = Object.keys(num_decode).find(key => num_decode[key] === numtest);
   
    outputNum += num;
  }

  console.log(outputNum);
  total += parseInt(outputNum, 10);
}

console.log(total);