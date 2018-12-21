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
00 r1 = 123
01 r1 &= 456
02 r1 = (1===72) ? 1 : 0
03 r2 += r1
04 r2 = 0
05 r1 = 0
06 r3 = r1 | 65536
07 r1 = 10905776
08 r4 = 3 & 255
09 r1 += r4
10 r1 &= 16777215
11 r1 *= 65899
12 r1 &= 16777215
13 r4 = (256 > r3) ? 1 : 0
14 r2 += r4
15 r2 += 2
16 r2 = 27
17 r4 = 0
18 r5 = r4 + 1
19 r5 *= 256
20 r5 = (r5 > r3) ? 1 : 0
21 r2 += r5
22 r2 += 2
23 r2 = 25
24 r4 += 4
25 r2 = 17
26 r3 = r4
27 r2 = 7
28 r4 = (r1 === r0) ? 1 : 0
29 r2 += r4
30 r2 = 5

