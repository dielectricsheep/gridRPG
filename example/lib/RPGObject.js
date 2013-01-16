//Universal RpgObject Class, used for any tilebased entity or map
var RpgObject = function(objName, objData, divWindow, initState, mapObj){
  var self = this;
  this.state = initState;
  this.states = objData.states;
  this.tileDictionary = objData.tileDictionary;
  this.tileWidth = objData.tileWidth;
  this.tileHeight = objData.tileHeight;
  this.tilesWidth = objData.tilesWidth;
  this.tilesHeight = objData.tilesHeight;

  //Select is the portion of the map that displays on the screen
  //is a rectangle defined by orig and bound points.
  this.canvasSelect = {};
  this.canvasSelect.orig = {};
  this.canvasSelect.bound = {};

  this.animations = {}

  for(var key in this.states){
    this.animations[key] = [];
    for(var selectY = 0; selectY < this.tilesHeight; selectY++){
      for(var selectX = 0; selectX < this.tilesWidth; selectX++){
        var tile = this.tileDictionary[this.states[key][selectY][selectX].tile];
        if(tile.animation){
          this.animations[key].push({'x' : selectX, 'y' : selectY});
        };
      };
    };
  }; 
 
  if(objName == 'map'){
    //Methods and properties specific to a map object
    this.map = {};
    this.map.location = {};
    this.map.walkSpeed = 0;
    this.map.viewPosLeft = objData.viewPosLeft;
    this.map.viewPosTop = objData.viewPosTop;

    this.scale = objData.viewScale;

    this.canvasSelect.width = objData.viewWidth + 2;
    this.canvasSelect.height = objData.viewHeight + 2;

    //Set location where player appears
    if(objData.spawnPoints['default']){
      this.map.location = objData.spawnPoints['default'];
    } else {
      this.map.location.x = 0;
      this.map.location.y = 0;
    };
    //Set sublocation, the pixel position within a tile location
    this.map.sublocation = {};
    this.map.sublocation.x = this.tileWidth / 2;
    this.map.sublocation.y = this.tileHeight / 2;
      
    //Center Selection on spawn point
    this.canvasSelect.orig.x = self.map.location.x - parseInt(this.canvasSelect.width / 2);
    this.canvasSelect.orig.y = self.map.location.y - parseInt(this.canvasSelect.height / 2);
    this.canvasSelect.bound.x = this.canvasSelect.orig.x + this.canvasSelect.width - 1;
    this.canvasSelect.bound.y = this.canvasSelect.orig.y + this.canvasSelect.height - 1;

    //Create Map Work Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'work_RpgWindow');
    this.canvas.width = this.canvasSelect.width * this.tileWidth;
    this.canvas.height = this.canvasSelect.height * this.tileHeight;
    this.context = this.canvas.getContext('2d');

    //Create Map Canvas, the work canvas will be flipped to this and graphics will be scaled up
    this.map.canvas = document.createElement('canvas');
    this.map.canvas.setAttribute('id', 'view_RpgWindow');
    this.map.canvas.style.zIndex = 0;
    this.map.canvas.width = this.canvasSelect.width * this.tileWidth * this.scale;
    this.map.canvas.height = this.canvasSelect.height * this.tileHeight * this.scale;
    this.map.canvas.style.position = 'absolute';
    this.map.canvas.style.left = this.map.viewPosLeft + 'px';
    this.map.canvas.style.top = this.map.viewPosTop + 'px';
    divWindow.appendChild(this.map.canvas);
    this.map.context = this.map.canvas.getContext('2d');
    this.map.context.scale(this.scale, this.scale);

    //Create overlay to border map and hide tile scroll updates
    this.overlay = {};
    this.overlay.canvas = document.createElement('canvas');
    this.overlay.canvas.setAttribute('id', 'view_RpgWindowOverlay');
    this.overlay.canvas.style.zIndex = 999;
    this.overlay.canvas.style.position = 'absolute';
    this.overlay.canvas.style.left = this.map.viewPosLeft +'px';
    this.overlay.canvas.style.top = this.map.viewPosTop +'px';
    this.overlay.canvas.style.zIndex = 1;
    this.overlay.canvas.width = this.map.canvas.width;
    this.overlay.canvas.height = this.map.canvas.height;
    divWindow.appendChild(this.overlay.canvas);
    this.overlay.context = this.overlay.canvas.getContext('2d');
    this.overlay.context.scale(this.scale, this.scale);


    //Scroll map, canvas is scrolled by this.map.walkSpeed and edges are updated with new tiles
    this.map.redrawTop = function(){
      for(var x = 0; x < self.canvasSelect.width; x++){
        if(self.checkInBounds(self.canvasSelect.orig.x + x, self.canvasSelect.orig.y)){
          self.displayDicEntry(self.states[self.state][self.canvasSelect.orig.y][self.canvasSelect.orig.x + x], x, 0, self.tileWidth - self.map.sublocation.x, 0);
        } else {
         self.displayTile(self.tileDictionary['default'], x, 0, self.tileWidth - self.map.sublocation.x, 0);
        };
      };
    };
    this.map.redrawRight = function(){
      for(var y = 0; y < self.canvasSelect.height; y++){
        if(self.checkInBounds(self.canvasSelect.bound.x - 1, self.canvasSelect.orig.y + y)){
          self.displayDicEntry(self.states[self.state][self.canvasSelect.orig.y + y][self.canvasSelect.bound.x - 1], self.canvasSelect.width - 1, y, 0, self.tileHeight - self.map.sublocation.y);
        } else {
          self.displayTile(self.tileDictionary['default'], self.canvasSelect.width - 1, y, 0, self.tileHeight - self.map.sublocation.y);
        };
      };
    };
    this.map.redrawBottom = function(){
      for(var x = 0; x < self.canvasSelect.width; x++){
        if(self.checkInBounds(self.canvasSelect.orig.x + x, self.canvasSelect.bound.y - 1)){
          self.displayDicEntry(self.states[self.state][self.canvasSelect.bound.y - 1][self.canvasSelect.orig.x + x], x, self.canvasSelect.height - 1, self.tileWidth - self.map.sublocation.x, 0);
        } else {
          self.displayTile(self.tileDictionary['default'], x, self.canvasSelect.height - 1, self.tileWidth - self.map.sublocation.x, 0);
        };
      };
    };
    this.map.redrawLeft = function(){
      for(var y = 0; y < self.canvasSelect.height; y++){
        if(self.checkInBounds(self.canvasSelect.orig.x, self.canvasSelect.orig.y + y)){
          self.displayDicEntry(self.states[self.state][self.canvasSelect.orig.y + y][self.canvasSelect.orig.x], 0, y, 0, self.tileWidth - self.map.sublocation.y);
        } else {
          self.displayTile(self.tileDictionary['default'], 0, y, 0, self.tileWidth - self.map.sublocation.y);
        };
      };
    };

    //draw border overlay on top of main window to hide scrolling tile updates
    this.map.drawOverlayWindow = function(){
      for(var x = 0; x <= self.overlay.canvas.width; x += self.tileWidth){
        self.overlay.context.drawImage(self.tileDictionary['overlay'].img, x, 0);
      };
      for(var y = 0; y <= self.overlay.canvas.height; y+=self.tileHeight){
        self.overlay.context.drawImage(self.tileDictionary['overlay'].img, (self.canvas.width - self.tileWidth), y);
      };
      for(var x = 0; x <= self.overlay.canvas.width; x += self.tileWidth){
        self.overlay.context.drawImage(self.tileDictionary['overlay'].img, x, (self.canvas.height - self.tileHeight));
      };
      for(var y = 0; y <= self.overlay.canvas.height; y += self.tileHeight){
        self.overlay.context.drawImage(self.tileDictionary['overlay'].img, 0, y);
      };
    };

    //Updates map location for player movement and scrolls map in the appropriate direction
    this.map.walkPlayer = function(action){
      switch(action){
        case 'walkUp':
          if(self.map.sublocation.y - self.map.walkSpeed < 0){
            if(!self.checkCollision(self.map.location.x, self.map.location.y - 1)){
              self.map.sublocation.y = self.tileHeight - self.map.walkSpeed;
              self.map.location.y--;
              self.canvasSelect.orig.y--;
              self.canvasSelect.bound.y--;
              self.map.redrawTop();
              self.context.drawImage(self.canvas, 0, self.map.walkSpeed);
            };
          } else {
            self.map.sublocation.y -= self.map.walkSpeed;
            self.context.drawImage(self.canvas, 0, self.map.walkSpeed);
          };
        break;
        case 'walkRight':
          if(self.map.sublocation.x + self.map.walkSpeed > self.tileWidth - 1){
            if(!self.checkCollision(self.map.location.x + 1, self.map.location.y)){
              self.map.sublocation.x = 0;
              self.map.location.x++;
              self.canvasSelect.orig.x++;
              self.canvasSelect.bound.x++;
              self.context.drawImage(self.canvas, -self.map.walkSpeed, 0);
              self.map.redrawRight();
            };
          } else {
            self.map.sublocation.x += self.map.walkSpeed;
            self.context.drawImage(self.canvas, -self.map.walkSpeed, 0);
          };
        break;
        case 'walkDown':
          if(self.map.sublocation.y + self.map.walkSpeed > self.tileHeight - 1){
            if(!self.checkCollision(self.map.location.x, self.map.location.y + 1)){
              self.map.sublocation.y = 0;
              self.map.location.y++;
              self.canvasSelect.orig.y++;
              self.canvasSelect.bound.y++;
              self.context.drawImage(self.canvas, 0, -self.map.walkSpeed);
              self.map.redrawBottom();
            };
          } else {
            self.map.sublocation.y += self.map.walkSpeed;
            self.context.drawImage(self.canvas, 0, -self.map.walkSpeed);
          };
        break;
        case 'walkLeft':
          if(self.map.sublocation.x - self.map.walkSpeed < 0){
            if(!self.checkCollision(self.map.location.x - 1, self.map.location.y)){
              self.map.sublocation.x = self.tileWidth - self.map.walkSpeed;
              self.map.location.x--;
              self.canvasSelect.orig.x--;
              self.canvasSelect.bound.x--;
              self.map.redrawLeft();
              self.context.drawImage(self.canvas, self.map.walkSpeed, 0);
            };
          } else {
            self.map.sublocation.x -= self.map.walkSpeed;
            self.context.drawImage(self.canvas, self.map.walkSpeed, 0);
          };
        break;
      };     

      //Flip updated image to map
      self.map.context.drawImage(self.canvas,0,0);
    };
  } else {

    //Methods and properties for a non map-type object (currently only for player)
    if(objData.walkSpeed >= 0 && objData.walkSpeed <= mapObj.tileWidth / 2){
      this.walkSpeed = objData.walkSpeed * 2;
    } else {
      this.walkSpeed = 1;
    };

    //Setup Rpg Object canvas that will overlay on the Map Canvas
    this.canvasSelect.orig.x = 0;
    this.canvasSelect.orig.y = 0;
    this.canvasSelect.bound.x = this.tilesWidth - 1;
    this.canvasSelect.bound.y = this.tilesHeight - 1;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'view_' + objName);
    this.canvas.style.zIndex = 1;
    this.canvas.width = this.tileWidth * mapObj.scale;
    this.canvas.height = this.tileHeight * mapObj.scale;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = (parseInt(mapObj.canvasSelect.width / 2) * mapObj.tileWidth + parseInt(self.tileWidth / 2)) * mapObj.scale + mapObj.map.viewPosLeft + 'px';
    this.canvas.style.top = (parseInt(mapObj.canvasSelect.height / 2) * mapObj.tileHeight + parseInt(self.tileHeight / 4)) * mapObj.scale + mapObj.map.viewPosTop + 'px';
    divWindow.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.context.scale(mapObj.scale, mapObj.scale);
  };      

  this.loadTileDictionary(function(){
    self.display(self.state);
  });

};


