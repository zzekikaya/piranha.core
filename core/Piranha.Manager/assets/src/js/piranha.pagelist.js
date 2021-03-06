/*global
    piranha
*/

piranha.pagelist = new Vue({
    el: "#pagelist",
    data: {
        loading: true,
        items: [],
        sites: [],
        pageTypes: []
    },
    methods: {
        load: function () {
            fetch(piranha.baseUrl + "manager/api/page/list")
                .then(function (response) { return response.json(); })
                .then(function (result) {
                    piranha.pagelist.sites = result.sites;
                    piranha.pagelist.pageTypes = result.pageTypes;
                })
                .catch(function (error) { console.log("error:", error ); });
        },
        remove: function (id) {
            var self = this;

            fetch(piranha.baseUrl + "manager/api/page/delete/" + id)
                .then(function (response) { return response.json(); })
                .then(function (result) {
                    piranha.notifications.push(result);

                    self.load();
                })
                .catch(function (error) { console.log("error:", error ); });
        }
    },
    created: function () {
        this.load();
    },
    updated: function () {
        $(".sitemap-container").nestable({
            group: 1
        }).on('change', function (e) {
            console.log("changed: ", $(e.target).nestable("serialize"));
        });

        this.loading = false;
    }
});
