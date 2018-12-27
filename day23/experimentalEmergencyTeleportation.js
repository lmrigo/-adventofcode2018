var input = [
`pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`,
`pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`,
 puzzleInput
]


var day23 = function() {

  for (var i = 0; i < input.length; i++) {
    var nanobotStrs = input[i].split(/\n+/)
    var nanobots = []
    $.each(nanobotStrs, (idx, val) => {
      var nums = val.split(/\<|,|\>|=/) // (8) ["pos", "", "1", "3", "1", "", " r", "1"]
      nanobots.push({
        x: Number(nums[2]),
        y: Number(nums[3]),
        z: Number(nums[4]),
        r: Number(nums[7])
      })
    })
    var bigBot = nanobots.reduce((acc, val) => {
      return acc.r > val.r ? acc : val
    })

    var inRange = nanobots.reduce((acc, val) => {
      var valDist = Math.abs(val.x - bigBot.x) + Math.abs(val.y - bigBot.y) + Math.abs(val.z - bigBot.z)
      return acc + (valDist <= bigBot.r ? 1 : 0)
    }, 0)

    $('#day23').append(input[i])
      .append('<br>&emsp;')
      .append(inRange)
      .append('<br>')
  }
}

var day23Part2 = function () {

  for (var i = 2; i < input.length; i++) {
    var nanobotStrs = input[i].split(/\n+/)
    var nanobots = []
    var minx=Number.MAX_SAFE_INTEGER,miny=Number.MAX_SAFE_INTEGER,minz=Number.MAX_SAFE_INTEGER
    var maxx=Number.MIN_SAFE_INTEGER,maxy=Number.MIN_SAFE_INTEGER,maxz=Number.MIN_SAFE_INTEGER
    $.each(nanobotStrs, (idx, val) => {
      var nums = val.split(/\<|,|\>|=/) // (8) ["pos", "", "1", "3", "1", "", " r", "1"]
      var r = Number(nums[7])
      var x = Number(nums[2])
      var y = Number(nums[3])
      var z = Number(nums[4])
      // x = Math.floor(x/(10))
      // y = Math.floor(y/(10))
      // z = Math.floor(z/(10))
      // r = Math.floor(r/(10))
      nanobots.push({ x: x, y: y, z: z, r: r })
      // update minmax values
      minx = minx < x ? minx : x
      miny = miny < y ? miny : y
      minz = minz < z ? minz : z
      maxx = maxx > x ? maxx : x
      maxy = maxy > y ? maxx : y
      maxz = maxz > z ? maxz : z
    })
    // console.log('x:',minx,maxx,'y:',miny,maxy,'z:',minz,maxz)
    //i 0 x: -4 7 y: -4 7 z: -4 4
    //i 1 x: -150 250 y: -150 250 z: -150 250
    //i 2 x: -127326473 333612722 y: -186402189 333612722 z: -149621233 256393526

    // skipping for brevity
    /*
    var botsPos = $.map(nanobots,(bot, idx) => {
      var inRange = nanobots.reduce((acc, val) => {
        var valDist = Math.abs(val.x - bot.x) + Math.abs(val.y - bot.y) + Math.abs(val.z - bot.z)
        return acc + (valDist <= val.r ? 1 : 0)
      }, 0)
      return {'idx':idx,'count':inRange}
    })
    botsPos.sort((b,a) => {
      return a.count-b.count
    })
    */

    // console.log(botsPos)

    var bigTile = {count:893,x:0,y:0,z:0}
    for (var b = 0; b < 0; b++) { // skipping for brevity
      var greatBot = nanobots[botsPos[b].idx]
      // console.log(greatBot)

      minx = 60320000 - 100000
      maxx = 60320000 + 100001
      miny = 50270000 - 1000000
      maxy = 50270000 + 1000001
      minz = 12080000 - 2000000
      maxz = 12080000 + 10000010
      var mycount = 0
      var log = {}
      for (var x = minx; x < maxx; x+=100*1000) {
        for (var y = miny; y < maxy; y+=1000*1000) {
          for (var z = minz; z < maxz; z+=1000*1000) {
            // counts bots in touch of this position
            var inRange = nanobots.reduce((acc, val) => {
              var valDist = Math.abs(val.x - x) + Math.abs(val.y - y) + Math.abs(val.z - z)
              return acc + (valDist <= val.r ? 1 : 0)
            }, 0)
            if (inRange >= bigTile.count) {
              bigTile.count = inRange
              bigTile.x = x
              bigTile.y = y
              bigTile.z = z
              mycount++
              if (!log[x]) {log[x]={}}
              if (!log[x][y]) {log[x][y]={}}
              log[x][y][z]=inRange
            }
          }
        }
      }
      // console.log(bigTile)
    }
    // console.log(bigTile,mycount,log)
    // div 1 {count: 893, x: 60420000, y: 50270000, z: 12080000} 6
    // div 10 {count: 893, x: 6042000, y: 5027000, z: 1208000} 6
    // div 100 {count: 893, x: 604200, y: 502700, z: 120800} 6
    // div 1k {count: 893, x: 60420, y: 50270, z: 12080} 6
    // div 10K {count: 893, x: 6041, y: 5127, z: 1198} 3996
    // div 100K {count: 893, x: 603, y: 498, z: 120}
    // div 1M {count: 889, x: 60, y: 51, z: 12}

    var calcTile = function(x,y,z) {
      return nanobots.reduce((acc, val) => {
        var valDist = Math.abs(val.x - x) + Math.abs(val.y - y) + Math.abs(val.z - z)
        return acc + (valDist <= val.r ? 1 : 0)
      }, 0)
    }

    // find the closest point around this region
    var x = 59182464
    var y = 49186405
    var z = 10819947
    var maxValSoFar = 899
    var inRange = calcTile(x,y,z)

    var oldx=0,oldy=0,oldz=0

    while (x!==oldx || y!==oldy || z!==oldz) {
      oldx = x
      oldy = y
      oldz = z

      while (inRange >= maxValSoFar) { x--; inRange = calcTile(x,y,z) } x++;

      inRange = calcTile(x,y,z)

      while (inRange >= maxValSoFar) { y--; inRange = calcTile(x,y,z) } y++;

      inRange = calcTile(x,y,z)

      while (inRange >= maxValSoFar) { z--; inRange = calcTile(x,y,z) } z++;

      inRange = calcTile(x,y,z)
    }

    var coord = {x:x,y:y,z:z} //TODO: assign the coordinate that is in range of the largest number of bots
    var coordDist = Math.abs(coord.x - 0) + Math.abs(coord.y - 0) + Math.abs(coord.z - 0)

    // console.log(x,y,z,inRange,coordDist)
    // 59182464 49186405 10819947 899 119188816
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(coordDist)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day23"><h2>day #23</h2></div>')
  day23()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day23Part2()
  $('#main').append('<br>')
})
/*

minx = 59300000
maxx = 68000000
miny = 49000000
maxy = 59000000
minz = 10000000
maxz = 20000000

var xarr = []
for (var x = minx; x < maxx; x+=(1000*1000)) {
  var nextx = {'x':x,'yarr':[]}
  for (var y = miny; y < maxy; y+=(1000*1000)) {
    var nexty = {'y':y,'zarr':[]}
    for (var z = minz; z < maxz; z+=(1000*1000)) {
      // counts bots in touch of this position
      var inRange = nanobots.reduce((acc, val) => {
        var valDist = Math.abs(val.x - x) + Math.abs(val.y - y) + Math.abs(val.z - z)
        return acc + (valDist <= val.r ? 1 : 0)
      }, 0)
      if (inRange>890) {
        nexty.zarr.push({'z':z,'count':inRange})
      }
    }
    if (nexty.zarr.length > 0) {
      nextx.yarr.push(nexty)
    }
  }
  if (nextx.yarr.length > 0) {
    xarr.push(nextx)
  }
}
console.log(xarr)
*/

