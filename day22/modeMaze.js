var input = [
`depth: 510
target: 10,10`,
 puzzleInput
]

function Region (x=-1, y=-1, geoIndex=-1, erosion=-1, type=-1) {
  this.x = x
  this.y = y
  this.geoIndex = geoIndex
  this.erosion = erosion
  this.type = type
}

var day22 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputStrs = input[i].split(/\n+/)
    var caveDepth = Number(inputStrs[0].split(/\s+/)[1])
    var targetCoordinates = inputStrs[1].split(/\s+/)[1]
    var targetX = Number(targetCoordinates.split(',')[0])
    var targetY = Number(targetCoordinates.split(',')[1])
    var types = ['rocky','wet','narrow']

    var gridSize = targetX > targetY ? targetX+1 : targetY+1 // caveDepth // using caveDepth makes the program run out of memory
    var grid = []
    var minX=0,maxX=gridSize,minY=0,maxY=gridSize
    for (var x = minX; x < maxX; x++) {
      grid[x] = []
      for (var y = minY; y < maxY; y++) {
        if (x===0&&y===0) {
          // The region at 0,0 (the mouth of the cave) has a geologic index of 0.
          grid[x][y] = new Region(0,0, //x,y
            0, // rule: geoindex = 0
            (0 + 510) % 20183, // erosion level = (this.geoIndex + caveDepth) % 20183
            types[510 % 3] // type = this.erosion % 3
          )
          continue
        }
        var r = new Region(x,y)
        if (x === targetX && y === targetY) {
        // The region at the coordinates of the target has a geologic index of 0.
          r.geoIndex = 0
        } else if (y === 0) {
        // If the region's Y coordinate is 0, the geologic index is its X coordinate times 16807.
          r.geoIndex = x * 16807
        } else if (x === 0) {
        // If the region's X coordinate is 0, the geologic index is its Y coordinate times 48271.
          r.geoIndex = y * 48271
        } else {
        // Otherwise, the region's geologic index is the result of multiplying the erosion levels of the regions at X-1,Y and X,Y-1.
          r.geoIndex = grid[x-1][y].erosion * grid[x][y-1].erosion
        }
        // A region's erosion level is its geologic index plus the cave system's depth, all modulo 20183. Then:
        r.erosion = (r.geoIndex + caveDepth) % 20183
        // If the erosion level modulo 3 is 0, the region's type is rocky.
        // If the erosion level modulo 3 is 1, the region's type is wet.
        // If the erosion level modulo 3 is 2, the region's type is narrow.
        r.type = types[r.erosion%3]
        grid[x][y] = r
      }
    }
    // console.log(grid)
    // printGrid(grid,0,gridSize,0,gridSize)

    var risk = 0
    for (var x = minX; x <= targetX; x++) {
      for (var y = minY; y <= targetY; y++) {
        if (grid[x][y].type === 'wet') {
          risk+=1
        } else if (grid[x][y].type === 'narrow') {
          risk+=2
        }
      }
    }

    $('#day22').append(input[i])
      .append('<br>&emsp;')
      .append(risk)
      .append('<br>')
  }
}

var printGrid = function(grid, x0, xn, y0, yn) {
  var types = {
    'rocky': '.',
    'wet': '=',
    'narrow': '|',
    'M': 'M',
    'X': 'X'
  }
  var outString = ''
  for (var j = y0; j < yn; j++) {
    for (var i = x0; i < xn; i++) {
      outString += types[grid[i][j].type]
    }
    outString += '\n'
  }
  console.log(outString)
}

var day22Part2 = function () {

  for (var i = input.length-1; i < input.length; i++) {


    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day22"><h2>day #22</h2></div>')
  day22()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day22Part2()
  $('#main').append('<br>')
})
