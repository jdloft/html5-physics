// Levels
var defaultLevel = {
    name: "default",
    description: "The default level, has been here for a very long time",
    listable: true,
    spawn_point: [150, 200],
    static_objects: [
        {x: 0, y: 50, w: 500, h: 10},
        {x: 0, y: 200, w: 400, h: 10},
        {x: 100, y: 100, w: 500, h: 10},
        {x: 800, y: 300, w: 70, h: 10},
        {x: 0, y: 40, w: 10, h: 800},
        {x: 30, y: 0, w: 10, h: 800},
        {x: 400, y: 500, w: 800, h: 10}
    ]
};

var test1Level = {
    name: "test1",
    description: "Simple test level, created by modifying \"default\"",
    listable: true,
    spawn_point: [100, 140],
    static_objects: [
        {x: 0, y: 0, w: 0, h: 0},
        {x: 0, y: 50, w: 500, h: 10},
        {x: -300, y: 0, w: 400, h: 10},
        {x: 100, y: 100, w: 500, h: 10},
        {x: -60, y: -100, w: 700, h: 10},
        {x: -60, y: -100, w: 700, h: 10}
    ]
};

var jaredLevel = {
    name: "kid #1",
    description: "You know who you are",
    listable: true,
    spawn_point: [0, 39],
    static_objects: [
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},
        {x: 0, y: 40, w: 20, h: 20, color: "#fff"},

        {x: -519.1576799943705, y: -214.18800001544878, w: 10, h: 50},
        {x: -510, y: -194.21999999624677, w: 30, h: 10},
        {x: -480, y: -213.96400000344147, w: 10, h: 50},
        {x: -457.35996572022646, y: -194.8769999993674, w: 50, h: 10},
        {x: -457.2542514373988, y: -173.20999999524793, w: 50, h: 10},
        {x: -457.2793942997598, y: -213.62799997464754, w: 10, h: 50},
        {x: -416.5595170051447, y: -213.32600001909304, w: 10, h: 50},

        {x: -389.1576799943705, y: -214.18800001544878, w: 10, h: 50},
        {x: -380, y: -194.21999999624677, w: 30, h: 10},
        {x: -350, y: -213.96400000344147, w: 10, h: 50},
        {x: -327.35996572022646, y: -194.8769999993674, w: 50, h: 10},
        {x: -327.2542514373988, y: -173.20999999524793, w: 50, h: 10},
        {x: -327.2793942997598, y: -213.62799997464754, w: 10, h: 50},
        {x: -286.5595170051447, y: -213.32600001909304, w: 10, h: 50},

        {x: -259.1576799943705, y: -214.18800001544878, w: 10, h: 50},
        {x: -250, y: -194.21999999624677, w: 30, h: 10},
        {x: -220, y: -213.96400000344147, w: 10, h: 50},
        {x: -197.35996572022646, y: -194.8769999993674, w: 50, h: 10},
        {x: -197.2542514373988, y: -173.20999999524793, w: 50, h: 10},
        {x: -197.2793942997598, y: -213.62799997464754, w: 10, h: 50},
        {x: -156.5595170051447, y: -213.32600001909304, w: 10, h: 50}
    ]
};

var campaign1Level = {
    name: "campaign1",
    description: "Level 1 for the campaign",
    listable: true,
    spawn_point: [0, 20],
    static_objects: [
        {x: 0, y: 0, w: 500, h: 10}
    ]
};

var campaign2Level = {
    name: "campaign2",
    description: "Level 2 for the campaign",
    listable: false,
    spawn_point: [0, 20],
    static_objects: [
        {x: 0, y: 0, w: 500, h: 10}
    ]
};

var campaign3Level = {
    name: "campaign3",
    description: "Level 3 for the campaign",
    listable: false,
    spawn_point: [0, 20],
    static_objects: [
        {x: 0, y: 0, w: 500, h: 10}
    ]
};

var levels = [
    defaultLevel,
    test1Level,
    jaredLevel,
    campaign1Level,
    campaign2Level,
    campaign3Level
];
