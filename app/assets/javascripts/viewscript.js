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

function doeJa(){
    classie.addClass( sumir, 'move');
    classie.addClass( infobox, 'sumir');
    classie.addClass( header, 'header');
}

function registre(){
    classie.addClass( sumir, 'move1');
    classie.addClass( infobox, 'sumir');
    classie.addClass( header, 'header1');
}

seta.onclick = function(){
    classie.removeClass( sumir, 'move');
    classie.removeClass( infobox, 'sumir');
    classie.removeClass( header, 'header');
    clearFields();
};

seta1.onclick = function(){
    classie.removeClass( sumir, 'move1');
    classie.removeClass( infobox, 'sumir');
    classie.removeClass( header, 'header1');
    clearFields();
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
    getMapByGeoLocation(fulladdress);
});
$('#esq-2').change(function(){
    Street = document.getElementById('esq-2').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress);
});
$('#esq-3').change(function(){
    Neighborhood = document.getElementById('esq-3').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress);
});

$('#dir-1').change(function(){
    City = document.getElementById('dir-1').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress);
});
$('#dir-2').change(function(){
    Street = document.getElementById('dir-2').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress);
});
$('#dir-3').change(function(){
    Neighborhood = document.getElementById('dir-3').value;
    fulladdress = Street + ', ' + Number + ', ' + Neighborhood + ', ' + City;
    getMapByGeoLocation(fulladdress);
});


$("#registro").formToWizard();

function clearFields() {
    Gmaps.map.clearMarkers(Gmaps.map.markers);
    $('#dir-1').val("");
    $('#dir-2').val("");
    $('#dir-3').val("");
    $('#esq-1').val("");
    $('#esq-2').val("");
    $('#esq-3').val("");
    flash_notice('Limpando campos...');
}