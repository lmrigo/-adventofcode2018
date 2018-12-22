var input = [
`#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`,
 puzzleInput
]

var Computer = function () {
  this.regs = [0,0,0,0,0,0]
  this.ip = 0
  this.ipridx = 0
  this.mip = function(ipreg) { // modify ip
    this.ipridx = ipreg
    this.regs[this.ipridx] = this.ip
  }
  this.addr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] + this.regs[rb]
  }
  this.addi = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] + valb
  }
  this.mulr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] * this.regs[rb]
  }
  this.muli = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] * valb
  }
  this.banr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] & this.regs[rb]
  }
  this.bani = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] & valb
  }
  this.borr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] | this.regs[rb]
  }
  this.bori = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] | valb
  }
  this.setr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra]
  }
  this.seti = function (vala, valb, rout) {
    this.regs[rout] = vala
  }
  this.gtir = function (vala, rb, rout) {
    this.regs[rout] = vala > this.regs[rb] ? 1 : 0
  }
  this.gtri = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] > valb ? 1 : 0
  }
  this.gtrr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] > this.regs[rb] ? 1 : 0
  }
  this.eqir = function (vala, rb, rout) {
    this.regs[rout] = vala === this.regs[rb] ? 1 : 0
  }
  this.eqri = function (ra, valb, rout) {
    this.regs[rout] = this.regs[ra] === valb ? 1 : 0
  }
  this.eqrr = function (ra, rb, rout) {
    this.regs[rout] = this.regs[ra] === this.regs[rb] ? 1 : 0
  }
}

var day21 = function() {

  for (var i = 0; i < input.length; i++) {
    var program = []
    var inputInstrs = input[i].split(/\n+/)
    var initialOperation = { // ip instruction (#ip 0)
      opcode: 'mip',
      a: Number(inputInstrs[0].split(/\s+/)[1])
    }
    for (var o = 1; o < inputInstrs.length; o++) { // standard instructions (seti 5 0 1)
      var operation = inputInstrs[o].split(/\s+/)
      program.push({
        opcode: operation[0],
        a: Number(operation[1]),
        b: Number(operation[2]),
        c: Number(operation[3])
      })
    }
    // console.log(program)

    var com = new Computer()
    com[initialOperation.opcode](initialOperation.a)
    var timeout = 1000000
    com.regs[0] = 11285115 // checked the value on instruction 28
    var executedInstructions = 1
    while (com.ip < program.length && com.ip >= 0 && --timeout > 0) {
      executedInstructions++
      com.regs[com.ipridx] = com.ip
      // console.log('BEFORE','ip',com.ip,'regs',com.regs[0],com.regs[1],com.regs[2],com.regs[3],com.regs[4],com.regs[5])
      var instr = program[com.ip]
      com[instr.opcode](instr.a, instr.b, instr.c)
      // console.log('AFTER','ip',com.ip,'regs',com.regs[0],com.regs[1],com.regs[2],com.regs[3],com.regs[4],com.regs[5])
      com.ip = com.regs[com.ipridx]
      com.ip++
    }
    // console.log('ip',com.ip,'regs',com.regs[0],com.regs[1],com.regs[2],com.regs[3],com.regs[4],com.regs[5])
    if (!timeout) {
      console.log("timeout!")
    }
    var result = executedInstructions + ' instructions executed with reg 0 at: ' + com.regs[0]

    $('#day21').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

var day21Part2 = function () {

  for (var i = input.length-1; i < input.length; i++) {
    var program = []
    var inputInstrs = input[i].split(/\n+/)
    var initialOperation = { // ip instruction (#ip 0)
      opcode: 'mip',
      a: Number(inputInstrs[0].split(/\s+/)[1])
    }
    for (var o = 1; o < inputInstrs.length; o++) { // standard instructions (seti 5 0 1)
      var operation = inputInstrs[o].split(/\s+/)
      program.push({
        opcode: operation[0],
        a: Number(operation[1]),
        b: Number(operation[2]),
        c: Number(operation[3])
      })
    }
    // console.log(program)

    var com = new Computer()
    com[initialOperation.opcode](initialOperation.a)
    var timeout = 1 // skip to code below
    com.regs[0] = 1 //11285115
    var executedInstructions = 1
    while (com.ip < program.length && com.ip >= 0 && --timeout > 0) {
      executedInstructions++
      com.regs[com.ipridx] = com.ip
      // console.log('BEFORE','ip',com.ip,'regs',com.regs[0],com.regs[1],com.regs[2],com.regs[3],com.regs[4],com.regs[5])
      var instr = program[com.ip]
      com[instr.opcode](instr.a, instr.b, instr.c)
      // console.log('AFTER','ip',com.ip,'regs',com.regs[0],com.regs[1],com.regs[2],com.regs[3],com.regs[4],com.regs[5])
      com.ip = com.regs[com.ipridx]
      // if (com.ip === 28) {
      //   console.log(com.regs[1])
      // }
      com.ip++
    }
    // console.log('ip',com.ip,'regs',com.regs[0],com.regs[1],com.regs[2],com.regs[3],com.regs[4],com.regs[5])
    // if (!timeout) {
    //   console.log("timeout!")
    // }

    function gmo256 (x) {
      var n = Math.floor(x/256)
      return n
    }

    var r1Values = []
    var r1Map = {}
    var lastr1 = -1 // 10026644

    // timeout = 10038
    timeout = 10000000
    var r0 = com.regs[0]
    var r1 = com.regs[1]
    var r3 = com.regs[3]
    r1 = 0
    while (r1 !== r0 && --timeout) {
      r3 = r1 | 65536
      r1 = 10905776
      while (256 <= r3) {
        // var r4 = r3 & 255
        // r1 += r4
        // r1 &= 16777215
        // r1 = ((((r1 + (r3 & 255)) & 16777215) & 65899) & 16777215)
        r1 = ((((r1 + (r3 & 255)) & 16777215) * 65899) & 16777215)
        r3 = gmo256(r3)
        // console.log(r1)
      }
      r1 = ((((r1 + (r3 & 255)) & 16777215) * 65899) & 16777215)
      // console.log(r1)
      if (r1Map[r1]) {
        // console.log('! '+r1,r1Map.length)
        break
      }
      r1Map[r1] = true
      r1Values.push(r1)
      lastr1 = r1
    }
    if (!timeout) {
      console.log("timeout!")
    }
    // console.log(r1Values.length) // stops growing at 10037
    // console.log(r1Values)
    // console.log(r1Values.sort((a,b) => { return a-b }))

    // var minVal = r1Values.reduce((acc, val) => {
    //   return acc < val ? acc : val
    // }, 11285115)

    // var str = ''
    // for (var n = 0; n < r1Values.length; n++) {
    //   str += ',' +r1Values[n]
    // }
    // console.log(str)

    // 3659 too low
    // 2947113 correct
    // 16776923 too high

    // the last value before it starts repeating
    var result = lastr1

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day21"><h2>day #21</h2></div>')
  day21()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day21Part2()
  $('#main').append('<br>')
})
