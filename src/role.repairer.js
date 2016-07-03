/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function (creep) {

        if(creep.room.find(FIND_CONSTRUCTION_SITES).length>0)
        {
                creep.memory.role = 'builder';
        }

        var needsRepair = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;

            }

        });
        var walls = creep.room.find(FIND_STRUCTURES,{filter: (walls) => walls.structureType == STRUCTURE_WALL&&walls.hits<12000});



        if (creep.memory.isRepairing == true && creep.carry.energy == 0) {
            creep.memory.isRepairing = false;
        }
        else if (creep.memory.isRepairing == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.isRepairing = true;
        }

        if (creep.memory.isRepairing == true) {
            if (needsRepair.length && needsRepair.length > 0) {
                if (creep.repair(needsRepair[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(needsRepair[0]);
                }
            }
            else if (walls.length>0)
            {
                var use;
                var min=300000000;
                for (let i=0;i<walls.length;i++)
                {
                    if(walls[i].hits<min)
                    {
                        min = walls[i];
                        use=walls[i];
                    }
                }

                if (creep.repair(use) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(use);
                }
            }

        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.energy > 0;
                }
            });


            if (targets.length > 0) {
                var max = 0;
                var useThis;
                for (var i in targets) {

                    if (targets[i].energy > max) {
                        max = targets[i].energy;
                        useThis = targets[i];
                    }

                }
                if (useThis.transferEnergy(creep, useThis.energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(useThis);
                }
            }
        }

    }

};