/*global document: true, window: true, Image: true, playerData: true*/
/*jslint indent: 2*/
var RpgObject, RPGModule;

//Universal RpgObject Class, used for any tilebased entity or map
var RpgObject = function () {
  'use strict';

  //Select is the portion of the tileMap that displays on the screen
  //is a rectangle defined by orig and bound points.
  this.canvasSelect = {};
  this.canvasSelect.orig = {};
  this.canvasSelect.bound = {};
  this.rpgParentNode = {};

  this.animations = {};

  this.playerData = {};
};

RpgObject.prototype.objectPush = function (params) {
  'use strict';
  if (params.rpgObject.location.id === this.id  && params.rpgObject.location.side === this.side) {
    this.rpgChildNodes[params.rpgObject.id] = params.rpgObject;
  }
};

RpgObject.prototype.selfMove = function (params) {
  'use strict';
  var result;
  if (this.playerData.id === this.id) {
    this.changeState(params.direction);
    result = this.rpgParentNode.viewScroll({
      "direction" : params.direction,
      "scrollPx" : this.playerData.walkSpeed,
      "location" : this.playerData.location,
      "sublocation" : this.rpgParentNode.sublocation
    });

    this.playerData.location = result.location;
    this.rpgParentNode.sublocation = result.sublocation;
  }
};

RpgObject.prototype.init = function (playerData, objData, divWindow, parentObj) {
  'use strict';
  var self, key;
  self = this;
  this.rpgParentNode = parentObj;
  this.playerData = playerData;


  //Copy all properties from objData to this
  for (key in objData) {
    this[key] = objData[key];
  }

  if (this.id === playerData.id) {
   //Methods and properties for a non map-type object (currently only for player)
    if (playerData.walkSpeed >= 0 && playerData.walkSpeed <= playerData.view.tileWidth / 2) {
      this.walkSpeed = playerData.walkSpeed * 2;
    } else {
      this.walkSpeed = 1;
    }

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
    this.canvasPosition.x = ((parseInt(playerData.view.width / 2, 10) * playerData.view.tileWidth) + parseInt(self.tileWidth / 2, 10)) * playerData.view.scale + playerData.view.posLeft;
    this.canvasPosition.y = ((parseInt(playerData.view.height / 2, 10) * playerData.view.tileHeight) + parseInt(self.tileHeight / 4, 10)) * playerData.view.scale + playerData.view.posTop;
    this.canvas.style.left = this.canvasPosition.x + 'px';
    this.canvas.style.top = this.canvasPosition.y + 'px';
    divWindow.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.context.scale(playerData.view.scale, playerData.view.scale);

  } else if (this.side === 'inside') {
        //Methods and properties specific to the inside of an object
    this.inside = {};

    this.canvasSelect.width = playerData.view.width;
    this.canvasSelect.height = playerData.view.height;

    //Set location where player appears
    if (objData.spawnPoints['default']) {
      playerData.location = objData.spawnPoints['default'];
    } else {
      playerData.location.x = 0;
      playerData.location.y = 0;
    }
    //Set sublocation, the pixel position within a tile location
    this.sublocation = {};
    this.sublocation.x = this.tileWidth / 2;
    this.sublocation.y = this.tileHeight / 2;

    //Center Selection on spawn point
    this.canvasSelect.orig.x = playerData.location.x - parseInt(this.canvasSelect.width / 2, 10);
    this.canvasSelect.orig.y = playerData.location.y - parseInt(this.canvasSelect.height / 2, 10);
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
    this.overlay.canvas.style.left = playerData.view.posLeft + 'px';
    this.overlay.canvas.style.top = playerData.view.posTop + 'px';
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

  }

  this.displaySelf();
};

