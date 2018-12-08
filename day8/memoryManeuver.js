var input = [
'0 1 2',
'1 2 0 1 2 3 4',
'2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2',
 puzzleInput
]

function Node (parent) {
  this.parent = parent
  this.children = []
  this.childNum = undefined
  this.metadataNum = undefined
  this.metadata = []
}

var day8 = function() {

  for (var i = 0; i < input.length; i++) {
    var numbers = $.map(input[i].split(/\s+/), (x) => {
      return Number(x)
    })
    // console.log(numbers)

    var parseNumbers = function (parent) {
      var node = new Node(parent)
      node.childNum = numbers.shift()
      node.metadataNum = numbers.shift()
      if (node.childNum > 0) {
        for (var c = 0; c < node.childNum; c++) {
          node.children.push(parseNumbers(node))
        }
      }
      for (var m = 0; m < node.metadataNum; m++) {
        node.metadata.push(numbers.shift())
      }
      return node
    }
    var root = parseNumbers(null)
    // console.log(root)

    var sumMetadata = function (node) {
      var sum = 0
      $.each(node.children, (idx, child) => {
        sum += sumMetadata(child)
      })
      return sum + node.metadata.reduce((acc, val) => {
        return acc + val
      }, 0)
    }
    var metadataSum = sumMetadata(root)

    $('#day8').append(input[i])
      .append('<br>&emsp;')
      .append(metadataSum)
      .append('<br>')
  }
}

var day8Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day8"><h2>day #8</h2></div>')
  day8()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day8Part2()
  $('#main').append('<br>')
})


// var root = {
//   childNum: numbers.shift(),
//   metadataNum: numbers.shift(),
//   metadata: [],
//   children: []
// }
// var metadataIdx = numbers.length - root.metadataNum
// root.metadata = numbers.splice(metadataIdx, root.metadataNum)
// // console.log(root)
// var prevNode = root
// var childSizes = numbers.length / root.childNum
// var nextNumbers = 
// while (nextNumbers.length > 0) {

// }