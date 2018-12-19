seti 1 5 1
seti 1 4 4
mulr 1 4 5
eqrr 5 2 5
addr 5 3 3
addi 3 1 3
addr 1 0 0
addi 4 1 4
gtrr 4 2 5
addr 3 5 3
seti 2 6 3
addi 1 1 1
gtrr 1 2 5
addr 5 3 3
seti 1 1 3
mulr 3 3 3
addi 2 2 2
mulr 2 2 2
mulr 3 2 2
muli 2 11 2
addi 5 3 5
mulr 5 3 5
addi 5 3 5
addr 2 5 2
addr 3 0 3
seti 0 6 3
setr 3 8 5
mulr 5 3 5
addr 3 5 5
mulr 3 5 5
muli 5 14 5
mulr 5 3 5
addr 2 5 2
seti 0 2 0
seti 0 2 3
0addi 3 16 3


00 r3 += 16
01 r1 = 1
02 r4 = 1
03 r5 = r1 * r4
04 r5 = (r2 === r5) ? 1 : 0
05 r3 += r5
06 r3 += 1
07 r0 += r1
08 r4 += 1
09 r5 = (r4 > r2) ? 1 : 0
10 r3 += r5
11 r3 = 2
12 r1 += 1
13 r5 = (r1 > r2) ? 1 : 0
14 r3 += r5
15 r3 = 1
16 r3 *= r3
17 r2 += 2
18 r2 *= 2
19 r2 *= r3
20 r2 *= 11
21 r5 += 3
22 r5 *= r3
23 r5 += 3
24 r2 += r5
25 r3 += r0
26 r3 = 0
27 r5 = r3
28 r5 *= r3
29 r5 += r3
30 r5 *= r3
31 r5 *= 14
32 r5 *= 3
33 r2 += r5
34 r0 = 0
35 r3 = 0