RpgObject.prototype.displaySelf = function () {
  'use strict';
  var self, key, selectY, selectX, tile;
  self = this;
  //Register animations from tileMap
  for (key in this.states) {
    this.animations[key] = [];
    for (selectY = 0; selectY < this.tileMapHeight; selectY += 1) {
      for (selectX = 0; selectX < this.tileMapWidth; selectX += 1) {
        tile = this.tileDictionary[this.states[key].tileMap[selectY][selectX].tile];
        if (tile.animation) {
          this.animations[key].push({'x' : selectX, 'y' : selectY});
        }
      }
    }
  }

  this.loadTileDictionary(function () {
    self.display(self.state);
  });
};

//Method to check if a point or rectangle is within bounds of an object
RpgObject.prototype.checkInBounds = function (x, y, xBound, yBound) {
  'use strict';
  if (!(x >= 0 && x < this.tileMapWidth && y >= 0 && y < this.tileMapHeight)) {
    return false;
  }
  if (xBound && yBound) {
    if (!(x >= 0 && x < this.tileMapWidth && y >= 0 && y < this.tileMapHeight)) {
      return false;
    }
  }
  return true;
};

//Prototype Properties for all thiss
//Display a tile on the canvas
RpgObject.prototype.displayTile = function (tile, x, y, subX, subY) {
  'use strict';
  var pixelX, pixelY;
  pixelX = x * this.tileWidth;
  pixelY = y * this.tileHeight;
  this.context.clearRect(pixelX + subX, pixelY + subY, this.tileWidth, this.tileHeight);
  this.context.drawImage(tile.img, pixelX + subX, pixelY + subY);
};

//Look up tile by label from tileDictionary and display on the canvas
RpgObject.prototype.displayDicEntry = function (entry, x, y, subX, subY) {
  'use strict';
  var tile;
  tile = this.tileDictionary[entry.tile];
  if (tile.animation) {
    this.displayTile(tile.animation.frames[tile.animation.position], x, y, subX, subY);
  } else {
    this.displayTile(tile, x, y, subX, subY);
  }
};

//Display method, this displays an entire object for whatever 'state' is specified
RpgObject.prototype.display = function (state) {
  'use strict';
  var y, x, selectX, selectY, displayState;
  displayState = this.states[state].tileMap;
  //Recursively call function to draw frames with timed intervals for animation
  //if this has an overlay, and is therefore the map, draw a portion of it
  if (this.overlay) {
    this.viewDrawOverlayWindow();
  }

  y = 0;
  for (selectY = this.canvasSelect.orig.y; selectY <= this.canvasSelect.bound.y; selectY += 1) {
    x = 0;
    for (selectX = this.canvasSelect.orig.x; selectX <= this.canvasSelect.bound.x; selectX += 1) {
      if (this.inside) {
        if (this.checkInBounds(selectX, selectY)) {
          this.displayDicEntry(displayState[selectY][selectX], x, y, this.sublocation.x, this.sublocation.y);
        } else {
          this.displayTile(this.tileDictionary['default'], x, y, this.sublocation.x, this.sublocation.y);
        }
      } else {
        this.displayDicEntry(displayState[selectY][selectX], x, y, 0, 0);
      }
      x += 1;
    }
    y += 1;
  }

  if (this.inside) {
    //Flip updated image to map
    this.playerView.context.drawImage(this.canvas, 0, 0);
  }

};

RpgObject.prototype.changeState = function (state) {
  'use strict';
  var i, x, y, tile;
  this.state = state;
  for (i = 0; i < this.animations[this.state].length; i += 1) {
    x = this.animations[this.state][i].x;
    y = this.animations[this.state][i].y;
    tile = this.tileDictionary[this.states[this.state].tileMap[y][x].tile];
    tile.animation.active = true;
  }
};

