var input = [
`.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`,
 puzzleInput
]


var day18 = function() {

  for (var i = 0; i < input.length; i++) {
    var gridSize = i===0?10:50
    var grid = []
    var lines = input[i].split(/\n+/)
    $.each(lines, (idx, line) => {
      grid[idx] = line.split('')
    })
    // console.log(grid)
    // printGrid2(grid,0,gridSize,0,gridSize)

    var minutes = 10
    while (minutes--) {
      var newgrid = []
      for (var x = 0; x < grid.length; x++) {
        newgrid[x] = []
        for (var y = 0; y < grid[x].length; y++) {
          // if '.' and 3+ adjacent '|' then '|' else '.'
          if (grid[x][y] === '.') {
            var treeCount = 0
            if (grid[x-1]) { // left
              if (grid[x-1][y-1] && grid[x-1][y-1] === '|') { treeCount++ } // top left
              if (grid[x-1][y+0] && grid[x-1][y+0] === '|') { treeCount++ } // left
              if (grid[x-1][y+1] && grid[x-1][y+1] === '|') { treeCount++ } // bot left
            }
            if (grid[x+1]) { // right
              if (grid[x+1][y-1] && grid[x+1][y-1] === '|') { treeCount++ } // top right
              if (grid[x+1][y+0] && grid[x+1][y+0] === '|') { treeCount++ } // right
              if (grid[x+1][y+1] && grid[x+1][y+1] === '|') { treeCount++ } // bot right
            }
            if (grid[x][y-1] && grid[x][y-1] === '|') { treeCount++ } // top
            if (grid[x][y+1] && grid[x][y+1] === '|') { treeCount++ } // bot
            if (treeCount >= 3) {
              newgrid[x][y] = '|'
            } else {
              newgrid[x][y] = '.'
            }
          } else if (grid[x][y] === '|') {
          // if '|' and 3+ adjacent '#' then '#' else '|'
            var lumberCount = 0
            if (grid[x-1]) { // left
              if (grid[x-1][y-1] && grid[x-1][y-1] === '#') { lumberCount++ } // top left
              if (grid[x-1][y+0] && grid[x-1][y+0] === '#') { lumberCount++ } // left
              if (grid[x-1][y+1] && grid[x-1][y+1] === '#') { lumberCount++ } // bot left
            }
            if (grid[x+1]) { // right
              if (grid[x+1][y-1] && grid[x+1][y-1] === '#') { lumberCount++ } // top right
              if (grid[x+1][y+0] && grid[x+1][y+0] === '#') { lumberCount++ } // right
              if (grid[x+1][y+1] && grid[x+1][y+1] === '#') { lumberCount++ } // bot right
            }
            if (grid[x][y-1] && grid[x][y-1] === '#') { lumberCount++ } // top
            if (grid[x][y+1] && grid[x][y+1] === '#') { lumberCount++ } // bot
            if (lumberCount >= 3) {
              newgrid[x][y] = '#'
            } else {
              newgrid[x][y] = '|'
            }
          } else {
          // if '#' and 1+ adjacent '#' and 1+ adjacent '|' then '#' else '.'
            var lumberCount = 0
            var treeCount = 0
            if (grid[x-1]) { // left
              if (grid[x-1][y-1] && grid[x-1][y-1] === '|') { treeCount++ } // top left
              if (grid[x-1][y-1] && grid[x-1][y-1] === '#') { lumberCount++ } // top left
              if (grid[x-1][y+0] && grid[x-1][y+0] === '|') { treeCount++ } // left
              if (grid[x-1][y+0] && grid[x-1][y+0] === '#') { lumberCount++ } // left
              if (grid[x-1][y+1] && grid[x-1][y+1] === '|') { treeCount++ } // bot left
              if (grid[x-1][y+1] && grid[x-1][y+1] === '#') { lumberCount++ } // bot left
            }
            if (grid[x+1]) { // right
              if (grid[x+1][y-1] && grid[x+1][y-1] === '|') { treeCount++ } // top right
              if (grid[x+1][y-1] && grid[x+1][y-1] === '#') { lumberCount++ } // top right
              if (grid[x+1][y+0] && grid[x+1][y+0] === '|') { treeCount++ } // right
              if (grid[x+1][y+0] && grid[x+1][y+0] === '#') { lumberCount++ } // right
              if (grid[x+1][y+1] && grid[x+1][y+1] === '|') { treeCount++ } // bot right
              if (grid[x+1][y+1] && grid[x+1][y+1] === '#') { lumberCount++ } // bot right
            }
            if (grid[x][y-1] && grid[x][y-1] === '|') { treeCount++ } // top
            if (grid[x][y-1] && grid[x][y-1] === '#') { lumberCount++ } // top
            if (grid[x][y+1] && grid[x][y+1] === '|') { treeCount++ } // bot
            if (grid[x][y+1] && grid[x][y+1] === '#') { lumberCount++ } // bot
            if (lumberCount >= 1 && treeCount >= 1) {
              newgrid[x][y] = '#'
            } else {
              newgrid[x][y] = '.'
            }
          }
          // end cell
        }
      }
      // end grid
      grid = copyGrid(newgrid)
    }
    // printGrid2(grid,0,gridSize,0,gridSize)

    var trees = grid.reduce((accx, valx) => {
      return accx + valx.reduce((accy, valy) => {
        return accy + (valy==='|' ? 1 : 0)
      }, 0)
    }, 0)
    var lumberyards = grid.reduce((accx, valx) => {
      return accx + valx.reduce((accy, valy) => {
        return accy + (valy==='#' ? 1 : 0)
      }, 0)
    }, 0)
    var result = trees * lumberyards

    $('#day18').append(input[i])
      .append('<br>&emsp;')
      .append(result)
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

var copyGrid = function(original) {
  var copy = []
  $.each(original, (idx, line) => {
    copy[idx] = line.slice()
  })
  return copy
}

var day18Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day18"><h2>day #18</h2></div>')
  day18()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day18Part2()
  $('#main').append('<br>')
})
