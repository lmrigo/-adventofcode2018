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

var day19 = function() {

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
    while (com.ip < program.length && com.ip >= 0 && --timeout > 0) {
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

    $('#day19').append(input[i])
      .append('<br>&emsp;')
      .append(com.regs[0])
      .append('<br>')
  }
}

var day19Part2 = function () {

  for (var i = 1; i < input.length; i++) {
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
    com.regs[0] = 1 // part 2 specific
    var timeout = 100
    while (com.ip < program.length && com.ip >= 0 && --timeout > 0) {
      com.regs[com.ipridx] = com.ip
      console.log(com.ip)
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

    timeout = 100
    var r0=1,r1=0,r2=0,r3=0,r4=0,r5=0
    while (r0>-1 && r0< 36 && --timeout > 0) {

      // start                                        // 00 r3 += 16
                                                      //
      // loop C                                       //
                                                      //
                                                      //
      r2 = ((((r2 + 2) * 2) * 19) * 11)               // 17 r2 += 2 18 r2 *= 2 19 r2 *= r3 20 r2 *= 11
      r5 = (((r5 + 3) * 22) + 3)                      // 21 r5 += 3 22 r5 *= r3 23 r5 += 3
      r2 += r5                                        // 24 r2 += r5
      if (r0 === 0) {                                 // 25 r3 += r0
        // loop B                                     // 26 r3 = 0
        for (r1 = 1; r1 < r2; r1++) {                 // 01 r1 = 1 12 r1 += 1 13 r5 = (r1 > r2) ? 1 : 0 14 r3 += r5 15 r3 = 1
          // loop A                                   //
          for (r4 = 1; r4 < r2; r4++) {               // 02 r4 = 1 08 r4 += 1 09 r5 = (r4 > r2) ? 1 : 0 10 r3 += r5 11 r3 = 2
            r5 = r1 * r4                              // 03 r5 = r1 * r4
            r5 = (r2 === r5) ? 1 : 0                  // 04 r5 = (r2 === r5) ? 1 : 0
            if (r5 > 0) {                             // 05 r3 += r5 06 r3 += 1
              r0 += 1                                 // 07 r0 += r1
            }                                         //
          } // end loop A                             //
        } // end loop B                               //
                                                      // 16 r3 *= r3
        r2 += r5                                      // 33 r2 += r5
        r0 = 0                                        // 34 r0 = 0
                                                      // 35 r3 = 0
      } else { //                                     // 25 r3 += r0
        r5 = (((((27 * 28) + 29) * 30) * 14) * 3)     //
        r2 += r5                                      //
        r0 = 0                                        //
      }                                               //
                                                      //
                                                      //
      // end to loop C                                //



    }
    if (!timeout) { console.log("timeout!") }


    // >= 108
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(com.regs[0])
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day19"><h2>day #10</h2></div>')
  // day19()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day19Part2()
  $('#main').append('<br>')
})


/*
      // loop C
      r2 = ((((r2 + 2) * 2) * 19) * 11)
      r5 = (((r5 + 3) * 22) + 3)
      r2 += r5
      if (r0 > 0) {
        r5 = (((((27 * 28) + 29) * 30) * 14) * 3)
        r2 += r5
        r0 = 0
      }

      r1 = 1
      r4 = 1 // loop B
      r5 = r1 * r4 // loop A
      r5 = (r2 === r5) ? 1 : 0
      if (r5 > 0) {
        r0 += 1
      }
      r4 += 1
      r5 = (r4 > r2) ? 1 : 0
      if (r5 === 0) {
        //return to loop A
      }
      r1 += 1
      r5 = (r1 > r2) ? 1 : 0
      if (r5 === 0) {
        //return to loop B
      }
      // goto 33
      r2 += r5
      r0 = 0
      // return to loop C

*/




27 r5 = r3
28 r5 *= r3
29 r5 += r3
30 r5 *= r3
31 r5 *= 14
32 r5 *= 3

