/*
100*1000
from x: 59000000, y: 49000000, z: 10000000
to   x: 70000000, y: 59000000, z: 20000000
>880
*/
/*
100*1000
from x: 59000000, y: 49000000, z: 10000000
to   x: 70000000, y: 59000000, z: 20000000
>850
*/

/*
500*1000
from x: 58809531, y: 49222366, z: 10128627
to   x: 73809531, y: 59222366, z: 20128627
>800

x598y49-53
x603y49-52(5) z10-13
x608y50-53 z10-16

x59-x70 y49-59 z10-20

*/


/*
1*1000*1000
from x: 54809531, y: 47222366, z: 7128627
to   x: 73809531, y: 61222366, z: 26128627


x: 58809531, y: 49222366, z: 12128627, 811
x:         , y: 50222366, z: 11128627, 807
x:         , y: 51222366, z: 11128627, 803
x:         , y:         , z: 12128627, 804

x: 59809531, y: 49222366, z: 11128627, 803
x:         , y:         , z: 12128627, 811
x:         , y:         , z: 13128627, 804
x:         , y: 50222366, z: 11128627, 807
x:         , y:         , z: 12128627, 893 ***
x:         , y:         , z: 13128627, 807
x:         , y:         , z: 14128627, 800
x:         , y: 51222366, z: 10128627, 800
x:         , y:         , z: 11128627, 805
x:         , y:         , z: 12128627, 804
x:         , y:         , z: 13128627, 888 ***
x:         , y:         , z: 14128627, 799
x:         , y: 52222366, z: 12128627, 801
x:         , y:         , z: 13128627, 798
x:         , y:         , z: 14128627, 871 ***
x:         , y: 53222366, z: 15128627, 853 ***
x:         , y: 54222366, z: 16128627, 841 ***
x:         , y: 55222366, z: 17128627, 831 ***
x:         , y: 56222366, z: 18128627, 814

x: 60809531, y: 48222366, z: 11128627, 803
x:         , y: 49222366, z: 10128627, 800
x:         , y:         , z: 11128627, 803
x:         , y:         , z: 12128627, 802
x:         , y:         , z: 13128627, 801
x:         , y: 50222366, z: 11128627, 802
x:         , y:         , z: 12128627, 893 ***
x:         , y:         , z: 13128627, 887 ***
x:         , y: 51222366, z: 11128627, 801
x:         , y:         , z: 12128627, 891 ***
x:         , y:         , z: 13128627, 890 ***
x:         , y:         , z: 14128627, 882 ***
x:         , y: 52222366, z: 13128627, 886 ***
x:         , y:         , z: 14128627, 879 ***
x:         , y:         , z: 15128627, 864 ***
x:         , y: 53222366, z: 14128627, 868 ***
x:         , y:         , z: 15128627, 860 ***
x:         , y:         , z: 16128627, 846 ***
x:         , y: 54222366, z: 15128627, 850 ***
x:         , y:         , z: 16128627, 847 ***
x:         , y:         , z: 17128627, 835 ***
x:         , y: 55222366, z: 16128627, 839 ***
x:         , y:         , z: 17128627, 836 ***
x:         , y:         , z: 18128627, 824 ***
x:         , y: 56222366, z: 17128627, 827 ***
x:         , y:         , z: 18128627, 819
x:         , y:         , z: 19128627, 807
x:         , y: 57222366, z: 18128627, 810
x:         , y:         , z: 19128627, 802

x: 61809531, y: 49222366, z: 12128627, 801
x:         , y:         , z: 13128627, 800
!!!!
x: 61809531, y: 50222366, z: 13128627, 883
x:         , y:         , z: 14128627, 879
x:         , y: 51222366, z: 12128627, 888
x:         , y:         , z: 13128627, 885
x:         , y:         , z: 14128627, 880
x:         , y:         , z: 15128627, 873
x:         , y: 51222366, z: 12128627, 885
x:         , y:         , z: 13128627, 885
x:         , y:         , z: 14128627, 879
x:         , y:         , z: 15128627, 868
x:         , y:         , z: 16128627, 855
x:         , y: 53222366, z: 13128627, 880
x:         , y:         , z: 14128627, 874
x:         , y:         , z: 15128627, 861
x:         , y:         , z: 16128627, 849
x:         , y:         , z: 17128627, 838
x61y54z14-18
x61y55z15-19
x61y56z16-20
x61y57z17-19
x61y58z18

x62y50z10-15
x62y51z10-16
x62y52z11-17
x62y53z12-18
x62y54z13-19
x62y55z14-20
x62y56z15-20
x62y57z16-20
x62y58z17-19
x62y59z18

x63y50z15-16
x63y51z10-17
x63y52z10-18
x63y53z11-19
x63y54z12-20
x63y55z13-21
x63y56z14-21
x63y57z15-20
x63y58z16-19
x63y59z17-18

x64y50z16-17
x64y51z15-18
x64y52z14-19
x64y53z13-20
x64y54z12-21
x64y55z12-22
x64y56z13-21
x64y57z14-20
x64y58z15-19
x64y59z16-18
x64y60z17-18



x73y51z17
x73y52z23-24
x73y53z22-24
x73y54z21-23
x73y55z20-23
x73y56z19-22
x73y57z18-20
x73y58z17-18
x73y59z16-19
x73y60z15-18
x73y61z14-18


x: 73809531, y: , z: , 801
*/

