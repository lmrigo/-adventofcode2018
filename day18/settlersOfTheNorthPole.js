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

  for (var i = 1; i < input.length; i++) {
    var gridSize = 50
    var grid = []
    var lines = input[i].split(/\n+/)
    $.each(lines, (idx, line) => {
      grid[idx] = line.split('')
    })
    // console.log(grid)
    // printGrid2(grid,0,gridSize,0,gridSize)

    // using the 1 million input, it's already in a cycle
    var minutes = 0 //1*1000*1000 //1000000000
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
      // printGrid2(grid,0,gridSize,0,gridSize)
      // var t = grid.reduce((accx, valx) => {
      //   return accx + valx.reduce((accy, valy) => {
      //     return accy + (valy==='|' ? 1 : 0)
      //   }, 0)
      // }, 0)
      // var l = grid.reduce((accx, valx) => {
      //   return accx + valx.reduce((accy, valy) => {
      //     return accy + (valy==='#' ? 1 : 0)
      //   }, 0)
      // }, 0)
      // console.log(t,l)
      // cycle found
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
    // var result = trees * lumberyards

    // this cycle was indentified starting from 1*1000*1000 (1 million)
    var cycle = [[539,324],[547,322],[553,325],[563,319],[569,327],[579,330],[588,339],[594,344],[591,356],[592,357],[584,367],[573,368],[558,380],[551,368],[546,359],[549,342],[546,343],[548,318],[544,324],[542,323],[537,329],[535,327],[528,335],[527,326],[525,325],[528,320],[530,325],[536,319]];
    var resultIdx = 0
    for (var c = 1*1000*1000; c < 1000000000; c++) {
      resultIdx = (resultIdx+1)%cycle.length
    }
    // console.log(cycle[resultIdx])
    var result = cycle[resultIdx][0] * cycle[resultIdx][1]

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
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
