(function (cards) {
    cards = {};
    this.dataSource = null; 
    cards._initializeDataSource = function(){
        var that = this;
        this.dataSource = new kendo.data.DataSource({
            type: "everlive", 
            schema: {
                model: model
            },
            transport: {
                // required by Everlive
                typeName: 'cards',
            },
            change: function (e) {
                if (e.items && e.items.length > 0) {
                    jQuery('#no-activities-span').hide();
                } else {
                    jQuery('#no-activities-span').show();
                }
            },
            sort: { field: "CreatedAt", dir: "desc" } 
        });
        
        
    };
    
    
    window.cards = cards;    
})(window.cards = window.cards || {});