VGFL.Game = VGFL.Class.extend({
    options: {
        boxed : true
    },

    initialize : function (name, options) {
        options = VGFL.setOptions(this, options);

        if (options.coords) {
            this.setCoords(options.coords);
        }
        this.name = name;
        this._boxed = options.boxed;
        this._teams = {};
    },

    /**
     * Sets the bounding coordinates for this game
     *
     * @param latlng
     * @returns {VGFL.Game}
     */
    setCoords : function(latlng) {
        this._coords = latlng;
        return this;
    },

    /**
     * Get a random coordinate inside the game
     *
     * @returns {number[]}
     */
    getRandomCoord : function() {
        return [ 1, 1, 2, 2];
    },

    /**
     * Gets a random coordinate inside a sector.
     *
     * Sector size is size of the grid and is calculated through N*N, Thus 2 gives 4 sectors, 3 gives 9 sectors, 5 gives 25 sectors.
     * Sectors are divided by N rows and N columns like this:
     *
     * sector size 2:
     *   +---+---+
     *   | 1 | 2 |
     *   +---+---+
     *   | 3 | 4 |
     *   +---+---+
     *
     * sector size 5:
     *   +---+---+---+---+---+
     *   | 1 | 2 | 3 | 4 | 5 |
     *   +---+---+---+---+---+
     *   | 6 | 7 | 8 | 9 | 10|
     *   +---+---+---+---+---+
     *   | 11| 12| 13| 14| 15|
     *   +---+---+---+---+---+
     *   | 16| 17| 18| 19| 20|
     *   +---+---+---+---+---+
     *   | 21| 22| 23| 24| 25|
     *   +---+---+---+---+---+
     *
     * The sectors define in which sectors the random coordinate can occur. Example:
     *
     * flag_team1.coord = game.getRandomCoordInSector(5, [1,2,3,4,5,6,7,8,9,10]);
     * flag_team2.coord = game.getRandomCoordInSector(5, [16,17,18,19,20,21,22,23,24,25]);
     *
     * This would place the flag of team 1 somewhere in sectors 1 to 10 and the flag of team 2
     * in sectors 16 to 25. They will never be inside sectors 11 to 15, which means it will act
     * as a kind of buffer.
     *
     * @future: maybe it's possible to add the same sector multiple times, to add more weight to
     * that sector and thus more likely that a coordinate will be found inside that sector.
     *
     * @param sectorSize
     * @param sectors
     */
    getRandomCoordInSector : function (sectorSize, sectors) {

    },

    /**
     * Add a team to the game
     *
     * @param team
     * @returns {VGFL.Game}
     */
    addTeam : function (team) {
        console.log("Adding '" + team.name + "' to game '" + this.name + "'");

        var id = VGFL.stamp(this);
        if (game._teams[id]) { return this; }
        game._teams[id] = this;

        return this;
    },

    /**
     * Add player directly to a game (don't use when you use teams)
     *
     * @param player
     * @returns {VGFL.Game}
     */
    addPlayer : function (player) {
        console.log("Adding '" + player.name + "' to game '" + this.name + "'");

        var id = VGFL.stamp(player);
        if (this._players[id]) { return this; }
        this._players[id] = player;

        return this;
    }

});

VGFL.game = function (id, options) {
    return new VGFL.Game(id, options);
};