//load images in tileDictionary to used by Object into memory
RpgObject.prototype.loadTileDictionary = function (callback) {
  'use strict';
  //Load images, read ahead to process callback on last entry
  var prevEntry, key, prevImage, i;

  for (key in this.tileDictionary) {
    if (prevEntry) {
      if (prevEntry.animation) {
        for (i = 0; i < prevEntry.animation.frames.length; i += 1) {
          prevEntry.animation.frames[i].img = new Image();
          prevEntry.animation.frames[i].img.src = prevEntry.animation.frames[i].url;
        }
      } else {
        prevEntry.img = new Image();
        prevEntry.img.src = prevEntry.image.url;
      }
    }
    prevEntry = this.tileDictionary[key];
  }

  //Set onload event to call callback on last image
  //to insure all images are loaded before canvas is drawn
  if (prevEntry) {
    if (prevEntry.animation) {
      for (i = 0; i < prevEntry.animation.frames.length; i += 1) {
        if (prevImage) {
          prevImage.img = new Image();
          prevImage.img.src = prevImage.url;
        }
        prevImage = prevEntry.animation.frames[i];
      }
    } else {
      prevEntry.img = new Image();
      prevImage = prevEntry;
    }
    if (prevImage) {
      prevImage.img = new Image();
      prevImage.img.onload = function () {
        window.setTimeout(function () {
          callback();
        }, 250);
      };
      if (prevEntry.animation) {
        prevImage.img.src = prevImage.url;
      } else {
        prevImage.img.src = prevImage.image.url;
      }
    }
  }
};

RpgObject.prototype.progressAnimation = function (timer) {
  'use strict';
  var updated, i, x, y, tile;
  updated = false;
  for (i = 0; i < this.animations[this.state].length; i += 1) {
    x = this.animations[this.state][i].x;
    y = this.animations[this.state][i].y;
    tile = this.tileDictionary[this.states[this.state].tileMap[y][x].tile];
    if (tile.animation.active && !(timer % tile.animation.interval)) {
      if (this.checkInBounds(x, y)) {
        if (this.inside) {
          this.displayTile(tile.animation.frames[tile.animation.position], x - this.canvasSelect.orig.x, y - this.canvasSelect.orig.y, this.tileWidth - this.sublocation.x, this.tileHeight - this.sublocation.y);
        } else {
          this.displayTile(tile.animation.frames[tile.animation.position], x - this.canvasSelect.orig.x, y - this.canvasSelect.orig.y, 0, 0);
        }
      }
      tile.animation.position += 1;
      if (tile.animation.position > tile.animation.frames.length - 1) {
        tile.animation.position = 0;
        if (!tile.animation.continuous) {
          tile.animation.active = false;
        }
      }
      updated = true;
    }
  }

  if (this.inside && updated) {
    //Flip updated image to map
    this.playerView.context.drawImage(this.canvas, 0, 0);
  }
};

//Check if adjoining tile creates a collision event
RpgObject.prototype.checkCollision = function (x, y) {
  'use strict';
  if (!this.checkInBounds(x, y)) {
    return true;
  }
  if (!this.tileDictionary[this.states[this.state].tileMap[y][x].tile].walkable) {
    return true;
  }
  return false;
};

