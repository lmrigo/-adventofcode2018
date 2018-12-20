var input = [
`^WNE$`, // 3
`^ENWWW(NEEE|SSE(EE|N))$`, // 10
`^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$`, // 18
`^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$`, // 23
`^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$`, // 31
 puzzleInput
]

function Node (parent) {
  this.parent = parent
  this.children = []
  this.path = ''
}

var distGrid // used for part 2 as well

var day20 = function() {

  // for (var i = 0; i < 5; i++) {
  for (var i = 0; i < input.length; i++) {
    var regex = input[i].split('')

    var startToken = '^('
    var endToken = '|)$'
    var splitToken = '|'
    var idx = 1
    var parseRegex = function(parent) {
      var node = new Node(parent)
      var l = regex[idx]
      while (!endToken.includes(l)) {
        if (startToken.includes(l)) {
          var moreChildren = true
          while (moreChildren) {
            ++idx
            var child = parseRegex(node)
            node.children.push(child)
            node.path += '' + node.children.length-1
            l = regex[idx]
            moreChildren = splitToken.includes(l)
          }
        } else {
          node.path += l
        }
        l = regex[++idx]
      }
      return node
    }
    var root = parseRegex(null)
    // console.log(root)

    var gridSize = 400 //only use even numbers
    var grid = []
    var minX=0,maxX=gridSize,minY=0,maxY=gridSize
    for (var x = minX; x < maxX; x++) {
      grid[x] = []
      for (var y = minY; y < maxY; y++) {
        grid[x][y] = '?'
      }
    }
    var me = {x:gridSize/2,y:gridSize/2}
    grid[me.x][me.y] = 'X'

    // walk the grid
    var initialState = {x:me.x, y:me.y, node:root}
    var nextStates = [initialState]
    while (nextStates.length > 0) {
      var st = nextStates.shift()
      // walk the path
      var dir = st.node.path.charAt(0)
      st.node.path = st.node.path.substr(1) // remove the element
      if (dir.match(/\d/) === null) { // if it's not a child number
        // move and add the door behind
        switch (dir) {
          case 'N': {
            grid[st.x-1][st.y] = '-'
            st.x-=2
          };break;
          case 'S': {
            grid[st.x+1][st.y] = '-'
            st.x+=2
          };break;
          case 'W': {
            grid[st.x][st.y-1] = '|'
            st.y-=2
          };break;
          case 'E': {
            grid[st.x][st.y+1] = '|'
            st.y+=2
          };break;
        }
        grid[st.x][st.y] = '.' // mark as move spot
      } else {
        var childrenToPush = [Number(dir)]
        var nextChar = st.node.path.charAt(0)
        while (nextChar.match(/\d/) !== null) {
          st.node.path = st.node.path.substr(1) // remove the element
          childrenToPush.push(Number(nextChar))
          nextChar = st.node.path.charAt(0)
        }
        // add the children to next states
        $.each(childrenToPush, (idx, childIdx) => {
          var newState = {x:st.x, y:st.y, node:st.node.children[childIdx]}
          nextStates.push(newState)
        })
      }
      if (st.node.path.length > 0) {
        nextStates.push(st)
      }
    }

    // fill grid walls
    for (var x = minX; x < maxX; x++) {
      for (var y = minY; y < maxY; y++) {
        grid[x][y] = grid[x][y] === '?' ? '#' : grid[x][y]
      }
    }

    // printGrid2(grid,minX,maxX,minY,maxY)

    // find the distances to all rooms
    var initialState = {'x':me.x, 'y':me.y, 'steps':0, 'trace':':'+me.x+','+me.y}
    var nextStates = [initialState]
    distGrid = []
    var timeout = 1000000
    while (nextStates.length > 0 && --timeout) {
      var st = nextStates.shift()
      if (distGrid[st.x] === undefined) { distGrid[st.x] = [] }
      if (distGrid[st.x][st.y] === undefined) {
        distGrid[st.x][st.y] = st.steps
      } else if (distGrid[st.x][st.y] <= st.steps) {
        continue
      } else {
        distGrid[st.x][st.y] = st.steps
      }

      //generate next states NSWE
      var genMoves = []
      if (grid[st.x-1][st.y] === '-') { //N
        var genTrace = ':'+(st.x-2)+','+st.y
        if (!st.trace.includes(genTrace)) {
          genMoves.push({'x':st.x-2, 'y':st.y, 'steps':st.steps+1, 'trace':st.trace+genTrace})
        }
      }
      if (grid[st.x+1][st.y] === '-') { //S
        var genTrace = ':'+(st.x+2)+','+st.y
        if (!st.trace.includes(genTrace)) {
          genMoves.push({'x':st.x+2, 'y':st.y, 'steps':st.steps+1, 'trace':st.trace+genTrace})
        }
      }
      if (grid[st.x][st.y-1] === '|') { //W
        var genTrace = ':'+st.x+','+(st.y-2)
        if (!st.trace.includes(genTrace)) {
          genMoves.push({'x':st.x, 'y':st.y-2, 'steps':st.steps+1, 'trace':st.trace+genTrace})
        }
      }
      if (grid[st.x][st.y+1] === '|') { //E
        var genTrace = ':'+st.x+','+(st.y+2)
        if (!st.trace.includes(genTrace)) {
          genMoves.push({'x':st.x, 'y':st.y+2, 'steps':st.steps+1, 'trace':st.trace+genTrace})
        }
      }
      nextStates.push(...genMoves)
    }
    if (!timeout) {
      console.log('timeout!')
    }
    for (var x = minX; x < maxX; x++) {
      if (distGrid[x] === undefined) {distGrid[x] = []}
      for (var y = minY; y < maxY; y++) {
        distGrid[x][y] = distGrid[x][y] === undefined ? 0 : distGrid[x][y]
      }
    }
    // console.log(distGrid)
    // printGrid2(distGrid,minX,maxX,minY,maxY)

    var maxDist = distGrid.reduce((accx, valx) => {
      var maxValy = valx.reduce((accy, valy) => {
        return valy > accy ? valy : accy
      }, 0)
      return maxValy > accx ? maxValy : accx
    }, 0)

    $('#day20').append(input[i])
      .append('<br>&emsp;')
      .append(maxDist)
      .append('<br>')
  }
}

var printGrid2 = function(grid, x0, xn, y0, yn) {
  var outString = ''
  for (var i = x0; i < xn; i++) {
    for (var j = y0; j < yn; j++) {
      outString += grid[i][j]
    }
    outString += '\n'
  }
  console.log(outString)
}

var day20Part2 = function () {

  for (var i = input.length-1; i < input.length; i++) {
    // How many rooms have a shortest path from your current location that pass through at least 1000 doors?
    var numRoomsFurthestThanThousand = distGrid.reduce((accx, valx) => {
        return accx + valx.reduce((accy, valy) => {
          return accy + (valy >= 1000 ? 1 : 0)
        }, 0)
      }, 0)

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(numRoomsFurthestThanThousand)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day20"><h2>day #20</h2></div>')
  day20()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day20Part2()
  $('#main').append('<br>')
})
