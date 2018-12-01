var input = [
  `+1
  -2
  +3
  +1`,
  `+68756
  -137857
  +69101
  +1`,
  puzzleInput
]

var day1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numbers = input[i].split(/\s/)
    var nums = $.map(numbers, (val => {return Number(val)}))
    var frequency = 0
    for (var n = 0; n < nums.length; n++) {
      frequency += nums[n];
    }

    console.log(frequency)
    $('#day1').append(input[i])
      .append('<br>&emsp;')
      .append(frequency)
      .append('<br>')
  }
}

var day1Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    // console.log(sum)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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
