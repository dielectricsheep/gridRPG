//Universal RpgObject Class, used for any tilebased entity or map
var RpgObject = function(){

  //Select is the portion of the tileMap that displays on the screen
  //is a rectangle defined by orig and bound points.
  this.canvasSelect = {};
  this.canvasSelect.orig = {};
  this.canvasSelect.bound = {};
  this.side;
  this.rpgParentNode = {};

  this.animations = {};
};

RpgObject.prototype.playerData = {};

/* Push parameters:
params : {
  rpgObject : {...}
}
*/
RpgObject.prototype._objectPush = function(params){
  if(params.rpgObject.location.id === this.id  && params.rpgObject.location.side === this.side){
      //TODO  Check if object exists, check for changes from prior object 
      this.rpgChildNodes[params.rpgObject.id] = params.rpgObject;
  };
};

RpgObject.prototype._objectPop = function(params){

};

RpgObject.prototype._selfMove = function(params){
  if(playerData.id === this.id){
    this.changeState(params.direction);
    var result = this.rpgParentNode.viewScroll({
      "direction" : params.direction,
      "scrollPx" : playerData.walkSpeed,
      "location" : playerData.location,
      "sublocation" : this.rpgParentNode.sublocation
    });

    playerData.location = result.location;
    this.rpgParentNode.sublocation = result.sublocation;    
  };
};

RpgObject.prototype.init = function(playerData, objData, divWindow, parentObj){
  
  var self = this;
  this.rpgParentNode = parentObj;

/*
  this.addEventListener('rpgMessage',function(event){
    self.action[event.detail.action.id](event.detail.action.params);
  },true);
*/

 //Copy all properties from objData to this
 for(var key in objData){
    this[key] = objData[key];
  };

  if(this.id == playerData.id){
   //Methods and properties for a non map-type object (currently only for player)
    if(playerData.walkSpeed >= 0 && playerData.walkSpeed <= playerData.view.tileWidth / 2){
      this.walkSpeed = playerData.walkSpeed * 2;
    } else {
      this.walkSpeed = 1;
    };

    //Setup player canvas that will overlay on the Map Canvas
    this.canvasSelect.orig.x = 0;
    this.canvasSelect.orig.y = 0;
    this.canvasSelect.bound.x = this.tileMapWidth - 1;
    this.canvasSelect.bound.y = this.tileMapHeight - 1;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'view_' + objData.id);
    this.canvas.style.zIndex = 1;
    this.canvas.width = this.tileWidth * this.tileMapWidth * playerData.view.scale;
    this.canvas.height = this.tileHeight * this.tileMapHeight * playerData.view.scale;
    this.canvas.style.position = 'absolute';
    this.canvasPosition = {};
    this.canvasPosition.x = ((parseInt(playerData.view.width / 2) * playerData.view.tileWidth) + parseInt(self.tileWidth / 2)) * playerData.view.scale + playerData.view.posLeft;
    this.canvasPosition.y = ((parseInt(playerData.view.height / 2) * playerData.view.tileHeight) + parseInt(self.tileHeight / 4)) * playerData.view.scale + playerData.view.posTop;
    this.canvas.style.left = this.canvasPosition.x + 'px';
    this.canvas.style.top = this.canvasPosition.y + 'px';
    divWindow.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.context.scale(playerData.view.scale, playerData.view.scale); 

  } else if(this.side == 'inside') {
        //Methods and properties specific to the inside of an object
    this.inside = {};
    playerData.view.scale = playerData.view.scale;

    this.canvasSelect.width = playerData.view.width;
    this.canvasSelect.height = playerData.view.height;

    //Set location where player appears
    if(objData.spawnPoints['default']){
      playerData.location = objData.spawnPoints['default'];
    } else {
      playerData.location.x = 0;
      playerData.location.y = 0;
    };
    //Set sublocation, the pixel position within a tile location
    this.sublocation = {};
    this.sublocation.x = this.tileWidth / 2;
    this.sublocation.y = this.tileHeight / 2;
      
    //Center Selection on spawn point
    this.canvasSelect.orig.x = playerData.location.x - parseInt(this.canvasSelect.width / 2);
    this.canvasSelect.orig.y = playerData.location.y - parseInt(this.canvasSelect.height / 2);
    this.canvasSelect.bound.x = this.canvasSelect.orig.x + this.canvasSelect.width - 1;
    this.canvasSelect.bound.y = this.canvasSelect.orig.y + this.canvasSelect.height - 1;

    //Create Map Work Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'work_RpgWindow');
    this.canvas.width = this.canvasSelect.width * this.tileWidth;
    this.canvas.height = this.canvasSelect.height * this.tileHeight;
    this.context = this.canvas.getContext('2d');

    //Create Map Canvas, the work canvas will be flipped to this and graphics will be scaled up
    this.playerView = {};
    this.playerView.canvas = document.createElement('canvas');
    this.playerView.canvas.setAttribute('id', 'view_RpgWindow');
    this.playerView.canvas.style.zIndex = 0;
    this.playerView.canvas.width = this.canvasSelect.width * this.tileWidth * playerData.view.scale;
    this.playerView.canvas.height = this.canvasSelect.height * this.tileHeight * playerData.view.scale;
    this.playerView.canvas.style.position = 'absolute';
    this.playerView.canvas.style.left = playerData.view.posLeft + 'px';
    this.playerView.canvas.style.top = playerData.view.posTop + 'px';
    divWindow.appendChild(this.playerView.canvas);
    this.playerView.context = this.playerView.canvas.getContext('2d');
    this.playerView.context.scale(playerData.view.scale, playerData.view.scale);

    //Create overlay to border map and hide tile scroll updates
    this.overlay = {};
    this.overlay.canvas = document.createElement('canvas');
    this.overlay.canvas.setAttribute('id', 'view_RpgWindowOverlay');
    this.overlay.canvas.style.zIndex = 999;
    this.overlay.canvas.style.position = 'absolute';
    this.overlay.canvas.style.left = playerData.view.posLeft +'px';
    this.overlay.canvas.style.top = playerData.view.posTop +'px';
    this.overlay.canvas.style.zIndex = 1;
    this.overlay.canvas.width = this.playerView.canvas.width;
    this.overlay.canvas.height = this.playerView.canvas.height;
    divWindow.appendChild(this.overlay.canvas);
    this.overlay.context = this.overlay.canvas.getContext('2d');
    this.overlay.context.scale(playerData.view.scale, playerData.view.scale);   

  } else {

    //Setup player canvas that will overlay on the Map Canvas
    this.canvasSelect.orig.x = 0;
    this.canvasSelect.orig.y = 0;
    this.canvasSelect.bound.x = this.tileMapWidth - 1;
    this.canvasSelect.bound.y = this.tileMapHeight - 1;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'view_' + objData.id);
    this.canvas.style.zIndex = 1;
    this.canvas.width = this.tileWidth * this.tileMapWidth * playerData.view.scale;
    this.canvas.height = this.tileHeight * this.tileMapHeight * playerData.view.scale;
    this.canvas.style.position = 'absolute';

    this.canvasPosition = {};
    this.canvasPosition.x = ((this.location.x - this.rpgParentNode.canvasSelect.orig.x) * this.rpgParentNode.tileWidth + this.rpgParentNode.sublocation.x) * playerData.view.scale;
    this.canvasPosition.y = ((this.location.y - this.rpgParentNode.canvasSelect.orig.y) * this.rpgParentNode.tileHeight + this.rpgParentNode.sublocation.y) * playerData.view.scale;
    this.canvas.style.left = this.canvasPosition.x + 'px';
    this.canvas.style.top = this.canvasPosition.y + 'px';

    divWindow.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.context.scale(playerData.view.scale, playerData.view.scale); 

  };

  this.displaySelf();
};

