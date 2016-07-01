module.exports.loop = function () {
    //clear memory

    for (let names in Memory.creeps) {
        if (Memory.creeps.hasOwnProperty(names)) {
            if (Memory.creeps[names] == undefined) {
                delete Memory.creeps[names];
            }
        }
    }

    // Start off by iterating through all the rooms
    for (let room in Game.rooms) {
        if (Game.rooms.hasOwnProperty(room)) {
            var roomObj = Game.rooms[room];
            if (roomObj.controller.my) {
                // This is our room so let's start upgrading
                var roomController = require('controller.Room');
                roomController.run(roomObj);
            } else if (roomObj.controller.owner != undefined) {
                // This isn't ours and isn't blank?
            } else if (roomObj.controller.owner == undefined) {
                // This isn't ours and is blank
            }
        }
    }
};

