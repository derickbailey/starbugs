function initCardList() {
    $("#card-list").kendoMobileListView({
        dataSource: new kendo.data.DataSource({
            type: "everlive", 
            transport: {
                // required by Everlive
                typeName: 'cards',
            },
            change: function (e) {
            },
            sort: { field: "CreatedAt", dir: "desc" } 
        }),
        template: "${Title}: ${Balance}"

    });
    
    
}