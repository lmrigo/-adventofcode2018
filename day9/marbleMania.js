var input = [
'9 players; last marble is worth 25 points',// high score is 32
'10 players; last marble is worth 1618 points',// high score is 8317
'13 players; last marble is worth 7999 points',// high score is 146373
'17 players; last marble is worth 1104 points',// high score is 2764
'21 players; last marble is worth 6111 points',// high score is 54718
'30 players; last marble is worth 5807 points',// high score is 37305
 puzzleInput
]


var day9 = function() {

  for (var i = 0; i < input.length; i++) {
  // for (var i = 0; i < 6; i++) {
    var game = input[i].split(/\s+/)
    var numPlayers = Number(game[0])
    var lastMarbleVal = Number(game[6])
    // console.log(numPlayers, lastMarbleVal)
    var players = []
    for (var p = 0; p < numPlayers; p++) {
      players[p] = 0
    }

    // var rems = ''
    // var idxs = ''
    var p = 0
    var circle = [0]
    var idx = 0
    var nextVal = 0
    while (nextVal < lastMarbleVal) {
      nextVal++
      if ((nextVal % 23) === 0) {
        idx = idx - 7
        if (idx <= 0) {
          // console.log('pediu pra parar parou', idx, rem[0], nextVal)
          idx += circle.length
          // por algum motivo o splice não da o resultado certo com índice negativo, apesar de funcionar
        }
        var rem = circle.splice(idx,1)
        players[p] += nextVal + rem[0]
        // rems += ', ' + rem[0]
        // idxs += ', ' + idx
      } else {
        idx = (idx + 2) % circle.length
        idx = idx === 0 ? circle.length : idx
        circle.splice(idx,0,nextVal)
      }
      // console.log(p+1, idx, nextVal, printCircle(circle,idx))
      p = ++p % numPlayers
    }

    // console.log(rems)
    // console.log(idxs)
    // console.log(circle)
    // console.log(players)

    var highScore = players.reduce((acc, val) => {
      return acc > val ? acc : val
    })
    // var winner = players.indexOf(highScore) + 1
    // console.log(winner)

    $('#day9').append(input[i])
      .append('<br>&emsp;')
      .append(highScore)
      .append('<br>')
  }
}

var printCircle = function(circle, idx) {
  var str = circle.join(', ')
  var val = circle[idx]
  var stridx = str.indexOf(', ' + val)
  return str.substr(0,stridx+2) + '*' + str.substr(stridx+2)
}

var day9Part2 = function () {

  for (var i = 0; i < input.length; i++) {
  // for (var i = 0; i < 1; i++) {
    if (i>0) { i = input.length-1 } //skip to puzzle input
    var game = input[i].split(/\s+/)
    var numPlayers = Number(game[0])
    var lastMarbleVal = Number(game[6])*100
    // console.log(numPlayers, lastMarbleVal)
    var players = []
    for (var p = 0; p < numPlayers; p++) {
      players[p] = 0
    }

    var circle = new LinkedList()
    circle.push(0)
    circle.push(1)
    var p = 0
    var idx = 0
    var nextVal = 2
    var n = circle.last // current node
    // console.log(circle.toString())
    while (nextVal < lastMarbleVal) {
      if ((nextVal % 23) === 0) {
        // left 7
        for (var l = 0; l < 7; l++) {
          n = n.prev === null ? circle.last : n.prev
        }
        var rem = n.val
        players[p] += nextVal + rem
        var next = n.next
        circle.remove(n)
        n = next
      } else {
        // right 2
        n = n.next === null ? circle.first : n.next
        n = circle.insert(nextVal, n)
      }
      // console.log(p+1, idx, nextVal, printCircle(circle,idx))
      p = ++p % numPlayers
      nextVal++
      // console.log(circle.toString())
    }

    var highScore = players.reduce((acc, val) => {
      return acc > val ? acc : val
    })

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(highScore)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day9"><h2>day #9</h2></div>')
  day9()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day9Part2()
  $('#main').append('<br>')
})
