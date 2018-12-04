var input = [
`[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`,
  puzzleInput
]

var day4 = function() {

  for (var i = 0; i < input.length; i++) {
    var logs = input[i].split(/\n/)
    var guards = {}
    var days = {}

    for (var l = 0; l < logs.length; l++) {
      var lin = logs[l].split(/\s+/)
      var date = lin[0].substr(1)
      var time = lin[1].substr(0, lin[1].length-1)
      if (time.startsWith('23:')) { // normalize dates
        var aux = new Date(date)
        aux.setDate(aux.getDate() + 1)
        date = aux.toISOString().substr(0,10)
        time = '00:-1' // avoid conflict with actions on 00:00
      }
      time = time.substr(3)
      if (lin[2] === 'Guard') {
        var gNum = lin[3]
        if (guards[gNum] === undefined) {
          guards[gNum] = {}
        }
        if (guards[gNum][date] === undefined) {
          guards[gNum][date] = {}
        }
        guards[gNum][date][time] = 'begin'
      } else {
        var action = (lin[2] === 'falls') ? 'sleep' : 'wakeup'
        if (days[date] === undefined) {
          days[date] = {}
        }
        days[date][time] = action
      }
    }

    //assign days to guards
    $.each(Object.keys(days), (didx, day) => {
      var gNum = Object.keys(guards).find((g) => {
        return guards[g][day] !== undefined
      })
      $.each(Object.keys(days[day]), (tidx, time) => {
        guards[gNum][day][time] = days[day][time]
      })
    })
    //console.log(guards)
    // console.log(days)

    //calc sleeping time
    $.each(guards, (gidx, guard) => {
      guard.sleepTime = 0
      $.each(Object.keys(guard), (didx, day) => {
        if (day === 'sleepTime') { return true }
        var timestamps = Object.keys(guard[day]).sort()
        var curSleepTime = 0
        // first should always be "begin"
        for (var t = 1; t < timestamps.length; t=t+2) {
          curSleepTime += Number(timestamps[t+1]) - Number(timestamps[t])
        }
        guard.sleepTime += curSleepTime
      })
    })
    // console.log(guards)

    // find the one that sleeps the most
    var sonecaId = Object.keys(guards).reduce((acc, val) => {
      return (guards[acc].sleepTime > guards[val].sleepTime) ? acc : val
    })
    // console.log(sonecaId)
    var soneca = guards[sonecaId]

    // find the minute most spent sleeping
    var minutes = []
    for (var m = 0; m < 60; m++) {
      minutes[m] = 0
    }
    $.each(Object.keys(soneca), (didx, day) => {
      if (day === 'sleepTime') { return true }
      var timestamps = Object.keys(soneca[day]).sort()
      // first should always be "begin"
      for (var t = 1; t < timestamps.length; t=t+2) {
        for (var m = Number(timestamps[t]); m < Number(timestamps[t+1]); m++) {
          minutes[m]++
        }
      }
    })
    // console.log(minutes)
    var sleepMinute = minutes.reduce((acc, val, idx) => {
      return (minutes[acc] > val) ? acc : idx
    }, 0)
    // console.log(sleepMinute)

    var result = Number(sonecaId.substr(1)) * sleepMinute

    // console.log(result)
    $('#day4').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var day4Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    // console.log()
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day4"><h2>day #4</h2></div>')
  day4()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day4Part2()
  $('#main').append('<br>')
})
