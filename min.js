// Requirements
// Object.create, Canvas, HTML5 Audio

var Min = function() {
	var lastTime;
	var gameObjects = [];
	var currentLevel;
	var gameStates = {
		Intro: 0,
		InGame: 1,
		WarmUp: 3,
		EndGame: 4
	};
	var gameState = gameStates.InGame;
	var warmUpTime = 0;
	var warmUpLength = 0.5;
	var sounds;

	var setLevel = function(levelNumber) {
		switch(levelNumber) {
			case 1:
				currentLevel = {
					nextLevel: 2,
					targets: { blue: { "medium": 1 }, orange: { "huge": 1 }},
					objectsToSpawn: { 
						"red": [{ position: Util.randomPosition(-400,400,-300,300), size: "large" }],
						"blue": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium" }],
						"orange": [{ position: Util.randomPosition(-400,400,-300,300), size: "huge" }]
					}
				};
				break;
			case 2:
				currentLevel = { 
					nextLevel: 3,
					targets: { blue: { "small" : 1 }, pink: { "small": 1 }, green: { "medium": 1 }, purple: { "medium": 1 } },
					objectsToSpawn: {
						"red": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }],
						"blue": [{ position: Util.randomPosition(-400,400,-300,300), size: "small"}],
						"green": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium"}],
						"purple": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium"}],
						"pink": [{ position: Util.randomPosition(-400,400,-300,300), size: "small"}]
					}
				};
				break;
			case 3: 
				currentLevel = { 
					nextLevel: 4,
					targets: { blue: { "small" : 1 }, green: { "small": 1, "medium": 1 }, pink: { "small": 1 }, orange: { "medium": 1}  },
					objectsToSpawn: {
						"red": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }],
						"blue": [{ position: Util.randomPosition(-400,400,-300,300), size: "small"}],
						"green": [{ position: Util.randomPosition(-400,400,-300,300), size: "small"}, { position: Util.randomPosition(-400,400,-300,300), size: "medium"}],
						"pink": [{ position: Util.randomPosition(-400,400,-300,300), size: "small"}],
						"orange": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium"}]
					}
				};
				break;
			case 4: 
				currentLevel = { 
					nextLevel: 5,
					targets: { blue: { "small" : 1, "medium": 1 }, green: { "small": 1, "medium": 1 }, purple: { "large": 1 }  },
					objectsToSpawn: {
						"red": [{ position: Util.randomPosition(-400,400,-300,300), size: "large" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"blue": [{ position: Util.randomPosition(-400,400,-300,300), size: "small"}, { position: Util.randomPosition(-400,400,-300,300), size: "medium"}],
						"green": [{ position: Util.randomPosition(-400,400,-300,300), size: "small"}, { position: Util.randomPosition(-400,400,-300,300), size: "medium"}],
						"purple": [{ position: Util.randomPosition(-400,400,-300,300), size: "large"}]
					}
				};
				break;
			case 5: 
				currentLevel = {
					nextLevel: 6,
					targets: { blue: { "small" : 2 }, purple: { "small": 1, "medium": 2 }, orange: { "medium": 2 }  },
					objectsToSpawn: {
						"red": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"blue": [{ position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"purple": [{ position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }],
						"orange": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }]
					}
				};
				break;
			case 6:
				currentLevel = {
					nextLevel: 7,
					targets: { blue: { "small" : 2 }, green: { "small": 1, "medium": 2 }, orange: { "medium": 2 }, pink: { "small": 1, "large": 1 }  },
					objectsToSpawn: {
						"red": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"blue": [{ position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"green": [{ position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }],
						"orange": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }],
						"pink": [{ position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "large" }]
					}
				};
				break;
			case 7: // make harder
				currentLevel = {
					nextLevel: 8,
					targets: { turquoise: {"tiny": 1}, blue: { "small" : 2 }, green: { "small": 2 }, orange: { "small": 1, "medium": 1 }, pink: { "huge": 1, "small": 2 }, purple: { "large": 1, "medium": 1 }  },
					objectsToSpawn: {
						"red": [{ position: Util.randomPosition(-400,400,-300,300), size: "large" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"blue": [{ position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"green": [{ position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"orange": [{ position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "medium" }],
						"pink":  [{ position: Util.randomPosition(-400,400,-300,300), size: "huge" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }, { position: Util.randomPosition(-400,400,-300,300), size: "small" }],
						"purple": [{ position: Util.randomPosition(-400,400,-300,300), size: "medium" }, { position: Util.randomPosition(-400,400,-300,300), size: "large" }],
						"turquoise": [{ position: Util.randomPosition(-400,400,-300,300), size: "tiny" }]
					}
				};
				break;
			default:
				currentLevel = { };
				break;
		}
	};

	var init = function(canvasId) {
		Renderer.init(document.getElementById(canvasId));

		// load sounds
		sounds = { "hit": { sound: new Howl({ urls: ['hit.wav']})}, "collect": { sound: new Howl({ urls: ['collect.wav']}) }, "hitw": { sound: new Howl({ urls: ['hitw.wav']}) }};

		gameState = gameStates.Intro;

		lastTime = new Date().getTime();
		tick();
	};

	var loadLevel = function(levelNumber) {
		setLevel(levelNumber);
		Renderer.setClearColour(levelNumber);
		Renderer.resetCamera();
		gameObjects.length = 0;
		Util.foreach(ObjectSpawner.spawnSpecific(currentLevel.objectsToSpawn), function(square) {
			gameObjects.push(square);
		});
		gameObjects.push(Player.create());
	};

	var tick = function() {
		var time = new Date().getTime();
		var deltaTime = (time - lastTime)/1000;
		lastTime = time;

		if(gameState == gameStates.Intro) {
			introTick(deltaTime);
		} else if(gameState == gameStates.InGame) {
			// Clear
			Renderer.clear();

			// Collision
			// Note: Spatial Paritioning would help reduce load... I don't think we're spawning enough for this to be an issue however
			Util.foreach(gameObjects, function(gameObject) {
				Util.foreach(gameObjects, function(target) {
					if(gameObject.id !== target.id && Collision.circle(gameObject,target)) {
						gameObject.onCollide(target);
					}
				});
			});

			// Animate
			Util.foreach(gameObjects, function(gameObject){
				gameObject.animate(deltaTime);
				gameObject.update(deltaTime);
			});

			// Render		
			Util.foreach(gameObjects, function(gameObject) { 
				gameObject.render();
			});

			if(Player.hasCollectedAll(currentLevel.targets)) {
				Player.hasCollectedAll(currentLevel.targets);
				if(currentLevel.nextLevel != 8) {
					loadLevel(currentLevel.nextLevel);
					gameState = gameStates.WarmUp;
					warmUpTime = 0;
				} else {
					Renderer.setClearColour(8);
					gameObjects.length = 0;
					gameState = gameStates.EndGame;
				}
			}
		} else if (gameState == gameStates.EndGame) {
			endTick();
		} else if (gameState == gameStates.WarmUp) {
			warmUpTime += deltaTime;
			// Render
			Renderer.clear();
			Util.foreach(gameObjects, function(gameObject) { 
				gameObject.render();
			});
			if(warmUpTime > warmUpLength) {
				gameState = gameStates.InGame;
			}
		}
		Util.requestAnimationFrame(tick);
	};


	var introLength = 20;
	var timeInIntro = 0;
	var textToDraw = [
		"A Ludum Dare 26 Game",
		"A Ludum Dare 26 Game",
		"",
		"○",
		"○",
		"by @_delph",
		"by @_delph",
		"",
		"reds are evil",
		"reds are evil",
		"collect the wanderers",
		"collect the wanderers",
		"",
		"use the arrow keys...",
		"use the arrow keys...",
	];
	var introTick = function(dt) {
		timeInIntro += dt;

		Renderer.clear();

		var indexOfText = Math.floor(textToDraw.length * timeInIntro/introLength);
		Renderer.drawCentredText(textToDraw[indexOfText], "16", "#FFFFFF");	

		if(timeInIntro > introLength) {
			gameState = gameStates.WarmUp;
			loadLevel(1);
		}
	};

	var endTick = function() {
		Renderer.clear();
		Renderer.drawCentredText("Thank You", "bold 24", "#000000");
	}

	var playSound = function(name) {
		if(sounds && sounds[name] && !sounds[name].playing) {
			if(!sounds[name].sound.onend) {
				sounds[name].sound.onend = function() { sounds[name].playing = false; };
			}
			sounds[name].sound.play();
		}
	}

	return {
		init: init,
		playSound: playSound
	};
}();

var Player = function() {
	var player;
	var f = 1000;
	var collectedMassCoefficient = 0.5;
	var collectedObjects = [];

	var animate = function(dt) {
		var dx = 0, dy = 0;

		if(Input.keyDown("Up")) {
			dy--;
		}
		if(Input.keyDown("Down")) {
			dy++;
		}
		if(Input.keyDown("Left")) {
			dx--;
		}
		if(Input.keyDown("Right")) {
			dx++;
		}
		if(dx || dy) {
			// normalise
			if(dx && dy) { 
				dx /= Math.SQRT2;
				dy /= Math.SQRT2; 
			}
			this.accelerate(f*dx, f*dy, dt);
		}

		Renderer.updateCameraPosition(this.position);

		Util.foreach(collectedObjects, function(obj){
			var separationX = obj.position[0] - this.position[0];
			var separationY = obj.position[1] - this.position[1];
			var vSeperationX = obj.velocity[0] - this.velocity[0];
			var vSeparationY = obj.velocity[1] - this.velocity[1];
			// Don't want them to truely centre on you so reduce separation by 10.
			var minSeparation = 30;
			var minVSeparation = 10;
			if(separationX < minSeparation && separationX > -minSeparation) {
				separationX = 0;
			}
			if(separationY < minSeparation && separationY > -minSeparation) {
				separationY = 0;
			}
			if(vSeperationX < minVSeparation && vSeperationX > -minVSeparation) {
				vSeperationX = 0;
			}
			if(vSeparationY < minVSeparation && vSeparationY > -minVSeparation) {
				vSeparationY = 0;
			}

			obj.accelerate(
				-7.5*separationX - 0.5*vSeperationX,
				-7.5*separationY - 0.5*vSeparationY,
				dt); // Simple Harmonic Occilators
		}, this);
	};

	var onCollide = function(gameObject) {
		if(gameObject.evil) {
			this.mass = this.trueMass;
			Util.foreach(collectedObjects, function(obj) {
				obj.collected = false;
			});
			collectedObjects.length = 0;
			Min.playSound("hit");
		} else if(!gameObject.collected) {
			connect(gameObject);
			Min.playSound("collect");
		}
	};

	var create = function() {
		collectedObjects.length = 0;
		player = GameObject.create([0,0], 15, "#FFFFFF");
		player.animate = animate;
		player.onCollide = onCollide;
		player.maximumSpeedPerUnitMass = 300;
		player.trueMass = player.mass;
		return player;
	};

	var getPlayer = function() {
		return player;
	};

	var hasCollectedAll = function(targets, matchFunction) {
		var result = true;
		
		Util.foreachkey(targets, function(targetColour) {
			var sizes = {}; // Bleh object allocation every frame
			// Get number of sizes with this colour
			Util.foreach(collectedObjects, function(object) {
				if(object.colourName == targetColour) {
					if(sizes[object.size]) {
						sizes[object.size]++;
					} else {
						sizes[object.size] = 1;
					}
				}
			});
			Util.foreachkey(targets[targetColour], function(size){
				var requiredCount = targets[targetColour][size];
				if(!sizes[size] || sizes[size] < requiredCount) {
					result = false;
				}
			});
		});

		return result;
	};

	var helper = [];

	var connect = function(gameObject) {
		player.mass += collectedMassCoefficient*gameObject.mass;
		collectedObjects.push(gameObject);
		gameObject.collected = true;
	}
	var disconnectObjectWithId = function(id) {
		helper.length = 0;
		Util.foreach(collectedObjects, function(object){
			if(object.id != id) {
				helper.push(object);
			}
		});
		collectedObjects.length = 0;
		player.mass = player.trueMass;
		Util.foreach(helper, function(object) {
			connect(object);
		});
		// This may seem a strange way to remove an object from an array but it doesn't create any new arrays or muck up references
	};

	return {
		create: create,
		connect: connect,
		disconnectObjectWithId: disconnectObjectWithId,
		getPlayer: getPlayer,
		hasCollectedAll: hasCollectedAll
	};
}();

var SteeringBehaviours = function() {
	var f = 500; 
	var origin = [0,0];
	var storageArrays = [[],[],[],[],[]];
	var addSteeringBehaviours = function(gameObject, params) {
		var steeringBehaviours = {
			scareDistance: 200,
			wanderRadius: 150,
			wanderDistance: 25,
			wanderJitter: 750,
			wanderTarget: [Util.random(-1,1),Util.random(-1,1)], 
			wander: function(dt, out) {
				// Jitter Target
				this.wanderTarget[0] += Util.random(-this.wanderJitter*dt,this.wanderJitter*dt);
				this.wanderTarget[1] += Util.random(-this.wanderJitter*dt,this.wanderJitter*dt);
				// Project onto Circle
				var length = Math.sqrt(this.wanderTarget[0]*this.wanderTarget[0] + this.wanderTarget[1]*this.wanderTarget[1]);
				this.wanderTarget[0] *= this.wanderRadius/length;
				this.wanderTarget[1] *= this.wanderRadius/length;
				// Debug
				/*Renderer.drawGameObject(
					this.wanderTarget[0] + this.wanderDistance*headingX + this.gameObject.position[0], 
					this.wanderTarget[1] + this.wanderDistance*headingY + this.gameObject.position[1],
					5,
					5,
					"rgb(255,0,0)");*/
				out[0] = this.wanderTarget[0] + this.wanderDistance*this.gameObject.heading[0];
				out[1] = this.wanderTarget[1] + this.wanderDistance*this.gameObject.heading[1];		
			},
			seek: function(position, out) {
				out[0] = position[0] - this.gameObject.position[0];
				out[1] = position[1] - this.gameObject.position[1];
			},
			flee: function(position, out) {
				out[0] = this.gameObject.position[0] - position[0];
				out[1] = this.gameObject.position[1] - position[1];
				if(out[0]*out[0]+out[1]*out[1] > scareDistance*scareDistance) {
					out[0] = 0;
					out[1] = 0;
				}				
			},
			evade: function(out) {
				var target = this.getEvadeTarget();
				if(target) {
					var toTarget = storageArrays[2];
					toTarget[0] = target.position[0] - this.gameObject.position[0];
					toTarget[1] = target.position[1] - this.gameObject.position[1];
					var lookAhead = Util.magnitude(toTarget) / (this.gameObject.maximumSpeedPerUnitMass/this.gameObject.mass + target.maximumSpeedPerUnitMass/target.mass);
					storageArrays[2][0] = target.position[0] + target.velocity[0]*lookAhead;
					storageArrays[2][1] = target.position[1] + target.velocity[1]*lookAhead;
					return this.flee(storageArrays[2], out);
				}
			},
			intercept: function(out) {
				var target = this.getPursuitTarget();
				if(target) {
					toTarget = storageArrays[2];
					toTarget[0] = target.position[0] - this.gameObject.position[0];
					toTarget[1] = target.position[1] - this.gameObject.position[1];
					var relativeHeading = Util.dot(this.gameObject.heading, target.heading);
					if(Util.dot(toTarget, this.gameObject.heading) > 0 && relativeHeading < -0.95) { //acos(-.95) ~= 18 degrees
						this.seek(target.position, out);
					} else {
						var lookAhead = Util.magnitude(toTarget) / (this.gameObject.maximumSpeedPerUnitMass/this.gameObject.mass + target.maximumSpeedPerUnitMass/target.mass); 
						storageArrays[2][0] = target.position[0] + target.velocity[0] * lookAhead;
						storageArrays[2][1] = target.position[1] + target.velocity[1] * lookAhead;
						this.seek(storageArrays[2], out);
					}
					this.seek(target.position, out);
				} else {
					out[0] = 0;
					out[1] = 0;
				}
			},
			calculate: function(dt) {
				wander = storageArrays[0];
				this.wander(dt, wander);
				if(this.getPursuitTarget) {
					// evil!
					intercept = storageArrays[1];
					this.intercept(intercept);
					var wanderWeight = 0.3 + 0.01*this.gameObject.scale[0];
					weightedSum = storageArrays[2];
					weightedSum[0] = wanderWeight*wander[0] + intercept[0];
					weightedSum[1] = wanderWeight*wander[1] + intercept[1];					
					this.gameObject.accelerate(f*weightedSum[0],f*weightedSum[1],dt);
				} else {
					// not evil!
					seek = storageArrays[1];
					this.seek(origin, seek);
					var distanceToOrigin = Util.magnitude(this.gameObject.position);
					weightedSum = storageArrays[2];
					weightedSum[0] = wander[0] + 0.0002*distanceToOrigin*seek[0];
					weightedSum[1] = wander[1] + 0.0002*distanceToOrigin*seek[1];
					this.gameObject.accelerate(f*weightedSum[0],f*weightedSum[1],dt);
				}
			}
		};
		
		if(params && params.getPursuitTarget) {
			steeringBehaviours.getPursuitTarget = params.getPursuitTarget;
		}
		if(params && params.getEvadeTarget) {
			steeringBehaviours.getEvadeTarget = params.getEvadeTarget;
		}
		steeringBehaviours.gameObject = gameObject;
		gameObject.steeringBehaviours = steeringBehaviours;
		gameObject.animate = function(deltaTime) { 
			if(!this.collected) { 
				this.steeringBehaviours.calculate(deltaTime); 
			}
		};		
	};

	return { 
		addSteeringBehaviours: addSteeringBehaviours
	};
}();

var ObjectSpawner = function() {
	var colours = {
		red: "#FF0000",
		green: "#008000",
		blue: "#0000FF",
		purple: "#800080",
		orange: "#FFA500",
		pink: "#FAAFBE",
		turquoise: "#52F3FF"
	};
	var sizes = {
		"tiny": 1,
		"small": 2,
		"medium": 3,
		"large": 4,
		"huge": 6
	};

	var spawnRandom = function(number, coloursToSpawn) {
		var result = [];
		for(var n = 0; n < number; n++) {
			var position = [Util.random(-400,400), Util.random(-300,300)];
			var size = Util.randomInt(2,5)
			var colour = coloursToSpawn[Util.randomInt(0, coloursToSpawn.length-1)];
			result.push(spawn(position, size, colour));
		}
		return result;
	};

	var spawnSpecific = function(objectsToSpawn) {
		// Each objectsToSpawn are keyed on colour each object contains position & size
		var result = [];
		Util.foreachkey(objectsToSpawn, function(colour){
			Util.foreach(objectsToSpawn[colour], function(objectToSpawn) {
				result.push(spawn(objectToSpawn.position, objectToSpawn.size, colour));
			});
		});
		return result;
	};

	var spawn = function(position, size, colourName) {
		var object = GameObject.create(position, 10*sizes[size], colours[colourName]);
		object.size = size;
		object.colourName = colourName;
		object.onCollide = function(gameObject) {
			if(!this.evil && this.collected) {
				if(gameObject.evil) {
					this.collected = false;
					Player.disconnectObjectWithId(this.id);
					Min.playSound("hitw");
				} 
				// As fun as this is causes problems when objects get disconnected but are overlapping with each other
				//else if(!gameObject.collected && Player.getPlayer().id != gameObject.id) {
				//	Player.connect(gameObject);
				//}
			} 
		}
		object.animate = function(dt) {
			// Constrainted walk to vary velocity
			this.maximumSpeedPerUnitMass += Util.random(-10,10);
			if(!this.evil) {
				if(this.maximumSpeedPerUnitMass < 50) { this.maximumSpeedPerUnitMass = 50; }
				else if (this.maximumSpeedPerUnitMass > 200) { this.maximumSpeedPerUnitMass = 200; }
			} else {
				if(this.maximumSpeedPerUnitMass < 175) { this.maximumSpeedPerUnitMass = 175; }
				else if (this.maximumSpeedPerUnitMass > 200) { this.maximumSpeedPerUnitMass = 200; }				
			}
		}
		var params = {};
		if(colourName === "red") {
			object.evil = true;
			params.getPursuitTarget = Player.getPlayer;
		}
		SteeringBehaviours.addSteeringBehaviours(object, params);
		return object;
	};

	return { spawnRandom: spawnRandom, spawn: spawn, spawnSpecific: spawnSpecific };
}();

// Note this isn't a generic game object it's a specific gameobject to this game "○"!
var GameObject = function() {
	var lastId = 0;
	var massCoefficient = 0.1;
	var dragCoefficient = 0.5;
	var centringCoefficient = 0.3;
	
	// TODO: Split in GameObject, PhysicsGameObject Prototypes
	// TODO: atm animate is use overriden update, convert to just using update, but calling prototype version too
	var gameObjectPrototype = {
		render: function() {
			if(Renderer.inShot(this)) {
				Renderer.drawGameObject(
					this.position[0], 
					this.position[1], 
					this.scale[0], 
					this.scale[1], 
					this.colour);
			} else {
				Renderer.drawOffScreenArrow(
					this.position[0], 
					this.position[1], 
					this.scale[0], 
					this.scale[1], 
					this.colour);
			}
		},
		animate: function(deltaTime) { },
		accelerate: function(forceX, forceY, deltaTime) {
			this.velocity[0] += forceX*deltaTime/this.mass;
			this.velocity[1] += forceY*deltaTime/this.mass;
		},
		update: function(deltaTime) {
			this.velocity[0] -= dragCoefficient*this.velocity[0]*deltaTime;
			this.velocity[1] -= dragCoefficient*this.velocity[1]*deltaTime;
			if(!this.collected) {
				var mass = this.trueMass || this.mass;
				var squareVelocity = this.velocity[0]*this.velocity[0] + this.velocity[1]*this.velocity[1];
				var maxSquareVelocity = (this.maximumSpeedPerUnitMass/mass)*(this.maximumSpeedPerUnitMass/mass);
				if(squareVelocity > maxSquareVelocity){
					this.velocity[0] *= Math.sqrt(maxSquareVelocity/squareVelocity);
					this.velocity[1] *= Math.sqrt(maxSquareVelocity/squareVelocity);
				}
			}
			this.position[0] += this.velocity[0]*deltaTime;
			this.position[1] += this.velocity[1]*deltaTime;
			velocityMagnitude = Util.magnitude(this.velocity);
			if(velocityMagnitude > 0) {
				this.heading[0] = this.velocity[0]/velocityMagnitude;
				this.heading[1] = this.velocity[1]/velocityMagnitude;
			}
		},
		onCollide: function(gameObject) {
		}
	};
	
	// Technically this creates a very specific type of object...
	var create = function(position, size, colour) {
		var object = Object.create(gameObjectPrototype);
		object.id = lastId++;
		object.position = position;
		object.velocity = [0,0];
		object.scale = [size, size];
		object.heading = [1,0];
		object.mass = massCoefficient*size;
		object.colour = colour;
		object.maximumSpeedPerUnitMass = 200;
		return object;
	};

	return {
		create: create
	}
}();

var Renderer = function() {
	var canvas, ctx, canvasWidth, canvasHeight;
	var clearColour = "#000000";
	var camera = {
		position: [0,0],
	};

	var _worldToScreenX = function(worldX) {
		return worldX + canvasWidth/2 - camera.position[0];
	}
	var _worldToScreenY = function(worldY) {
		return worldY + canvasHeight/2 - camera.position[1];
	}

	var init = function(canvasElement) {
		canvas = canvasElement;
		ctx = ctx = canvas.getContext('2d');
		window.addEventListener("resize", setCanvasWidth, false);
		setCanvasWidth();
	};

	var setCanvasWidth = function() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		camera.scale = [canvasWidth, canvasHeight];
	};

	var clear = function() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = clearColour;
		ctx.fillRect(0,0, canvasWidth, canvasHeight);
	};

	var setClearColour = function(level) {
		// 7 levels (8 = fin)
		var colour = "#000000";
		if(level === 1) {
			colour = "#000000";
		} else if (level === 2) {
			colour = "#282828";
		} else if (level === 3) {
			colour = "#555555";
		} else if (level === 4) {
			colour = "#787878";
		} else if (level == 5) {
			colour = "#AAAAAA";
		} else if (level == 6) {
			colour = "#C8C8C8";
		} else if (level == 7) {
			colour = "#EEEEEE";
		} else if (level == 8) {
			colour = "#FFFFFF";
			canvas.style.cursor = "default";
		}
		document.body.style.backgroundColor = colour;
		clearColour = colour;
	};

	var drawCentredText = function(text, size, colour) {
		ctx.fillStyle = colour;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = size+"px monospace";
		ctx.fillText(text, canvasWidth/2, canvasHeight/2);
	}

	var drawGameObject = function(x, y, width, height, colour) {
		ctx.fillStyle = colour;
		ctx.strokeStyle = "#000000";
		ctx.beginPath();
		ctx.arc(_worldToScreenX(x), _worldToScreenY(y), width/2, 0, 2*Math.PI, false);
		ctx.fill();
		ctx.stroke();
	};

	var trianglePosition = []; // Memory saver
	var transformedPosition = []; // Memory saver
	var equalTriangle = [[0,0.433], [0.5,-0.433], [-0.5,-0.433]];
	var drawOffScreenArrow = function(x, y, width, height, colour) {
		var padding = 10 + width/2;
		var screenMinX = camera.position[0]-canvasWidth/2;
		var screenMaxX = camera.position[0]+canvasWidth/2;
		var screenMinY = camera.position[1]-canvasHeight/2;
		var screenMaxY = camera.position[1]+canvasHeight/2;
		var offscreenXDirection, offscreenYDirection;
		if (x < screenMinX + padding) {
			trianglePosition[0] = padding;
			offscreenXDirection = -1;
		} else if (x > screenMaxX - padding) {
			trianglePosition[0] = canvasWidth - padding;
			offscreenXDirection = +1;
		} else {
			trianglePosition[0] = _worldToScreenX(x);
			offscreenXDirection = 0;
		}
		if (y < screenMinY + padding) {
			trianglePosition[1] = padding;
			offscreenYDirection = -1;
		} else if (y > screenMaxY - padding) {
			trianglePosition[1] = canvasHeight - padding;
			offscreenYDirection = +1;
		} else {
			trianglePosition[1] = _worldToScreenY(y);
			offscreenYDirection = 0;
		}

		var rotation = 0;
		if(offscreenXDirection < 0) {
			if(offscreenYDirection > 0) {
				rotation = 0.25*Math.PI;
			} else if(offscreenYDirection < 0) {
				rotation = 0.75*Math.PI;
			} else {
				rotation = 0.5*Math.PI;
			}
		} else if (offscreenXDirection > 0) {
			if(offscreenYDirection > 0) {
				rotation = -0.25*Math.PI;
			} else if(offscreenYDirection < 0) {
				rotation = -0.75*Math.PI;
			} else {
				rotation = -0.5*Math.PI;
			}
		} else if(offscreenYDirection < 0) {
			rotation = Math.PI;
		}

		// Draw Triangle
		drawScreenTriangle(trianglePosition, rotation, width/2, colour);	
	};

	var drawScreenTriangle = function(position, rotation, size, colour) {
		ctx.fillStyle = colour;
		ctx.strokeStyle = "#000000";
		ctx.beginPath();
		Util.rotate(equalTriangle[0], rotation, transformedPosition);
		ctx.moveTo(transformedPosition[0]*size + position[0], transformedPosition[1]*size + position[1]);
		Util.rotate(equalTriangle[1], rotation, transformedPosition);
		ctx.lineTo(transformedPosition[0]*size + position[0], transformedPosition[1]*size + position[1]);
		Util.rotate(equalTriangle[2], rotation, transformedPosition);
		ctx.lineTo(transformedPosition[0]*size + position[0], transformedPosition[1]*size + position[1]);
		ctx.stroke();
		ctx.fill();
	}

	var inShot = function(gameObject) {
		return Collision.box(gameObject, camera);
	}

	var updateCameraPosition = function(playerPosition) {
		// Max xOffset of 1/3 Width
		// Max yOffset of 1/3 Height
		var xOffset = camera.position[0] - playerPosition[0];
		var yOffset = camera.position[1] - playerPosition[1];
		if(Math.abs(xOffset) > canvasWidth/3) {
			var sign = (xOffset > 0) ? 1 : -1;
			camera.position[0] = playerPosition[0] + sign*canvasWidth/3;
		}
		if(Math.abs(yOffset) > canvasHeight/3) {
			var sign = (yOffset > 0) ? 1 : -1;
			camera.position[1] =  playerPosition[1] + sign*canvasHeight/3;
		}
	}

	var resetCamera = function() {
		camera.position[0] = 0;
		camera.position[1] = 0;
	}

	return {
		clear: clear,
		init: init,
		inShot: inShot,
		drawCentredText: drawCentredText,
		drawGameObject: drawGameObject,
		drawOffScreenArrow: drawOffScreenArrow,
		resetCamera: resetCamera,
		setClearColour: setClearColour,
		updateCameraPosition: updateCameraPosition
	};
}();

var Input = function() {
	var pressedKeys = [];
	var Keys = {
		"Left": 37,
		"Up": 38,
		"Right": 39,
		"Down": 40
	};

	document.addEventListener("keydown",  function(event) {
		pressedKeys[event.keyCode] = true;
	}, false);
	document.addEventListener("keyup", function(event) {
		pressedKeys[event.keyCode] = false;
	}, false);

	var keyDown = function(key) {
		return pressedKeys[Keys[key]];
	};	

	return { keyDown: keyDown };
}();

var Collision = function() {
	var box = function(rect1, rect2) {
		var xMin1 = rect1.position[0] - rect1.scale[0]/2;
		var xMin2 = rect2.position[0] - rect2.scale[0]/2;
		var xMax1 = xMin1 + rect1.scale[0];
		var xMax2 = xMin2 + rect2.scale[0];
		var yMin1 = rect1.position[1] - rect1.scale[1]/2;
		var yMin2 = rect2.position[1] - rect2.scale[1]/2;
		var yMax1 = yMin1 + rect1.scale[1];
		var yMax2 = yMin2 + rect2.scale[1];
		return !(xMin1 > xMax2 || xMax1 < xMin2) && !(yMin1 > yMax2 || yMax1 < yMin2);
	}

	var circle = function(circle1, circle2) {
		var separationX = circle1.position[0] - circle2.position[0];
		var separationY = circle1.position[1] - circle2.position[1];
		return (separationX*separationX + separationY*separationY) < 0.25*(circle1.scale[0]+circle2.scale[0])*(circle1.scale[0]+circle2.scale[0]);
	}

	return {
		box: box,
		circle: circle
	};
}();

var Util = function() {
	var rotate = function(position, angle, out) {
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		out[0] = position[0]*cos - position[1]*sin;
		out[1] = position[0]*sin + position[1]*cos;
	};

	var dot = function(a, b){
		return a[0]*b[0] + a[1]*b[1];
	};

	var magnitude = function(a) {
		return Math.sqrt(a[0]*a[0] + a[1]*a[1]);
	};

	var random = function(min, max) {
		return Math.random()*(max-min)+min;
	};

	var randomInt = function(min, max) {
		return Math.floor(random(min,max+0.99));
	};

	var randomPosition = function(xMin, xMax, yMin, yMax) {
		return [random(xMin,xMax), random(yMin,yMax)];
	};

	var contains = function(object, delegate, thisArg) {
		var result = false;
		for(var key in object) {
			if(object.hasOwnProperty(key)) {
				result = delegate.call(thisArg || this, object[key]);
				if(result) {
					break;
				}
			}
		}
		return result;
	}

	var foreach = function(object, delegate, thisArg) {
		for(var key in object) {
			if(object.hasOwnProperty(key)) {
				delegate.call(thisArg || this, object[key]);
			}
		}
	};

	var foreachkey = function(object, delegate, thisArg) {
		for(var key in object) {
			if(object.hasOwnProperty(key)) {
				delegate.call(thisArg || this, key);
			}
		}
	};

	var requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				window.setTimeout(callback, 1000/60);
			};
	})();
	var requestAnimationFrame = function(callback) {
		requestAnimFrame(callback);
	};

	return { 
		dot: dot,
		contains: contains,
		foreach: foreach,
		foreachkey: foreachkey,
		magnitude: magnitude,
		random: random,
		randomInt: randomInt,
		randomPosition: randomPosition,
		requestAnimationFrame: requestAnimationFrame,
		rotate: rotate
	};
}();

