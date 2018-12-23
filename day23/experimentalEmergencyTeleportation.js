var input = [
`pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`,
 puzzleInput
]


var day23 = function() {

  for (var i = 0; i < input.length; i++) {
    var nanobotStrs = input[i].split(/\n+/)
    var nanobots = []
    $.each(nanobotStrs, (idx, val) => {
      var nums = val.split(/\<|,|\>|=/) // (8) ["pos", "", "1", "3", "1", "", " r", "1"]
      nanobots.push({
        x: Number(nums[2]),
        y: Number(nums[3]),
        z: Number(nums[4]),
        r: Number(nums[7])
      })
    })
    var bigBot = nanobots.reduce((acc, val) => {
      return acc.r > val.r ? acc : val
    })

    var inRange = nanobots.reduce((acc, val) => {
      var valDist = Math.abs(val.x - bigBot.x) + Math.abs(val.y - bigBot.y) + Math.abs(val.z - bigBot.z)
      return acc + (valDist <= bigBot.r ? 1 : 0)
    }, 0)

    $('#day23').append(input[i])
      .append('<br>&emsp;')
      .append(inRange)
      .append('<br>')
  }
}

var day23Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day23"><h2>day #23</h2></div>')
  day23()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day23Part2()
  $('#main').append('<br>')
})
