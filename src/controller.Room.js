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
    },

    level1 : function (room){
        if (Game.rooms[room].controller.level == 1) {
            var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room == Game.rooms[room]);
            var Spawn1 =  Game.rooms[room].find((FIND_MY_STRUCTURES),{filter: (spawns) => spawns.structureType==STRUCTURE_SPAWN});
            if (numberOfHarvesters < 2) {
                Game.spawns.Spawn1.createCreep([WORK,MOVE,CARRY], undefined, {role:'harvester'});
            }
        }
    }
};

module.exports = controllerRoom;
