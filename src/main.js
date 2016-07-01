module.exports.loop = function () {
    //clear memory

    for (let names in Memory.creeps) {
        if (Game.creeps[names] == undefined) {
            delete Memory.creeps[names];
        }
    }

    // Start off by iterating through all the rooms
    for (let room in Game.rooms) {
        if (Game.rooms[room].controller.my)
        {
            if (Game.rooms[room].controller.level == 1) {
                var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.room == Game.rooms[room]);
                var Spawn1 =  Game.rooms[room].find(STRUCTURE_SPAWN);
                if (numberOfHarvesters < 2) {
                    Game.spawns.Spawn1.createCreep([WORK,MOVE,CARRY], undefined, {role:'harvester'});
                }
            }
        }

        else if (Game.rooms[room].controller.owner != undefined) {
            // This isn't ours and isn't blank?
        } else if (Game.rooms[room].controller.owner == undefined) {
            // This isn't ours and is blank
        }
    }

};

