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
