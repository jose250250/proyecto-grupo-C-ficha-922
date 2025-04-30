var currentPage = null;
var defaultPage = "home";
var rootPath = "admin/";

$(function(){

    redirectByLoginUser(true);
    var url = 'template/headerTurista.html';
    var idContent = 'content-header';
    loadZone(url, idContent);
    loadFooter(rootPath);
   
});