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
    var translation = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
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
          if (!translation[operation[0]][op]) {
            translation[operation[0]][op] = 0
          }
          translation[operation[0]][op]++
        }
      })
      if (sampleCount >= 3) {
        totalSampleCount++
      }
    }
    // console.log(translation)
    /*
      0: borr
      1: addr
      2: eqrr
      3: addi
      4: eqri
      5: eqir
      6: gtri
      7: mulr
      8: setr
      9: gtir
      10: muli
      11: banr
      12: seti
      13: gtrr
      14: bani
      15: bori
    */

    $('#day16').append(input[i])
      .append('<br>&emsp;')
      .append(totalSampleCount)
      .append('<br>')
  }
}

var day16Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var opcodes = ['borr','addr','eqrr','addi','eqri','eqir','gtri','mulr','setr','gtir','muli','banr','seti','gtrr','bani','bori']

    var program = []
    var inputInstrs = input[i].split(/\n+/)
    for (var o = 0; o < inputInstrs.length; o++) {
      if (inputInstrs[o].startsWith('Before')) {
        o+=2
        continue
      }
      var operation = $.map(inputInstrs[o].split(/\s+/), (x) => { return Number(x) })
      // opcode a b c
      program.push({
        opcode: opcodes[operation[0]],
        a: operation[1],
        b: operation[2],
        c: operation[3]
      })
    }
    // console.log(program)
    var com = new Computer()
    while (com.pc < program.length && com.pc >= 0) {
      var instr = program[com.pc]
      com[instr.opcode](instr.a, instr.b, instr.c)
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(com.regs[0])
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

/*
  0:
  addr: 42
  borr: 51
  mulr: 9

  1:
  addi: 40
  addr: 40
  muli: 40
  mulr: 40

  2:
  bani: 44
  banr: 44
  bori: 44
  borr: 44
  eqri: 44
  eqrr: 44
  gtir: 44
  muli: 44
  mulr: 44
  setr: 44

  3:
  addi: 59
  muli: 59

  4:
  bani: 54
  banr: 40
  bori: 54
  eqri: 54
  gtir: 14
  muli: 54
  setr: 54

  5:
  addi: 20
  addr: 7
  bani: 46
  banr: 46
  bori: 20
  borr: 7
  eqir: 46
  eqri: 26
  eqrr: 39
  gtir: 39
  gtri: 46
  gtrr: 46
  muli: 46
  mulr: 46
  seti: 26
  setr: 46

  6:
  addi: 59
  banr: 59
  bori: 59
  borr: 59
  eqrr: 59
  gtir: 59
  gtri: 59
  mulr: 59
  setr: 59

  7:
  addi: 16
  muli: 40
  mulr: 56

  8:
  addi: 20
  addr: 14
  bani: 30
  banr: 39
  bori: 57
  borr: 57
  muli: 7
  mulr: 4
  seti: 57
  setr: 57

  9:
  addi: 59
  addr: 59
  bori: 59
  borr: 59
  gtir: 59

  10: muli
  muli: 56

  11:
  banr: 47
  seti: 47

  12:
  addi: 52
  addr: 37
  bori: 52
  borr: 52
  mulr: 15
  seti: 52

  13:
  addi: 46
  addr: 46
  bani: 46
  banr: 46
  bori: 46
  borr: 46
  gtir: 46
  gtri: 46
  gtrr: 46
  muli: 46
  mulr: 46
  seti: 46
  setr: 46

  14:
  bani: 55
  banr: 26
  seti: 29

  15:
  addi: 30
  addr: 30
  bori: 43
  borr: 43
  muli: 13
  mulr: 13

*/