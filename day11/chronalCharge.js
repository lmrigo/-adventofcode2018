var input = [
'8',
'57',
'39',
'71',
'18',
'42',
 puzzleInput
]


var day11 = function() {

  for (var i = 0; i < input.length; i++) {
    var serialNumber = Number(input[i])

    var gridSize = 300
    var grid = []
    for (var x = 1; x <= gridSize; x++) {
      grid[x] = []
      for (var y = 1; y <= gridSize; y++) {
        var powerLevel = 0
        // rackID = x+10
        var rackID = x + 10
        // rackID * y
        powerLevel = rackID * y
        // + serial number (input)
        powerLevel += serialNumber
        // * rackID
        powerLevel *= rackID
        // hundreds
        powerLevel = Math.floor((powerLevel / 100) % 10);
        // -5
        powerLevel -= 5
        grid[x][y] = powerLevel
      }
    }
    if (i == 0) {
      // console.log(grid[3][5]) // 4
      continue
    } else if (i == 1) {
      // console.log(grid[122][79]) // -5
      continue
    } else if (i == 2) {
      // console.log(grid[217][196]) // 0
      continue
    } else if (i == 3) {
      // console.log(grid[101][153]) // 4
      continue
    }

    // find 3x3 largest total power
    var maxPower = -100
    var maxX = -1
    var maxY = -1
    for (var x = 1; x <= gridSize-2; x++) {
      for (var y = 1; y <= gridSize-2; y++) {
        var power = grid[x][y] + grid[x+1][y] + grid[x+2][y]
                  + grid[x][y+1] + grid[x+1][y+1] + grid[x+2][y+1]
                  + grid[x][y+2] + grid[x+1][y+2] + grid[x+2][y+2];
        if (power > maxPower) {
          maxPower = power
          maxX = x
          maxY = y
        }
      }
    }
    var largestTotalPower = maxX+','+maxY

    $('#day11').append(input[i])
      .append('<br>&emsp;')
      .append(largestTotalPower)
      .append('<br>')
  }
}

var printGrid = function(grid,startX=0, startY=0, endX, endY) {
  endX = endX === undefined ? grid.length : endX
  endY = endY === undefined ? grid[0].length : endY
  var str = ''
  for (var y = startY; y < endY; y++) {
    for (var x = startX; x < endX; x++) {
      str += grid[x][y]+','
    }
    str += '\n'
  }
  return str
}


var day11Part2 = function () {

  for (var i = 6; i < input.length; i++) {
    var serialNumber = Number(input[i])

    var gridSize = 300
    var grid = []
    for (var x = 1; x <= gridSize; x++) {
      grid[x] = []
      for (var y = 1; y <= gridSize; y++) {
        var powerLevel = 0
        // rackID = x+10
        var rackID = x + 10
        // rackID * y
        powerLevel = rackID * y
        // + serial number (input)
        powerLevel += serialNumber
        // * rackID
        powerLevel *= rackID
        // hundreds
        powerLevel = Math.floor((powerLevel / 100) % 10);
        // -5
        powerLevel -= 5
        grid[x][y] = powerLevel
      }
    }
    // find nxn largest total power
    var maxPower = -100
    var maxX = -1
    var maxY = -1
    var maxSize = -1
    var startingSize = 10 // min square size -1
    var sizeLimit = 100 //max square size
    for (var s = startingSize; s < sizeLimit; s++) {
      for (var x = 1; x <= gridSize-s; x++) {
        for (var y = 1; y <= gridSize-s; y++) {
          var power = 0
          for (var px = x; px <= x+s; px++) {
            for (var py = y; py <= y+s; py++) {
              power += grid[px][py]
            }
          }
          if (power > maxPower) {
            maxPower = power
            maxX = x
            maxY = y
            maxSize = s+1
          }
        }
      }
    }
    var largestTotalPower = maxX+','+maxY+','+maxSize
    // console.log(maxPower,largestTotalPower,sizeLimit)
    //maxPow,output,sizeLimit
    //100 "235,275,11" 11
    //100 "235,275,11" 12
    //113 "235,273,16" 16
    //119 "234,272,18" 32
    //119 "234,272,18" 64
    //-100 "-1,-1,-1" 128-63
    //-100 "-1,-1,-1" 256-127
    //-100 "-1,-1,-1" 300-255
    //119 "234,272,18" 100-10

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(largestTotalPower)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day11"><h2>day #11</h2></div>')
  day11()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day11Part2()
  $('#main').append('<br>')
})
