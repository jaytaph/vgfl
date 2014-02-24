VGFL.Object = VGFL.Class.extend({
    options: {

    },

    initialize : function (id, options) {
        options = VGFL.setOptions(this, options);
    }

});

VGFL.object = function (id, options) {
//    console.log("creating object: " + id);
//    console.log("options: " + options);
    return new VGFL.Object(id, options);
};
