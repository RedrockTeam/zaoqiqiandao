'use strict';


[$('.cover'), $('.ashow'), $('.bshow'), $('.phb'), $('.ques')].forEach(function (el) {
  return el.hide();
});

$('#qd').click(function (e) {
  $('.main').hide();
  $.ajax({
    url: '//qiandao.redrock.team/question',
    type: 'POST',
    data: {
      openid: window.document.location.search.match(/openid=([^&]+)/)[1]
    },
    header: {    
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).done(function (data) {
    $('.ques').show();
    console.log(data);
    if (data.status == 200) {
      $('.q-m').html(data.data.question);
      var ans = data.data.selection.split(/\ +/).map(function (el) {
        return el.split('.')[1];
      });
      $('#da-a').html(ans[0]);
      $('#da-b').html(ans[1]);
      $('#da-c').html(ans[2]);
      $('#da-d').html(ans[3]);
    }
    else if (data.status == 301 || data.status == 302) {
      showNotTime();
    }
    else if (data.status == 400 || data.status == 401 || data.status == 500) {
      window.location.reload()
    }
  });
});

$('.ans').click(function (e) {
  console.log(e);
  $.ajax({
    url: '//qiandao.redrock.team/sign',
    type: 'POST',
    heade : {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      answer: e.target.id[3].toUpperCase(),
      openid: window.document.location.search.match(/openid=([^&]+)/)[1]
    }
  }).done(function (data) {
    console.log(data);
    // 答案错误
    if (data.status == 401) {
      $('.cover').show();
      $('#hdcw').show();
    }
    // 签到成功
    if (data.status == 200 || data.status == 201) {
      $('.cover').show();
      $('#phb').click();
    }
  });
});

// 退出
$('#xczl').click(function (e) {
  [$('.cover'), $('.ashow'), $('.bshow'), $('.phb'), $('.ques')].forEach(function (el) {
    return el.hide();
  });
  $('.main').show();
});

$('#zjzl').click(function (e) {
  $('.cover').hide();
  $('#hdcw').hide();
  $('#qd').click();
});

// 排行榜
$('#phb').click(function (e) {
  $.ajax({
    url: '//qiandao.redrock.team/rank',
    type: 'POST',
    data: {
      openid: window.document.location.search.match(/openid=([^&]+)/)[1]
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).done(function (data) {
    console.log(data);
    $('.p-mc').html(data.data.userRank > 0 ? data.data.userRank : '无');
    data.data.topTen.forEach(function (el, index) {
      $('.p-p').html($('.p-p').html() + '<div class="pp-im"><div class="ppi-ava"></div><div class="ppi-name"></div><div class="ppi-stand"></div></div>');
      $('.ppi-ava').eq(index).css('background-image', 'url(' + el.headImgAddr + ')');
      $('.ppi-name').eq(index).html(el.nickName);
      $('.ppi-stand').eq(index).html(el.rankId);

      $('.ppi-stand').eq(0).css('background-image', 'url(./img/p1.png').html(' ').end().eq(1).css('background-image', 'url(./img/p2.png').html(' ').end().eq(2).css('background-image', 'url(./img/p3.png').html(' ');
    });
  });

  var list = [$('.cover'), $('.ashow'), $('.bshow'), $('.phb'), $('.ques')];
  list.forEach(function (el) {
    return el.hide();
  });
  $('.phb').show();
  $('.main').hide();
  $('.ppi-stand').eq(0).css('background-image', 'url(./img/p1.png').html(' ').end().eq(1).css('background-image', 'url(./img/p2.png').html(' ').end().eq(2).css('background-image', 'url(./img/p3.png').html(' ');
});


$('#fh').click(function(e) {
  window.location.reload();
})



function showNotTime () {
  [$('.cover'), $('.ashow'), $('.bshow'), $('.phb'), $('.ques'), $('.main')].forEach(function (el) {
    return el.hide();
  });
  $('.cover').show();
  $('#qdsb').show();
}
