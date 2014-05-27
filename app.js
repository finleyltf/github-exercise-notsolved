/*
    # Endpoint
    https://api.github.com/legacy/repos/search/{query}

    Note: Github imposes a rate limit of 60 request per minute for unauthenticated users.

    Documentation can be found at http://developer.github.com/v3/.

    # Example Response JSON #

    {
      "meta": {...},
      "data": {
        "repositories": [
          {
            "type": string,
            "watchers": number,
            "followers": number,
            "username": string,
            "owner": string,
            "created": string,
            "created_at": string,
            "pushed_at": string,
            "description": string,
            "forks": number,
            "pushed": string,
            "fork": boolean,
            "size": number,
            "name": string,
            "private": boolean,
            "language": number
          },
          {...},
          {...}
        ]
      }
    }
*/

function displayResult(){
    var searchString = document.getElementById("search_string").value;

    // get from cache if possible
    var myJsonObject = JSON.parse(localStorage.getItem('jsonCache'));

    if (!myJsonObject){
        $.getJSON('https://api.github.com/legacy/repos/search/' + searchString, function(data){
            // save cache to localStorage
//            myJsonObject = localStorage.setItem('jsonCache', JSON.stringify(data));
            localStorage['jsonCache'] = JSON.stringify(myJsonObject);

            var output = "<ul class='list-group'>";
            for (var i in data.repositories) {
                var otherInfo = "language:" + data.repositories[i].language
                    + "\tfollowers:" + data.repositories[i].followers
                    + "\turl:" + data.repositories[i].url
                    + "\tdescription:" + data.repositories[i].description;
                output += "<li class='list-group-item'><a href='#' onClick=\"alert('" + otherInfo + "')\">" + data.repositories[i].owner + " / " + data.repositories[i].name + "</a></li>";
            }
            output += "</ul>";

            document.getElementById("results_container").innerHTML=output;


            // paginate by using jquery plugin jqPagination

            document.getElementById('pagination').style.display = 'block';

            // select the list items
            var list_items = $('#results_container ul li');

            var pageLimit = 5;
            var numRows = $("#results_container ul li").length;
            var maxPage = Math.ceil(numRows / pageLimit);

            var page_ul = function(page) {
                var offset = (page - 1) * pageLimit;
                var limit = page * pageLimit;

                // hide all list items
                list_items.hide();

                // show the 5 right items
                list_items.slice(offset, limit).show();
            }

            $('.pagination').jqPagination({
                max_page	: maxPage,
                paged   : page_ul
            });

            page_ul(1);

        });
    }
    else {
        // else: get data from cache: myJsonObject
        var output = "<ul class='list-group'>";
        for (var i in myJsonObject.repositories) {
            var otherInfo = "language:" + myJsonObject.repositories[i].language
                + "\tfollowers:" + myJsonObject.repositories[i].followers
                + "\turl:" + myJsonObject.repositories[i].url
                + "\tdescription:" + myJsonObject.repositories[i].description;
            output += "<li class='list-group-item'><a href='#' onClick=\"alert('" + otherInfo + "')\">" + myJsonObject.repositories[i].owner + "/" + myJsonObject.repositories[i].name + "</a></li>";
        }
        output += "</ul>";

        document.getElementById("results_container").innerHTML=output;


        // paginate by using jquery plugin jqPagination

        document.getElementById('pagination').style.display = 'block';

        // select the list items
        var list_items = $('#results_container ul li');

        var pageLimit = 5;
        var numRows = $("#results_container ul li").length;
        var maxPage = Math.ceil(numRows / pageLimit);

        var page_ul = function(page) {
            var offset = (page - 1) * pageLimit;
            var limit = page * pageLimit;

            // hide all list items
            list_items.hide();

            // show the 5 right items
            list_items.slice(offset, limit).show();
        }

        $('.pagination').jqPagination({
            max_page	: maxPage,
            paged   : page_ul
        });

        page_ul(1);


    }


}


