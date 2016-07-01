var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer')
var roleMover = require('role.mover');
module.exports.loop = function () {
    //clear memory

    for (let names in Memory.creeps) {
        if (Game.creeps[names] == undefined) {
            delete Memory.creeps[names];
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role=='mover')
        {
            roleMover.run(creep);
        }

    }


    // var newCreep = Game.rooms.E38N3.lookForAtArea(LOOK_CREEPS,43,37,45,39,true);
    // console.log(newCreep.length);


    var tower = Game.getObjectById('57755d46846b7bd15585f4f2');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }


    var minimumHarvesters = 8;
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfMovers = _.sum(Game.creeps, (c) => c.memory.role == 'mover');


    if ((numberOfHarvesters < minimumHarvesters)) {
        if (Game.spawns.Spawn1.room.energyAvailable >= 700) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, WORK,WORK,CARRY, CARRY,CARRY, MOVE, MOVE, MOVE], undefined, {
                role: 'harvester',
                source: 0
            })
        }
        else if (Game.spawns.Spawn1.room.energyAvailable >= 600) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'harvester',
                source: 0
            })
        }
        else if (Game.spawns.Spawn1.room.energyAvailable >= 500) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'harvester',
                source: 0
            })
        }
        else if (Game.spawns.Spawn1.room.energyAvailable >= 450) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE], undefined, {
                role: 'harvester',
                source: 0
            })
        }
        else if (Game.spawns.Spawn1.room.energyAvailable >= 400) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'harvester',
                source: 0
            })
        }
        else if(Game.spawns.Spawn1.room.energyAvailable >= 350) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE, MOVE], undefined, {role: 'harvester', source: 0})
        }
        else
        {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester', source: 0})

        }
    }
    if (numberOfUpgraders < 5) {


        if (Game.spawns.Spawn1.room.energyAvailable >= 600) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {
                role: 'upgrader',
                upgrading: false,
                source: 1
            })
        }

        else if (Game.spawns.Spawn1.room.energyAvailable >= 450) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'upgrader',
                upgrading: false,
                source: 1
            })
        }
        else if (Game.spawns.Spawn1.room.energyAvailable >= 400) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'upgrader',
                upgrading: false,
                source: 1
            })
        }
        else if (Game.spawns.Spawn1.room.energyAvailable >= 350) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE, MOVE], undefined, {
                role: 'upgrader',
                upgrading: false,
                source: 1
            })
        }

        else {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
                role: 'upgrader',
                upgrading: false,
                source: 1
            })
        }
    }
   
    
    
    if (Game.structures)
    if (numberOfBuilders < 3) {
        if (Game.spawns.Spawn1.room.energyAvailable >= 450) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {
                role: 'builder',
                building: false,
                source: 1
            })
        }
        else if (Game.spawns.Spawn1.room.energyAvailable >= 400) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'builder',
                building: false,
                source: 1
            })
        }
        else if (Game.spawns.Spawn1.room.energyAvailable >= 350) {
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE, MOVE], undefined, {
                role: 'builder',
                building: false,
                source: 1
            })
        }
        else {
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'builder',
                building: false,
                source: 1
            })
        }
    }
    
    
    
    if (numberOfRepairers<1)
    {
        Game.spawns.Spawn1.createCreep([WORK,MOVE,CARRY], undefined, {role:'repairer', isRepairing:false});
    }
    if (numberOfMovers<1)
    {
        Game.spawns.Spawn1.createCreep([MOVE,MOVE,CARRY,CARRY,CARRY,CARRY], undefined, {role:'mover'});
    }


};

