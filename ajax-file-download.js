/*
Excample use -
    <li>@Html.ActionLink("About", "About", "Home")</li>
                    <li>@Html.ActionLink("Contact", "Contact", new { success = true }, new { @class = "contact-btn success" })</li>
                    <li>@Html.ActionLink("Contact Error", "Contact", new { success = false }, new { @class = "contact-btn  error" })</li>
  @Scripts.Render("~/bundles/jquery")
 <script src="~/Scripts/ajax-file-download.js"></script>
    <script>
        function downloadFailed() {
            alert("Unable to download. Please try after some time.");
        }

        $('.contact-btn').click(function (event) {
            event.preventDefault();
            initiateDownload($(this).attr("href"), null, downloadFailed);
        });
    </script>


*/



var trueCookie = "filedownload=true";
var falseCookie = "filedownload=false";

function initiateDownload(fileUrl, successCallbak, failCallBack) {
    var $iframe = $("<iframe id='__iframe__hidden__' style='display: none' src='" + fileUrl + "'></iframe>").appendTo("body");
    setTimeout(function () { checkFileDownloadComplete(successCallbak, failCallBack); }, 100);
    return false;
}

function checkFileDownloadComplete(successCallbak, failCallBack) {
    if (hasDownloadCookie()) {
        if (isSuccessDownloadCookie()) {
            if (successCallbak) { successCallbak(); }
        } else {
            if (failCallBack) { failCallBack(); }
        }
        cleanUp();
    } else {
        setTimeout(function () { checkFileDownloadComplete(successCallbak, failCallBack); }, 100);
    }
}

function cleanUp() {
    $("#__iframe__hidden__").remove();
    deleteDownloadCookie();
}

function hasDownloadCookie() {
    return (document.cookie.toLowerCase().indexOf(trueCookie) > -1) ||
        (document.cookie.toLowerCase().indexOf(falseCookie) > -1);
}

function isSuccessDownloadCookie() {
    return (document.cookie.toLowerCase().indexOf(trueCookie) > -1);
}
function deleteDownloadCookie() {
    document.cookie = 'fileDownload=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
