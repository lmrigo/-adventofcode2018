var input = [
`depth: 510
target: 10,10`,
 // puzzleInput
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
    'narrow': '|'
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
var printCave = function(cave, x0, xn, y0, yn) {
  var outString = ''
  for (var j = y0; j < yn; j++) {
    for (var i = x0; i < xn; i++) {
      outString += cave[i][j]
    }
    outString += '\n'
  }
  console.log(outString)
}

var cave = []

var day22Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var inputStrs = input[i].split(/\n+/)
    var caveDepth = Number(inputStrs[0].split(/\s+/)[1])
    var targetCoordinates = inputStrs[1].split(/\s+/)[1]
    var targetX = Number(targetCoordinates.split(',')[0])
    var targetY = Number(targetCoordinates.split(',')[1])
    var types = ['rocky','wet','narrow']

    var additionalTiles = 3 // TODO: find out the best value. Tiles added in case the best path goes further from the target and then returns.
    var gridSize = (targetX > targetY ? targetX : targetY) + additionalTiles // using caveDepth makes the program run out of memory
    cave = [] // keep only the types information in here
    while (true) {
      var grid = [] // make it disappear after goes out of this scope
      var minX=0,maxX=gridSize,minY=0,maxY=gridSize
      for (var x = minX; x < maxX; x++) {
        grid[x] = []
        for (var y = minY; y < maxY; y++) {
          if (x===0&&y===0) {
            grid[x][y] = new Region(0,0,0,(0 + 510) % 20183,types[510 % 3])
            continue
          }
          var r = new Region(x,y)
          if (x === targetX && y === targetY) {
            r.geoIndex = 0
          } else if (y === 0) {
            r.geoIndex = x * 16807
          } else if (x === 0) {
            r.geoIndex = y * 48271
          } else {
            r.geoIndex = grid[x-1][y].erosion * grid[x][y-1].erosion
          }
          r.erosion = (r.geoIndex + caveDepth) % 20183
          r.type = types[r.erosion%3]
          grid[x][y] = r
        }
      }
      // copy to cave
      var types = {
        'rocky': '.',
        'wet': '=',
        'narrow': '|'
      }
      for (var x = minX; x < maxX; x++) {
        cave[x] = []
        for (var y = minY; y < maxY; y++) {
          cave[x][y] = types[grid[x][y].type]
        }
      }
      break
    }
    // console.log(grid)
    // cave[0][0] = 'X'
    // cave[targetX][targetY] = 'T'
    // printCave(cave,0,gridSize,0,gridSize)

    // In rocky regions, you can use the climbing gear or the torch.
    // In wet regions, you can use the climbing gear or neither tool.
    // In narrow regions, you can use the torch or neither tool.

    var shortestPath = gridSize*3
    var initialState = {'x': 0, 'y':0,'minutes':0,'gear':'T','trace':'T'+0+','+0}
    var history = []
    var possiblePaths = [] //TODO: might be unnecessary. just find the best one.
    var nextStates = [initialState]
    var timeout = 100000
    while (nextStates.length > 0 && --timeout) {
      var st = nextStates.shift()
      if (history[st.x] === undefined) { history[st.x] = [] }
      if (history[st.x][st.y] === undefined) {
        history[st.x][st.y] = st.minutes
      } else if (history[st.x][st.y] <= st.minutes) { // drop paths longer than history TODO TEST <=
        continue
      } else {
        history[st.x][st.y] = st.minutes
      }
      if (st.x === targetX && st.y === targetY) { // found
        shortestPath = st.minutes < shortestPath ? st.minutes : shortestPath
        possiblePaths.push(st)
      } else {
        //generate next states
        var genMoves = []
        $.each(generateMoves(st), function(idx, gm) {
          if (gm.steps <= shortestPath) { // include only paths shorter or equal than already found
            if (history[gm.x] && history[gm.x][gm.y] && history[gm.x][gm.y] <= gm.minutes+7) { // drop paths longer than history TODO TEST 7 for change gear
              return true
            }
            // TODO: optimization: don't add repeated states. or at least repeated that have more steps
            // compare the current shortest path to the generated move
            genMoves.push(gm)
          }
        })
        // TODO: optimization:
        // genMoves.sort((a,b) => { // put the closer ones first
        //   var atou = (Math.abs(a.x - targetX) + Math.abs(a.y - targetY))
        //   var btou = (Math.abs(b.x - targetX) + Math.abs(b.y - targetY))
        //   return atou - btou
        // })
        nextStates.push(...genMoves)
      }
    }
    if (!timeout) {
      console.log('timeout!')
    }
    console.log(possiblePaths)

    possiblePaths.sort((a,b)=> {
      return a.minutes - b.minutes
    })

    var minMinutes = possiblePaths[0].minutes

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(minMinutes)
      .append('<br>')
  }
}

var moveFunctions = [
  function(st){st.x--;st.minutes++;},
  function(st){st.x++;st.minutes++;},
  function(st){st.y--;st.minutes++;},
  function(st){st.y++;st.minutes++;},
  function(st){st.gear='N';st.minutes+=7;},
  function(st){st.gear='T';st.minutes+=7;},
  function(st){st.gear='C';st.minutes+=7;}
]
var generateMoves = function(st) {
  var moves = []
  $.each(moveFunctions, function(idx, moveFunc) {
    var newState = cloneState(st)
    moveFunc(newState)
    if(isValid(newState,st)) {
      newState.trace += genTrace(newState)
      moves.push(newState)
    }
  })
  return moves
}

var cloneState = function(state) {
  var newState = {
    'x': state.x,
    'y': state.y,
    'minutes': state.minutes,
    'gear': state.gear,
    'trace': state.trace
  }
  return newState
}

// In rocky regions, you can use the climbing gear or the torch.
// In wet regions, you can use the climbing gear or neither tool.
// In narrow regions, you can use the torch or neither tool.
var isValid = function(st, oldst) {
  return (0 <= st.x && st.x < cave.length) // within maze
      && (0 <= st.y && st.y < cave[st.x].length)
      && (cave[st.x][st.y] === '.' && (st.gear === 'C' || st.gear === 'T') // gear appropriate for region
          || cave[st.x][st.y] === '=' && (st.gear === 'C' || st.gear === 'N')
          || cave[st.x][st.y] === '|' && (st.gear === 'T' || st.gear === 'N'))
      && (!(st.x === oldst.x && st.y === oldst.y && st.gear === oldst.gear)) // can't be on same place and same gear
      && (!st.trace.includes(genTrace(st))) // not repeated step
}

var genTrace = function(st) {
  return st.gear+''+st.x+','+st.y
}



$(function (){
  $('#main').append('<div id="day22"><h2>day #22</h2></div>')
  day22()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day22Part2()
  $('#main').append('<br>')
})
