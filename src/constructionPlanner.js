module.exports = {
    
    
    buildRoads: function (room, from, to) {
        var path = room.findPath(from, to, {ignoreCreeps: true});
        for (let i in path) {
            var result = room.createConstructionSite(path[i].x, path[i].y, Game.STRUCTURE_ROAD);
        }
    },

    buildRoadToAllSources: function (Spawn1) {
        var sources = Spawn1.room.find(FIND_SOURCES);

        for (let i in sources) {
            this.buildRoads(Spawn1.room, Spawn1.pos, sources[i].pos);
        }
    },
    
    buildControllerRoad: function (myController,Spawn1)
    {
        this.buildRoads(myController.room,myController.pos,Spawn1.pos);
    }
};

