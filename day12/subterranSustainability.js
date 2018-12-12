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
    // console.log(stateString(state,minIdx,maxIdx),minIdx,maxIdx)

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

  for (var i = 1; i < input.length; i++) {
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
    var rules = {}
    for (var r = 1; r < rawIn.length; r++) {
      var entry = rawIn[r].split(/\s+/)
      rules[entry[0]] = entry[2]
    }
    // console.log(rules)

    // var generations = 50000000000 // target
    // var generations = 134 // starting from here it stays the same but walks right
    var generations = 134
    while (generations--) {
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

      // update minmax indexes
      var initial = state[minIdx] + state[minIdx+1] + state[minIdx+2] + state[minIdx+3] + state[minIdx+4]
      if (initial.includes('#')) {
        minIdx -= 5
      } else {
        // find the new minIdx
        for (var m = minIdx; m < maxIdx; m++) {
          var current = state[m] + state[m+1] + state[m+2] + state[m+3] + state[m+4]
          if (current.includes('#')) {
            minIdx = m-1
            break
          }
        }
      }
      var final = state[maxIdx-5] + state[maxIdx-4] + state[maxIdx-3] + state[maxIdx-2] + state[maxIdx-1]
      if (final.includes('#')) {
        maxIdx += 5
      } else {
        // find the new maxIdx
        for (var m = maxIdx; m > minIdx; m--) {
          var current = state[m-5] + state[m-4] + state[m-3] + state[m-2] + state[m-1]
          if (current.includes('#')) {
            maxIdx = m+1
            break
          }
        }
      }
    }
    // console.log(stateString(state,minIdx,maxIdx),minIdx,maxIdx)

    var first = stateString(state,minIdx,maxIdx).indexOf('#')
    var last = stateString(state,minIdx,maxIdx).lastIndexOf('#')
    // console.log(first,last) // 5, 191
    // there's always 186 indexes from the first to the last

    // sum all plants indexes
    var idxs = []
    for (var idx = minIdx; idx < maxIdx; idx++) {
      if (state[idx] === '#') {
        idxs.push(idx)
      }
    }
    // console.log(idxs)
    var sum = idxs.reduce((acc,val) => {
      return acc + val
    })
    //134 generations sum = 11873
    //each generation walks 1 step
    var fiftyBillion = 50000000000
    var fiftyBillionGenIdxs = $.map(idxs, (val) => {
      return val + fiftyBillion - 134
    })
    var fiftyBlillionGenSum = fiftyBillionGenIdxs.reduce((acc,val) => {
      return acc + val
    })


    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(fiftyBlillionGenSum)
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
