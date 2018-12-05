var input = [
'dabAcCaCBAcCcaDA',
'aabAAB',
  puzzleInput
]

var day5 = function() {

  for (var i = 0; i < input.length; i++) {
    var polymer = input[i]

    var totalUnits = polymer.length + 1000
    while (polymer.length !== totalUnits) {
      totalUnits = polymer.length
      var newPolymer = ''
      for (var p = 0; p < polymer.length; p++) {
        if (p < polymer.length - 1
          && polymer[p].toLowerCase() === polymer[p+1].toLowerCase()
          && polymer[p] !== polymer[p+1]) {
          p += 1
        } else {
          newPolymer += polymer[p]
        }
      }
      polymer = newPolymer
    }
    // console.log(polymer)

    var result = polymer.length

    // console.log(result)
    $('#day5').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var day5Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    // console.log()
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day5"><h2>day #5</h2></div>')
  day5()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day5Part2()
  $('#main').append('<br>')
})
