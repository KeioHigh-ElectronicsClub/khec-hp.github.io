var list = []

// 読み込み時カテゴリー、場所リスト取得
$(function () {
  $.ajax({
    type: 'GET',
    url:
      'https://script.google.com/macros/s/AKfycbx56aJ09eiV_QJ_4IJJAiHuYV5BkVJWGQi2xzRR3QZxz3YbuXM/exec',
    data: { getList: 0 },
    dataType: 'jsonp',
    jsonp: 'callback',
    success: function (msg, type) {
      console.log(msg)
      console.log(type)

      var categories = msg.category
      categories.sort()
      for (var i = 0; i < categories.length; i++) {
        var option = $('<option></option>')
          .text(categories[i])
          .val(categories[i])
        $('#category').append(option.clone())
        $('#categoryFilter').append(option.clone())
      }
      var places = msg.place
      places.sort()
      for (var i = 0; i < places.length; i++) {
        var option = $('<option></option>').text(places[i]).val(places[i])
        $('#place').append(option.clone())
        $('#placeFilter').append(option.clone())
      }
    },
    error: function (xhr, status) {
      console.log(status)
    },
  })
})

// キーワード検索ボックスenter押下時処理
$('#keyword').keypress(function (e) {
  if (e.which == 13) {
    $('#keyword_submit').click()
  }
})

// キーワード検索実行処理
$('#keyword_submit').on('click', function () {
  $('#result').show()
  $('#result').show()
  $('#searching').show()

  $('#sort').val('')
  $('#categoryFilter').val('')
  $('#placeFilter').val('')
  var keyword = $('#keyword').val()
  console.log(keyword)

  $.ajax({
    type: 'GET',
    url:
      'https://script.google.com/macros/s/AKfycbx56aJ09eiV_QJ_4IJJAiHuYV5BkVJWGQi2xzRR3QZxz3YbuXM/exec',
    data: { keywords: keyword },
    dataType: 'jsonp',
    jsonp: 'callback',

    success: function (msg, type) {
      console.log(msg)
      console.log(type)
      showList(msg)
      list = msg
    },
    error: function (xhr, status) {
      console.log(status)
    },
  })
})

// 項目別検索欄表示処理
$('.searchByItem > h2').on('click', function () {
  $('#items').slideToggle()
  $('.searchByItem>h2').toggleClass('open')
})
// 項目別検索enter押下時処理
$('.searchItem > input').keypress(function (e) {
  if (e.which == 13) {
    $('#item_submit').click()
  }
})
// 項目別検索処理
$('#item_submit').on('click', function () {
  $('#searching').show()
  $('#sort').val(0)
  $('#categoryFilter').val(0)
  $('#placeFilter').val(0)
  var category = $('#category').val()
  var name = $('#name').val()
  var constant1 = $('#constant1').val()
  var constant2 = $('#constant2').val()
  var number = $('#number').val()
  var place = $('#place').val()
  var date = $('#date').val()

  category = category !== '' ? category : undefined
  name = name !== '' ? name : undefined
  constant1 = constant1 !== '' ? constant1 : undefined
  constant2 = constant2 !== '' ? constant2 : undefined
  number = number !== '' ? number : undefined
  place = place !== '' ? place : undefined
  date = date !== '' ? new Date(date).toDateString() : undefined

  var obj = {
    category: category,
    name: name,
    constant1: constant1,
    constant2: constant2,
    number: number,
    place: place,
    date: date,
  }

  var data = JSON.parse(JSON.stringify(obj))
  console.log(data)

  $.ajax({
    type: 'GET',
    url:
      'https://script.google.com/macros/s/AKfycbx56aJ09eiV_QJ_4IJJAiHuYV5BkVJWGQi2xzRR3QZxz3YbuXM/exec',
    data: data,
    dataType: 'jsonp',
    success: function (msg, type) {
      console.log(msg)
      console.log(type)
      list = msg
      showList(msg)
    },
    error: function (xhr, status) {
      console.log(status)
    },
  })
})

