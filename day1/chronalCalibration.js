var input = [
  `+1
  -2
  +3
  +1`,
  // `+68756
  // -137857
  // +69101
  // +1`,
  `+1
  -1`,
  `+3
  +3
  +4
  -2
  -4`,
  `-6
  +3
  +8
  +5
  -6`,
  `+7
  +7
  -2
  -7
  -4`,
  puzzleInput
]

var day1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numbers = input[i].split(/\s+/)
    var nums = $.map(numbers, (val => {return Number(val)}))
    var frequency = 0
    for (var n = 0; n < nums.length; n++) {
      frequency += nums[n];
    }

    // console.log(frequency)
    $('#day1').append(input[i])
      .append('<br>&emsp;')
      .append(frequency)
      .append('<br>')
  }
}

var day1Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var numbers = input[i].split(/\s+/)
    var nums = $.map(numbers, (val => {return Number(val)}))
    var frequency = 0
    var pastFreqs = { 0: true }
    var twice = undefined
    while (twice === undefined) {
      for (var n = 0; n < nums.length; n++) {
        frequency += nums[n];
        if (pastFreqs[frequency]) {
          twice = frequency
          break;
        } else {
          pastFreqs[frequency] = true
        }
      }
    }

    // console.log(pastFreqs)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(twice)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day1"><h2>day #1</h2></div>')
  day1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day1Part2()
  $('#main').append('<br>')
})