RpgObject.prototype.displaySelf = function(){
  var self = this;
  //Register animations from tileMap
  for(var key in this.states){
    this.animations[key] = [];
    for(var selectY = 0; selectY < this.tileMapHeight; selectY++){
      for(var selectX = 0; selectX < this.tileMapWidth; selectX++){
        var tile = this.tileDictionary[this.states[key].tileMap[selectY][selectX].tile];
        if(tile.animation){
          this.animations[key].push({'x' : selectX, 'y' : selectY});
        };
      };
    };
  }; 

  this.loadTileDictionary(function(){
    self.display(self.state);
  });

}

//Method to check if a point or rectangle is within bounds of an object
RpgObject.prototype.checkInBounds = function(x, y, xBound, yBound){
  var result = true;
  if(!(x >= 0 && x < this.tileMapWidth && y >= 0 && y < this.tileMapHeight)){
    return false;
  }
  if(xBound && yBound){
    if(!(x >= 0 && x < this.tileMapWidth && y >= 0 && y < this.tileMapHeight)){
      return false;
    };
  }
  return true;
};

//Prototype Properties for all RpgObjects
//Display a tile on the canvas
RpgObject.prototype.displayTile = function(tile, x, y, subX, subY){
  var self = this;
  pixelX = x * this.tileWidth;
  pixelY = y * this.tileHeight;
  this.context.clearRect(pixelX + subX, pixelY + subY, this.tileWidth, this.tileHeight);
  this.context.drawImage(tile.img, pixelX + subX, pixelY + subY); 
};

