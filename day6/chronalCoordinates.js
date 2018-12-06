var input = [
`1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,
 puzzleInput
]

var day6 = function() {

  for (var i = 0; i < input.length; i++) {
    var coordList = input[i].split(/\n/)
    var grid  = []

    var coords = $.map(coordList, (x) => {
      var two = x.split(', ')
      return {
        x: Number(two[0]),
        y: Number(two[1]),
        count: 0
      }
    })
    // console.log(coords)
    var minX = coords.reduce((acc, val) => {
      return val.x < acc ? val.x : acc
    }, 1000)
    var maxX = coords.reduce((acc, val) => {
      return val.x > acc ? val.x : acc
    }, -1)
    var minY = coords.reduce((acc, val) => {
      return val.y < acc ? val.y : acc
    }, 1000)
    var maxY = coords.reduce((acc, val) => {
      return val.y > acc ? val.y : acc
    }, -1)
    // console.log(minX,maxX,minY,maxY)
    for (var x = 0; x < maxX+1; x++) {
      grid[x] = []
      for (var y = 0; y < maxY+1; y++) {
        grid[x][y] = '.'
      }
    }

    $.each(coords, (idx, c) => {
      grid[c.x][c.y] = idx
    })
    // printGrid(grid)

    for (var gi = 0; gi < grid.length; gi++) {
      for (var gj = 0; gj < grid[gi].length; gj++) {
        // find closest neighbour
        var dists = $.map(coords, (c, idx) => {
          return {
            elem: idx,
            dist: Math.abs(gi-c.x) + Math.abs(gj-c.y)
          }
        })
        var closest = dists.reduce((acc, val) => {
          return val.dist < acc.dist ? val : acc
        })
        var closestArray = dists.filter((x) => {
          return x.dist === closest.dist
        })
        if (closestArray.length > 1) {
          grid[gi][gj] = '#'
        } else {
          grid[gi][gj] = closest.elem
        }
      }
    }
    // printGrid(grid)

    var infiniteElements = []
    for (var gi = 0; gi < grid.length; gi++) {
      var e = grid[gi][0]
      if (e != '#' && !infiniteElements.includes(e)) {
        infiniteElements.push(e)
      }
      e = grid[gi][maxY]
      if (e != '#' && !infiniteElements.includes(e)) {
        infiniteElements.push(e)
      }
    }
    for (var gj = 0; gj < grid.length; gj++) {
      var e = grid[0][gj]
      if (e != '#' && !infiniteElements.includes(e)) {
        infiniteElements.push(e)
      }
      e = grid[maxX][gj]
      if (e != '#' && !infiniteElements.includes(e)) {
        infiniteElements.push(e)
      }
    }
    // console.log(infiniteElements)

    for (var gi = 0; gi < grid.length; gi++) {
      for (var gj = 0; gj < grid[gi].length; gj++) {
        if (infiniteElements.includes(grid[gi][gj])) {
          grid[gi][gj] = '#'
        } else if (grid[gi][gj] !== '#') {
          coords[grid[gi][gj]].count++
        }
      }
    }
    // printGrid(grid)
    // console.log(coords)

    // non infinite largest area
    var largestArea =  coords.reduce((acc, val) => {
      return val.count > acc ? val.count : acc
    }, 0)

    $('#day6').append(input[i])
      .append('<br>&emsp;')
      .append(largestArea)
      .append('<br>')
  }
}

var printGrid = function(grid, minX, minY) {
  var minI = minX ? minX : 0
  var minJ = minY ? minY : 0
  var outString = ''
  for (var i = minI; i < grid.length; i++) {
    for (var j = minJ; j < grid[i].length; j++) {
      outString += grid[i][j]
    }
    outString += '\n'
  }

  console.log(outString)
}


var day6Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var coordList = input[i].split(/\n/)
    var limit = i === 0 ? 32 : 10000
    var grid  = []

    var coords = $.map(coordList, (x) => {
      var two = x.split(', ')
      return {
        x: Number(two[0]),
        y: Number(two[1])
      }
    })
    // console.log(coords)
    var minX = coords.reduce((acc, val) => {
      return val.x < acc ? val.x : acc
    }, 1000)
    var maxX = coords.reduce((acc, val) => {
      return val.x > acc ? val.x : acc
    }, -1)
    var minY = coords.reduce((acc, val) => {
      return val.y < acc ? val.y : acc
    }, 1000) - 100
    var maxY = coords.reduce((acc, val) => {
      return val.y > acc ? val.y : acc
    }, -1) + 100
    // console.log(minX,maxX,minY,maxY)
    for (var x = minX; x < maxX+1; x++) {
      grid[x] = []
      for (var y = minY; y < maxY+1; y++) {
        grid[x][y] = 0
      }
    }
    // printGrid(grid)

    for (var gi = minX; gi < grid.length; gi++) {
      for (var gj = minY; gj < grid[gi].length; gj++) {
        // calc distance to every coord
        var dists = $.map(coords, (c, idx) => {
          return {
            elem: idx,
            dist: Math.abs(gi-c.x) + Math.abs(gj-c.y)
          }
        })
        $.each(dists, (idx, d) => {
          grid[gi][gj] += d.dist
        })
      }
    }
    // printGrid(grid)

    // paint grid with distances less than limit
    for (var gi = minX; gi < grid.length; gi++) {
      for (var gj = minY; gj < grid[gi].length; gj++) {
        grid[gi][gj] = (grid[gi][gj] < limit) ? '#' : '.'
      }
    }
    // printGrid(grid, minX, minY)
    // console.log(coords)

    // non infinite largest area
    var regionArea =  grid.reduce((acci, gi) => {
      return acci + gi.reduce((accj, gj) => {
        return accj + (gj === '#' ? 1 : 0)
      }, 0)
    }, 0)

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(regionArea)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day6"><h2>day #6</h2></div>')
  day6()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day6Part2()
  $('#main').append('<br>')
})
