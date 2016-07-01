
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
    if (room.controller.level == 1) {

        var roleHarvester = require('role.harvester');

        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room == Game.rooms[room]);
        var Spawn1 = room.find((FIND_MY_STRUCTURES), {filter: (spawns) => spawns.structureType == STRUCTURE_SPAWN});
        var creeps = _.filter(Game.creeps, (c) => c.room == room);

        if (numberOfHarvesters < 2) {
            Spawn1[0].createCreep([WORK, MOVE, CARRY], undefined, {role: 'harvester'});
        }
        for (var name in creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
        }

    }
}

module.exports = controllerRoom;
