function resetSearchForm() {
    document.getElementById("searchSite").blur();
    document.getElementById("searchSite").value = null;
    document.getElementById("searchSite").placeholder = 'SEARCH THIS SITE';
    alert('This website is a work in progress.\nSorry for the inconvenience.');    
}

function clickSearch() {
    //document.getElementById("searchSite").placeholder = '';
}

function searchConfirmation(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) resetSearchForm();
}
