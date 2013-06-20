$(".tag-tipo").magicSuggest({
    useTabKey: true,
    width: 220,
    maxSelection: 1,
    maxSuggestions: 3,
    name: 'voce',
    emptyText: '',
    emptyTextCls: 'customEmptyTextCls',
    typeDelay: 0,
    maxEntryRenderer: 'Por favor escolha somente um',
    data: 'Instituição, Pessoa Física, Pessoa Jurídica, ONG'
});

$(".tags").magicSuggest({
    useTabKey: true,
    width: 220,
    maxSuggestions: 5,
    name: 'doar',
    emptyText: '',
    emptyTextCls: 'customEmptyTextCls',
    typeDelay: 1,
    data: '/tipodoacao'
});

$(".tag-receber").magicSuggest({
    useTabKey: true,
    width: 220,
    maxSuggestions: 5,
    name: 'doar',
    emptyText: '',
    emptyTextCls: 'customEmptyTextCls',
    typeDelay: 1,
    data: '/tipodoacao'
});

var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
    menuRight = document.getElementById( 'cbp-spmenu-s2' ),
    menuBottom = document.getElementById( 'cbp-spmenu-s4' ),
    showLeftPush = document.getElementById( 'showLeftPush' ),
    showRightPush = document.getElementById( 'showRightPush' ),
    showBottomPush = document.getElementById( 'showBottomPush' ),
    backDoar = document.getElementById('back-doar'),
    backReceber = document.getElementById('back-receber'),
    backKnow = document.getElementById('back-know'),
    sumir = document.getElementById('sumir'),
    infobox = document.getElementById('infobox'),
    seta = document.getElementById('seta'),
    seta1 = document.getElementById('seta1'),
    header = document.getElementById('header'),
    img = document.getElementById('img-rez'),
    body = document.body;

showLeftPush.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( body, 'cbp-spmenu-push-toright' );
    classie.toggle( menuLeft, 'cbp-spmenu-open' );
    disableOther( 'showLeftPush' );
};

backDoar.onclick = function(){
    classie.toggle( showLeftPush, 'active' );
    classie.toggle( body, 'cbp-spmenu-push-toright' );
    classie.toggle( menuLeft, 'cbp-spmenu-open' );
    disableOther( 'showLeftPush' );
};

showBottomPush.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( body, 'cbp-spmenu-push-totop' );
    classie.toggle( menuBottom, 'cbp-spmenu-open' );
    disableOther( 'showBottomPush' );
};

backKnow.onclick = function(){
    classie.toggle( showBottomPush, 'active' );
    classie.toggle( body, 'cbp-spmenu-push-totop' );
    classie.toggle( menuBottom, 'cbp-spmenu-open' );
    disableOther( 'showBottomPush' );
};

showRightPush.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( body, 'cbp-spmenu-push-toleft' );
    classie.toggle( menuRight, 'cbp-spmenu-open' );
    disableOther( 'showRightPush' );
};

backReceber.onclick = function() {
    classie.toggle( showRightPush, 'active' );
    classie.toggle( body, 'cbp-spmenu-push-toleft' );
    classie.toggle( menuRight, 'cbp-spmenu-open' );
    disableOther( 'showRightPush' );
};
function disableOther( button ) {
    if( button !== 'showLeftPush' ) {
        classie.toggle( showLeftPush, 'disabled' );
    }
    if( button !== 'showBottomPush' ) {
        classie.toggle( showBottomPush, 'disabled' );
    }
    if( button !== 'showRightPush' ) {
        classie.toggle( showRightPush, 'disabled' );
    }
}
/*
$(function() {
    $( "#tabs" ).tabs({ active: 0 });
});
*/


function doeJa(){
    classie.addClass( sumir, 'move');
    classie.addClass( infobox, 'sumir');
    classie.addClass( header, 'header');
};

function registre(){
    classie.addClass( sumir, 'move1');
    classie.addClass( infobox, 'sumir');
    classie.addClass( header, 'header1');
};

seta.onclick = function(){
    classie.removeClass( sumir, 'move');
    classie.removeClass( infobox, 'sumir');
    classie.removeClass( header, 'header');
};

seta1.onclick = function(){
    classie.removeClass( sumir, 'move1');
    classie.removeClass( infobox, 'sumir');
    classie.removeClass( header, 'header1');
};

$('.esq').bind("keydown", doeJa);
$('.dir').bind("keydown", registre);

var fulladdress;
var City = "";
var Street = "";
var Number = "";
var Neighborhood = "";

/* trigger mudança de campo. */
$('#esq-1').change(function(){
    City = document.getElementById('esq-1').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress.toLowerCase());
});
$('#esq-2').change(function(){
    Street = document.getElementById('esq-2').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress.toLowerCase());
});
$('#esq-3').change(function(){
    Neighborhood = document.getElementById('esq-3').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress.toLowerCase());
});
$('#esq-4').change(function(){
    Number = document.getElementById('esq-4').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress.toLowerCase());
});

$('#dir-1').change(function(){
    City = document.getElementById('dir-1').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress.toLowerCase());
});
$('#dir-2').change(function(){
    Street = document.getElementById('dir-2').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress.toLowerCase());
});
$('#dir-3').change(function(){
    Neighborhood = document.getElementById('dir-3').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress.toLowerCase());
});
$('#dir-4').change(function(){
    Number = document.getElementById('dir-4').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress.toLowerCase());
});

$("#registro").formToWizard();