var roleHarvester = {
    /** @param {Creep} creep **/
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



        if (creep.memory.depositing == undefined||creep.memory.source == undefined)
        {
            creep.drop(RESOURCE_ENERGY,creep.carry.energy);
            creep.memory.depositing = false;
            creep.memory.source  = 0;
        }

        if (creep.memory.depositing == true && creep.carry.energy ==0)
        {
            if(creepsAtA<=creepsAtB)
            {
                creep.memory.source =0;
            }
            else
            {
                creep.memory.source=1;
            }
            creep.memory.depositing=false;
        }
        else if(creep.memory.depositing==false&&creep.carry.energy==creep.carryCapacity)
        {
            creep.memory.depositing =true;

        }

        if (creep.memory.depositing)
        {
            var container = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure)=> {
                    return (structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity
                }
            });

            if (container.length > 0) {
                if (creep.transfer(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container[0]);
                }
            }
        }
        else
        {
            if (creep.harvest(srcs[creep.memory.source])==ERR_NOT_IN_RANGE)
            {
                creep.moveTo(srcs[creep.memory.source]);
            }

        }














        //
        // if (creep.carry.energy ==0 && creep.memory.depositing == true) {
        //     var sources = creep.room.find(FIND_SOURCES);
        //
        //     if (creepsAtA<=creepsAtB) {
        //         if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(sources[0]);
        //
        //         }
        //     }
        //     else if (creepsAtA>creepsAtB)
        //     {
        //         if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(sources[1]);
        //
        //         }
        //     }
        // }
        // else {
        //
        //         var container = creep.room.find(FIND_STRUCTURES, {
        //             filter: (structure)=> {
        //                 return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity
        //             }
        //         });
        //
        //         if (container.length > 0) {
        //             if (creep.transfer(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(container[0]);
        //             }
        //         }
        //
        //
        // }
    }
};

module.exports = roleHarvester;