//Method to check if a point or rectangle is within bounds of an object
RpgObject.prototype.checkInBounds = function(x, y, xBound, yBound){
  var result = true;
  if(!(x >= 0 && x < this.tilesWidth && y >= 0 && y < this.tilesHeight)){
    return false;
  }
  if(xBound && yBound){
    if(!(x >= 0 && x < this.tilesWidth && y >= 0 && y < this.tilesHeight)){
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
  var displayState = this.states[state];
  //Recursively call function to draw frames with timed intervals for animation
  //if this has an overlay, and is therefore the map, draw a portion of it
  if(this.overlay){
    this.map.drawOverlayWindow();
  };

  var y = 0;
  for(var selectY = this.canvasSelect.orig.y; selectY <= this.canvasSelect.bound.y; selectY++){
    var x = 0;
    for(var selectX = this.canvasSelect.orig.x; selectX <= this.canvasSelect.bound.x; selectX++){
      if(this.map){
        if(this.checkInBounds(selectX, selectY)){
          this.displayDicEntry(displayState[selectY][selectX], x, y, this.map.sublocation.x, this.map.sublocation.y);
        } else {
          this.displayTile(this.tileDictionary['default'], x, y, this.map.sublocation.x, this.map.sublocation.y);
        };
      } else {
        this.displayDicEntry(displayState[selectY][selectX], x, y, 0, 0);
      };
      x++;  
    };
    y++;
  };

  if(this.map){
    //Flip updated image to map
    this.map.context.drawImage(this.canvas,0,0);
  };

};

RpgObject.prototype.changeState = function(state){
  this.state = state;
  for(var i = 0; i < this.animations[this.state].length; i++){
    var x = this.animations[this.state][i].x;
    var y = this.animations[this.state][i].y;
    var tile = this.tileDictionary[this.states[this.state][y][x].tile];
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
      var tile = this.tileDictionary[this.states[this.state][y][x].tile];
      if(tile.animation.active && !(timer % tile.animation.interval)){
        if(this.checkInBounds(x, y)){
          if(this.map){
            this.displayTile(tile.animation.frames[tile.animation.position], x - this.canvasSelect.orig.x, y - this.canvasSelect.orig.y, this.tileWidth - this.map.sublocation.x, this.tileHeight - this.map.sublocation.y);
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

  if(this.map && updated){
    //Flip updated image to map
    this.map.context.drawImage(this.canvas,0,0);
  };
};

//Check if adjoining tile creates a collision event
RpgObject.prototype.checkCollision = function(x, y){
  if(!this.checkInBounds(x, y)){
    return true;
  };
  if(!this.tileDictionary[this.states[this.state][y][x].tile].walkable){
    return true;
  };
  return false;
};



var Rpg = function(divWindow){
  var self = this;

  var timer = 0;
  var rpgKeyPress;
  
  this.divWindow = divWindow;
  this.objects = {};
  this.addMap = function(objData, mapState){
    this.objects.map = new RpgObject('map', objData, this.divWindow, mapState);
  };

  this.addPlayer = function(objData, objState){
    this.objects.player = new RpgObject('player', objData, this.divWindow, objState, this.objects.map);
    this.objects.map.map.walkSpeed = this.objects.player.walkSpeed;
    //RPG Clock, at approx 16 times a sec TODO: describe what this does  
    setInterval(function(){
      timer++;
      switch (rpgKeyPress){
      case 'walkUp':
        self.objects.player.changeState('walkUp');
        self.objects.map.map.walkPlayer('walkUp');
      break;
      case 'walkRight':
        self.objects.player.changeState('walkRight');
        self.objects.map.map.walkPlayer('walkRight');
      break;
      case 'walkDown':
        self.objects.player.changeState('walkDown');
        self.objects.map.map.walkPlayer('walkDown');
      break;
      case 'walkLeft':
        self.objects.player.changeState('walkLeft');
        self.objects.map.map.walkPlayer('walkLeft');
      break;
      }; 

      for(var key in self.objects){
        self.objects[key].progressAnimation(timer);
      };

    }, 62);
  };

  //Create event handlers for user input
  this.events = {};
  this.events.setWalkUp = document.createEvent('CustomEvent');
  this.events.setWalkUp.initEvent('setWalkUp',true,true);
  divWindow.addEventListener('setWalkUp',function(){
    rpgKeyPress = 'walkUp';
  },true);
  
  this.events.setWalkRight = document.createEvent('CustomEvent');
  this.events.setWalkRight.initEvent('setWalkRight',true,true);
  divWindow.addEventListener('setWalkRight',function(){
    rpgKeyPress = 'walkRight';
  },true);

  this.events.setWalkDown = document.createEvent('CustomEvent');
  this.events.setWalkDown.initEvent('setWalkDown',true,true);
  divWindow.addEventListener('setWalkDown',function(){
    rpgKeyPress = 'walkDown';
  },true);

  this.events.setWalkLeft = document.createEvent('CustomEvent');
  this.events.setWalkLeft.initEvent('setWalkLeft',true,true);
  divWindow.addEventListener('setWalkLeft',function(){
    rpgKeyPress = 'walkLeft';
  },true);

  this.events.clearWalkUp = document.createEvent('CustomEvent');
  this.events.clearWalkUp.initEvent('clearWalkUp',true,true);
  divWindow.addEventListener('clearWalkUp',function(){
    rpgKeyPress = '';
  },true);
  
  this.events.clearWalkRight = document.createEvent('CustomEvent');
  this.events.clearWalkRight.initEvent('clearWalkRight',true,true);
  divWindow.addEventListener('clearWalkRight',function(){
    rpgKeyPress = '';
  },true);

  this.events.clearWalkDown = document.createEvent('CustomEvent');
  this.events.clearWalkDown.initEvent('clearWalkDown',true,true);
  divWindow.addEventListener('clearWalkDown',function(){
    rpgKeyPress = '';
  },true);

  this.events.clearWalkLeft = document.createEvent('CustomEvent');
  this.events.clearWalkLeft.initEvent('clearWalkLeft',true,true);
  divWindow.addEventListener('clearWalkLeft',function(){
    rpgKeyPress = '';
  },true);
};
