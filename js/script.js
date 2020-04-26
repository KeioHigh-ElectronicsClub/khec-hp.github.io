console.log('コンソールを見るフレンズさんは%c電子工学研究会に入りましょう。', 'color: red');
console.log('電工研ではHTML、CSS、JavaScriptも扱っています。');

// 階層の調整
var directory = function(directory) {
    var commonLink = document.getElementsByClassName('header-link');
    for(var i = 0; i < commonLink.length; ++i){
        var $dir = commonLink[i].href.split("/");
        var $dir2 = $dir[$dir.length -1];
        commonLink[i].href = directory + $dir2;
    }
    commonLink = document.getElementsByClassName('logo');
    for(var i = 0; i < commonLink.length; ++i){
        commonLink[i].src = directory + "images/logo.png";
    }
}

// 画面幅が変わった時の処理
var w;
w = $(window).width();
$(window).resize(function(){
    w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w >= 600) {
        $('.sub-nav ul').hide();
        $('header div').not('#sitemap div').addClass("wrapper");
        $('nav').show();
    } else {
        $('header div').not('#sitemap div').removeClass("wrapper");
        if(!$('#btn').hasClass('show')){
            $('nav').not('#sitemap nav').hide();
        }
    }
});


// パソコン向けドロップダウンメニュー
$('.sub-nav').hover(function(){
    if (w >= 600) {
        $('ul', this).slideDown(100);
        $('a', this).addClass("rotate1");
        $('a', this).removeClass("rotate2");
    }
},
function(){
    if (w >= 600) {
        $('ul', this).slideUp(100);
        $('a', this).addClass("rotate2");
        $('a', this).removeClass("rotate1");
    }
});
// スマホ向けドロップダウンメニュー
$(document).ready(function(){
    $('.sub-nav a').addClass("rotate2");
});
$('.sub-nav').on('click', function(){
    if (w < 600) {
        $('ul', this).slideToggle();
        $('a', this).toggleClass('rotate1');
        $('a', this).toggleClass('rotate2');
        $('a', this).toggleClass('blue');
        $('li', this).toggleClass('blue');
    }
});


// ハンバーガーメニュー
$('#btn').on('click', function(){
    $('nav').not('#sitemap nav').slideToggle();
    $('header div').not('#sitemap div').removeClass("wrapper");
    $('body').toggleClass('stop-scroll');
    $('#btn').toggleClass('show');
});

// お問い合わせフォーム
jQuery("#my-form").submit(function (event) {
    event.preventDefault();
  
    let baseUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc7tUc79i8YSzq7mHla3DJtCUch2M683T9ZDXjrsvtZkrw0Yg/formResponse";
    let name = jQuery("[name=\"entry.1334111025\"]").val();
    let mail = jQuery("[name=\"entry.1582516026\"]").val();
    let content = jQuery("[name=\"entry.1865081571\"]").val();
    jQuery.ajax({
        url: baseUrl,
        data: {
          "entry.1334111025": name,
          "entry.1582516026": mail,
          "entry.1865081571": content,
        },
        type: "POST",
        dataType: "xml",
    }).always(function(jqXHR, textStatus, errorThrown) {
      window.location.href = "thanks.html";
    });
    return false;
  });



// デバイスタイプの判別
var deviceType = 0 ;
function detectDeviceType( event ) {
	deviceType = event.changedTouches ? 1 : 2 ;
	document.removeEventListener ( "touchstart", detectDeviceType ) ;
    document.removeEventListener ( "mousemove", detectDeviceType ) ;
    if (deviceType === 1) {
        document.getElementById('cursor-btn').style.display = 'none';
    }
}
document.addEventListener ( "touchstart", detectDeviceType ) ;
document.addEventListener ( "mousemove", detectDeviceType ) ;

// Cookieの確認
$(document).ready( function(){
    if(Cookies.get('cursor') === 'kote' ) {
        $('*').toggleClass('kote-cursor');
        $('.sub-nav>a:hover').toggleClass('kote-cursor');
        document.getElementById('cursor-btn').textContent = "カーソルを戻す";
    }
});

// カーソル変更
$('#cursor-btn').on('click', function(){
    $('*').toggleClass('kote-cursor');
    $('.sub-nav>a:hover').toggleClass('kote-cursor');
    if($('*').hasClass('kote-cursor')){
        document.getElementById('cursor-btn').textContent = "カーソルを戻す";
        Cookies.set('cursor', 'kote', {expires: 1/24});
    } else {
        document.getElementById('cursor-btn').textContent = "カーソルを半田ごてにする";
        Cookies.remove('cursor');
    }
});

// IEハック
objectFitImages();