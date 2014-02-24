var VGFL = {
    version : '0.1-dev'
};
console.log("VGFL loaded: " + VGFL.version);

function expose() {
    var oldVGFL = window.VGFL;

    VGFL.noConflict = function () {
        window.VGFL = oldVGFL;
        return this;
    };

    window.VGFL = VGFL;
}

// VGFL as a Node module
if (typeof module == 'object' && typeof module.exports === 'object') {
    module.exports = VGFL;
} else {
    expose();
}
