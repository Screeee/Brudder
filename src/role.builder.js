var roleBuilder = {

    run: function (creep) {

        var srcs = creep.room.find(FIND_SOURCES_ACTIVE);
        if (srcs.length > 0) {
            var sourcePosX = srcs[0].pos.x;
            var sourcePosY = srcs[0].pos.y;
            var creepsAtA = creep.room.lookForAtArea(LOOK_CREEPS, sourcePosY - 1, sourcePosX - 1, sourcePosY + 1, sourcePosX + 1, true);
            if (srcs.length > 1) {
                var sourceBPosX = srcs[1].pos.x;
                var sourceBPosY = srcs[1].pos.y;
                var creepsAtB = creep.room.lookForAtArea(LOOK_CREEPS, sourceBPosY - 1, sourceBPosX - 1, sourceBPosY + 1, sourceBPosX + 1, true);
            }

        }

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            if (creep.memory.source == -1) {
                if (creepsAtA > creepsAtB) {
                    creep.memory.source = 1;
                }
                else {
                    creep.memory.source = 0;
                }
            }
        }
        if (creep.memory.building == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.source = -1;
        }

        if (creep.memory.upgrading == false && creep.memory.source == -1) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.building == true) {
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (targets != null) {
                if (creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            else
            {
                creep.moveTo(Game.flags.builders.pos);
            }

        }
        else {
            var source = creep.room.find(FIND_SOURCES);
            if (creep.memory.source == 0) {
                if (creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source[0]);
                }
            }
            else if (creep.memory.source == 1) {
                if (creep.harvest(source[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source[1]);
                }
            }
        }
    }


};
module.exports = roleBuilder;