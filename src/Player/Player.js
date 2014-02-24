VGFL.Player = VGFL.Class.extend({
    options: {
        ai : false,
        lifePoints : 1000,
        score : 0,
        team : null
    },

    initialize : function (name, options) {
        options = VGFL.setOptions(this, options);

        console.log("init player: '" + name + "'");

        this.name = name;
        this.ai = options.ai;       // AI user or not
        this._objects = {};         // In possession of these objects
        this._spells = {};          // In possession of these spells

        this._kills = 0;            // How many kills
        this._respawns = 0;         // How many times respawned
        this._distance = 0;         // How many meters covered
        this._score = 0;            // Current score
        this._lifePoints = 1000;    // Current life points
        this._lifes = 1;            // How many lifes left
    },

    /**
     * Add a player to a team
     *
     * @param {VGFL.Team} team
     * @returns {VGFL.Player}
     */
    addToTeam : function (team) {
        team.addPlayer(this);

        return this;
    },


    /**
     * Add an object to the player
     *
     * @param object
     * @returns {VGFL.Player}
     */
    addObject : function (object) {
        var id = VGFL.stamp(object);
        if (this._objects[id]) return this;

        // Check if user is capable of carrying
        if (object.weight + carrying_weight > this.max_carrying_weight) {
            // @TODO: onError or onExceedWeight callback or something
            return this;
        }

        // User is in possession of the object
        this._objects[id] = object;
        object.keeper = this;

        return this;
    },

    /**
     * Removes and object from the player
     *
     * @param object
     * @returns {VGFL.Player}
     */
    removeObject : function (object) {
        var id = VGFL.stamp(object);
        if (! this._objects[id]) return this;

        delete (this._objects[id]);
        object.keeper = null;

        return this;
    },

    /**
     * Adds a spell to the player
     *
     * @param spell
     * @returns {VGFL.Player}
     */
    addSpell : function (spell) {
       var id = VGFL.stamp(spell);
       if (this._spells[id]) return this;

       this._spells[id] = object;
       spell.keeper = this;

       return this;
    },

    /**
     * Removes a spell from the player
     *
     * @param spell
     * @returns {VGFL.Player}
     */
    removeSpell : function (spell) {
       var id = VGFL.stamp(spell);
       if (! this._spells[id]) return this;

       delete (this._spells[id]);
       spell.keeper = null;

       return this;
    }

});

VGFL.player = function (name, options) {
    console.log("creating player: '" + name + "'");
    return new VGFL.Player(name, options);
};

