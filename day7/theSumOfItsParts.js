var input = [
`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`,
 puzzleInput
]

var day7 = function() {

  for (var i = 0; i < input.length; i++) {
    var stepList = input[i].split(/\n/)
    var steps = {}
    $.each(stepList, (idx, val) => {
      var words = val.split(/\s+/)
      var letter = words[7]
      var prereq = words[1]
      if (steps[letter] === undefined) {
        steps[letter] = {
          'prev' : [prereq],
          'next' : []
        }
      } else {
        steps[letter].prev.push(prereq)
        steps[letter].prev.sort()
      }
      if (steps[prereq] === undefined) {
        steps[prereq] = {
          'prev' : [],
          'next' : [letter]
        }
      } else {
        steps[prereq].next.push(letter)
        steps[prereq].next.sort()
      }
    })
    // console.log(steps)
    var stepsLeft = Object.keys(steps).sort()
    var stepOrder = ''
    while (stepsLeft.length > 0) {
      var nextStep = stepsLeft.find((s) => {
        return steps[s].prev.length === 0
      })
      // console.log(nextStep)
      stepsLeft = removeFromArray(stepsLeft, nextStep)
      stepOrder += nextStep
      $.each(stepsLeft, (idx, s) => {
        if (steps[s].prev.includes(nextStep)) {
          steps[s].prev = removeFromArray(steps[s].prev, nextStep)
        }
      })
    }

    $('#day7').append(input[i])
      .append('<br>&emsp;')
      .append(stepOrder)
      .append('<br>')
  }
}

var removeFromArray = function (array, value) {
  return array.filter((x) => {
    return x !== value
  })
}

var letterValue = function(letter) {
  return letter.charCodeAt(0) - 64;
}

var day7Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var stepList = input[i].split(/\n/)
    var stepDuration = i===0?0:60
    var numWorkers = i===0?2:5
    var steps = {}
    $.each(stepList, (idx, val) => {
      var words = val.split(/\s+/)
      var letter = words[7]
      var prereq = words[1]
      if (steps[letter] === undefined) {
        steps[letter] = {
          'prev' : [prereq],
          'next' : [],
          'duration' : (stepDuration + letterValue(letter))
        }
      } else {
        steps[letter].prev.push(prereq)
        steps[letter].prev.sort()
      }
      if (steps[prereq] === undefined) {
        steps[prereq] = {
          'prev' : [],
          'next' : [letter],
          'duration' : (stepDuration + letterValue(prereq))
        }
      } else {
        steps[prereq].next.push(letter)
        steps[prereq].next.sort()
      }
    })
    // console.log(steps)

    var time = 0
    var workers = []
    for (var w = 0; w < numWorkers; w++) {
      workers[w] =  {
        idx : w,
        job : '.',
        timeLeft: 0
      }
    }
    var stepsLeft = Object.keys(steps).sort()
    var stepOrder = ''
    var stepsSize = stepsLeft.length
    while (stepOrder.length < stepsSize) {
      time++
      // free workers ?
      var freeWorkers = workers.filter((w) => {
        return w.job === '.'
      })
      if (freeWorkers.length > 0) {
        //assign work
        var nextSteps = stepsLeft.filter((s) => {
          return steps[s].prev.length === 0
        })
        // if there is work
        if (nextSteps.length > 0) {
          $.each(freeWorkers, (idx, val) => {
            var ns = nextSteps.shift()
            stepsLeft = removeFromArray(stepsLeft, ns)
            workers[val.idx].job = ns
            workers[val.idx].timeLeft = steps[ns].duration
            if (nextSteps.length <= 0) {
              return false
            }
          })
        }
      }

      // work work
      $.each(workers, (idx, w) => {
        if (w.job === '.') {
          return true
        }
        w.timeLeft--
        // work finished?
        if (w.timeLeft === 0) {
          $.each(stepsLeft, (idx, s) => {
            if (steps[s].prev.includes(w.job)) {
              steps[s].prev = removeFromArray(steps[s].prev, w.job)
            }
          })
          stepOrder += w.job
          w.job = '.'
        }
      })
      // console.log(workers)
      // break
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(time)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day7"><h2>day #7</h2></div>')
  day7()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day7Part2()
  $('#main').append('<br>')
})
