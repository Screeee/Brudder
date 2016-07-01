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
            
        }

        else if (Game.rooms[room].controller.owner != undefined) {
            // This isn't ours and isn't blank?
        } else if (Game.rooms[room].controller.owner == undefined) {
            // This isn't ours and is blank
        }
    }

};

