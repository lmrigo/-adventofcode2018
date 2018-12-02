var input = [
`abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab`,
`abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`,
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
    var ids = input[i].split(/\s+/)
    var idLength = ids[0].length

    var ida, idb
    // find boxes that differ by 1 character
    for (var idi = 0; idi < ids.length; idi++) {
      var curId = ids[idi]
      for (var idj = idi+1; idj < ids.length; idj++) {
        var score = 0
        var a = ids[idi], b = ids[idj]
        for (var c = 0; c < a.length; c++) {
          if (a[c] === b[c]) {
            score++
          }
        }
        if (score === (idLength-1)) {
          // console.log('highscore: ',a,b,score)
          ida = a, idb = b
        }
      }
    }
    // print the characters that are the same
    var commonString = ''
    for (var c = 0; c < ida.length; c++) {
      if (ida[c] === idb[c]) {
        commonString += ida[c]
      }
    }

    // console.log(commonString)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(commonString)
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
