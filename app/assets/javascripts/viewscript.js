$(".tag-tipo").magicSuggest({
    useTabKey: true,
    width: 220,
    maxSelection: 1,
    maxSuggestions: 3,
    name: 'voce',
    emptyText: 'Instituição, Pessoa...',
    emptyTextCls: 'customEmptyTextCls',
    typeDelay: 0,
    maxEntryRenderer: 'Por favor escolha somente um',
    data: 'Instituição, Pessoa, Barzinho, Empreendedor, Amigo'
});

$(".tags").magicSuggest({
    useTabKey: true,
    width: 220,
    maxSuggestions: 5,
    name: 'doar',
    emptyText: 'Doe o que quiser!',
    emptyTextCls: 'customEmptyTextCls',
    typeDelay: 0,
    data: 'amor,roupas,dinheiro,geladeira,fogão,sapatos,instrumentos'
});

$(".tag-receber").magicSuggest({
    useTabKey: true,
    width: 220,
    maxSuggestions: 5,
    name: 'doar',
    emptyText: 'Doe o que quiser!',
    emptyTextCls: 'customEmptyTextCls',
    typeDelay: 0,
    data: 'amor,roupas,dinheiro,geladeira,fogão,sapatos,instrumentos'
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
$(function() {
    $( "#tabs" ).tabs({ active: 0 });
});


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

$("#registro").formToWizard();