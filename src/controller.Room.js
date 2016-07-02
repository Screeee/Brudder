var controllerRoom = {
    run: function (room) {
        switch (room.controller.level) {
            case 1:
                level1(room);
                break;
            case 2:
                level2();
                break;
            case 3:
                level3();
                break;
            case 4:
                level4();
                break;
            case 5:
                level5();
                break;
            case 6:
                level6();
                break;
            case 7:
                level7();
                break;
            case 8:
                level8();
                break;
            case _:
                console.log("Uh...we shouldn't be here");
                break;
        }
    }
};

function level1(room) {
    var roleHarvester = require('role.harvester');
    var roleUpgrader = require('role.upgrader');

    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room == room);
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.room == room);
    var Spawn1 = room.find((FIND_MY_STRUCTURES), {filter: (spawns) => spawns.structureType == STRUCTURE_SPAWN});
    var creeps = _.filter(Game.creeps, (c) => c.room == room);

    if (numberOfHarvesters < 2) {
        Spawn1[0].createCreep([WORK, MOVE, CARRY], undefined, {role: 'harvester'});
    } else if (numberOfUpgraders < 2) {
        Spawn1[0].createCreep([WORK, WORK, MOVE, CARRY], undefined, {role: 'upgrader', upgrading: false, source: 0});
    }

    for (var name in creeps) {
        if (creeps.hasOwnProperty(name)) {
            var creep = creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
        }
    }
}

function level2(room){
    var roleHarvester = require('role.harvester');
    var roleUpgrader = require('role.upgrader');
    var roleBuilder = require('role.builder');

    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room == room);
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.room == room);
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.room == room);

    var Spawn1 = room.find((FIND_MY_STRUCTURES), {filter: (spawns) => spawns.structureType == STRUCTURE_SPAWN});
    var creeps = _.filter(Game.creeps, (c) => c.room == room);
    



}

module.exports = controllerRoom;
