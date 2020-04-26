document.write('<header class="sticky">');
    document.write('<div class="wrapper">');
        document.write('<h1><a href="index.html" class="header-link"><img class="logo" src="images/logo.png" alt="慶應高校電子工学研究会"></a></h1>');
        document.write('<div id="btn"><i></i><i></i><i></i></div>')
        document.write('<nav>');
            document.write('<ul class="main-nav">');
                document.write('<li class="sub-nav"><a>私達について</a>');
                    document.write('<ul>');
                        document.write('<li><a href="aboutus.html#link" class="header-link">リンク</a></li>');
                        document.write('<li><a href="aboutus.html#contact" class="header-link">お問い合わせ</a></li>');
                    document.write('</ul>');
                document.write('</li>');  // /私達について
                    document.write('<li class="sub-nav"><a>活動記録</a>');
                        document.write('<ul>');
                            document.write('<li><a href="buhou.html" class="header-link">部報</a></li>');
                            document.write('<li><a href="text.html" class="header-link">テキスト</a></li>');
                        document.write('</ul>');
                    document.write('</li>');  // /活動記録
                document.write('<li><a href="login.html" class="header-link">部員ページ</a></li>');
            document.write('</ul>');
        document.write('</nav>');
    document.write('</div>');
document.write('</header>');