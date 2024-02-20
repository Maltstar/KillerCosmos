

/* Anfang Function Game */
function Game()
{

  //############## Anfang Variables Definieren ####################

  // user sound setting
  let sound_user_set = false;

  // Selektieren des Canvas
  let co = el('#canvas');

  // Offscreen canevas für Rendering Optimierung
  co.offscreenCanvas = document.createElement('canvas');
  co.offscreenCanvas.width = co.width;
  co.offscreenCanvas.height = co.height;

  // Kontext des Canvas extrahieren
  let ctx = co.getContext('2d');


  let lifeCount, animate, tCode, keysPressed,  index_UFO, FleatUFO, allSounds, cpt_sound_voice, cpt_sound_collision_satellite, cpt_sound_collision_planet, nivo, reinitUfoPosition, start_level, Nb_asteroids, Nb_satellites, Nb_planet; 
  let game_won = false; 

  // Initiale Anzahl von UFOs
  Nb_asteroids = 20; 
  Nb_satellites = 90;
  Nb_planet = 60;

  //############## Ende Variables Definieren ####################



  //############## Anfang Objekten Definieren ###################

 

  /**** spaceShip Anfang ****/

  let spaceShip   ={
      x   :80,   // Koordinaten X Achse - Anfang Position
      y   :190,  // Koordinaten Y Achse - Anfang Position 
      w   :30,   // Breite des Raumschiffs
      h   :30,  // Höhe des Raumschiffs
      speed: 7, // Geschwindigkeit auf  X Achse
      inertie: false, // die Inertie der Raumschiff

      src : 'img/spacekraft1-01.png', // Bild für die Darstellung des Raumschiffes, @ Kollisionsraume passiert auf einem Quadrat nicht auf dem Spacecraft

      init: function(){  // Reinitializert die Koordinaten X und Y zu Ihrem Anfang Positionen
        this.x=80; 
        this.y=190; 
        safeTakeoff(); 
        tCode=""; 

      // Setze eine Inertie für den Raumschiff
        console.log("nivo",nivo);
        if(nivo == 2)
        {
          this.inertie = true;
        }
        
      },
      // Setzt die Bewegungen des Raumschiffs
      move: function () {
        // ruf x und y position vor zeichnen
        
        // Steuerung des Raumschiffsbewegungs nach links mit der Detektion des gedrückten Taste "ArrowLeft"
        // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          // if (tCode === "ArrowLeft" && this.x > 0 ) 
          // {
          //   // Stop die Inertie nur für nivo 2
          //   this.inertie = false;    
          //   // Fahrt des Raumschiffes nach links mit angegebenen Geschwindigkeit
          //   this.x -= this.speed;

          //   // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die angegebene Geschwindigkeit
          //   // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden   
          //   if (this.x < this.speed)
          //   {
          //     this.x=0
          //   };
          
          // };

         if(nivo == 0 || nivo ==1)
         {
          this.inertie = false;
         } 
        console.log(keysPressed);
        console.log("nivo",nivo);
        // Steuerung des Raumschiffsbewegungs nach links mit der Detektion des gedrückten Taste "ArrowLeft"
        // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowLeft" && !keysPressed['ArrowUp'] && !keysPressed['ArrowDown'] && this.x > 0 ) 
          {
            // Stop die Inertie nur für nivo 2
            this.inertie = false;    
            // Fahrt des Raumschiffes nach links mit angegebenen Geschwindigkeit
            this.x -= this.speed;

            // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die angegebene Geschwindigkeit
            // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden   
            if (this.x < this.speed)
            {
              this.x=0
            };
          
          };

        // Steuerung des Raumschiffsbewegungs nach links und oben mit der Detektion des gedrückten Taste "ArrowLeft"
        // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
        if (tCode === "ArrowLeft" && keysPressed['ArrowUp'] && !keysPressed['ArrowDown'] && this.x > 0 ) 
        {
          // Stop die Inertie nur für nivo 2
          //this.inertie = false;    
          // Fahrt des Raumschiffes nach links und oben mit angegebenen Geschwindigkeit
          this.x -= this.speed;
          this.y -= this.speed;
          // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die angegebene Geschwindigkeit
          // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden   
          if (this.x < this.speed)
          {
            this.x=0
          };
        
        };


        // Steuerung des Raumschiffsbewegungs nach links und unten mit der Detektion des gedrückten Taste "ArrowLeft"
        // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
        if (tCode === "ArrowLeft" && !keysPressed['ArrowUp'] && keysPressed['ArrowDown'] && this.x > 0 ) 
        {
          // Stop die Inertie nur für nivo 2
          //this.inertie = false;    
          // Fahrt des Raumschiffes nach links und oben mit angegebenen Geschwindigkeit
          this.x -= this.speed;
          this.y += this.speed;
          // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die angegebene Geschwindigkeit
          // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden   
          if (this.x < this.speed)
          {
            this.x=0
          };
        
        };

          // // Steuerung des Raumschiffsbewegung nach rechts mit der Detektion des gedrückten Taste "ArrowRight"
          // // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          // if (tCode === "ArrowRight" && this.x < co.width - this.w ) 
          // {
          //   // Fahrt des Raumschiffes nach rechts mit angegebenen Geschwindigkeit
          //   this.x += this.speed;

          //   // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die Breite des Raumschiffsbewegung
          //   // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden
          //   if (this.x > co.width - this.w )
          //   {
          //     this.x = co.width - this.w;
          //   };
          // };


          // Steuerung des Raumschiffsbewegung nach rechts mit der Detektion des gedrückten Taste "ArrowRight"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowRight" && !keysPressed['ArrowUp'] && !keysPressed['ArrowDown'] && this.x < co.width - this.w ) 
          {
            // Fahrt des Raumschiffes nach rechts mit angegebenen Geschwindigkeit
            this.x += this.speed;

            // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die Breite des Raumschiffsbewegung
            // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden
            if (this.x > co.width - this.w )
            {
              this.x = co.width - this.w;
            };
          };


          // Steuerung des Raumschiffsbewegung nach rechts und oben mit der Detektion des gedrückten Taste "ArrowRight"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowRight" && keysPressed['ArrowUp'] && !keysPressed['ArrowDown'] && this.x < co.width - this.w ) 
          {
            // Fahrt des Raumschiffes nach rechts und oben mit angegebenen Geschwindigkeit
            this.x += this.speed;
            this.y -= this.speed;

            // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die Breite des Raumschiffsbewegung
            // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden
            if (this.x > co.width - this.w )
            {
              this.x = co.width - this.w;
            };
          };


          // Steuerung des Raumschiffsbewegung nach rechts und unten mit der Detektion des gedrückten Taste "ArrowRight"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowRight" && !keysPressed['ArrowUp'] && keysPressed['ArrowDown'] && this.x < co.width - this.w ) 
          {
            // Fahrt des Raumschiffes nach rechts und unten mit angegebenen Geschwindigkeit
            this.x += this.speed;
            this.y += this.speed;

            // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die Breite des Raumschiffsbewegung
            // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden
            if (this.x > co.width - this.w )
            {
              this.x = co.width - this.w;
            };
          };

          // // Steuerung des Raumschiffsbewegung nach oben mit der Detektion des gedrückten Taste "ArrowUp"
          // // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          // if (tCode === "ArrowUp" && this.y >= 0)
          // {
          //   // Fahrt des Raumschiffes nach oben mit angegebenen Geschwindigkeit
          //     this.y -= this.speed;

          //   // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die angegebene Geschwindigkeit
          //   // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden 
          //     if (this.y < this.speed)
          //     {
          //       this.y=0;
          //     };
              
          // };


          // Steuerung des Raumschiffsbewegung nach oben mit der Detektion des gedrückten Taste "ArrowUp"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowUp" && !keysPressed['ArrowLeft'] && !keysPressed['ArrowRight'] && this.y >= 0)
          {
            // Fahrt des Raumschiffes nach oben mit angegebenen Geschwindigkeit
              this.y -= this.speed;

            // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die angegebene Geschwindigkeit
            // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden 
              if (this.y < this.speed)
              {
                this.y=0;
              };
              
          };


          // Steuerung des Raumschiffsbewegung nach oben und links mit der Detektion des gedrückten Taste "ArrowUp"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowUp" && keysPressed['ArrowLeft'] && !keysPressed['ArrowRight'] && this.y >= 0)
          {
            // Fahrt des Raumschiffes nach oben und links mit angegebenen Geschwindigkeit
              this.y -= this.speed;
              this.x -= this.speed;

            // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die angegebene Geschwindigkeit
            // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden 
              if (this.y < this.speed)
              {
                this.y=0;
              };
              
          };


          // Steuerung des Raumschiffsbewegung nach oben und rechts mit der Detektion des gedrückten Taste "ArrowUp"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowUp" && !keysPressed['ArrowLeft'] && keysPressed['ArrowRight'] && this.y >= 0)
          {
            // Fahrt des Raumschiffes nach oben und rechts mit angegebenen Geschwindigkeit
              this.y -= this.speed;
              this.x += this.speed;

            // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die angegebene Geschwindigkeit
            // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden 
              if (this.y < this.speed)
              {
                this.y=0;
              };
              
          };

          // // Steuerung des Raumschiffsbewegung nach unten mit der Detektion des gedrückten Taste "ArrowUp"
          // // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          // if (tCode === "ArrowDown" && this.y < co.height - this.h) 
          // {
          //   // Fahrt des Raumschiffes nach unten mit angegebenen Geschwindigkeit
          //     this.y += this.speed;

          //     // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die Höhe des Raumschiffsbewegung
          //     // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden
          //     if (this.y > co.height- this.h )
          //     {
          //       this.y=co.height - this.h;
          //     };
            
          // };


          // Steuerung des Raumschiffsbewegung nach unten mit der Detektion des gedrückten Taste "ArrowUp"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowDown" && !keysPressed['ArrowLeft'] && !keysPressed['ArrowRight'] && this.y < co.height - this.h) 
          {
            // Fahrt des Raumschiffes nach unten mit angegebenen Geschwindigkeit
              this.y += this.speed;

              // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die Höhe des Raumschiffsbewegung
              // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden
              if (this.y > co.height- this.h )
              {
                this.y=co.height - this.h;
              };
            
          };


          // Steuerung des Raumschiffsbewegung nach unten mit der Detektion des gedrückten Taste "ArrowUp"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowDown" && keysPressed['ArrowLeft'] && !keysPressed['ArrowRight'] && this.y < co.height - this.h) 
          {
            // Fahrt des Raumschiffes nach unten und links mit angegebenen Geschwindigkeit
              this.y += this.speed;
              this.x -= this.speed;

              // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die Höhe des Raumschiffsbewegung
              // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden
              if (this.y > co.height- this.h )
              {
                this.y=co.height - this.h;
              };
            
          };


          // Steuerung des Raumschiffsbewegung nach unten mit der Detektion des gedrückten Taste "ArrowUp"
          // Wenn das Raumschiff innerhalb des Canevas Rahmens liegt
          if (tCode === "ArrowDown" && !keysPressed['ArrowLeft'] && keysPressed['ArrowRight'] && this.y < co.height - this.h) 
          {
            // Fahrt des Raumschiffes nach unten und rechts mit angegebenen Geschwindigkeit
              this.y += this.speed;
              this.x += this.speed;

              // Wenn der Abstand zwichen Canevas Border und das Raumschiff ist kleiner als die Höhe des Raumschiffsbewegung
              // Positionierung des Raumschiffs auf dem Canevas Border um Canvas Überschreitung zu Vermeidung zu vermeiden
              if (this.y > co.height- this.h )
              {
                this.y=co.height - this.h;
              };
            
          };
          
          this.draw();
          //console.log(this.y+this.h); 
        },

        set_inertie:function()
        {
          console.log("set_inertie");
          // Fahrt des Raumschiffes nach links mit angegebenen Geschwindigkeit
          this.x += this.speed;
          console.log(this.x);
        },
        
      // Zeichnen des Raumschiffs auf dem Canevas
        draw: function () 
        {
          // Zeichnen des Raumschiffs mit dem angegebenen src Bild und die entsprechende Koordinaten
          imageThissrc(this);  
        },
  };

  /****spaceShip Ende ****/
 
  

  /**** UFO Anfang ****/
  let UFO ={
          x     :20,  // Koordinaten X Achse - Anfang Position
          y     :20,  // Koordinaten Y Achse - Anfang Position
          w     :25,  // Breite des Raumschiffs 
          h      :25,  // Höhe des Raumschiffs
          id    : 0,  // Kennzeichnung des Satellits
          col   :"red", // Farbe des Satellits
          Nb    :10, //Number of ufo in the level
          rx    : 0, //Richtung der Bewegung auf X Achse, rx: 0 ->recht // 1-> links 
          ry    : 0, //Richtung der Bewegung auf Y Achse, ry: 0 -> abwärts// 1-> aufwärts
          spX   :0, // Geschwindigkeit auf X Achse
          spY   :0, // Geschwindigkeit auf Y Achse
          src   : 'img/spacekraft1-01.png',
          initUFO :"",   
          init  :function() // Intializatierung von verschieden Parametern
           {
            
            /* init of the index_UFO only when the level is starting not when there is a collision*/ 
            if(reinitUfoPosition == false || start_level == true)
            {
              //UFO fleat defined 
              FleatUFO[index_UFO]=this; 
            
              // Setzt Kennzeichnung des UFO
              this.id = index_UFO;  
            
              // Aktualisierung des Indexes für den nächste UFO
              index_UFO ++; 
            }


           
            //Define the number of items in the fleat according to what's set up into level
            //FleatUFO.length=Level[nivo].Nb; 


            //Define UFO 
            // Zufällige Position für den UFO berechenen 
            this.x    = Math.floor(Math.random()* co.width);
            this.y    = Math.floor(Math.random()* co.height);
            
            console.log("FleatUFO");
            console.log(FleatUFO);
            //Voraussetzungen für jeder UFO pro Level 
            chooseLevel(); 
            
          
          },
        
          move   :function()
          {
            //Bereich Grenzen definieren und Position setzen 
            
            // Wenn der UFO außerhalb dem rechten Seite des Canevas fährt
            if(this.x > co.width)
            {
              // Rücksetzen des UFO Positions auf der linken Canevas Kante
              this.x = 0;
            }; 
              
            // Wenn der UFO außerhalb dem linken Seite des Canevas fährt
            if(this.x < 0)
            {
              // Rücksetzen des UFO Positions auf der rechten Canevas Kante
              this.x=co.width;
            }; 
            
            // Wenn der UFO außerhalb den untere Seite des Canevas fährt
            if(this.y > co.height)
            {
              // Rücksetzen des UFO Positions auf der oberen Canevas Kante
              this.y=0;
            ;}

            // Wenn der UFO außerhalb den obere Seite des Canevas fährt
            if(this.y < 0 )        
            {
              // Rücksetzen des UFO Positions auf der unteren Canevas Kante
              this.y=co.height;
            }; 

            //Berechnen - Festlegen der Animation
            // Fahrt des Raumschiffes nach rechts mit angegebenen Geschwindigkeit
            if(this.rx === 0 )
            {
              this.x+= this.spX;
            }; 

            // Fahrt des Raumschiffes nach links mit angegebenen Geschwindigkeit
            if(this.rx === 1)
            {
              this.x -= this.spX;
            } 
            
            // Fahrt des Raumschiffes abwärts mit angegebenen Geschwindigkeit
            if (this.ry===0)
            {
              this.y += this.spY;
            };
            
            // Fahrt des Raumschiffes aufwärts mit angegebenen Geschwindigkeit
            if (this.ry===1)
            {
              this.y -= this.spY;
            };

            // Kollision detektieren
            if(kollisionRectRect (FleatUFO[this.id], spaceShip))
            {
              youLoose(); 
              
            };

            
            
              // Zeichnen des Satelites
              this.draw();
          },

          draw   :function(){
            imageThissrc(this)
          }
  }; 

  /**** UFO Ende ****/

  /*** Level Anfang  *******/
  // Alle Specificitäten der Levels 
  // Level[x]= Level x1 - Bs: Level[0]= Level 1
  // x bezeichnet beim nivo
  //  Name des Level: Level[x].title
  // Background des Level: Level[x].background
  //Gegnersanblick des Level:Level[x].spacecraft
  // Gegnersanzahl des Level:Level[x].Nb
  //specefiche Bewegungen und Gröse des Gegners:Level[x].settings
  let Level = [
    {
      title: "asteroide",
      background: "url('img/universe_blue.jpg')",
      spacecraft: 'img/aste.png',
      Nb: Nb_asteroids,
      settings: function () {
        // Aufgaben, die gilten für alle UFO
        //asteroide fallen - richtung abwärt
        UFO.ry = 0;

        //Aufgaben, die jeder UFO unterscheidlichen Werten brauchen. 
        FleatUFO.forEach(function (UFO) {
          // Zufällige Größe für asteroide - min 15
          UFO.w = Math.floor(Math.random() * 20 + 15);
          UFO.h = UFO.w;
          // unterscheidliche speed für asteroide - min 2xschneller
          UFO.spY = (Math.random() * 2);

        });
      }
    },
    {
      title: 'satellite',
      background: "url('img/universe_earth.jpg')",
      spacecraft: 'img/spacekraft1-01.png',
      Nb: Nb_satellites,
      settings: function () {

        FleatUFO.forEach(function (UFO) {
          // Zufällige Größe für die Satelliten - min 15px
          UFO.w = Math.floor(Math.random() * 20 + 15);
          UFO.h = UFO.w;

          // Zufällige Geschwindigkeiten für die Satelliten

          UFO.spX = (Math.random());
          UFO.spY = (Math.random());

          //Zufällige Richtungen für die Satelliten - Satelliten fliegen und folgen einem Orbite. 
          UFO.rx = Math.round(Math.random());
          UFO.ry = Math.round(Math.random());


        })

      }
    },
    /* Bug known: Sometimes the position of the planets do not allow to win at all to be corrected */
    {
      title: 'deathRay',
      background: "url('img/universe_rosa.jpg')",
      spacecraft: 'img/planet.png',
      Nb: Nb_planet,
      settings: function () {
        
        FleatUFO.forEach(function (UFO) {
          //Planet stay static
           UFO.spX = 0;
           UFO.spY = 0;

          //Planet gröse - min 40px 
          UFO.w = Math.floor(Math.random() * 40 + 50);
          UFO.h = UFO.w;
        });
      }
    }
  ];
  /**** level Ende ****/



    /**** safeSpace Anfang ****/

  // Sicherheit Gebiet für das Raumschiffs
  let safeSpace = 
  {
    x   :60,   // Koordinaten X Achse - Anfang Position
    y   :170,  // Koordinaten Y Achse - Anfang Position 
    w   :80,   // Breite des Raumschiffs
    h   :80,  
    
    col  : 'white',
    init : function(){
     // this.draw(); 
      this.x=750; 
      this.draw(); 
    },
    draw : function(){
      ctx.fillStyle= this.col; 
      ctx.fillRect(this.x, this.y, this.w, this.h)
      
    }
  }; 

  /**** safeSpace Ende ****/

  /**** endLevel Anfang ****/

  // Zielpunkts des Ends des Levels 
  let endLevel ={
      x     : 0,  // Koordinaten X Achse - Anfang Position
      y     : 0,  // Koordinaten Y Achse - Anfang Position
      w     : 10, // Breite der Markierung
      h     : 50, // Breite der Höhe
      col   : 'white', // Farbe
      style : '', 
      init  : function()
      {
        // Setzen in der Mitte am Rand der rechten Canevas Kante
        this.x = co.width -this.w*2;
        this.y = (co.height-this.h)/2; 

        // Raumschiff am Ende des aktuellen Stufenspiel 
        if(kollisionRectRect (this, spaceShip))
        { 
          // Einstellung der nächsten Stufenspiel
          nivo++;

          // Löschen von vorhandene UFO
          klonCleaner()
          // Löschen von gedrückten Tasture
          erase_keypressed();


          
          // Spiel Ton "Level cleared"
          playSound(allSounds.others[0]); 

          //Gewinnt des Spiel - letzte Nivo gewinnt
          if( (nivo+1) > Level.length)
          {
            alert(`You land safely on the new Planet to colonize it. 
            Unfortunalty the atmosphere is not breathable. 
            You must continue to wander in the univers
            and maybe find a suitable planet and maybe rescue humanity. 
            `); 
            //game_won = true;
            // Schwierigkeitgrad erhöhen
            Level[0].Nb = Level[0].Nb + 15;
            Level[1].Nb = Level[1].Nb + 15;
            Level[2].Nb = Level[2].Nb + 5;
            restart_game(); // restart the game 
          
          }
          else
          {
            //Nächsten Level
            // Nachricht anzeigen
            alert('Next Level');
            // Music ändern;
            setMusic(allSounds.music[nivo]);
            if(sound_user_set == true)
            {
              playMusic();
            }
            console.log(nivo);

            //Next Level zahlen 
            // nivo count 10-02
            
            //Level Counter 
            tellNivo(); 

            // Meldung eines neues Level
            start_level = true;

            // Löschen von gedrückten Tasture
            //erase_keypressed();
            
            


            //alert('Next Level');

            //ruf normal die UFOs fonction (init)
            klonFabrik(Number(Level[nivo].Nb), UFO);
            spaceShip.init(); 
          }
        
        }; 
        
        //Markierung zeichnen
        this.draw(); 
        
      },

      // zeichnen des Zielpunkts
      draw : function(){
        ctx.fillStyle = this.col;       
        ctx.fillRect(this.x, this.y, this.w, this.h);
      }
  }

    /* endLevel Ende */


     
//############## Ende Objekten Definieren ###################



//############## Anfang Funktionen Definieren ####################

  /***** Anfang Init_variables() *******/ 
  /* Initializiert die Global variables auf einem definiert Werte */
  function init_variables()
  {
    nivo = 0;// Setzte die erste Level
    lifeCount = 15; // Anzahl von Spieler Leben
    animate = false; // steuert die Animation
    tCode = false; // speichert die gedrückte Taste, hier taste "ArrowLeft","ArrowRight","ArrowUp", "ArrowDown"
    index_UFO  = 0;  // index_UFO für den FleatUFO
    FleatUFO = []; // Sammelung Array von Objecten für den aktuelle Spielstuffe
    //soundSwitch = false; // Muted Ton per Default
    reinitUfoPosition = false;
    soundSwitch = sound_user_set;
    cpt_sound_voice = 0; // Auswahl erste Tote Stimme
    cpt_sound_collision_satellite = 3; // Auswahl erste Ton
    cpt_sound_collision_planet = 5;
    allSounds =  // Stimme und  Musik Kollection
    {
      erfolg :"sound/death1.mp3",
      lost : [
        "sound/voice/mandie1.mp3",
        "sound/voice/mandie8.mp3",
        "sound/voice/mandie2.mp3",
        "sound/voice/mandie3.mp3",
        "sound/voice/mandie4.mp3",
        "sound/voice/mandie5.mp3",
        "sound/voice/mandie6.mp3",
        "sound/voice/tanyadeath.mp3",
      ],
    
      music : ["sound/music/stage1.mp3",
               "sound/music/stage2.mp3",
               "sound/music/stage3.mp3"],

      others : ["sound/others/level_cleared.mp3",
                "sound/others/spaceship_destroyed.mp3",
                "sound/others/hit_asteroid.mp3",
                "sound/others/hit_satellite_33.mp3",
                "sound/others/hit_satellite_47.mp3",
                "sound/others/hit_planet_V04.mp3",
                "sound/others/hit_planet_V05.mp3"
              ]
      
    

    }

   // Setzt die Anfang Parametern für die Musik
   music = new Audio();
   music.volume = 0.4;
   music.src = allSounds.music[0];
   music.loop = true;

   
  }

  /***** Ende Init_variables() *******/ 

  /***** Anfang playSound() *******/ 
  // Spiel ein Ton
  function playSound(path)
  {
    let audio = new Audio() ; // same as create('audio')

    if(soundSwitch)
    {
        
        audio.src = path;
        audio.volume = 1;
        audio.play();
        
    }

    return(audio);
}
/***** Ende playSound() *******/

  /***** Anfang playMusic() *******/ 
  // Spiel ein Ton
  function playMusic()
  { 
      music.play(); 
      el("#sound-on").innerText = "Sound Off" ;
  }
  /***** Ende playMusic() *******/

  // Setze einen Path zur Musik
  function setMusic(theme)
  {
    music.src = theme;
  }

   /***** Anfang pauseMusic() *******/ 
   function pauseMusic()
   {    
     music.pause();
     el("#sound-on").innerText = "Sound On" ;      
   }
  /***** Ende pauseMusic() *******/

    



  function chooseLevel    ()
  {
    // Aktualisierung Hintergrund
          
    // Ausführung entsprechende callback je nach aktuellen Spielstuffe
    //Pick the background 
    Set_background_lvl_css(Level[nivo].background); 
  
    //Pick the UFO style
    UFO.src=Level[nivo].spacecraft; 
    
    //Define the ufo Vorausetzungen
    Level[nivo].settings();
    
};
/***ende nivo */



  /***** Anfang Set_background_lvl1_css() *******/ 
  // Zeigt einen Background an

  function Set_background_lvl_css(bg)
  {
      co.style.background  = bg;
  }; 

  /***** Ende Set_background_lvl1_css() *******/ 

 /***** Anfang klonFabrik() *******/ 
 // Macht n klone von Objekt
  function klonFabrik(n, obj)
  {
    for(let i=0; i< n;  i++)
    {
        // Macht einen klone von Objekt
        let klon= Object.create(obj); 
        // der Start Zustand des Objektes setzen
        klon.init();     
    }; 

    // neue Level wurde mit UFO eingestellet
    start_level = false;
  };

  function klonCleaner()
  {
    // Löscht alle UFOs des aktuellen Stufespiel für neue Fleat für nächste Stufespiel
    for (let i=0;i<FleatUFO.length;i++)
    {
      delete FleatUFO[i];
    }


    FleatUFO = [];

    // Restartet index für neue Fleat für nächste Stufespiel
    index_UFO = 0;
  }

   /***** Ende klonFabrik() *******/ 


  /***** Anfang kollisionRectRect() *******/
  // Evaluiert das Staffinden eines Kollision zwischen 2 Objekten auf dem Canvas
 
  function kollisionRectRect(a, b)
   {
      if(a.x < b.x + b.w && // Kollision X Achse Überschreitung b gegen a
        a.x + a.w > b.x && // Kollision  X Achse Überschreitung a gegen b
        a.y < b.y + b.h && // Kollision  Y Achse Überschreitung b gegen a
        a.y + a.h > b.y)  // Kollision  Y Achse Überschreitung a gegen b
        {
          return true;
        }
        else
        {
          return false;
        };
  }; 
  /***** Ende kollisionRectRect() *****/ 

 /******** You Loose  ******/
 // Definiert das Verhalten, wenn der Spieler verliert
 function youLoose(){
   // Nachricht
   let alert_message = "";

   // Auswahl einer Stimme
   if(cpt_sound_voice>allSounds.lost.length-1)
   {
     cpt_sound_voice = 0;
   }

   // Rausmschiff Kollision spielen
   switch (nivo)
   {
      case 0: // Asteroid Kollision
        playSound(allSounds.others[2]);
        playSound(allSounds.others[2]);
      break;

      case 1: // Satellite Kollision
        playSound(allSounds.others[cpt_sound_collision_satellite]);
        playSound(allSounds.others[cpt_sound_collision_satellite]);
        playSound(allSounds.others[cpt_sound_collision_satellite]);
        playSound(allSounds.others[cpt_sound_collision_satellite]);
        playSound(allSounds.others[cpt_sound_collision_satellite]);
        playSound(allSounds.others[cpt_sound_collision_satellite]);
        cpt_sound_collision_satellite ++;
        if(cpt_sound_collision_satellite > 4)
        { 
          cpt_sound_collision_satellite = 3;
        }
        break;

      case 2:
        playSound(allSounds.others[cpt_sound_collision_planet]);
        playSound(allSounds.others[cpt_sound_collision_planet]);
        cpt_sound_collision_planet ++;
        if(cpt_sound_collision_planet > 6)
        { 
          cpt_sound_collision_planet = 5;
        }
        break;

      default:
        playSound(allSounds.others[2]);
        break;

   }

   
   // Stimme spielen
   playSound(allSounds.lost[cpt_sound_voice]);

   // Auswahl einer Stimme aktualiseren
   cpt_sound_voice++;

   // Pause 100 ms
   setTimeout(()=>{},100);

   // 1 Leben verloren nach einer Kollision
   lifeCount --;
   
   // Gameover Life=0
   if(lifeCount===-1) 
   { 
      // Raumschiffs zertstört
      playSound(allSounds.others[1]);
     // Rücksetzen des Spieler leben
    
     // Nachricht aktualisieren       
     alert_message = 'Ops... Humanity is dead ! You can retry to play. ';
     display_message_on_canvas('GAME OVER LOSER!! ');
       
     
     // Anzeiger einer Popup mit Nachricht
      alert(alert_message);
      // Löschen von gedrückten Tasture
      erase_keypressed();

      game_won = false;
        // Schwerigkeitsgrad reduzieren
      Level[0].Nb = Nb_asteroids;
      Level[1].Nb = Nb_satellites;
      Level[2].Nb = Nb_planet;
      //Back to beginning of the Game 
      restart_game(); 
    
   }
   else //Restart Level = -1Life 
   {
     // Nachricht aktualisieren   
     alert_message = 
     'You loose one Life ! (but as God is charitable you get another chance ) ';
   } 

   // Aktualizierung der Anzeige von Leben
   countlives();

   // Rücksetzen des Raumschiffs in Anfang Position 
   spaceShip.init();

  //endLevel.init(); 
 }


  /***** Anfang imageThissrc() *******/
  // Zeichnen eines entsprechenden Bild für ein Objekt (Form für Satellit und Raumschiff
    function imageThissrc(obj)
    {
      const img=new Image(); 
      img.src = obj.src; // Zuweisung eines Bild path für die Darstellung des Objektes
      ctx.drawImage(img, obj.x, obj.y, obj.w, obj.h); // Zeichnen des Objektes mit entsprechenden Bild
    };
  /***** Ende imageThissrc() *******/

/******* Anfang safetakeoff() *********/ 
// Sicherheit Gebiet drum herum das Raumschiff erstellen 
function safeTakeoff()
{
  //let max=Level[nivo].Nb; 
  let max = FleatUFO.length;

  console.log("FleatUFO.length",FleatUFO.length);
  // Achten, dass für jeden UFO, es kein Kollision mit dem Startposition des Raumschifes gibt
  // Wenn, ja, neue Platzieren für den UFO
    for(let i=0; i < max; i++)
    {
      //FleatUFO[i].id=i; 
        //console.log(i); 
      if(kollisionRectRect (safeSpace, FleatUFO[i]))
      {
        
        reinitPosition(FleatUFO[i]);
      };
   }; 

};
/******* Ende safetakeoff() *********/ 

/******* Anfang reinitPosition() *********/ 
// Setzte die Position von UFO außerhalb der sicheren Gebiet für das Raumschiff
// wird aufgerufen, wenn die folgende Bedingungen auftretten:
//  * einer Kollision mit einem UFO & Raumschiff ist aufgretten
//  * der Raumschiff wird zur inital Start Position zurückgesetzt dann
//  * innerhabl der SafeTakeoff Zone drum herum der Inital Position des Raumschiff, befindet sich einer UFO
//

function reinitPosition(Ufo)
{
  console.log("reinitPosition UFO");
  reinitUfoPosition = true;
  Ufo.init();
  if(kollisionRectRect (safeSpace, UFO))
  {
    reinitPosition(Ufo);
  }
}

 /******* function end safe takeoff **********/ 

  /***** Anfang checkDown() *******/
  // Empfang des gedrückten Taste
  function checkDown(e) 
  {
    tCode = e.key;
    // Log nur gedrückte Taste für Bewegung
    if(tCode == 'ArrowDown' || tCode == 'ArrowUp' || tCode == 'ArrowLeft' || tCode == 'ArrowRight')
    {
      // Setzen einen Flag für den gedrückte Taste
      keysPressed[tCode] = true;
    }
    
    console.log(tCode);
    e.preventDefault(); // verbiete den Browser Anweisung zu empfangen
  }
  /***** Ende checkDown() *******/

  /***** Anfang checkUp() *******/
  // Rücksetzung des gedrückten Taste
  function checkUp(e) 
  {
    tCode = e.key ;
    if(tCode == 'ArrowDown' || tCode == 'ArrowUp' || tCode == 'ArrowLeft' || tCode== 'ArrowRight')
    { 
      keysPressed[e.key ] = false;
    } 
    tCode = false;
    e.preventDefault(); // verbiete den Browser Anweisung zu empfangen
    
  }
  /***** Ende checkUp() *******/

  function erase_keypressed()
  {
    
    for (let key in keysPressed)
    {
      keysPressed[key] = false;
    }

    tCode = false;

    console.log('erase_keypressed',keysPressed);
  }


  /***** Anfang countlives() *******/
  // Aktualiziert der Anzeige von Leben
  function countlives()
  {
    el('#livescounter').innerText=`You have ${lifeCount} lives (because it's a game)`;
  }; 
  /***** Ende countlives() *******/

 /********* Popup  ***********/
 

   /***** Anfang display_message_on_canvas() *******/
   // Zeigt eine Nachricht auf dem Canvas
  function display_message_on_canvas(message)
  {
    ctx.fillStyle = '#CC66FF';
    ctx.shadowColor = '#33CCFF';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 15;
    ctx.font = "80px Magneto Bold";  
    ctx.fillText(message, 65,200);
    ctx.shadowColor = '#000000';

  }

    /***** Ende display_message_on_canvas() *******/

  /*****Tell Nivo *******/
  // Zeigt das Stufenspiel
  function tellNivo()
  {
    el('#nivo').innerText=` ${nivo+1} `;
  }; 

  

  function pre_render()
  {
    ctx.drawImage(co.offscreenCanvas,0,0)
  }
  /***** Anfang render() *******/
  // Animiert das Canvas
 function render()
 {
   // Anforderung 60 FPS mit render() als callback
    animate=requestAnimationFrame(render);  

    // Löschen von dem Inhalt des Canvas
    ctx.clearRect(0,0,co.width,co.height);

    // Zeichnen das Ende des Stufenspiel
    endLevel.init();

    //Addieren einer Inertie, gültig für Level 2
    if(spaceShip.inertie == true)
    {
      spaceShip.set_inertie();
    }  
    // Raumschiff bewegen
    spaceShip.move();

    

    // Satelliten bewegen
    for(let a in FleatUFO){
     // test FleatUFO[a].lenght=Number(Level.Nb[String(nivo)]); 
      FleatUFO[a].move();
    };

    // Detektieren das Ende des Stufenspiel
    endLevel.init(); 

    
  };
  /***** Ende render() *******/

  /***** Anfang start_game() *******/
  // Start ein Spiel - @ load ? https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser/Load_the_assets_and_print_them_on_screen
  function start_game()
  {
    // Setzen von Start Zustand
    init_variables();
    // Starte mit 20 Satelliten
    klonFabrik(Level[nivo].Nb, UFO);

    // Anzeige des Anzahl von Leben
    countlives();
    tellNivo(); 
    //spaceship back to start position
    spaceShip.init(); 
    // Musik spielen, wenn es vorher zu "on" gesetzt wurde
    if(sound_user_set == true)
    {
      playMusic();
    }
    
   // endLevel.init(); //11-02
  }
/***** Ende start_game() *******/

 /***** Anfang restart_game() *******/
function restart_game()
{
  pauseMusic();
  delete music;
  start_game();
}
/***** Ende restart_game() *******/


//############## Ende Funktionen Definieren ####################

  //########### KontrollFluss ###############/
  start_game();
    
  //############################/
  


  // Addieren das Detektion von Tasturereignis
  keysPressed = {};
  document.addEventListener('keydown',checkDown); // Druck auf einem Taste
  document.addEventListener('keyup',checkUp); // Release auf einem gedrückten Taste


  // Überwachung "Klick" auf Button "start-stop"
  el('#start-stop').addEventListener('click',function()
  {
      // 1st time is animate false
      if(!animate)
      {
          // Start Animation
          render();
          el('#start-stop').innerText = "Pause";
      }
      else
      {
          // Stop das Spiel
          cancelAnimationFrame(animate);
          el('#start-stop').innerText = "Play";
      }

      // Rücksetzen der Animation
      animate = !animate;

  });

  // Überwachung "Klick" auf Button "Sound ON"
  el('#sound-on').addEventListener('click',function()
  {
      // Zustand Ton änern
      soundSwitch =! soundSwitch;
      // Speichern der User Sound Zustand für den nächste Nivo oder wenn der Spiel restartet
      sound_user_set = soundSwitch

      // Pause der Musik wenn Ton off ist
      if(!soundSwitch)
      {
        //music.pause();
        pauseMusic();
      }
      else
      {
       // music.play();
        playMusic();
      }
       
      
  });
  

};
/* Ende Game */

//########### KontrollFluss ###############/
/* Spiel starten*/
Game(); 