/*
5*1000*1000
x: 59809531, y: 52222366, z: 12128627, 801
x: 64809531, y: 52222366, z: 17128627, 863 ***
x: 64809531, y: 57222366, z: 17128627, 823
x: 69809531, y: 52222366, z: 22128627, 818
x: 69809531, y: 57222366, z: 22128627, 833
*/

/*
20*1000*1000
x: 59809531, y: 52222366, z: 12128627, 801
x: 69809531, y: 52222366, z: 22128627, 818 ***
*/

/*
20*1000*1000
x 19809531, 39809531, 59809531, 79809531, 99809531
y 42222366, 62222366, 82222366, 102222366, 122222366
z -17871373, 2128627, 22128627, 42128627, 62128627

  x 19
 zy 42  62  82  10  12
-17 94  106 64  35  21
  2 135 146 135 99  39
 22 157 172 220 142 61
 42 135 214 168 99  47
 62 115 155 107 58  24

  x 39
 zy 42  62  82  10  12
-17 87  152 103 86  36
  2 181 232 282 140 68
 22 202 413 361 211 93
 42 273 344 269 173 83
 62 160 200 170 108 52

  x 59
 zy 42  62  82  10  12
-17 136 157 264 133 63
  2 196 575 380 223 107
 22 584 693 458 300 165
 42 353 450 442 264 133
 62 218 293 267 185 93

  x 79
 zy 42  62  82  10  12
-17 169 376 269 169 76
  2 634 630 478 267 134
 22 691 768 593 361 184 ***
 42 475 603 467 324 162
 62 269 342 323 202 101

  x 99
 zy 42  62  82  10  12
-17 397 428 264 148 67
  2 506 566 498 274 119
 22 569 637 299 372 169
 42 523 592 455 269 131
 62 296 383 275 164 79
*/

