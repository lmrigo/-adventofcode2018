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
    var timeout = 10000000
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
    console.log('ip',com.ip,'regs',com.regs[0],com.regs[1],com.regs[2],com.regs[3],com.regs[4],com.regs[5])
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

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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
