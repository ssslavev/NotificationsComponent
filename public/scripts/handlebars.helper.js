(function () {
    Handlebars.registerHelper("ifvalue", function (conditional, options) {
        if (conditional == options.hash.equals) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })
})();


