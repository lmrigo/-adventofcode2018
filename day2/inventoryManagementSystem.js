var input = [
  `abcdef
  bababc
  abbcde
  abcccd
  aabcdd
  abcdee
  ababab`,
  puzzleInput
]

var day2 = function() {

  for (var i = 0; i < input.length; i++) {
    var ids = input[i].split(/\s+/)
    var twos = 0, threes = 0

    for (var n = 0; n < ids.length; n++) {
      var counter = {}
      $.each(ids[n].split(''), (idx, val) => {
        counter[val] === undefined ? counter[val] = 1 : counter[val]++
      })
      var hasTwo = false, hasThree = false
      $.each(Object.keys(counter), (idx, val) => {
        hasTwo = hasTwo || (counter[val] === 2)
        hasThree = hasThree || (counter[val] === 3)
      })
      if (hasTwo) {
        twos++
      }
      if(hasThree) {
        threes++
      }
    }

    var checksum = twos * threes
    // console.log(checksum)
    $('#day2').append(input[i])
      .append('<br>&emsp;')
      .append(checksum)
      .append('<br>')
  }
}

var day2Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    // console.log()
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day2"><h2>day #2</h2></div>')
  day2()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day2Part2()
  $('#main').append('<br>')
})
