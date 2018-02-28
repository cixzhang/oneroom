window.enemies = {
  doghouse: {
    health: 20,
    speed: 200,
    damage: 5,
    fireRate: 200,
    map: {
          "tileswide": 3,
          "tileheight": 8,
          "tileshigh": 4,
          "layers":
          [
              {"name":"Layer 1","tiles":[{"y":0,"flipX":false,"rot":0,"index":0,"tile":-1,"x":0},{"y":0,"flipX":false,"rot":0,"index":1,"tile":-1,"x":1},{"y":0,"flipX":false,"rot":0,"index":2,"tile":-1,"x":2},{"y":1,"flipX":false,"rot":0,"index":3,"tile":-1,"x":0},{"y":1,"flipX":false,"rot":0,"index":4,"tile":35,"x":1},{"y":1,"flipX":false,"rot":0,"index":5,"tile":-1,"x":2},{"y":2,"flipX":false,"rot":0,"index":6,"tile":-1,"x":0},{"y":2,"flipX":false,"rot":0,"index":7,"tile":-1,"x":1},{"y":2,"flipX":false,"rot":0,"index":8,"tile":-1,"x":2},{"y":3,"flipX":false,"rot":0,"index":9,"tile":-1,"x":0},{"y":3,"flipX":false,"rot":0,"index":10,"tile":-1,"x":1},{"y":3,"flipX":false,"rot":0,"index":11,"tile":-1,"x":2}],"number":0},
              {"name":"Layer 0","tiles":[{"y":0,"flipX":false,"rot":0,"index":0,"tile":2,"x":0},{"y":0,"flipX":false,"rot":0,"index":1,"tile":3,"x":1},{"y":0,"flipX":false,"rot":0,"index":2,"tile":4,"x":2},{"y":1,"flipX":false,"rot":0,"index":3,"tile":10,"x":0},{"y":1,"flipX":false,"rot":0,"index":4,"tile":11,"x":1},{"y":1,"flipX":false,"rot":0,"index":5,"tile":12,"x":2},{"y":2,"flipX":false,"rot":0,"index":6,"tile":18,"x":0},{"y":2,"flipX":false,"rot":0,"index":7,"tile":19,"x":1},{"y":2,"flipX":false,"rot":0,"index":8,"tile":20,"x":2},{"y":3,"flipX":false,"rot":0,"index":9,"tile":26,"x":0},{"y":3,"flipX":false,"rot":0,"index":10,"tile":27,"x":1},{"y":3,"flipX":false,"rot":0,"index":11,"tile":28,"x":2}],"number":1}
          ],
          "tilewidth": 8
    },
    genNPCs: () => {
      return Math.random() < 0.1 ? [1] : [4];
    },
    genResources: () => {
      return {
        food: _.random(4, 6),
        wood: _.random(0, 1),
        metal: 0,
      };
    },
  },

  single: {
    health: 40,
    speed: 150,
    damage: 8,
    fireRate: 160,
    map: {
          "tileswide": 6,
          "tileheight": 8,
          "tileshigh": 6,
          "layers":
          [
                    {"name":"Layer 2","tiles":[{"y":0,"flipX":false,"rot":0,"index":0,"tile":-1,"x":0},{"y":0,"flipX":false,"rot":0,"index":1,"tile":-1,"x":1},{"y":0,"flipX":false,"rot":0,"index":2,"tile":-1,"x":2},{"y":0,"flipX":false,"rot":0,"index":3,"tile":-1,"x":3},{"y":0,"flipX":false,"rot":0,"index":4,"tile":-1,"x":4},{"y":0,"flipX":false,"rot":0,"index":5,"tile":-1,"x":5},{"y":1,"flipX":false,"rot":0,"index":6,"tile":-1,"x":0},{"y":1,"flipX":false,"rot":0,"index":7,"tile":29,"x":1},{"y":1,"flipX":false,"rot":0,"index":8,"tile":-1,"x":2},{"y":1,"flipX":false,"rot":0,"index":9,"tile":-1,"x":3},{"y":1,"flipX":false,"rot":0,"index":10,"tile":-1,"x":4},{"y":1,"flipX":false,"rot":0,"index":11,"tile":-1,"x":5},{"y":2,"flipX":false,"rot":0,"index":12,"tile":-1,"x":0},{"y":2,"flipX":false,"rot":0,"index":13,"tile":-1,"x":1},{"y":2,"flipX":false,"rot":0,"index":14,"tile":-1,"x":2},{"y":2,"flipX":false,"rot":0,"index":15,"tile":-1,"x":3},{"y":2,"flipX":false,"rot":0,"index":16,"tile":-1,"x":4},{"y":2,"flipX":false,"rot":0,"index":17,"tile":-1,"x":5},{"y":3,"flipX":false,"rot":0,"index":18,"tile":-1,"x":0},{"y":3,"flipX":false,"rot":0,"index":19,"tile":-1,"x":1},{"y":3,"flipX":false,"rot":0,"index":20,"tile":-1,"x":2},{"y":3,"flipX":false,"rot":0,"index":21,"tile":-1,"x":3},{"y":3,"flipX":false,"rot":0,"index":22,"tile":-1,"x":4},{"y":3,"flipX":false,"rot":0,"index":23,"tile":-1,"x":5},{"y":4,"flipX":false,"rot":0,"index":24,"tile":-1,"x":0},{"y":4,"flipX":false,"rot":0,"index":25,"tile":-1,"x":1},{"y":4,"flipX":false,"rot":0,"index":26,"tile":-1,"x":2},{"y":4,"flipX":false,"rot":0,"index":27,"tile":-1,"x":3},{"y":4,"flipX":false,"rot":0,"index":28,"tile":-1,"x":4},{"y":4,"flipX":false,"rot":0,"index":29,"tile":-1,"x":5},{"y":5,"flipX":false,"rot":0,"index":30,"tile":-1,"x":0},{"y":5,"flipX":false,"rot":0,"index":31,"tile":-1,"x":1},{"y":5,"flipX":false,"rot":0,"index":32,"tile":-1,"x":2},{"y":5,"flipX":false,"rot":0,"index":33,"tile":-1,"x":3},{"y":5,"flipX":false,"rot":0,"index":34,"tile":-1,"x":4},{"y":5,"flipX":false,"rot":0,"index":35,"tile":-1,"x":5}],"number":0},
                    {"name":"Layer 1","tiles":[{"y":0,"flipX":false,"rot":0,"index":0,"tile":-1,"x":0},{"y":0,"flipX":false,"rot":0,"index":1,"tile":-1,"x":1},{"y":0,"flipX":false,"rot":0,"index":2,"tile":-1,"x":2},{"y":0,"flipX":false,"rot":0,"index":3,"tile":-1,"x":3},{"y":0,"flipX":false,"rot":0,"index":4,"tile":-1,"x":4},{"y":0,"flipX":true,"rot":0,"index":5,"tile":22,"x":5},{"y":1,"flipX":false,"rot":0,"index":6,"tile":-1,"x":0},{"y":1,"flipX":false,"rot":0,"index":7,"tile":32,"x":1},{"y":1,"flipX":false,"rot":0,"index":8,"tile":33,"x":2},{"y":1,"flipX":false,"rot":0,"index":9,"tile":-1,"x":3},{"y":1,"flipX":true,"rot":0,"index":10,"tile":31,"x":4},{"y":1,"flipX":true,"rot":0,"index":11,"tile":30,"x":5},{"y":2,"flipX":false,"rot":0,"index":12,"tile":-1,"x":0},{"y":2,"flipX":false,"rot":0,"index":13,"tile":40,"x":1},{"y":2,"flipX":false,"rot":0,"index":14,"tile":41,"x":2},{"y":2,"flipX":false,"rot":0,"index":15,"tile":-1,"x":3},{"y":2,"flipX":true,"rot":0,"index":16,"tile":39,"x":4},{"y":2,"flipX":true,"rot":0,"index":17,"tile":38,"x":5},{"y":3,"flipX":false,"rot":0,"index":18,"tile":-1,"x":0},{"y":3,"flipX":false,"rot":0,"index":19,"tile":35,"x":1},{"y":3,"flipX":false,"rot":0,"index":20,"tile":-1,"x":2},{"y":3,"flipX":false,"rot":0,"index":21,"tile":-1,"x":3},{"y":3,"flipX":false,"rot":0,"index":22,"tile":-1,"x":4},{"y":3,"flipX":false,"rot":0,"index":23,"tile":-1,"x":5},{"y":4,"flipX":false,"rot":0,"index":24,"tile":-1,"x":0},{"y":4,"flipX":false,"rot":0,"index":25,"tile":-1,"x":1},{"y":4,"flipX":false,"rot":0,"index":26,"tile":-1,"x":2},{"y":4,"flipX":false,"rot":0,"index":27,"tile":-1,"x":3},{"y":4,"flipX":false,"rot":0,"index":28,"tile":-1,"x":4},{"y":4,"flipX":false,"rot":0,"index":29,"tile":-1,"x":5},{"y":5,"flipX":false,"rot":0,"index":30,"tile":-1,"x":0},{"y":5,"flipX":false,"rot":0,"index":31,"tile":-1,"x":1},{"y":5,"flipX":false,"rot":0,"index":32,"tile":-1,"x":2},{"y":5,"flipX":false,"rot":0,"index":33,"tile":-1,"x":3},{"y":5,"flipX":false,"rot":0,"index":34,"tile":-1,"x":4},{"y":5,"flipX":false,"rot":0,"index":35,"tile":-1,"x":5}],"number":1},
                    {"name":"Layer 0","tiles":[{"y":0,"flipX":false,"rot":0,"index":0,"tile":2,"x":0},{"y":0,"flipX":false,"rot":0,"index":1,"tile":3,"x":1},{"y":0,"flipX":false,"rot":0,"index":2,"tile":3,"x":2},{"y":0,"flipX":false,"rot":0,"index":3,"tile":3,"x":3},{"y":0,"flipX":false,"rot":0,"index":4,"tile":3,"x":4},{"y":0,"flipX":false,"rot":0,"index":5,"tile":4,"x":5},{"y":1,"flipX":false,"rot":0,"index":6,"tile":10,"x":0},{"y":1,"flipX":false,"rot":0,"index":7,"tile":11,"x":1},{"y":1,"flipX":false,"rot":0,"index":8,"tile":11,"x":2},{"y":1,"flipX":false,"rot":0,"index":9,"tile":11,"x":3},{"y":1,"flipX":false,"rot":0,"index":10,"tile":11,"x":4},{"y":1,"flipX":false,"rot":0,"index":11,"tile":12,"x":5},{"y":2,"flipX":false,"rot":0,"index":12,"tile":10,"x":0},{"y":2,"flipX":false,"rot":0,"index":13,"tile":11,"x":1},{"y":2,"flipX":false,"rot":0,"index":14,"tile":11,"x":2},{"y":2,"flipX":false,"rot":0,"index":15,"tile":11,"x":3},{"y":2,"flipX":false,"rot":0,"index":16,"tile":11,"x":4},{"y":2,"flipX":false,"rot":0,"index":17,"tile":12,"x":5},{"y":3,"flipX":false,"rot":0,"index":18,"tile":10,"x":0},{"y":3,"flipX":false,"rot":0,"index":19,"tile":11,"x":1},{"y":3,"flipX":false,"rot":0,"index":20,"tile":11,"x":2},{"y":3,"flipX":false,"rot":0,"index":21,"tile":11,"x":3},{"y":3,"flipX":false,"rot":0,"index":22,"tile":11,"x":4},{"y":3,"flipX":false,"rot":0,"index":23,"tile":12,"x":5},{"y":4,"flipX":false,"rot":0,"index":24,"tile":18,"x":0},{"y":4,"flipX":false,"rot":0,"index":25,"tile":19,"x":1},{"y":4,"flipX":false,"rot":0,"index":26,"tile":21,"x":2},{"y":4,"flipX":false,"rot":0,"index":27,"tile":21,"x":3},{"y":4,"flipX":false,"rot":0,"index":28,"tile":21,"x":4},{"y":4,"flipX":false,"rot":0,"index":29,"tile":20,"x":5},{"y":5,"flipX":false,"rot":0,"index":30,"tile":26,"x":0},{"y":5,"flipX":false,"rot":0,"index":31,"tile":27,"x":1},{"y":5,"flipX":false,"rot":0,"index":32,"tile":27,"x":2},{"y":5,"flipX":false,"rot":0,"index":33,"tile":27,"x":3},{"y":5,"flipX":false,"rot":0,"index":34,"tile":27,"x":4},{"y":5,"flipX":false,"rot":0,"index":35,"tile":28,"x":5}],"number":2}
                ],
      "tilewidth": 8
    },
    genNPCs: () => {
      const list = [4];
      list.unshift.apply(list, _.sample([1, 2, 3], 1));
      return list;
    },
    genResources: () => {
      return {
        food: _.random(2, 5),
        wood: _.random(4, 6),
        metal: _.random(0, 2),
      };
    },
  },

  double: {
    health: 80,
    speed: 100,
    damage: 10,
    fireRate: 100,
    map: {
          "tileswide": 6,
            "tileheight": 8,
            "tileshigh": 7,
            "layers":
          [
              {"name":"Layer 1","tiles":[{"y":0,"flipX":false,"rot":0,"index":0,"tile":-1,"x":0},{"y":0,"flipX":false,"rot":0,"index":1,"tile":16,"x":1},{"y":0,"flipX":false,"rot":0,"index":2,"tile":17,"x":2},{"y":0,"flipX":false,"rot":0,"index":3,"tile":-1,"x":3},{"y":0,"flipX":false,"rot":0,"index":4,"tile":-1,"x":4},{"y":0,"flipX":true,"rot":0,"index":5,"tile":22,"x":5},{"y":1,"flipX":false,"rot":0,"index":6,"tile":-1,"x":0},{"y":1,"flipX":false,"rot":0,"index":7,"tile":24,"x":1},{"y":1,"flipX":false,"rot":0,"index":8,"tile":25,"x":2},{"y":1,"flipX":false,"rot":0,"index":9,"tile":-1,"x":3},{"y":1,"flipX":true,"rot":0,"index":10,"tile":31,"x":4},{"y":1,"flipX":true,"rot":0,"index":11,"tile":30,"x":5},{"y":2,"flipX":false,"rot":0,"index":12,"tile":22,"x":0},{"y":2,"flipX":false,"rot":0,"index":13,"tile":-1,"x":1},{"y":2,"flipX":false,"rot":0,"index":14,"tile":-1,"x":2},{"y":2,"flipX":false,"rot":0,"index":15,"tile":-1,"x":3},{"y":2,"flipX":true,"rot":0,"index":16,"tile":39,"x":4},{"y":2,"flipX":true,"rot":0,"index":17,"tile":38,"x":5},{"y":3,"flipX":false,"rot":0,"index":18,"tile":30,"x":0},{"y":3,"flipX":false,"rot":0,"index":19,"tile":31,"x":1},{"y":3,"flipX":false,"rot":0,"index":20,"tile":-1,"x":2},{"y":3,"flipX":false,"rot":0,"index":21,"tile":32,"x":3},{"y":3,"flipX":false,"rot":0,"index":22,"tile":33,"x":4},{"y":3,"flipX":false,"rot":0,"index":23,"tile":-1,"x":5},{"y":4,"flipX":false,"rot":0,"index":24,"tile":38,"x":0},{"y":4,"flipX":false,"rot":0,"index":25,"tile":39,"x":1},{"y":4,"flipX":false,"rot":0,"index":26,"tile":-1,"x":2},{"y":4,"flipX":false,"rot":0,"index":27,"tile":40,"x":3},{"y":4,"flipX":false,"rot":0,"index":28,"tile":41,"x":4},{"y":4,"flipX":false,"rot":0,"index":29,"tile":-1,"x":5},{"y":5,"flipX":false,"rot":0,"index":30,"tile":-1,"x":0},{"y":5,"flipX":false,"rot":0,"index":31,"tile":-1,"x":1},{"y":5,"flipX":false,"rot":0,"index":32,"tile":-1,"x":2},{"y":5,"flipX":false,"rot":0,"index":33,"tile":-1,"x":3},{"y":5,"flipX":false,"rot":0,"index":34,"tile":-1,"x":4},{"y":5,"flipX":false,"rot":0,"index":35,"tile":-1,"x":5},{"y":6,"flipX":false,"rot":0,"index":36,"tile":-1,"x":0},{"y":6,"flipX":false,"rot":0,"index":37,"tile":-1,"x":1},{"y":6,"flipX":false,"rot":0,"index":38,"tile":-1,"x":2},{"y":6,"flipX":false,"rot":0,"index":39,"tile":-1,"x":3},{"y":6,"flipX":false,"rot":0,"index":40,"tile":-1,"x":4},{"y":6,"flipX":false,"rot":0,"index":41,"tile":-1,"x":5}],"number":0},
                {"name":"Layer 3","tiles":[{"y":0,"flipX":false,"rot":0,"index":0,"tile":-1,"x":0},{"y":0,"flipX":false,"rot":0,"index":1,"tile":-1,"x":1},{"y":0,"flipX":false,"rot":0,"index":2,"tile":-1,"x":2},{"y":0,"flipX":false,"rot":0,"index":3,"tile":-1,"x":3},{"y":0,"flipX":false,"rot":0,"index":4,"tile":-1,"x":4},{"y":0,"flipX":false,"rot":0,"index":5,"tile":-1,"x":5},{"y":1,"flipX":false,"rot":0,"index":6,"tile":-1,"x":0},{"y":1,"flipX":false,"rot":0,"index":7,"tile":-1,"x":1},{"y":1,"flipX":false,"rot":0,"index":8,"tile":-1,"x":2},{"y":1,"flipX":false,"rot":0,"index":9,"tile":-1,"x":3},{"y":1,"flipX":false,"rot":0,"index":10,"tile":-1,"x":4},{"y":1,"flipX":false,"rot":0,"index":11,"tile":-1,"x":5},{"y":2,"flipX":false,"rot":0,"index":12,"tile":-1,"x":0},{"y":2,"flipX":false,"rot":0,"index":13,"tile":-1,"x":1},{"y":2,"flipX":false,"rot":0,"index":14,"tile":36,"x":2},{"y":2,"flipX":false,"rot":0,"index":15,"tile":37,"x":3},{"y":2,"flipX":false,"rot":0,"index":16,"tile":-1,"x":4},{"y":2,"flipX":false,"rot":0,"index":17,"tile":-1,"x":5},{"y":3,"flipX":false,"rot":0,"index":18,"tile":-1,"x":0},{"y":3,"flipX":false,"rot":0,"index":19,"tile":-1,"x":1},{"y":3,"flipX":false,"rot":0,"index":20,"tile":44,"x":2},{"y":3,"flipX":false,"rot":0,"index":21,"tile":45,"x":3},{"y":3,"flipX":false,"rot":0,"index":22,"tile":-1,"x":4},{"y":3,"flipX":false,"rot":0,"index":23,"tile":-1,"x":5},{"y":4,"flipX":false,"rot":0,"index":24,"tile":-1,"x":0},{"y":4,"flipX":false,"rot":0,"index":25,"tile":-1,"x":1},{"y":4,"flipX":false,"rot":0,"index":26,"tile":-1,"x":2},{"y":4,"flipX":false,"rot":0,"index":27,"tile":-1,"x":3},{"y":4,"flipX":false,"rot":0,"index":28,"tile":-1,"x":4},{"y":4,"flipX":false,"rot":0,"index":29,"tile":-1,"x":5},{"y":5,"flipX":false,"rot":0,"index":30,"tile":-1,"x":0},{"y":5,"flipX":false,"rot":0,"index":31,"tile":-1,"x":1},{"y":5,"flipX":false,"rot":0,"index":32,"tile":-1,"x":2},{"y":5,"flipX":false,"rot":0,"index":33,"tile":-1,"x":3},{"y":5,"flipX":false,"rot":0,"index":34,"tile":-1,"x":4},{"y":5,"flipX":false,"rot":0,"index":35,"tile":-1,"x":5},{"y":6,"flipX":false,"rot":0,"index":36,"tile":-1,"x":0},{"y":6,"flipX":false,"rot":0,"index":37,"tile":-1,"x":1},{"y":6,"flipX":false,"rot":0,"index":38,"tile":-1,"x":2},{"y":6,"flipX":false,"rot":0,"index":39,"tile":-1,"x":3},{"y":6,"flipX":false,"rot":0,"index":40,"tile":-1,"x":4},{"y":6,"flipX":false,"rot":0,"index":41,"tile":-1,"x":5}],"number":1},
                  {"name":"Layer 0","tiles":[{"y":0,"flipX":false,"rot":0,"index":0,"tile":2,"x":0},{"y":0,"flipX":false,"rot":0,"index":1,"tile":3,"x":1},{"y":0,"flipX":false,"rot":0,"index":2,"tile":3,"x":2},{"y":0,"flipX":false,"rot":0,"index":3,"tile":3,"x":3},{"y":0,"flipX":false,"rot":0,"index":4,"tile":3,"x":4},{"y":0,"flipX":false,"rot":0,"index":5,"tile":4,"x":5},{"y":1,"flipX":false,"rot":0,"index":6,"tile":10,"x":0},{"y":1,"flipX":false,"rot":0,"index":7,"tile":11,"x":1},{"y":1,"flipX":false,"rot":0,"index":8,"tile":11,"x":2},{"y":1,"flipX":false,"rot":0,"index":9,"tile":11,"x":3},{"y":1,"flipX":false,"rot":0,"index":10,"tile":11,"x":4},{"y":1,"flipX":false,"rot":0,"index":11,"tile":12,"x":5},{"y":2,"flipX":false,"rot":0,"index":12,"tile":10,"x":0},{"y":2,"flipX":false,"rot":0,"index":13,"tile":11,"x":1},{"y":2,"flipX":false,"rot":0,"index":14,"tile":11,"x":2},{"y":2,"flipX":false,"rot":0,"index":15,"tile":11,"x":3},{"y":2,"flipX":false,"rot":0,"index":16,"tile":11,"x":4},{"y":2,"flipX":false,"rot":0,"index":17,"tile":12,"x":5},{"y":3,"flipX":false,"rot":0,"index":18,"tile":10,"x":0},{"y":3,"flipX":false,"rot":0,"index":19,"tile":11,"x":1},{"y":3,"flipX":false,"rot":0,"index":20,"tile":11,"x":2},{"y":3,"flipX":false,"rot":0,"index":21,"tile":11,"x":3},{"y":3,"flipX":false,"rot":0,"index":22,"tile":11,"x":4},{"y":3,"flipX":false,"rot":0,"index":23,"tile":12,"x":5},{"y":4,"flipX":false,"rot":0,"index":24,"tile":10,"x":0},{"y":4,"flipX":false,"rot":0,"index":25,"tile":11,"x":1},{"y":4,"flipX":false,"rot":0,"index":26,"tile":11,"x":2},{"y":4,"flipX":false,"rot":0,"index":27,"tile":11,"x":3},{"y":4,"flipX":false,"rot":0,"index":28,"tile":11,"x":4},{"y":4,"flipX":false,"rot":0,"index":29,"tile":12,"x":5},{"y":5,"flipX":false,"rot":0,"index":30,"tile":18,"x":0},{"y":5,"flipX":false,"rot":0,"index":31,"tile":19,"x":1},{"y":5,"flipX":false,"rot":0,"index":32,"tile":21,"x":2},{"y":5,"flipX":false,"rot":0,"index":33,"tile":21,"x":3},{"y":5,"flipX":false,"rot":0,"index":34,"tile":21,"x":4},{"y":5,"flipX":false,"rot":0,"index":35,"tile":20,"x":5},{"y":6,"flipX":false,"rot":0,"index":36,"tile":26,"x":0},{"y":6,"flipX":false,"rot":0,"index":37,"tile":27,"x":1},{"y":6,"flipX":false,"rot":0,"index":38,"tile":27,"x":2},{"y":6,"flipX":false,"rot":0,"index":39,"tile":27,"x":3},{"y":6,"flipX":false,"rot":0,"index":40,"tile":27,"x":4},{"y":6,"flipX":false,"rot":0,"index":41,"tile":28,"x":5}],"number":2}
            ],
            "tilewidth": 8
    },
    genNPCs: () => {
      const list = _.sample([1, 2, 3], 2);
      if (Math.random() < 0.3) list.push(3);
      return list;
    },
    genResources: () => {
      return {
        food: _.random(3, 6),
        wood: _.random(2, 4),
        metal: _.random(4, 6),
      };
    },
  },
};

