/**
 * Simple capture the flag.
 *
 * [+] Will set up 2 teams (blue and red).
 *
 * [+] Each team has a flag, randomly placed somewhere on their half of the map.
 *
 * The red team (AI) will walk randomly along, trying to find the flag. The human team (blue) does
 * the same.
 *
 * (+) When you find the other teams flag, you must try and pick up the flag. As soon as you pick up
 * the other teams flag you have won the game.
 *
 * (+) You cannot pick up the flag from another team.
 *
 * If a member of another team fires is within 25 meters to another player, both players are disabled
 * for 2 minutes.
 *
 */


/* Create game */
var game = VGFL.game("capture the flag", {
    boxed : false,                                  // Continuous game
    coords : [52.2495, 5.9155, 52.1727, 6.0202]     // city of Apeldoorn, Netherlands
} );

/* Create teams */
CtfTeam = VGFL.Team.extend({
    options : {
        max_players : 10
    }
});

var blue_team = new CtfTeam("the blue team");
game.addTeam(blue_team);
var red_team = new CtfTeam("the red team");
game.addTeam(red_team);


/* Create flags */
CtfFlag = VGFL.Object.extend({
    options : {
        weight : -1
    }
}).on('pickup', function(entity, distance) {
    // Player cannot pick up item from the same team
    if (entity.team == this.team) {
        this.drop();    // Drop the item
        return;
    }

    // Player is not from the same team. Add score to player, and win the game!
    entity.score = 1000;
    game.won();
});


var red_flag = new CtfFlag({
    name : "red team flag",
    coords : game.getRandomCoordInSector(4, [1,2,3,4]),
    team: red_team
});
var blue_flag = new CtfFlag({
    name : "blue team flag",
    coords : game.getRandomCoordInSector(4, [13,14,15,16]),
    team: blue_team
});


/* Create a new player, that we extend */
CtfPlayer = VGFL.Player.extend({
    options : {
    }
});

CtfPlayer.on('inRange', function(entity) {
    if (this.team == entity.team) return;

    VGFL.Game.pushNotification(entity, "Oh noes! Seems that " + entity.name + " has found you. Duck and cover!");
    VGFL.Game.pushNotification(this, "You are in range of player " + entity.name + ". Fire at will!");
});

CtfPlayer.on('hit', function(entity, distance) {
    if (this.angleBetween(entity) == 180) {
        VGFL.Game.pushNotification(this, "Aargh! " + entity.name + " has struck you from the south!\nYou loose " + hitpoints + "XP");

        var hitPoints = (100 / VGFL.Game.Random(0, distance));
        this.life -= hitPoints;
    }
});

CtfPlayer.on('die', function(entity) {
    Game.pushNotification("You are killed in action. In about 2 minutes you will be able to enter the game");
    Game.respawn(this, 120);  // User is automatically respawned after 2 minutes
});

// Add AI players to red team
for (i=0; i!=10; i++) {
    red_team.addPlayer(new CtfPlayer("Robo "+i, { ai : true }));
}

for (i=0; i!=10; i++) {
    blue_team.addPlayer(new CtfPlayer("", { }));
}



