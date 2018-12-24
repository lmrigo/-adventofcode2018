var input = [
`Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`,
  puzzleInput
]


var day24 = function() {

  for (var i = 0; i < input.length; i++) {
    var inputStrs = input[i].split(/\n+/)
    var immuneGrp = false
    var allGroups = []
    $.each(inputStrs, (idx, str) => {
      if (str.startsWith('Immune')) {
        immuneGrp = true
        return true
      }
      if (str.startsWith('Infection')) {
        immuneGrp = false
        return true
      }
      var group = {
        id: idx, // make it easier to compare
        type: (immuneGrp ? 'immune' : 'infection')
      }
      var strarr = str.split(/\s+/)
      group.units = Number(strarr[0])
      group.hp = Number(strarr[4])
      group.weak = []
      group.immune = []
      for (var s = 5; s < strarr.length; s++) {
        if (strarr[s].includes('weak')) {
          s+=2
          var weakness = strarr[s]
          var divider = weakness.charAt(weakness.length-1)
          if (divider === ')' || divider === ';') {
            group.weak.push(weakness.substr(0,weakness.length-1))
          } else if (divider === ',') {
            group.weak.push(weakness.substr(0,weakness.length-1))
            var otherWeakness = strarr[++s]
            group.weak.push(otherWeakness.substr(0,otherWeakness.length-1))
          }
        } else if (strarr[s].includes('immune')) {
          s+=2
          var immunity = strarr[s]
          var divider = immunity.charAt(immunity.length-1)
          if (divider === ')' || divider === ';') {
            group.immune.push(immunity.substr(0,immunity.length-1))
          } else if (divider === ',') {
            group.immune.push(immunity.substr(0,immunity.length-1))
            var otherImmunity = strarr[++s]
            group.immune.push(otherImmunity.substr(0,otherImmunity.length-1))
          }
        } else if (strarr[s] === 'attack') {
          s+=3
          group.attack = Number(strarr[s])
          group.attackType = strarr[++s]
        } else if (strarr[s] === 'initiative') {
          group.initiative = Number(strarr[++s])
        }
      }
      group.effectivePower = function(){return this.units * this.attack}
      allGroups.push(group)
    })
    // console.log(allGroups)
    var getGroupIdx = function(id) {
      return allGroups.findIndex((x)=>{return x.id === id})
    }

    var immuneCount = allGroups.reduce((acc,val)=>{
      return acc + (val.type==='immune' ? 1 : 0)
    },0)
    var infectionCount = allGroups.length - immuneCount
    while (immuneCount !== 0 && infectionCount !== 0) {

      // TARGET Phase
      var attackers = allGroups.slice().sort((b,a)=>{
        var eapDiff = a.effectivePower() - b.effectivePower()
        return eapDiff === 0 ? (a.initiative - b.initiative) : eapDiff
      }) // sorted by priority
      // $.each(attackers,(idx,val)=>{console.log(val.id,val.effectivePower())})
      var defenders = allGroups.slice()
      var atkdef = []

      while (attackers.length > 0) {
        var next = attackers.shift()
        var finalTarget = null
        // calculate which one can damage most
        var baseDamage = next.attack * next.units
        var targets = []
        $.each(defenders, (idx, grp) => {
          if (grp.id === next.id || grp.type === next.type) {
            // skip self-attack and same type attack
            return true
          } else {
            var effectiveDamage = baseDamage
            if (grp.immune.includes(next.attackType)) {
              effectiveDamage = 0
            } else if (grp.weak.includes(next.attackType)) {
              effectiveDamage *= 2
            }
            targets.push({
              id:grp.id,
              dmg:effectiveDamage,
              defEap:grp.effectivePower(),
              defInit:grp.initiative
            })
          }
        })
        if (targets.length > 0) {
          targets.sort((b,a)=>{
            var dmg = a.dmg - b.dmg
            if (dmg === 0) {
              var eap = a.defEap - b.defEap
              if (eap === 0) {
                return a.defInit - b.defInit
              }
              return eap
            }
            return dmg
          })
          finalTarget = targets[0] // TODO: store this somewhere
          var defIdx = defenders.findIndex((x)=>{
            return x.id === finalTarget.id
          })
          defenders.splice(defIdx,1) // only this group can attack this target in this turn
          atkdef.push([next.id,finalTarget.id])
        }
      } // end of target selection
      // console.log(atkdef)

      // ATTACK Phase
      var attackers = allGroups.slice().sort((b,a)=>{
        return a.initiative - b.initiative
      }) // sorted by initiative

      while (attackers.length > 0) {
        var next = attackers.shift()

        var pair = atkdef.find((x)=>{return x[0]===next.id})
        if (pair === undefined) {
          continue
        }
        var targetId = pair[1]
        var targetIdx = getGroupIdx(targetId)
        var targetGroup = allGroups[targetIdx]

        var damage = next.effectivePower()
        if (targetGroup.weak.includes(next.attackType)) {
          damage *= 2
        }
        var targetEhp = targetGroup.units * targetGroup.hp
        var result = targetEhp - damage
        if (result < 0) {
          allGroups.splice(targetIdx,1)
        } else {
          var remainingUnits = Math.ceil(result / targetGroup.hp)
          targetGroup.units = remainingUnits
        }
      } // end attacking

      var immuneCount = allGroups.reduce((acc,val)=>{
        return acc + (val.type==='immune' ? 1 : 0)
      },0)
      var infectionCount = allGroups.length - immuneCount
      // console.log(allGroups)
    } // end round

    var totalRemainingUnits = allGroups.reduce((acc,val)=>{
        return acc + val.units
      },0) // sum remaining units

    $('#day24').append(input[i])
      .append('<br>&emsp;')
      .append(totalRemainingUnits)
      .append('<br>')
  }
}


var day24Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day24"><h2>day #24</h2></div>')
  day24()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day24Part2()
  $('#main').append('<br>')
})
