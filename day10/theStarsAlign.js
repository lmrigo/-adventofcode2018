var input = [
`position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`,
 puzzleInput
]


var day10 = function() {

  for (var i = 0; i < input.length; i++) {
    var entries = input[i].split(/\n+/)
    var stars = []
    var minX = 0
    var minY = 0
    var maxX = 0
    var maxY = 0
    $.each(entries, (idx, entry) => {
      var pos = entry.substring(entry.indexOf('<')+1, entry.indexOf('>')).split(', ')
      var vel = entry.substring(entry.lastIndexOf('<')+1, entry.lastIndexOf('>')).split(', ')
      var star = {
        posx: Number(pos[0]),
        posy: Number(pos[1]),
        velx: Number(vel[0]),
        vely: Number(vel[1])
      }
      if (star.posx < minX) { minX = star.posx -1 }
      if (star.posy < minY) { minY = star.posy -1 }
      if (star.posx > maxX) { maxX = star.posx +1 }
      if (star.posy > maxY) { maxY = star.posy +1 }
      stars.push(star)
      // console.log(star)
    })
    // console.log(minX,minY,maxX,maxY)

    // iterate until all stars fit in X blocks height (height of a letter)
    var blocksize = i===0 ? 8 : 10

    var limit = 100000
    var t = 0
    while (t++ < limit) {
      var curMinY = maxY
      var curMaxY = minY
      $.each(stars, (idx, s) => {
        s.posx += s.velx
        s.posy += s.vely
        if (s.posy < curMinY) { curMinY = s.posy }
        if (s.posy > curMaxY) { curMaxY = s.posy }
      })
      // console.log(curMinY,curMaxY)
      if (curMaxY - curMinY <= blocksize) {
        // console.log('stars aligned')
        break
      }
    }
    // console.log(stars)

    // update minvalues to print grid
    minX = 10000
    minY = 10000
    maxX = 0
    maxY = 0
    $.each(stars, (idx, star) => {
      if (star.posx < minX) { minX = star.posx -1 }
      if (star.posy < minY) { minY = star.posy -1 }
      if (star.posx > maxX) { maxX = star.posx +1 }
      if (star.posy > maxY) { maxY = star.posy +1 }
    })
    // console.log(minX,minY,maxX,maxY)


    var grid = []
    for (var x = minX; x < maxX; x++) {
      if (grid[x] === undefined) {
        grid[x] = []
      }
      for (var y = minY; y < maxY; y++) {
        grid[x][y] = '_'
      }
    }
    $.each(stars, (idx, s) => {
      if (grid[s.posx] === undefined) {
        grid[s.posx] = []
      }
      grid[s.posx][s.posy] = '#'
    })
    // console.log(printGrid(grid,minX,minY,maxX,maxY))
    //ECKXJLJF

    $('#day10').append(input[i])
      .append('<br>&emsp;')
      .append(printGrid(grid,minX,minY,maxX,maxY).replace(/\n/g,'<br>'))
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


var day10Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var entries = input[i].split(/\n+/)
    var stars = []
    var minX = 0
    var minY = 0
    var maxX = 0
    var maxY = 0
    $.each(entries, (idx, entry) => {
      var pos = entry.substring(entry.indexOf('<')+1, entry.indexOf('>')).split(', ')
      var vel = entry.substring(entry.lastIndexOf('<')+1, entry.lastIndexOf('>')).split(', ')
      var star = {
        posx: Number(pos[0]),
        posy: Number(pos[1]),
        velx: Number(vel[0]),
        vely: Number(vel[1])
      }
      if (star.posx < minX) { minX = star.posx -1 }
      if (star.posy < minY) { minY = star.posy -1 }
      if (star.posx > maxX) { maxX = star.posx +1 }
      if (star.posy > maxY) { maxY = star.posy +1 }
      stars.push(star)
    })

    // iterate until all stars fit in X blocks height (height of a letter)
    var blocksize = i===0 ? 8 : 10

    var limit = 100000
    var t = 0
    while (t++ < limit) {
      var curMinY = maxY
      var curMaxY = minY
      $.each(stars, (idx, s) => {
        s.posx += s.velx
        s.posy += s.vely
        if (s.posy < curMinY) { curMinY = s.posy }
        if (s.posy > curMaxY) { curMaxY = s.posy }
      })
      if (curMaxY - curMinY <= blocksize) {
        // stars aligned
        // time elapsed on t
        break
      }
    }
    var timeElapsed = t

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(timeElapsed)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day10"><h2>day #10</h2></div>')
  day10()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day10Part2()
  $('#main').append('<br>')
})
