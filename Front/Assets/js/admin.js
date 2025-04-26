var currentPage = null;
var defaultPage = "home";
var rootPath = "admin/";

$(function(){

    redirectByLoginUser(true);
    loadHeader(rootPath);
    loadFooter(rootPath);
   
});