//Look up tile by label from tileDictionary and display on the canvas
RpgObject.prototype.displayDicEntry = function(entry, x, y, subX, subY){
  var tile = this.tileDictionary[entry.tile];
  if(tile.animation){
    this.displayTile(tile.animation.frames[tile.animation.position], x, y, subX, subY);
  } else {
    this.displayTile(tile, x, y, subX, subY);
  };
};

//Display method, this displays an entire object for whatever 'state' is specified
RpgObject.prototype.display = function(state){
  var displayState = this.states[state].tileMap;
  //Recursively call function to draw frames with timed intervals for animation
  //if this has an overlay, and is therefore the map, draw a portion of it
  if(this.overlay){
    this.viewDrawOverlayWindow();
  };

  var y = 0;
  for(var selectY = this.canvasSelect.orig.y; selectY <= this.canvasSelect.bound.y; selectY++){
    var x = 0;
    for(var selectX = this.canvasSelect.orig.x; selectX <= this.canvasSelect.bound.x; selectX++){
      if(this.inside){
        if(this.checkInBounds(selectX, selectY)){
          this.displayDicEntry(displayState[selectY][selectX], x, y, this.sublocation.x, this.sublocation.y);
        } else {
          this.displayTile(this.tileDictionary['default'], x, y, this.sublocation.x, this.sublocation.y);
        };
      } else {
        this.displayDicEntry(displayState[selectY][selectX], x, y, 0, 0);
      };
      x++;  
    };
    y++;
  };

  if(this.inside){
    //Flip updated image to map
    this.playerView.context.drawImage(this.canvas,0,0);
  };

};

RpgObject.prototype.changeState = function(state){
  this.state = state;
  for(var i = 0; i < this.animations[this.state].length; i++){
    var x = this.animations[this.state][i].x;
    var y = this.animations[this.state][i].y;
    var tile = this.tileDictionary[this.states[this.state].tileMap[y][x].tile];
    tile.animation.active = true;
  };

};

//load images in tileDictionary to used by Object into memory
RpgObject.prototype.loadTileDictionary = function(callback){
  //Load images, read ahead to process callback on last entry
  var prevEntry;
  var lastImg;
  for(var key in this.tileDictionary){
    if(prevEntry){
      if(prevEntry.animation){ 
        prevEntry.animation.frames.forEach(function(frame){
          frame.img = new Image;
          frame.img.src = frame.url;
        });
      } else {  
        prevEntry.img = new Image;
        prevEntry.img.src = prevEntry.image.url;
      };
    };
    prevEntry = this.tileDictionary[key];
  };

  //Set onload event to call callback on last image
  //to insure all images are loaded before canvas is drawn 
  if(prevEntry){
    var prevImage;
    if(prevEntry.animation){ 
      prevEntry.animation.frames.forEach(function(frame){
        if(prevImage){
          prevImage.img = new Image;
          prevImage.img.src = prevImage.url;
        };
        prevImage = frame;
      });
    } else {  
      prevEntry.img = new Image;
      prevImage = prevEntry;
    };
    if(prevImage){
      prevImage.img = new Image;
      prevImage.img.onload = function(){
        setTimeout(function(){
          callback();
        },250);
      };
      if(prevEntry.animation){
        prevImage.img.src = prevImage.url;
      } else {
        prevImage.img.src = prevImage.image.url;
      };
    };
  };
}; 

RpgObject.prototype.progressAnimation = function(timer){
  var updated = false;
  for(var i = 0; i < this.animations[this.state].length; i++){
    var x = this.animations[this.state][i].x;
    var y = this.animations[this.state][i].y;
      var tile = this.tileDictionary[this.states[this.state].tileMap[y][x].tile];
      if(tile.animation.active && !(timer % tile.animation.interval)){
        if(this.checkInBounds(x, y)){
          if(this.inside){
            this.displayTile(tile.animation.frames[tile.animation.position], x - this.canvasSelect.orig.x, y - this.canvasSelect.orig.y, this.tileWidth - this.sublocation.x, this.tileHeight - this.sublocation.y);
          } else {
            this.displayTile(tile.animation.frames[tile.animation.position], x - this.canvasSelect.orig.x, y - this.canvasSelect.orig.y, 0, 0);
          };
        };  
        tile.animation.position++;
        if(tile.animation.position > tile.animation.frames.length - 1){
          tile.animation.position = 0;
          if(!tile.animation.continuous){
            tile.animation.active = false;
          };
        };
        var updated = true;
      };
  };

  if(this.inside && updated){
    //Flip updated image to map
    this.playerView.context.drawImage(this.canvas,0,0);
  };
};

