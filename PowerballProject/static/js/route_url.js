/**
 * @param params.page_no          page no.
 * @param params.cur_page_set   current page set.
 * @param params.is_range   is range.
 */

/** -----Map the URL'S below----- **/

Path.map("#regression").to(function () {

});


// Default url
Path.root("#devices");

$(document).ready(function () {
    // This line is used to start the PathJS listener.
    Path.listen();

});
