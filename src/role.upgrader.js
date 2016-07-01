var roleUpgrader = {

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

        if (creep.memory.upgrading == true && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            if (creep.memory.source == -1) {
                if (creepsAtA > creepsAtB) {
                    creep.memory.source = 1;
                }
                else {
                    creep.memory.source = 0;
                }
            }

        }
        if (creep.memory.upgrading == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.memory.source = -1;
        }

        if (creep.memory.upgrading == false && creep.memory.source == -1) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);

            }

        }
        else {
            var sources = creep.room.find(FIND_SOURCES);


            //experimental code
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy > 0;
                }
            });


            if (targets.length > 0) {
                var max = 0;
                var use;
                for (var i in targets) {

                    if (targets[i].energy > max) {
                        max = targets[i].energy;
                        use = targets[i];
                    }

                }
                if (use.transferEnergy(creep, use.energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(use);
                }
            }
            //backup code
            // if (creep.memory.source==0) {
            //     if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE ) {
            //         creep.moveTo(sources[0]);
            //     }
            // }
            // else if (creep.memory.source==1)
            // {
            //     if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE ) {
            //         creep.moveTo(sources[1]);
            //     }
            // }

        }
    }

};
module.exports = roleUpgrader;