//Check if adjoining tile creates a collision event
RpgObject.prototype.checkCollision = function(x, y){
  if(!this.checkInBounds(x, y)){
    return true;
  };
  if(!this.tileDictionary[this.states[this.state].tileMap[y][x].tile].walkable){
    return true;
  };
  return false;
};

//Scroll map, canvas is scrolled by playerData.walkSpeed and edges are updated with new tiles
RpgObject.prototype.viewRedrawTop = function(){
  for(var x = 0; x < this.canvasSelect.width; x++){
    if(this.checkInBounds(this.canvasSelect.orig.x + x, this.canvasSelect.orig.y)){
      this.displayDicEntry(this.states[this.state].tileMap[this.canvasSelect.orig.y][this.canvasSelect.orig.x + x], x, 0, this.tileWidth - this.sublocation.x, 0);
    } else {
     this.displayTile(this.tileDictionary['default'], x, 0, this.tileWidth - this.sublocation.x, 0);
    };
  };
};
RpgObject.prototype.viewRedrawRight = function(){
  for(var y = 0; y < this.canvasSelect.height; y++){
    if(this.checkInBounds(this.canvasSelect.bound.x - 1, this.canvasSelect.orig.y + y)){
      this.displayDicEntry(this.states[this.state].tileMap[this.canvasSelect.orig.y + y][this.canvasSelect.bound.x - 1], this.canvasSelect.width - 1, y, 0, this.tileHeight - this.sublocation.y);
    } else {
      this.displayTile(this.tileDictionary['default'], this.canvasSelect.width - 1, y, 0, this.tileHeight - this.sublocation.y);
    };
  };
};
RpgObject.prototype.viewRedrawBottom = function(){
  for(var x = 0; x < this.canvasSelect.width; x++){
    if(this.checkInBounds(this.canvasSelect.orig.x + x, this.canvasSelect.bound.y - 1)){
      this.displayDicEntry(this.states[this.state].tileMap[this.canvasSelect.bound.y - 1][this.canvasSelect.orig.x + x], x, this.canvasSelect.height - 1, this.tileWidth - this.sublocation.x, 0);
    } else {
      this.displayTile(this.tileDictionary['default'], x, this.canvasSelect.height - 1, this.tileWidth - this.sublocation.x, 0);
    };
  };
};
RpgObject.prototype.viewRedrawLeft = function(){
  for(var y = 0; y < this.canvasSelect.height; y++){
    if(this.checkInBounds(this.canvasSelect.orig.x, this.canvasSelect.orig.y + y)){
      this.displayDicEntry(this.states[this.state].tileMap[this.canvasSelect.orig.y + y][this.canvasSelect.orig.x], 0, y, 0, this.tileWidth - this.sublocation.y);
    } else {
      this.displayTile(this.tileDictionary['default'], 0, y, 0, this.tileWidth - this.sublocation.y);
    };
  };
};

//draw border overlay on top of main window to hide scrolling tile updates
RpgObject.prototype.viewDrawOverlayWindow = function(){
  for(var x = 0; x <= this.overlay.canvas.width; x += this.tileWidth){
    this.overlay.context.drawImage(this.tileDictionary['overlay'].img, x, 0);
  };
  for(var y = 0; y <= this.overlay.canvas.height; y+=this.tileHeight){
    this.overlay.context.drawImage(this.tileDictionary['overlay'].img, (this.canvas.width - this.tileWidth), y);
  };
  for(var x = 0; x <= this.overlay.canvas.width; x += this.tileWidth){
    this.overlay.context.drawImage(this.tileDictionary['overlay'].img, x, (this.canvas.height - this.tileHeight));
  };
  for(var y = 0; y <= this.overlay.canvas.height; y += this.tileHeight){
    this.overlay.context.drawImage(this.tileDictionary['overlay'].img, 0, y);
  };
};

/*
params = {
  "direction" :
  "scrollPx" :
}
*/
RpgObject.prototype.objectScroll = function(params){
  switch(params.direction){
    case 'up':
      this.canvasPosition.y += params.scrollPx * 2;
    break;
    case 'right':
      this.canvasPosition.x -= params.scrollPx * 2;
    break;
    case 'down':
      this.canvasPosition.y -= params.scrollPx * 2;
    break;
    case 'left':
      this.canvasPosition.x += params.scrollPx * 2;
    break;
  };
  this.canvas.style.left = this.canvasPosition.x + 'px';
  this.canvas.style.top = this.canvasPosition.y + 'px';
};

