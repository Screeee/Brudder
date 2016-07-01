/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.mover');
 * mod.thing == 'a thing'; // true
 * 
 * 
 * 
 * 
 * moves energy from storage to valid places
 * requires 'mover' in memory
 * BODY : contains 1 move and the rest carry (no work)
 */

module.exports = {

    run: function (creep) {




            
            if (creep.carry.energy==0)
            {
                var containers = creep.room.find(FIND_STRUCTURES, {filter: (containers) => {return (containers.structureType == STRUCTURE_CONTAINER) && containers.store[RESOURCE_ENERGY] > creep.carryCapacity;}});
                //console.log(containers.length);
                if (containers.length>0) {
                    var max = 0;
                    var use;
                    for (let i in containers) {
                        if (containers[i].store[RESOURCE_ENERGY] > max) {
                            max = containers[i].store[RESOURCE_ENERGY];
                            use = containers[i];
                        }
                    }
                    if (use.transfer(creep, [RESOURCE_ENERGY], creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(use);
                    }
                }
                else
                {
                    creep.moveTo(Game.flags.movers.pos);
                }
            }
            else
            {
                var storage = creep.pos.findClosestByPath((FIND_MY_STRUCTURES), {filter: (c) => {return (c.structureType==STRUCTURE_EXTENSION||c.structureType==STRUCTURE_SPAWN)&&c.energy<c.energyCapacity;}});
                var turret =  creep.pos.findClosestByPath((FIND_MY_STRUCTURES), {filter: (c) => {return (c.structureType==STRUCTURE_TOWER)&&c.energy<c.energyCapacity;}})
                if(storage) {

                    var bestStorage;
                    var min =99999999;
                    // for (let i in storage) {
                    //     if (storage[i].energy < min) {
                    //         min = storage[i].energy;
                    //         bestStorage = storage[i];
                    //     }
                    // }

                    //if (creep.transfer(bestStorage,[RESOURCE_ENERGY],creep.energy)==ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(storage);
                    }
                    //else
                    {
                        creep.transfer(storage,RESOURCE_ENERGY,creep.energy)
                    }

                }
                    else if (turret)
                {
                    creep.moveTo(turret);
                    creep.transfer(turret,RESOURCE_ENERGY,creep.energy);
                }

                else
                {
                    creep.moveTo(Game.flags.movers.pos);
                }

                
            }
            
        }



    };
