function initFoodList() {
    debugger;
    $("#food-list").kendoMobileListView({
        dataSource: new kendo.data.DataSource({
            type: "everlive", 
            transport: {
                // required by Everlive
                typeName: 'Food',
            },
            change: function (e) {
            },
            sort: { field: "CreatedAt", dir: "desc" } 
        })
    });
    
    
}