/*
params = {
  "direction" :
  "scrollPx" :
  "location" :
  "sublocation" :
}
*/
RpgObject.prototype.viewScroll = function(params){

 var self = this;

  function scrollObjects(){
    for(var key in self.rpgChildNodes){
      if(playerData.id != self.rpgChildNodes[key].id){
        self.rpgChildNodes[key].objectScroll({
          "direction" : params.direction,
          "scrollPx" : params.scrollPx
        });      
      };
    };    
  };

  switch(params.direction){
    case 'up':
      if(params.sublocation.y - params.scrollPx < 0){
        if(!this.checkCollision(params.location.x, params.location.y - 1)){
          params.sublocation.y = this.tileHeight - params.scrollPx;
          params.location.y--;
          this.canvasSelect.orig.y--;
          this.canvasSelect.bound.y--;
          this.viewRedrawTop();
          this.context.drawImage(this.canvas, 0, params.scrollPx);
          scrollObjects();
        };
      } else {
        params.sublocation.y -= params.scrollPx;
        this.context.drawImage(this.canvas, 0, params.scrollPx);
        scrollObjects();
      };
    break;
    case 'right':
      if(params.sublocation.x + params.scrollPx > this.tileWidth - 1){
        if(!this.checkCollision(params.location.x + 1, params.location.y)){
          params.sublocation.x = 0;
          params.location.x++;
          this.canvasSelect.orig.x++;
          this.canvasSelect.bound.x++;
          this.context.drawImage(this.canvas, -params.scrollPx, 0);
          this.viewRedrawRight();
          scrollObjects();
        };
      } else {
        params.sublocation.x += params.scrollPx;
        this.context.drawImage(this.canvas, -params.scrollPx, 0);
        scrollObjects();
      };
    break;
    case 'down':
      if(params.sublocation.y + params.scrollPx > this.tileHeight - 1){
        if(!this.checkCollision(params.location.x, params.location.y + 1)){
          params.sublocation.y = 0;
          params.location.y++;
          this.canvasSelect.orig.y++;
          this.canvasSelect.bound.y++;
          this.context.drawImage(this.canvas, 0, -params.scrollPx);
          this.viewRedrawBottom();
          scrollObjects();
        };
      } else {
        params.sublocation.y += params.scrollPx;
        this.context.drawImage(this.canvas, 0, -params.scrollPx);
        scrollObjects();
      };
    break;
    case 'left':
      if(params.sublocation.x - params.scrollPx < 0){
        if(!this.checkCollision(params.location.x - 1, params.location.y)){
          params.sublocation.x = this.tileWidth - params.scrollPx;
          params.location.x--;
          this.canvasSelect.orig.x--;
          this.canvasSelect.bound.x--;
          this.viewRedrawLeft();
          this.context.drawImage(this.canvas, params.scrollPx, 0);
          scrollObjects();
        };
      } else {
        params.sublocation.x -= params.scrollPx;
        this.context.drawImage(this.canvas, params.scrollPx, 0);
        scrollObjects();
      };
    break;
   }; 

    //Flip updated image to map
    this.playerView.context.drawImage(this.canvas,0,0);
    return params;
  } 


var RPGModule =  (function () {

  var rpgObject;
  var rpgKeyPress;
  var divWindow;

  //flat list of all objects
  var objects = {};

  //Recursively iterates through an object/container treee and creates rpgObjects from objectData
  function buildObjectTree(parentObj){
    objects[parentObj.id] = parentObj;
    for(var key in parentObj.rpgChildNodes){
      var childObj = new RpgObject;
      childObj.init(playerData, parentObj.rpgChildNodes[key], divWindow, parentObj);
      parentObj._objectPush({"rpgObject" : childObj});
      buildObjectTree(parentObj.rpgChildNodes[key]);
    }
  };

  return {
    init : function(playerData, objData, inDivWindow){
      divWindow = inDivWindow;   

      //Build object tree view
      rpgObject = new RpgObject;
      rpgObject.init(playerData, objData, divWindow);
      buildObjectTree(rpgObject);

      var timer = 0;
      //RPG Clock, at approx 16 times a sec TODO: describe what this does  
      setInterval(function(){
        timer++;
        if(rpgKeyPress){
          objects.player._selfMove({"direction":rpgKeyPress});
        };

        for(var key in objects){
          objects[key].progressAnimation(timer);
        };

      }, 62);

    },
    setKeyPress : function(keyPress){
      rpgKeyPress = keyPress;
    }
  }; 

}());
