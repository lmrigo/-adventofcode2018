var input = [
`#123 @ 3,2: 5x4`,
`#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,
  puzzleInput
]

var fabricSize = 1000

var day3 = function() {

  for (var i = 0; i < input.length; i++) {
    var claims = input[i].split(/\n/)
    var fabric = []
    for (var fi = 0; fi < fabricSize; fi++) {
      fabric[fi] = []
      for (var fj = 0; fj < fabricSize; fj++) {
        fabric[fi][fj] = 0
      }
    }

    for (var c = 0; c < claims.length; c++) {
      var aux = claims[c].split(/\s+/)
      var id = aux[0]
      // @ aux[1]
      var offset = aux[2].split(/,|:/)
      var left = Number(offset[0])
      var top = Number(offset[1])
      var rectangle = aux[3].split('x')
      var width = Number(rectangle[0])
      var height = Number(rectangle[1])

      for (var fi = left; fi < (left+width); fi++) {
        for (var fj = top; fj < (top+height); fj++) {
          fabric[fi][fj]++
        }
      }
    }
    // printFabric(fabric)

    var counter = fabric.reduce((accx, valx) => {
      return accx + valx.reduce((accy, valy) => {
        return accy + (valy > 1 ? 1 : 0)
      })
    }, 0)

    // console.log(counter)
    $('#day3').append(input[i])
      .append('<br>&emsp;')
      .append(counter)
      .append('<br>')
  }
}

var printFabric = function(fabric) {
  var fString = ''
  for (var i = 0; i < fabric.length; i++) {
    for (var j = 0; j < fabric[i].length; j++) {
      fString += fabric[i][j]
    }
    fString += '\n'
  }

  console.log(fString)
}

var day3Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var claims = input[i].split(/\n/)
    var fabric = []
    for (var fi = 0; fi < fabricSize; fi++) {
      fabric[fi] = []
      for (var fj = 0; fj < fabricSize; fj++) {
        fabric[fi][fj] = 0
      }
    }

    var parsedClaims = []

    for (var c = 0; c < claims.length; c++) {
      var aux = claims[c].split(/\s+/)
      var id = aux[0]
      var idNum = Number(id.substr(1))
      // @ aux[1]
      var offset = aux[2].split(/,|:/)
      var left = Number(offset[0])
      var top = Number(offset[1])
      var rectangle = aux[3].split('x')
      var width = Number(rectangle[0])
      var height = Number(rectangle[1])

      for (var fi = left; fi < (left+width); fi++) {
        for (var fj = top; fj < (top+height); fj++) {
          fabric[fi][fj] === 0 ? fabric[fi][fj] = idNum : fabric[fi][fj] = -1
        }
      }
      parsedClaims[c] = {
        id: idNum,
        left: left,
        top: top,
        width: width,
        height: height,
        size: (width*height)
      }
    }
    // printFabric(fabric)
    var intactClaimId
    for (var c = 0; c < parsedClaims.length; c++) {
      var claim = parsedClaims[c]
      var intact = true
      for (var fi = claim.left; fi < (claim.left+claim.width); fi++) {
        for (var fj = claim.top; fj < (claim.top+claim.height); fj++) {
          intact = intact && (fabric[fi][fj] === claim.id)
        }
      }
      if (intact) {
        intactClaimId = claim.id
        break;
      }
    }

    // console.log()
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(intactClaimId)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day3"><h2>day #3</h2></div>')
  day3()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day3Part2()
  $('#main').append('<br>')
})
