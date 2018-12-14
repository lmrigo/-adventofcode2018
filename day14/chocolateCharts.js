var input = [
'9', // 5158916779
'5', // 0124515891
'18', // 9251071085
'2018', // 5941429882
// part2
'51589', // 9
'01245', // 5
'92510', // 18
'59414', // 2018
 puzzleInput
]


var day14 = function() {

  for (var i = 0; i < input.length; i++) {
    i = i > 3 ? 8 : i;
    var steps = Number(input[i])

    // score 0-9
    var scoreboard = [3, 7]
    var elfA = 0
    var elfB = 1
    var limit = steps * 3
    var ten = ''
    while (limit-- > 0) {
      if (scoreboard.length >= (steps + 10)) {
        ten = scoreboard.join('').substr(steps, 10)
        break
      }
      // create new recipe(s) from the current ones. Each digit of the sum is a new recipe
      var newRecipe = '' + (scoreboard[elfA] + scoreboard[elfB])
      var recipesToAdd = []
      if (newRecipe.length === 1) {
        recipesToAdd.push(Number(newRecipe))
      } else {
        recipesToAdd.push(Number(newRecipe.charAt(0)),Number(newRecipe.charAt(1)))
      }
      scoreboard.push(...recipesToAdd)
      // something not yet right here
      elfA = (elfA + scoreboard[elfA] + 1) % scoreboard.length
      elfB = (elfB + scoreboard[elfB] + 1) % scoreboard.length
      // console.log(scoreboard)
    }

    $('#day14').append(input[i])
      .append('<br>&emsp;')
      .append(ten)
      .append('<br>')
  }
}

var day14Part2 = function () {

  for (var i = 4; i < input.length; i++) {
    var target = input[i]

    // score 0-9
    var scoreboard = [3, 7]
    var elfA = 0
    var elfB = 1
    var limit = Number(target) * 100
    var recipeCount = -1
    while (limit-- > 0) {
      // create new recipe(s) from the current ones. Each digit of the sum is a new recipe
      var newRecipe = '' + (scoreboard[elfA] + scoreboard[elfB])
      var recipesToAdd = []
      if (newRecipe.length === 1) {
        recipesToAdd.push(Number(newRecipe))
      } else {
        recipesToAdd.push(Number(newRecipe.charAt(0)),Number(newRecipe.charAt(1)))
      }
      scoreboard.push(...recipesToAdd)
      // something not yet right here
      elfA = (elfA + scoreboard[elfA] + 1) % scoreboard.length
      elfB = (elfB + scoreboard[elfB] + 1) % scoreboard.length
      // console.log(scoreboard)

      var end = scoreboard.slice(-15)
      var endstr = end.join('')
      if (endstr.includes(target)) {
        recipeCount = scoreboard.join('').indexOf(target)
        break
      }
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(recipeCount)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day14"><h2>day #14</h2></div>')
  day14()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day14Part2()
  $('#main').append('<br>')
})
