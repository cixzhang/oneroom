// credit where credit is due: https://gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/
//find objects in a Tiled layer that containt a property called "type" equal to a certain value
const findObjectsByType = (type, map, layer) => {
  var result = new Array();
  map.objects[layer].forEach((mapObject) => {
    if(mapObject.properties.spriteKey === type) {
      //Phaser uses top left, Tiled bottom left so we have to adjust
      mapObject.y -= map.tileHeight;
      result.push(mapObject);
    }      
  });
  return result;
};

//create a sprite from an object
const createFromTiledObject = (mapObject, group) => {
  var sprite = group.create(mapObject.x, mapObject.y, mapObject.properties.spriteKey);
  //copy all properties to the sprite
  Object.keys(mapObject.properties).forEach((key) => {
    sprite[key] = mapObject.properties[key];
  });
};