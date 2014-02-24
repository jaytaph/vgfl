VGFL.Class = function () {};

VGFL.Class.extend = function (props) {

    // extended class with the new prototype
    var NewClass = function () {

        // call the constructor
        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }

        // call all constructor hooks
        if (this._initHooks.length) {
            this.callInitHooks();
        }
    };

    // jshint camelcase: false
    var parentProto = NewClass.__super__ = this.prototype;

    var proto = VGFL.Util.create(parentProto);
    proto.constructor = NewClass;

    NewClass.prototype = proto;

    //inherit parent's statics
    for (var i in this) {
        if (this.hasOwnProperty(i) && i !== 'prototype') {
            NewClass[i] = this[i];
        }
    }

    // mix static properties into the class
    if (props.statics) {
        VGFL.extend(NewClass, props.statics);
        delete props.statics;
    }

    // mix includes into the prototype
    if (props.includes) {
        VGFL.Util.extend.apply(null, [proto].concat(props.includes));
        delete props.includes;
    }

    // merge options
    if (proto.options) {
        props.options = VGFL.Util.extend(VGFL.Util.create(proto.options), props.options);
    }

    // mix given properties into the prototype
    VGFL.extend(proto, props);

    proto._initHooks = [];

    // add method for calling all hooks
    proto.callInitHooks = function () {

        if (this._initHooksCalled) { return; }

        if (parentProto.callInitHooks) {
            parentProto.callInitHooks.call(this);
        }

        this._initHooksCalled = true;

        for (var i = 0, len = proto._initHooks.length; i < len; i++) {
            proto._initHooks[i].call(this);
        }
    };


    NewClass.on = function(name, func) {
        console.log("Adding event '" + name + "'");
        return this;
    };

    return NewClass;
};


// method for adding properties to prototype
VGFL.Class.include = function (props) {
    VGFL.extend(this.prototype, props);
};

// merge new default options to the Class
VGFL.Class.mergeOptions = function (options) {
    VGFL.extend(this.prototype.options, options);
};

// add a constructor hook
VGFL.Class.addInitHook = function (fn) { // (Function) || (String, args...)
    var args = Array.prototype.slice.call(arguments, 1);

    var init = typeof fn === 'function' ? fn : function () {
        this[fn].apply(this, args);
    };

    this.prototype._initHooks = this.prototype._initHooks || [];
    this.prototype._initHooks.push(init);
};
