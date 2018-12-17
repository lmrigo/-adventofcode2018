var input = [
`Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`,
 puzzleInput
]

var Computer = function () {
  this.regs = [0,0,0,0]
  this.pc = 0
  this.addr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] + this.regs[rb]
    this.pc++
  }
  this.addi = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] + valb
    this.pc++
  }
  this.mulr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] * this.regs[rb]
    this.pc++
  }
  this.muli = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] * valb
    this.pc++
  }
  this.banr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] & this.regs[rb]
    this.pc++
  }
  this.bani = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] & valb
    this.pc++
  }
  this.borr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] | this.regs[rb]
    this.pc++
  }
  this.bori = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] | valb
    this.pc++
  }
  this.setr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra]
    this.pc++
  }
  this.seti = function (vala, valb, rout) {
    this.regs[rout] = vala
    this.pc++
  }
  this.gtir = function (vala, rb, rout) {
    this.regs[rout] = vala > this.regs[rb] ? 1 : 0
    this.pc++
  }
  this.gtri = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] > valb ? 1 : 0
    this.pc++
  }
  this.gtrr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] > this.regs[rb] ? 1 : 0
    this.pc++
  }
  this.eqir = function (vala, rb, rout) {
    this.regs[rout] = vala === this.regs[rb] ? 1 : 0
    this.pc++
  }
  this.eqri = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] === valb ? 1 : 0
    this.pc++
  }
  this.eqrr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] === this.regs[rb] ? 1 : 0
    this.pc++
  }
}

var day16 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputInstrs = input[i].split(/\n+/)
    var opcodes = ['addr','addi','mulr','muli','banr','bani','borr','bori','setr','seti','gtir','gtri','gtrr','eqir','eqri','eqrr']
    var totalSampleCount = 0
    for (var o = 0; o < inputInstrs.length; o+=3) {
      if (!inputInstrs[o].startsWith('Before')) {
        break
      }
      var beforeRaw = inputInstrs[o].split(/\s+/)
      var operation = $.map(inputInstrs[o+1].split(/\s+/), (x) => { return Number(x) })
      var afterRaw = inputInstrs[o+2].split(/\s+/)

      var before = [Number(beforeRaw[1].split(/\[|,/)[1]), Number(beforeRaw[2].split(',')[0]), Number(beforeRaw[3].split(',')[0]), Number(beforeRaw[4].split(']')[0])]
      var after = [Number(afterRaw[1].split(/\[|,/)[1]), Number(afterRaw[2].split(',')[0]), Number(afterRaw[3].split(',')[0]), Number(afterRaw[4].split(']')[0])]

      var sampleCount = 0
      // opcode a b c
      $.each(opcodes, (idx, op) => {
        var com = new Computer()
        com.regs[0] = before[0]
        com.regs[1] = before[1]
        com.regs[2] = before[2]
        com.regs[3] = before[3]
        com[op](operation[1],operation[2],operation[3])
        if (com.regs[0] === after[0]
            && com.regs[1] === after[1]
            && com.regs[2] === after[2]
            && com.regs[3] === after[3]) {
          sampleCount++
        }
      })
      if (sampleCount >= 3) {
        totalSampleCount++
      }
    }

    $('#day16').append(input[i])
      .append('<br>&emsp;')
      .append(totalSampleCount)
      .append('<br>')
  }
}

var day16Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    // var program = []
    // var inputInstrs = input[i].split(/\n/)
    // $.each(inputInstrs, function(idx, val) {
    //   var instr = val.split(/\s/)
    //   var fun = instr[0]
    //   var p1 = instr[1]
    //   var p2 = instr[2]
    //   if (Number.isInteger(Number(p1))) {
    //     p1 = Number(p1)
    //   } else if (com[p1] === undefined) {
    //     com[p1] = 0
    //   }
    //   if (p2 !== undefined){
    //     if (Number.isInteger(Number(p2))) {
    //       p2 = Number(p2)
    //     } else if (com[p2] === undefined) {
    //       com[p2] = 0
    //     }
    //   }

    //   program.push({
    //     fun: fun,
    //     p1: p1,
    //     p2: p2
    //   })
    // })

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day16"><h2>day #16</h2></div>')
  day16()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day16Part2()
  $('#main').append('<br>')
})
