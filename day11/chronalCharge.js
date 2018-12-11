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
      str += grid[x][y]
    }
    str += '\n'
  }
  return str
}


var day11Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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
