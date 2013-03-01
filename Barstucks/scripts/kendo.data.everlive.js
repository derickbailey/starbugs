(function ($, undefined) {
    var kendo = window.kendo,
    extend = $.extend;
        
    extend(true, kendo.data, {
        schemas: {
            everlive: {
                type: "json",
                data: function (data) {
                    return data.Result || data;
                },
                total: "Count"
            }
        },
        transports: {
            everlive: {
                read: {
                    dataType: "json",
                    type: "GET",
					cache: false
                },
                update: {
                    dataType: "json",
                    contentType: "application/json",
                    type: "PUT",
                    cache: false
                },
                create: {
                    dataType: "json",
                    contentType: "application/json",
                    type: "POST",
                    cache: false
                },
                destroy: {
                    dataType: "json",
                    type: "DELETE",
                    cache: false
                },
                parameterMap: function (data, operation) {
                    if (operation === "destroy") {
                        return {};
                    }

                    if (operation === "create" || operation === "update") {
                        return JSON.stringify(data);
                    }

                    if (operation === "read") {
                        var result = {};
                        if (data.skip) {
                            result.skip = data.skip;
                        }
                        if (data.take) {
                            result.take = data.take;
                        }
                        if (data.sort) {
                            var firstSortedField = data.sort[0];
                            if (firstSortedField) {
                                var dir = -1;
                                if (firstSortedField.dir == "asc") {
                                    dir = 1;
                                }

                                result.sort = '{"' + firstSortedField.field + '":' + dir + '}';
                            }
                        }
                        if (data.filter) {
                            var value, field;
                            if (data.filter.filters && data.filter.filters.length > 1) {
                                result.filter = '{"$' + data.filter.logic + '":[';

                                var filters = data.filter.filters;

                                field = filter[0].field,
                                value = filter[0].value;

                                result.filter = result.filter + '{"' + field + '":{"$regex":".*' + value + '.*"}}';

                                for (var i = 1, length = filters.length; i < length; i++) {
                                    field = filters[i].field;
                                    value = filters[i].value;
                                    result.filter = result.filter + '{"' + field + '":{"$regex":".*' + value + '.*"}}';
                                }
                                result.filter = resul.filter + ']}';
                            }
                            else {
                                field = data.filter.filters[0].field;
                                value = data.filter.filters[0].value;

                                result.filter = '{"' + field + '":{"$regex":".*' + value + '.*"}}';
                            }
                        }
                        return result;
                    }
                }
            }
        }
    });
    
    // replace the setup method of RemoteTransport in order to inject options
    // the setup method is called on all crud operations
    var RemoteTransport_setup = kendo.data.RemoteTransport.prototype.setup;
    kendo.data.RemoteTransport.prototype.setup = function (options, type) {
        if (!options.url && !this.options[type].url && this.options.typeName)
            options.url = Everlive.Request.buildUrl(Everlive.$.setup) + this.options.typeName;
        options.headers = Everlive.Request.buildAuthHeader(Everlive.$.setup);
        return RemoteTransport_setup.call(this, options, type);
    };
})(jQuery);