/*
100*1000*1000
x -30190469, 69809531, 169809531
y -107777634, -7777634, 92222366, 192222366
z -67871373, 32128627, 132128627
  x -3
 zy-10 -7 9 19
-6  0  0  0  0
 3  0  13 42 1
13  0  0  0  0

  x 6
 zy-10 -7 9  19
-6  0  3  24  0
 3  2  76 424 6 ***
13  0  0  16  0

  x 16
 zy-10 -7 9 19
-6  0  0  1  0
 3  0  8  65 1
13  0  0  1  0

*/

//let's map how many bots touch the edges
// minx miny minz 0
// 0    miny minz 0
// minx 0    minz 0
// minx miny 0    0
// 0    0    minz 1
// minx 0    0    12
// 0    miny 0    0
// 0    0    0    23
// 0    maxy 0    0
// maxx 0    0    1
// 0    0    maxz 0
// maxx maxy 0    0
// maxx 0    maxz 0
// 0    maxy maxz 0
// maxx maxy maxz 0
// var inRange = nanobots.reduce((acc, val) => {
//   var valDist = Math.abs(val.x - maxx) + Math.abs(val.y - maxy) + Math.abs(val.z - maxz)
//   return acc + (valDist <= val.r ? 1 : 0)
// }, 0)
// console.log(inRange)