var input = [
`0,0,0,0
 3,0,0,0
 0,3,0,0
 0,0,3,0
 0,0,0,3
 0,0,0,6
 9,0,0,0
12,0,0,0`, // 2
`-1,2,2,0
0,0,2,-2
0,0,0,-2
-1,2,0,0
-2,-2,-2,2
3,0,2,-1
-1,3,2,2
-1,0,-1,0
0,2,1,-2
3,0,0,0`, // 4
`1,-1,0,1
2,0,-1,0
3,2,-1,0
0,0,3,1
0,0,-1,-1
2,3,-2,0
-2,2,0,0
2,-2,0,-1
1,-1,0,-1
3,2,0,2`, // 3
`1,-1,-1,-2
-2,-2,0,1
0,2,1,3
-2,3,-2,1
0,2,3,-2
-1,-1,1,-2
0,-2,-1,0
-2,2,3,-1
1,2,2,0
-1,-2,0,-2`, // 8
 puzzleInput
]

var day25 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputStrs = input[i].split(/\n+/)
    var points = []
    $.each(inputStrs,(idx,val)=>{
      var rawNums = val.split(',')
      var p = {
        x: Number(rawNums[0]),
        y: Number(rawNums[1]),
        z: Number(rawNums[2]),
        w: Number(rawNums[3])
      }
      points.push(p)
    })
    var constellations = []

    //Two points are in the same constellation if their manhattan distance apart is no more than 3 or if they can form a chain of points, each a manhattan distance no more than 3 from the last, between the two of them.
    // test all points
    for (var pi = 0; pi < points.length; pi++) {
      var pa = points[pi]
      var cons
      var matched = false
      // first against constellations
      for (var c = 0; c < constellations.length; c++) {
        var cons = constellations[c]
        $.each(cons,(pidx,pc) => {
          if (manhattan(pa,pc)<=3) {
            matched = true
            return false
          }
        })
        if (matched) {
          if (!constellations[c].includes(pa)) {
            constellations[c].push(pa)
          }
          break
        }
      }
      if (!matched) {
        cons = [pa] // if it doesn't belong already to a constellation, create a new one
      }
      // then test against other points and add to the constellation
      for (var pj = 0; pj < points.length; pj++) {
        var pb = points[pj]
        if (manhattan(pa,pb)<=3) {
          if (pi===pj) { // skip the same point
            continue
          } else {
            cons.push(pb)
          }
        }
      }
      if (!matched) {
        // if there was no match, add the new constellation
        constellations.push(cons)
      }
    }
    // console.log(constellations)

    var prevLength = -1
    while (prevLength !== constellations.length) {
      prevLength = constellations.length
      var constsToJoin = []
      var found = false
      // join constellations
      for (var ci = 0; ci < constellations.length; ci++) {
        var ca = constellations[ci]
        for (var cj = ci+1; cj < constellations.length; cj++) {
          var cb = constellations[cj]
          for (var pi = 0; pi < ca.length; pi++) {
            var pa = ca[pi]
            for (var pj = 0; pj < cb.length; pj++) {
              var pb = cb[pj]
              var man = manhattan(pa,pb)
              if (man<=3 && man !== 0) {
                constsToJoin = [ci,cj]
                found = true
                break
              }
              if (found) {break}
            }
            if (found) {break}
          }
          if (found) {break}
        }
        if (found) {break}
      }
      if (found) {
          var ca = constellations[constsToJoin[0]]
          var cb = constellations[constsToJoin[1]]
          ca.push(...cb)
          constellations.splice(constsToJoin[1],1)
      }
    }

    // console.log(constellations)
    var constellationCount = constellations.length
    // 357 too low
    // 370 CORRECT!
    // 548 too high
    // 594 too high

    $('#day25').append(input[i])
      .append('<br>&emsp;')
      .append(constellationCount)
      .append('<br>')
  }
}

var manhattan = function(pa,pb) {
  return Math.abs(pa.x-pb.x) + Math.abs(pa.y-pb.y) + Math.abs(pa.z-pb.z) + Math.abs(pa.w-pb.w)
}

var day25Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day25"><h2>day #25</h2></div>')
  day25()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day25Part2()
  $('#main').append('<br>')
})