// カテゴリーフィルター処理
$('#categoryFilter').change(function (e) {
  var selected = $('#categoryFilter').val()
  if (selected == '') {
    showList(list)
    return
  }
  var filterList = list.filter(function (l) {
    return l.category === selected
  })
  showList(filterList)
})
// 場所フィルター処理
$('#placeFilter').change(function (e) {
  var selected = $('#placeFilter').val()
  if (selected == '') {
    showList(list)
    return
  }
  var filterList = list.filter(function (l) {
    return l.place === selected
  })
  showList(filterList)
})
// ソート処理用関数factory
function createSortFunc(name, isUp) {
  return function (a, b) {
    var data = []
    data[0] = a[name]
    data[1] = b[name]
    for (var i = 0; i < 2; i++) {
      if (typeof data[i] !== 'string') continue
      if (data[i].endsWith('k')) {
        data[i] = data[i].slice(0, -1)
        data[i] = Number(data[i]) * 1000
      } else if (data[i].endsWith('M')) {
        data[i] = data[i].slice(0, -1)
        data[i] = Number(data[i]) * 1000000
      } else if (data[i].endsWith('p')) {
        data[i] = data[i].slice(0, -1)
        data[i] = Number(data[i]) / 1000000000000
      } else if (data[i].endsWith('u')) {
        data[i] = data[i].slice(0, -1)
        data[i] = Number(data[i]) / 1000000
      }
    }

    if (data[0] < data[1]) return isUp ? -1 : 1
    if (data[0] > data[1]) return isUp ? 1 : -1
    return 0
  }
}
// ソート処理｀
$('#sort').change(function (e) {
  var selected = $('#sort').val()
  if (selected == '') {
    showList(list)
    return
  }
  var sortList
  switch (selected) {
    case 'nameUp':
      sortList = list.sort(createSortFunc('name', true))
      break
    case 'constant1Up':
      sortList = list.sort(createSortFunc('constant1', true))
      break
    case 'constant2Up':
      sortList = list.sort(createSortFunc('constant2', true))
      break
    case 'numberUp':
      sortList = list.sort(createSortFunc('number', true))
      break
    case 'dateUp':
      sortList = list.sort(createSortFunc('date', true))
      break
    case 'nameDown':
      sortList = list.sort(createSortFunc('name', false))
      break
    case 'constant1Down':
      sortList = list.sort(createSortFunc('constant1', false))
      break
    case 'constant2Down':
      sortList = list.sort(createSortFunc('constant2', false))
      break
    case 'numberDown':
      sortList = list.sort(createSortFunc('number', false))
      break
    case 'dateDown':
      sortList = list.sort(createSortFunc('date', false))
      break
  }
  showList(sortList)
})

// 日付文字列生成
function createDateString(date) {
  return '' + date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate()
}
// 検索結果表示処理
function showList(list) {
  console.log(list)

  $('#list').empty()

  var itemNum = $('<h4></h4>').text('検索結果: ' + list.length + '件')
  $('#list').append(itemNum)

  for (var i in list) {
    var box = $('<div></div>', {
      class: 'resultBox',
    })

    var categoryNameWrap = $('<div></div>').addClass('categoryNameWrap')
    var category = $('<p></p>').text(list[i].category).addClass('category')
    var name = $('<h3></h3>').text(list[i].name).addClass('name')
    var number = $('<p></p>')
      .text(list[i].number + '個')
      .addClass('number')
    categoryNameWrap.append(category, name, number)
    var valueWrap = $('<div></div>').addClass('valueWrap')

    var constantWrap = $('<div></div>').addClass('nameWrap')
    var constant1 = $('<p></p>')
      .text(list[i].constant1 != 'not set' ? list[i].constant1 : '')
      .addClass('constant1')
    var constant2 = $('<p></p>')
      .text(list[i].constant2 != 'not set' ? list[i].constant2 : '')
      .addClass('constant2')
    constantWrap.append(constant1, constant2)

    var datePlaceWrap = $('<div></div>').add('datePlaceWrap')
    var date = $('<p></p>')
      .text(createDateString(new Date(list[i].date)))
      .addClass('date')
    var place = $('<p></p>').text(list[i].place).addClass('place')
    datePlaceWrap.append(date, place)

    valueWrap.append(categoryNameWrap, constantWrap, datePlaceWrap)

    var urlRemarkWrap = $('<div></div>').addClass('urlRemarkWrap')

    var URL = undefined
    if (list[i].url != 'not set') {
      URL = $('<p></p>').append(
        $('<a></a>', {
          href: list[i].url,
          class: 'url',
        }).text(list[i].url)
      )
    }
    var remark = $('<p></p>')
      .text(list[i].remark != 'not set' ? list[i].remark : '')
      .addClass('remark')

    urlRemarkWrap.append(URL, remark)
    box.append(valueWrap, urlRemarkWrap)
    $('#list').append(box)
  }

  $('#searching').hide()
}