//Scroll map, canvas is scrolled by this.playerData.walkSpeed and edges are updated with new tiles
RpgObject.prototype.viewRedrawTop = function () {
  'use strict';
  var x;
  for (x = 0; x < this.canvasSelect.width; x += 1) {
    if (this.checkInBounds(this.canvasSelect.orig.x + x, this.canvasSelect.orig.y)) {
      this.displayDicEntry(this.states[this.state].tileMap[this.canvasSelect.orig.y][this.canvasSelect.orig.x + x], x, 0, this.tileWidth - this.sublocation.x, 0);
    } else {
      this.displayTile(this.tileDictionary['default'], x, 0, this.tileWidth - this.sublocation.x, 0);
    }
  }
};
RpgObject.prototype.viewRedrawRight = function () {
  'use strict';
  var y;
  for (y = 0; y < this.canvasSelect.height; y += 1) {
    if (this.checkInBounds(this.canvasSelect.bound.x - 1, this.canvasSelect.orig.y + y)) {
      this.displayDicEntry(this.states[this.state].tileMap[this.canvasSelect.orig.y + y][this.canvasSelect.bound.x - 1], this.canvasSelect.width - 1, y, 0, this.tileHeight - this.sublocation.y);
    } else {
      this.displayTile(this.tileDictionary['default'], this.canvasSelect.width - 1, y, 0, this.tileHeight - this.sublocation.y);
    }
  }
};
RpgObject.prototype.viewRedrawBottom = function () {
  'use strict';
  var x;
  for (x = 0; x < this.canvasSelect.width; x += 1) {
    if (this.checkInBounds(this.canvasSelect.orig.x + x, this.canvasSelect.bound.y - 1)) {
      this.displayDicEntry(this.states[this.state].tileMap[this.canvasSelect.bound.y - 1][this.canvasSelect.orig.x + x], x, this.canvasSelect.height - 1, this.tileWidth - this.sublocation.x, 0);
    } else {
      this.displayTile(this.tileDictionary['default'], x, this.canvasSelect.height - 1, this.tileWidth - this.sublocation.x, 0);
    }
  }
};
RpgObject.prototype.viewRedrawLeft = function () {
  'use strict';
  var y;
  for (y = 0; y < this.canvasSelect.height; y += 1) {
    if (this.checkInBounds(this.canvasSelect.orig.x, this.canvasSelect.orig.y + y)) {
      this.displayDicEntry(this.states[this.state].tileMap[this.canvasSelect.orig.y + y][this.canvasSelect.orig.x], 0, y, 0, this.tileWidth - this.sublocation.y);
    } else {
      this.displayTile(this.tileDictionary['default'], 0, y, 0, this.tileWidth - this.sublocation.y);
    }
  }
};

//draw border overlay on top of main window to hide scrolling tile updates
RpgObject.prototype.viewDrawOverlayWindow = function () {
  'use strict';
  var x, y;
  for (x = 0; x <= this.overlay.canvas.width; x  += this.tileWidth) {
    this.overlay.context.drawImage(this.tileDictionary.overlay.img, x, 0);
  }
  for (y = 0; y <= this.overlay.canvas.height; y += this.tileHeight) {
    this.overlay.context.drawImage(this.tileDictionary.overlay.img, (this.canvas.width - this.tileWidth), y);
  }
  for (x = 0; x <= this.overlay.canvas.width; x  += this.tileWidth) {
    this.overlay.context.drawImage(this.tileDictionary.overlay.img, x, (this.canvas.height - this.tileHeight));
  }
  for (y = 0; y <= this.overlay.canvas.height; y  += this.tileHeight) {
    this.overlay.context.drawImage(this.tileDictionary.overlay.img, 0, y);
  }
};

