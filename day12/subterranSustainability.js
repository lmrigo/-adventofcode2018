var input = [
`initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`,
 puzzleInput
]


var day12 = function() {

  for (var i = 0; i < input.length; i++) {
    var rawIn = input[i].split(/\n+/)
    var stateStr = rawIn[0].substr(rawIn[0].indexOf(':')+2)
    var state = stateStr.split('')
    var maxIdx = state.length + 5
    for (var s = state.length; s < maxIdx; s++) {
      state[s] = '.'
    }
    for (var s = -1; s >= -5; s--) {
      state[s] = '.'
    }
    var minIdx = -5
    // console.log(state)
    var rules = {}
    for (var r = 1; r < rawIn.length; r++) {
      var entry = rawIn[r].split(/\s+/)
      rules[entry[0]] = entry[2]
    }
    // console.log(rules)

    var generations = 20
    while (generations--) {
      // console.log(stateString(state,minIdx,maxIdx))
      var newState = copyState(state,minIdx,maxIdx)
      for (var s = minIdx+2; s < maxIdx-2; s++) {
        var current = state[s-2] + state[s-1] + state[s] + state[s+1] + state[s+2]
        if (rules[current] !== undefined) {
          newState[s] = rules[current]
        } else {
          newState[s] = '.'
        }
      }
      state = newState
      // console.log((20-generations), stateString(state,minIdx,maxIdx))
      for (var m = minIdx; m < minIdx+5; m++) {
        if (state[m] === '#') {
          minIdx -= 5
          break
        }
      }
      for (var m = maxIdx-5; m < maxIdx; m++) {
        if (state[m] === '#') {
          maxIdx += 5
          break
        }
      }
    }

    // sum all plants indexes
    var idxs = []
    for (var idx = minIdx; idx < maxIdx; idx++) {
      if (state[idx] === '#') {
        idxs.push(idx)
      }
    }
    var sum = idxs.reduce((acc,val) => {
      return acc + val
    })

    $('#day12').append(input[i])
      .append('<br>&emsp;')
      .append(sum)
      .append('<br>')
  }
}

var stateString = function(state, minIdx, maxIdx) {
  var str = ''
  for (var i = minIdx; i < maxIdx; i++) {
    str += state[i]
  }
  return str
}

var copyState = function(state, minIdx, maxIdx) {
  var copy = []
  for (var i = minIdx; i < maxIdx; i++) {
    copy[i] = (state[i] === undefined) ? '.' : state[i]
  }
  return copy
}

var day12Part2 = function () {

  for (var i = 6; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day12"><h2>day #12</h2></div>')
  day12()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day12Part2()
  $('#main').append('<br>')
})
