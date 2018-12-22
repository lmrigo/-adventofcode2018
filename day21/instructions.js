bani 1 456 1
eqri 1 72 1
addr 1 2 2
seti 0 0 2
seti 0 4 1
bori 1 65536 3
seti 10905776 4 1
bani 3 255 4
addr 1 4 1
bani 1 16777215 1
muli 1 65899 1
bani 1 16777215 1
gtir 256 3 4
addr 4 2 2
addi 2 1 2
seti 27 1 2
seti 0 6 4
addi 4 1 5
muli 5 256 5
gtrr 5 3 5
addr 5 2 2
addi 2 1 2
seti 25 1 2
addi 4 1 4
seti 17 9 2
setr 4 7 3
seti 7 4 2
eqrr 1 0 4
addr 4 2 2
seti 5 1 2
0seti 123 0 1

ip = register 2
00 r1 = 123   [1111011]
01 r1 &= 456  [111001000]
02 r1 = (r1===72) ? 1 : 0   [1001000]
03 r2 += r1
04 r2 = 0
05 r1 = 0
06 r3 = r1 | 65536  [10000000000000000] same as (if (r1 < 65536) { r1 + 65536 } else { 'its complicated'} )
07 r1 = 10905776 [101001100110100010110000]
08 r4 = r3 & 255 [11111111] same as (r3 % 256)
09 r1 += r4
10 r1 &= 16777215 [111111111111111111111111]
11 r1 *= 65899  [10000000101101011]
12 r1 &= 16777215 [111111111111111111111111]
13 r4 = (256 > r3) ? 1 : 0 [100000000]
14 r2 += r4
15 r2 += 1
16 r2 = 27
17 r4 = 0
18 r5 = r4 + 1
19 r5 *= 256 [100000000]
20 r5 = (r5 > r3) ? 1 : 0
21 r2 += r5
22 r2 += 1
23 r2 = 25
24 r4 += 1
25 r2 = 17
26 r3 = r4
27 r2 = 7
28 r4 = (r1 === r0) ? 1 : 0
29 r2 += r4
30 r2 = 5



r1 = 123
while (r1 !== 72) {
  r1 &= 456
}
r1 = 0
while (r1 !== r0) {
  r3 = r1 | 65536
  r1 = 10905776
  while (r3 <= 256) {
    r1 = ((((r1 + (r3 & 255)) & 16777215) * 65899) & 16777215)
    if (r3<=256 === 0) {
      break
    }
    r4 = 0
    do {
      r4 += 1
    } while (r3 =< ((r4 + 1) * 256)) // finds the greatest multiple of 256 that fits in r3
    r4-=1 // The original code doesn't add the 4 in the last time it runs so we need to subtract it
    r3 = r4
  }
}




r1 = 0
while (r1 !== r0) {
  r3 = r1 | 65536
  r1 = 10905776
  // ---
  while (r3 <= 256) {
    r1 = ((((r1 + (r3 & 255)) & 16777215) * 65899) & 16777215)
    r3 = gmo256(r3)
  }
  // ---
}


function gmo256 (x) {
  var n = Math.floor(x/256)
  return n
}
