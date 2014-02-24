VGFL.Team = VGFL.Class.extend({
    options: {
        max_players : 25,       // Maximium number of players in team
    },

    initialize : function (name, options) {
        options = VGFL.setOptions(this, options);

        this.name = name;
        this.max_players = options.max_players;
        this._players = {};
    },

    /**
     * Add team to a game
     *
     * @param game
     * @returns {VGFL.Team}
     */
    addToGame : function (game) {
        game.addTeam(this);

        return this;
    },

    /**
     * Add a player to the team
     *
     * @param entity
     * @returns {VGFL.Team}
     */
    addPlayer : function (entity) {
        console.log("Adding " + (entity.ai == true ? "A.I. " : "") + "player '" + entity.name + "' to team '" + this.name + "'");

        var id = VGFL.stamp(entity);
        if (this._players[id]) { return this; }

        this._players[id] = entity;

        return this;
    }
});

VGFL.team = function (id, options) {
    return new VGFL.Team(id, options);
};
