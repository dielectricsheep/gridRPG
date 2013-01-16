/*
    //Layout for RPG Tile Object
    var rpgObject = {

        //MAP ONLY FIELDS
        'viewWidth' : 21    //width of window in tiles
        ,'viewHeight' : 15  //height of window in tiles
        ,'viewPosLeft' : 0  //absolute offset of window from left in pixels
        ,'viewPosTop' : 0   //absolute offset of window from top in pixels
        ,'viewScale' : 2    //how much to scale the window up or down, decimals allowed
        ,'spawnPoints': {   //x,y map spawn, program only looks for 'default' key currently
          'default' : {  
           'x' : 15
          ,'y' : 30}
         }  

        //UNIVERSAL FIELDS
        ,'tileWidth': 16    //width of tile in pixels
        ,'tileHeight': 16   //height of tile in pixels
        ,'tilesWidth': 32   //width of object in tiles
        ,'tilesHeight': 31  //height of object in tiles

        //this is a repository of individual tiles and their associated images
        //layout for a static tile
        ,'tileDictionary' : {
           'default' : {                   //'default' tile is used to draw undefined areas of the map in the window
             'walkable' : false            //indicates if tile can be walked on            
             'image' : {                   //image information for a static tile
               'url' : '/images/black.png' //url for image
             }
           }                      
         
          //layout for a tile that is animated
          ,'animated_tile' : { 
             'walkable' : false     //indicates of tile can be walked on            
            ,'animation' : {        //animation data
               'continuous' : true  //indicates if animation will loop
              ,'active' : true      //indicates if animation gets drawn initially activated
              ,'interval': 4        //how many 1/16 pauses to wait between frames
              ,'length' : 8         //how many frames in animation
              ,'position' : 0       //which frame to start animation on
              //array of images
              ,'frames' : [
                 {'url' : '/images/waterfall_1.png'}
                ,{'url' : '/images/waterfall_2.png'}
                ,{'url' : '/images/waterfall_3.png'}
                ,{'url' : '/images/waterfall_4.png'}
                ,{'url' : '/images/waterfall_5.png'}
                ,{'url' : '/images/waterfall_6.png'}
                ,{'url' : '/images/waterfall_7.png'}
                ,{'url' : '/images/waterfall_8.png'}
                ,{'url' : '/images/waterfall_9.png'}
               ]}
            }                      
         }

        //different 'states' of an object, this is essentially one or more than one 2d arrays of an rpg object
        //referring to tiles in the tileDictionary
        //states can be cycled through for several purposes; to change directions in a walking sprite, or maybe
        //to change seasons on a map object.
        ,'states':{
          'default' : [
            [{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'grass'},{'tile' : 'grass'}]
          ]
         }
       };
*/
    //Animated sprite data
    var wizardObject = {
       'tileWidth': 16
      ,'tileHeight': 18  
      ,'tilesWidth': 1
      ,'tilesHeight': 1 
      ,'walkSpeed' : 2
      ,'tileDictionary' : {
       'default' : {
         'walkable' : 'false'             
        ,'animation' : {
           'continuous' : false
          ,'active' : false
          ,'interval': 2
          ,'length' : 1 
          ,'position' : 0 
          ,'frames' : [
             {'url' : '/images/wiz_3.png'}
            ,{'url' : '/images/wiz_4.png'}
           ]}
        }                      
      ,'walkUp' : {
         'walkable' : 'false'             
        ,'animation' : {
           'continuous' : false
          ,'active' : false
          ,'interval': 2
          ,'length' : 1 
          ,'position' : 0 
          ,'frames' : [
             {'url' : '/images/wiz_3.png'}
            ,{'url' : '/images/wiz_4.png'}
           ]}
        }                      
      ,'walkRight' : {
         'walkable' : 'false'             
        ,'animation' : {
           'continuous' : false
          ,'active' : false
          ,'interval': 2
          ,'length' : 1 
          ,'position' : 0 
          ,'frames' : [
             {'url' : '/images/wiz_7.png'}
            ,{'url' : '/images/wiz_8.png'}
           ]}
        }                      
      ,'walkDown' : {
         'walkable' : 'false'             
        ,'animation' : {
           'continuous' : false
          ,'active' : false
          ,'interval': 2
          ,'length' : 1 
          ,'position' : 0 
          ,'frames' : [
             {'url' : '/images/wiz_1.png'}
            ,{'url' : '/images/wiz_2.png'}
           ]}
        }                      
      ,'walkLeft' : {
         'walkable' : 'false'             
        ,'animation' : {
           'continuous' : false
          ,'active' : false
          ,'interval': 2
          ,'length' : 1 
          ,'position' : 0 
          ,'frames' : [
             {'url' : '/images/wiz_5.png'}
            ,{'url' : '/images/wiz_6.png'}
           ]}
        }                      
       } 
      ,'states':{
        'default' : [
         [{'tile' : 'walkDown'}]]
       ,'walkUp' : [
         [{'tile' : 'walkUp'}]]
       ,'walkRight' : [
         [{'tile' : 'walkRight'}]]
       ,'walkDown' : [
         [{'tile' : 'walkDown'}]]
       ,'walkLeft' : [
         [{'tile' : 'walkLeft'}]]
        }
    };

    //Map data
    var mapObject = {
        'viewWidth' : 21
        ,'viewHeight' : 15
        ,'viewPosLeft' : 0
        ,'viewPosTop' : 0
        ,'viewScale' : 2
        ,'tileWidth': 16
        ,'tileHeight': 16  
        ,'tilesWidth': 32
        ,'tilesHeight': 31
        ,'spawnPoints': { 
          'default' : {  
           'x' : 15
          ,'y' : 30}
         }  
        ,'tileDictionary' : {
           'default' : {
             'image' : {
               'url' : '/images/black.png'
             }
           }                      
          ,'bridge' : {
             'walkable' : true             
            ,'image' : {
               'url' : '/images/bridge.png'
             }
           }                      
          ,'bridge_vert' : {
             'walkable' : true      
            ,'image' : {
               'url' : '/images/bridge_vert.png'
             }
           }                      
          ,'cobblestone' : {
             'walkable' : true             
            ,'image' : {
               'url' : '/images/cobblestone.png'
             }
           }                      
          ,'cobblestone_corner' : {
             'walkable' : true      
            ,'image' : {
               'url' : '/images/cobblestone_corner.png'
             }
           }                      
          ,'cobblestone_shadow' : {
             'walkable' : true      
            ,'image' : {
               'url' : '/images/cobblestone_shadow.png'
             }
           }                      
          ,'door' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/door.png'
             }
           }                      
          ,'flowers' : {
             'walkable' : true             
            ,'image' : {
               'url' : '/images/flowers.png'
             }
           }                      
          ,'grass' : {
             'walkable' : true             
            ,'image' : {
               'url' : '/images/grass.png'
             }
           }                      
          ,'grass_corner' : {
             'walkable' : true             
            ,'image' : {
               'url' : '/images/grass_corner.png'
             }
           }                      
          ,'grass_shadow' : {
             'walkable' : true             
            ,'image' : {
               'url' : '/images/grass_shadow.png'
             }
           }                      
          ,'house_wall' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/house_wall.png'
             }
           }                      
          ,'outcropping' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/outcropping.png'
             }
           }                      
          ,'out_corner' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/out_corner.png'
             }
           }                      
          ,'out_left' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/out_left.png'
             }
           }                      
          ,'out_top' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/out_top.png'
             }
           }                      
          ,'overlay' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/white.png'
             }
           }                      
          ,'peak_left' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/peak_left.png'
             }
           }                      
          ,'peak_mid' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/peak_mid.png'
             }
           }                      
          ,'peak_right' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/peak_right.png'
             }
           }                      
          ,'peak_top' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/peak_top.png'
             }
           }                      
          ,'roof' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/roof.png'
             }
           }                      
          ,'roof_chimney' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/roof_chimney.png'
             }
           }                      
          ,'roof_top' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/roof_top.png'
             }
           }                      
          ,'rough' : {
             'walkable' : true             
            ,'image' : {
               'url' : '/images/rough.png'
             }
           }                      
          ,'sign_inn' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/sign_inn.png'
             }
           }                      
          ,'sign_shield' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/sign_shield.png'
             }
           }                      
          ,'sign_star' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/sign_star.png'
             }
           }                      
          ,'sign_sword' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/sign_sword.png'
             }
           }                      
          ,'slate' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/slate.png'
             }
           }                      
          ,'slate_top' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/slate_top.png'
             }
           }                      
          ,'stairs' : {
             'walkable' : true             
            ,'image' : {
               'url' : '/images/stairs.png'
             }
           }                      
          ,'tree_bottom' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/tree_bottom.png'
             }
           }                      
          ,'tree_top' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/tree_top.png'
             }
           }                      
          ,'trees' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/trees.png'
             }
           }                      
          ,'two_windows' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/two_windows.png'
             }
           }                      
          ,'wall_bottom' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/wall_bottom.png'
             }
           }                      
          ,'wall_top' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/wall_top.png'
             }
           }                      
          ,'water' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/water.png'
             }
           }                      
          ,'water_corner' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/water_corner.png'
             }
           }                      
          ,'water_shadow' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/water_shadow.png'
             }
           }                      
          ,'well' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/well.png'
             }
           }                      
          ,'window' : {
             'walkable' : false             
            ,'image' : {
               'url' : '/images/window.png'
             }
           }                      
          ,'waterfall' : {
             'walkable' : false             
            ,'animation' : {
               'continuous' : true
              ,'active' : true
              ,'interval': 4
              ,'length' : 8 
              ,'position' : 0 
              ,'frames' : [
                 {'url' : '/images/waterfall_1.png'}
                ,{'url' : '/images/waterfall_2.png'}
                ,{'url' : '/images/waterfall_3.png'}
                ,{'url' : '/images/waterfall_4.png'}
                ,{'url' : '/images/waterfall_5.png'}
                ,{'url' : '/images/waterfall_6.png'}
                ,{'url' : '/images/waterfall_7.png'}
                ,{'url' : '/images/waterfall_8.png'}
                ,{'url' : '/images/waterfall_9.png'}
               ]}
            }                      
         }
        ,'states':{
          'default' : [
            [{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'grass'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'out_left'},{'tile' : 'grass'},{'tile' : 'tree_bottom'},{'tile' : 'trees'},{'tile' : 'tree_bottom'},{'tile' : 'tree_bottom'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'stairs'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'grass'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'out_left'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'tree_bottom'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'water_corner'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'tree_top'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'roof_top'},{'tile' : 'roof_top'},{'tile' : 'roof_top'},{'tile' : 'roof_top'},{'tile' : 'roof_top'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'tree_top'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'out_corner'},{'tile' : 'grass'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'water_corner'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'tree_top'},{'tile' : 'tree_bottom'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'roof'},{'tile' : 'roof'},{'tile' : 'roof'},{'tile' : 'roof'},{'tile' : 'roof'},{'tile' : 'grass_shadow'},{'tile' : 'tree_top'},{'tile' : 'tree_bottom'},{'tile' : 'grass'},{'tile' : 'tree_top'},{'tile' : 'grass'},{'tile' : 'out_left'},{'tile' : 'tree_top'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'trees'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'house_wall'},{'tile' : 'window'},{'tile' : 'window'},{'tile' : 'door'},{'tile' : 'two_windows'},{'tile' : 'grass_corner'},{'tile' : 'tree_bottom'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'tree_bottom'},{'tile' : 'grass'},{'tile' : 'out_left'},{'tile' : 'trees'},{'tile' : 'water_shadow'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'trees'},{'tile' : 'trees'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'trees'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'rough'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'rough'},{'tile' : 'flowers'},{'tile' : 'rough'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'out_left'},{'tile' : 'trees'},{'tile' : 'water_shadow'},{'tile' : 'trees'},{'tile' : 'tree_bottom'},{'tile' : 'tree_bottom'},{'tile' : 'trees'},{'tile' : 'trees'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'trees'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'tree_top'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'grass'},{'tile' : 'rough'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'out_left'},{'tile' : 'tree_bottom'},{'tile' : 'water_shadow'},{'tile' : 'tree_bottom'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'tree_bottom'},{'tile' : 'tree_bottom'},{'tile' : 'tree_bottom'},{'tile' : 'tree_bottom'},{'tile' : 'tree_bottom'},{'tile' : 'tree_bottom'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'tree_bottom'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'waterfall'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'waterfall'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'stairs'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'grass_corner'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'roof_top'},{'tile' : 'peak_top'},{'tile' : 'roof_top'},{'tile' : 'rough'},{'tile' : 'slate_top'},{'tile' : 'slate_top'},{'tile' : 'slate_top'},{'tile' : 'slate_top'},{'tile' : 'slate_top'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'water_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'tree_top'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'peak_left'},{'tile' : 'sign_shield'},{'tile' : 'peak_right'},{'tile' : 'grass_shadow'},{'tile' : 'slate'},{'tile' : 'slate'},{'tile' : 'slate'},{'tile' : 'slate'},{'tile' : 'slate'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'water_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'tree_top'},{'tile' : 'tree_top'},{'tile' : 'trees'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'two_windows'},{'tile' : 'house_wall'},{'tile' : 'two_windows'},{'tile' : 'grass_shadow'},{'tile' : 'window'},{'tile' : 'door'},{'tile' : 'window'},{'tile' : 'window'},{'tile' : 'two_windows'},{'tile' : 'grass_corner'},{'tile' : 'grass'},{'tile' : 'water_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'roof_top'},{'tile' : 'peak_top'},{'tile' : 'roof_top'},{'tile' : 'grass'},{'tile' : 'tree_top'},{'tile' : 'trees'},{'tile' : 'trees'},{'tile' : 'trees'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'tree_top'},{'tile' : 'grass'},{'tile' : 'two_windows'},{'tile' : 'door'},{'tile' : 'two_windows'},{'tile' : 'grass_corner'},{'tile' : 'grass'},{'tile' : 'cobblestone'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'bridge'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'peak_left'},{'tile' : 'sign_star'},{'tile' : 'peak_right'},{'tile' : 'grass_shadow'},{'tile' : 'trees'},{'tile' : 'trees'},{'tile' : 'trees'},{'tile' : 'trees'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'tree_bottom'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'cobblestone'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'grass'},{'tile' : 'cobblestone'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'outcropping'},{'tile' : 'water_corner'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'two_windows'},{'tile' : 'door'},{'tile' : 'two_windows'},{'tile' : 'grass_corner'},{'tile' : 'tree_bottom'},{'tile' : 'tree_bottom'},{'tile' : 'trees'},{'tile' : 'trees'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'tree_top'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'tree_bottom'},{'tile' : 'trees'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'tree_bottom'},{'tile' : 'cobblestone'},{'tile' : 'well'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'water_shadow'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'roof_top'},{'tile' : 'peak_top'},{'tile' : 'roof_top'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'tree_bottom'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'roof_top'},{'tile' : 'roof_chimney'},{'tile' : 'peak_top'},{'tile' : 'roof_top'},{'tile' : 'cobblestone'},{'tile' : 'outcropping'},{'tile' : 'water_corner'},{'tile' : 'outcropping'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'peak_left'},{'tile' : 'sign_sword'},{'tile' : 'peak_right'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'roof_top'},{'tile' : 'roof_top'},{'tile' : 'roof_top'},{'tile' : 'roof_top'},{'tile' : 'roof_top'},{'tile' : 'roof'},{'tile' : 'peak_left'},{'tile' : 'peak_mid'},{'tile' : 'peak_right'},{'tile' : 'cobblestone'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'outcropping'},{'tile' : 'bridge_vert'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'grass'},{'tile' : 'tree_top'},{'tile' : 'two_windows'},{'tile' : 'two_windows'},{'tile' : 'two_windows'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'roof'},{'tile' : 'sign_inn'},{'tile' : 'roof'},{'tile' : 'roof'},{'tile' : 'roof'},{'tile' : 'two_windows'},{'tile' : 'two_windows'},{'tile' : 'two_windows'},{'tile' : 'two_windows'},{'tile' : 'cobblestone_shadow'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'bridge_vert'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'grass'},{'tile' : 'tree_bottom'},{'tile' : 'two_windows'},{'tile' : 'house_wall'},{'tile' : 'two_windows'},{'tile' : 'grass_shadow'},{'tile' : 'tree_top'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'flowers'},{'tile' : 'house_wall'},{'tile' : 'two_windows'},{'tile' : 'house_wall'},{'tile' : 'two_windows'},{'tile' : 'house_wall'},{'tile' : 'two_windows'},{'tile' : 'house_wall'},{'tile' : 'two_windows'},{'tile' : 'house_wall'},{'tile' : 'cobblestone_shadow'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'water'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'two_windows'},{'tile' : 'door'},{'tile' : 'two_windows'},{'tile' : 'grass_corner'},{'tile' : 'tree_bottom'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'flowers'},{'tile' : 'house_wall'},{'tile' : 'door'},{'tile' : 'house_wall'},{'tile' : 'two_windows'},{'tile' : 'house_wall'},{'tile' : 'two_windows'},{'tile' : 'house_wall'},{'tile' : 'door'},{'tile' : 'house_wall'},{'tile' : 'cobblestone_corner'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'water_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'well'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'bridge'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'water_shadow'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'outcropping'},{'tile' : 'water_corner'},{'tile' : 'rough'},{'tile' : 'rough'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'flowers'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'water_shadow'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'stairs'},{'tile' : 'outcropping'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'cobblestone'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'water'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'grass'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'wall_top'},{'tile' : 'grass_shadow'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'grass_corner'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'wall_bottom'},{'tile' : 'grass_corner'},{'tile' : 'grass'}]
            ,[{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'},{'tile' : 'grass'}]
          ]
         }
       };