/*
params = {
  "direction" :
  "scrollPx" :
}
*/
RpgObject.prototype.objectScroll = function (params) {
  'use strict';
  switch (params.direction) {
  case 'up':
    this.canvasPosition.y  += params.scrollPx * 2;
    break;
  case 'right':
    this.canvasPosition.x  -= params.scrollPx * 2;
    break;
  case 'down':
    this.canvasPosition.y  -= params.scrollPx * 2;
    break;
  case 'left':
    this.canvasPosition.x  += params.scrollPx * 2;
    break;
  }
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
RpgObject.prototype.viewScroll = function (params) {
  'use strict';
  var self;
  self = this;

  function scrollObjects() {
    var key;
    for (key in self.rpgChildNodes) {
      if (self.playerData.id !== self.rpgChildNodes[key].id) {
        self.rpgChildNodes[key].objectScroll({
          "direction" : params.direction,
          "scrollPx" : params.scrollPx
        });
      }
    }
  }

  switch (params.direction) {
  case 'up':
    if (params.sublocation.y - params.scrollPx < 0) {
      if (!this.checkCollision(params.location.x, params.location.y - 1)) {
        params.sublocation.y = this.tileHeight - params.scrollPx;
        params.location.y -= 1;
        this.canvasSelect.orig.y -= 1;
        this.canvasSelect.bound.y -= 1;
        this.viewRedrawTop();
        this.context.drawImage(this.canvas, 0, params.scrollPx);
        scrollObjects();
      }
    } else {
      params.sublocation.y -= params.scrollPx;
      this.context.drawImage(this.canvas, 0, params.scrollPx);
      scrollObjects();
    }
    break;
  case 'right':
    if (params.sublocation.x + params.scrollPx > this.tileWidth - 1) {
      if (!this.checkCollision(params.location.x + 1, params.location.y)) {
        params.sublocation.x = 0;
        params.location.x += 1;
        this.canvasSelect.orig.x += 1;
        this.canvasSelect.bound.x += 1;
        this.context.drawImage(this.canvas, -params.scrollPx, 0);
        this.viewRedrawRight();
        scrollObjects();
      }
    } else {
      params.sublocation.x += params.scrollPx;
      this.context.drawImage(this.canvas, -params.scrollPx, 0);
      scrollObjects();
    }
    break;
  case 'down':
    if (params.sublocation.y + params.scrollPx > this.tileHeight - 1) {
      if (!this.checkCollision(params.location.x, params.location.y + 1)) {
        params.sublocation.y = 0;
        params.location.y += 1;
        this.canvasSelect.orig.y += 1;
        this.canvasSelect.bound.y += 1;
        this.context.drawImage(this.canvas, 0, -params.scrollPx);
        this.viewRedrawBottom();
        scrollObjects();
      }
    } else {
      params.sublocation.y  += params.scrollPx;
      this.context.drawImage(this.canvas, 0, -params.scrollPx);
      scrollObjects();
    }
    break;
  case 'left':
    if (params.sublocation.x - params.scrollPx < 0) {
      if (!this.checkCollision(params.location.x - 1, params.location.y)) {
        params.sublocation.x = this.tileWidth - params.scrollPx;
        params.location.x -= 1;
        this.canvasSelect.orig.x -= 1;
        this.canvasSelect.bound.x -= 1;
        this.viewRedrawLeft();
        this.context.drawImage(this.canvas, params.scrollPx, 0);
        scrollObjects();
      }
    } else {
      params.sublocation.x -= params.scrollPx;
      this.context.drawImage(this.canvas, params.scrollPx, 0);
      scrollObjects();
    }
    break;
  }

  //Flip updated image to map
  this.playerView.context.drawImage(this.canvas, 0, 0);
  return params;
};


var RPGModule =  (function () {
  'use strict';

  var rpgObject, rpgKeyPress, divWindow, objects;

  //flat list of all objects
  objects = {};

  //Recursively iterates through an object/container treee and creates rpgObjects from objectData
  function buildObjectTree(parentObj) {
    var key, childObj;
    objects[parentObj.id] = parentObj;
    for (key in parentObj.rpgChildNodes) {
      childObj = new RpgObject();
      childObj.init(playerData, parentObj.rpgChildNodes[key], divWindow, parentObj);
      parentObj.objectPush({"rpgObject" : childObj});
      buildObjectTree(parentObj.rpgChildNodes[key]);
    }
  }

  return {
    init : function (playerData, objData, inDivWindow) {
      var timer;
      divWindow = inDivWindow;

      //Build object tree view
      rpgObject = new RpgObject();
      rpgObject.init(playerData, objData, divWindow);
      buildObjectTree(rpgObject);

      timer = 0;
      //RPG Clock, at approx 16 times a sec TODO: describe what this does
      window.setInterval(function () {
        var key;
        timer += 1;
        if (rpgKeyPress) {
          objects.player.selfMove({"direction" : rpgKeyPress});
        }

        for (key in objects) {
          objects[key].progressAnimation(timer);
        }
      }, 62);

    },
    setKeyPress : function (keyPress) {
      rpgKeyPress = keyPress;
    }
  };

}());
