var controllerRoom = {
    run: function (room) {
        switch (room.controller.level) {
            case 1:
                level1();
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
    }
};

module.exports = controllerRoom;
