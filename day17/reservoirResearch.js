var input = [
`x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`,
 puzzleInput
]

var waters = []

var day17 = function() {

  for (var i = 0; i < input.length; i++) {
    var lines = input[i].split(/\n+/)
    var grid = []
    grid[500] = []
    grid[500][0] = '+' // spring of water
    var minX=500,minY=0,maxX=500,maxY=0
    $.each(lines, (idx, line) => {
      var rawIn = line.split(', ')
      if (rawIn[0].startsWith('x')) { // vertical
        var x = Number(rawIn[0].substr(2))
        var rangeY = $.map(rawIn[1].substr(2).split('..'), (n) => {return Number(n)})
        if (grid[x] === undefined) {
          grid[x] = []
        }
        for (var y = rangeY[0]; y <= rangeY[1]; y++) {
          grid[x][y] = '#'
        }
        minX = minX < x ? minX : x
        maxX = maxX > x ? maxX : x
        minY = minY < rangeY[0] ? minY : rangeY[0]
        maxY = maxY > rangeY[1] ? maxY : rangeY[1]
      } else { // horizontal
        var y = Number(rawIn[0].substr(2))
        var rangeX = $.map(rawIn[1].substr(2).split('..'), (n) => {return Number(n)})
        for (var x = rangeX[0]; x <= rangeX[1]; x++) {
          if (grid[x] === undefined) {
            grid[x] = []
          }
          grid[x][y] = '#'
        }
        minY = minY < y ? minY : y
        maxY = maxY > y ? maxY : y
        minX = minX < rangeX[0] ? minX : rangeX[0]
        maxX = maxX > rangeX[1] ? maxX : rangeX[1]
      }
    })
    maxY++
    minX-=2
    maxX+=2
    for (var gx = minX; gx <= maxX; gx++) {
      if (!grid[gx]) {
        grid[gx] = []
      }
      for (var gy = minY; gy <= maxY; gy++) {
        if (!grid[gx][gy]) {
          grid[gx][gy] = '.'
        }
      }
    }
    // console.log(grid)
    // printGrid(grid,minX,maxX,minY,maxY)

     // make the water flow
    var initialState = {'x': 500, 'y':1}
    var nextStates = [initialState]
    var timeout = 1*1000*1000
    while (nextStates.length > 0 && --timeout) {
      var st = nextStates.pop()
      if ((grid[st.x][st.y-1]==='|' || grid[st.x][st.y-1]==='+') && grid[st.x][st.y]==='.' && (grid[st.x][st.y+1]==='.' || grid[st.x][st.y+1]==='|')) { // free fall
        //X|X    X|X
        //X.X -> X|X
        //X.X    X,X
        grid[st.x][st.y] = '|'
        var bottom = cloneState(st)
        bottom.y++
        if (nextStates.findIndex((s) => { return s.x === bottom.x && s.y === bottom.y}) < 0) {
          nextStates.push(bottom)
        }
      } else if (grid[st.x][st.y-1]==='|' && grid[st.x][st.y]==='.' && (grid[st.x][st.y+1]==='#' || grid[st.x][st.y+1]==='~') && (grid[st.x-1][st.y]==='.' || grid[st.x+1][st.y]==='.')) { // fall hit
        //X|X    X|X ^ X|X    X|X ^ X|X    X|X
        //... -> ,|, ^ #.. -> #|, ^ ..# -> ,|#
        //X#X    X#X ^ X#X    X#X ^ X#X    X#X or ~ at the bottom
        grid[st.x][st.y] = '|'
        if (grid[st.x+1][st.y]!=='#') {
          var right = cloneState(st)
          right.x++
          if (nextStates.findIndex((s) => { return s.x === right.x && s.y === right.y}) < 0) {
            nextStates.push(right)
          }
        }
        if (grid[st.x-1][st.y]!=='#') {
          var left = cloneState(st)
          left.x--
          if (nextStates.findIndex((s) => { return s.x === left.x && s.y === left.y}) < 0) {
            nextStates.push(left)
          }
        }
      } else if (grid[st.x][st.y-1]==='|' && grid[st.x][st.y]==='.' && grid[st.x][st.y+1]==='#' && grid[st.x-1][st.y]==='#' && grid[st.x+1][st.y]==='#') { // fall hit overflow
        //X|X    X\X
        //#.# -> #~#
        //X#X    X#X
        grid[st.x][st.y] = '~'
        var top = cloneState(st)
        top.y--
        if (nextStates.findIndex((s) => { return s.x === top.x && s.y === top.y}) < 0) {
          nextStates.push(top)
        }
      } else if (grid[st.x][st.y]==='.' && (grid[st.x][st.y+1]==='#' || grid[st.x][st.y+1]==='~') && grid[st.x-1][st.y]==='.' && grid[st.x+1][st.y]==='|') { // flow left
        //XXX    XXX
        //..| -> ,||
        //X#X    X#X or ~ on bottom
        grid[st.x][st.y] = '|'
        var left = cloneState(st)
        left.x--
        if (nextStates.findIndex((s) => { return s.x === left.x && s.y === left.y}) < 0) {
          nextStates.push(left)
        }
      } else if (grid[st.x][st.y-1]==='.' && grid[st.x][st.y]==='.' && (grid[st.x][st.y+1]==='#' || grid[st.x][st.y+1]==='~') && grid[st.x-1][st.y]==='#' && grid[st.x+1][st.y]==='|') { // hit left, check if filled
        //X.X    X.X TODO: Pode ser # em cima. mas acho que não
        //#.| -> #||  check if level is filled
        //X#X    X#X or ~ on bottom
        grid[st.x][st.y] = '|'
        var fx = st.x
        while (grid[fx++][st.y] === '|') {}
        if (grid[--fx][st.y]==='#' && (grid[fx][st.y+1]==='#' || grid[fx][st.y+1]==='~')) { // fill level
          for (var wx = st.x; wx < fx; wx++) {
            grid[wx][st.y] = '~'
          }
          // find waterdrop for next state
          var waterdropX
          for (var wx = st.x; wx < fx; wx++) {
            if (grid[wx][st.y-1]==='|') {
              waterdropX = wx
              break
            }
          }
          var waterdropState = cloneState(st)
          waterdropState.x = waterdropX
          waterdropState.y = st.y-1
          if (nextStates.findIndex((s) => { return s.x === waterdropState.x && s.y === waterdropState.y}) < 0) {
            nextStates.push(waterdropState)
          }
        }
        // else let it spill
      } else if (grid[st.x][st.y]==='.' && (grid[st.x][st.y+1]==='#' || grid[st.x][st.y+1]==='~') && grid[st.x-1][st.y]==='|' && grid[st.x+1][st.y]==='.') { // flow right
        //XXX    XXX
        //|.. -> ||,
        //X#X    X#X or ~ on bottom
        grid[st.x][st.y] = '|'
        var right = cloneState(st)
        right.x++
        if (nextStates.findIndex((s) => { return s.x === right.x && s.y === right.y}) < 0) {
          nextStates.push(right)
        }
      } else if (grid[st.x][st.y-1]==='.' && grid[st.x][st.y]==='.' && (grid[st.x][st.y+1]==='#' || grid[st.x][st.y+1]==='~') && grid[st.x-1][st.y]==='|' && grid[st.x+1][st.y]==='#') { // hit right, check if filled
        //X.X    X.X TODO: Pode ser # em cima. mas acho que não
        //|.# -> ||#  check if level is filled
        //X#X    X#X or ~ on bottom
        grid[st.x][st.y] = '|'
        var fx = st.x
        while (grid[fx--][st.y] === '|') {}
        if (grid[++fx][st.y]==='#' && (grid[fx][st.y+1]==='#' || grid[fx][st.y+1]==='~')) { // fill level
          for (var wx = fx+1; wx <= st.x; wx++) {
            grid[wx][st.y] = '~'
          }
          // find waterdrop for next state
          var waterdropX
          for (var wx = fx+1; wx <= st.x; wx++) {
            if (grid[wx][st.y-1]==='|') {
              waterdropX = wx
              break
            }
          }
          var waterdropState = cloneState(st)
          waterdropState.x = waterdropX
          waterdropState.y = st.y-1
          if (nextStates.findIndex((s) => { return s.x === waterdropState.x && s.y === waterdropState.y}) < 0) {
            nextStates.push(waterdropState)
          }
        }
        // else let it spill
      } else if (grid[st.x][st.y-1]==='|' && grid[st.x][st.y]==='|' && grid[st.x][st.y+1]==='~' && grid[st.x-1][st.y]==='#' && grid[st.x+1][st.y]==='#') { // single unit overflow
        //X|X    X\X
        //#|# -> #~#
        //X~X    X~X
        grid[st.x][st.y] = '~'
        var top = cloneState(st)
        top.y--
        if (nextStates.findIndex((s) => { return s.x === top.x && s.y === top.y}) < 0) {
          nextStates.push(top)
        }
      } else if (grid[st.x][st.y-1]==='|' && grid[st.x][st.y]==='|' && grid[st.x][st.y+1]==='~') { // flow left and right
        //X|X    X|X
        //?|? -> \|\
        //X~X    X~X
        if (grid[st.x+1][st.y]==='.') {
          var right = cloneState(st)
          right.x++
          if (nextStates.findIndex((s) => { return s.x === right.x && s.y === right.y}) < 0) {
            nextStates.push(right)
          }
        }
        if (grid[st.x-1][st.y]==='.') {
          var left = cloneState(st)
          left.x--
          if (nextStates.findIndex((s) => { return s.x === left.x && s.y === left.y}) < 0) {
            nextStates.push(left)
          }
        }
      } else if (grid[st.x][st.y]==='.' && (grid[st.x-1][st.y]==='|' || grid[st.x+1][st.y]==='|')) { // fall again from left or right
        //XXX    XXX ^ XXX    XXX
        //|.X -> ||X ^ X.| -> X||
        //X.X    X,X ^ X.X    X,X
        grid[st.x][st.y] = '|'
        var bottom = cloneState(st)
        bottom.y++
        if (nextStates.findIndex((s) => { return s.x === bottom.x && s.y === bottom.y}) < 0) {
          nextStates.push(bottom)
        }
      } else if (grid[st.x][st.y-1]==='.' && grid[st.x][st.y]==='|' && grid[st.x][st.y+1]==='~') { // flow left and right
        //X.X    X.X
        //?|? -> \|\
        //X~X    X~X
        if (grid[st.x+1][st.y]==='.') {
          var right = cloneState(st)
          right.x++
          if (nextStates.findIndex((s) => { return s.x === right.x && s.y === right.y}) < 0) {
            nextStates.push(right)
          }
        }
        if (grid[st.x-1][st.y]==='.') {
          var left = cloneState(st)
          left.x--
          if (nextStates.findIndex((s) => { return s.x === left.x && s.y === left.y}) < 0) {
            nextStates.push(left)
          }
        }
      } else {
        // drop state
      }
      // if (nextStates.length===0) {
      //   console.log(st.x,st.y,'\n'+
      //     grid[st.x-1][st.y-1]+grid[st.x-1][st.y+0]+grid[st.x-1][st.y+1]+'\n'+
      //     grid[st.x-0][st.y-1]+grid[st.x-0][st.y+0]+grid[st.x-0][st.y+1]+'\n'+
      //     grid[st.x+1][st.y-1]+grid[st.x+1][st.y+0]+grid[st.x+1][st.y+1])
      // }
    }
    // printGrid(grid,minX,maxX,minY,maxY)
    // countTiles(grid,minX,maxX,minY,maxY-1)

    var tiles = grid.reduce((accx, valx) => {
      return accx + valx.reduce((accy, valy) => {
        return accy + ((valy==='|' || valy==='~') ? 1 : 0)
      }, 0)
    }, 0)
    // for part 2
    waters[i] = grid.reduce((accx, valx) => {
      return accx + valx.reduce((accy, valy) => {
        return accy + (valy==='~' ? 1 : 0)
      }, 0)
    }, 0)

    if (!timeout) {
      console.log('timeout!')
    }

    // 38424 too low
    // 38451 correct. why?
    // 38453 too high

    $('#day17').append(input[i])
      .append('<br>&emsp;')
      .append(tiles)
      .append('<br>')
  }
}


var cloneState = function(state) {
  var newState = {
    'x': state.x,
    'y': state.y
  }
  return newState
}

var printGrid = function(grid, x0, xn, y0, yn) {
  var outString = ''
  for (var i = x0; i <= xn; i++) {
    for (var j = y0; j <= yn; j++) {
      outString += grid[i][j]
    }
    outString += '\n'
  }
  console.log(outString)
}

var countTiles = function(grid, x0, xn, y0, yn) {
  var counter = 0
  for (var i = x0; i <= xn; i++) {
    for (var j = y0; j <= yn; j++) {
      counter += ((grid[i][j]==='|' || grid[i][j]==='~') ? 1 : 0)
    }
  }
  console.log(counter)
}


var day17Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(waters[i])
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day17"><h2>day #17</h2></div>')
  day17()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day17Part2()
  $('#main').append('<br>')
})
