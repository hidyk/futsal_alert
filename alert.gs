const lineurl = 'https://api.line.me/v2/bot/message/push'; //LINE Messaging API
const token = '〇〇〇'; //Messaging API チャンネルアクセストークン
const sheet    = SpreadsheetApp.openById('〇〇〇'); //スプレッドシートID
const lastgame = sheet.getSheetByName('シート1').getRange("A1").getValues(); //スプレッドシート前回開催分ログ

//フットサル予約サイトから情報取得
function myFunction() {
  //情報を取得したいサイトのURLを""の間に記述。今回のケースは個人フットサルのエンジョイクラス一覧開催一覧ページ
  const url = "〇〇〇"
  //UrlFetchApp.fetch(URL [, パラメータ])引数に指定したURLに対しHTTPリクエストしサーバーからのHTTPレスポンス（HTTPResponseクラス）が戻り値として取得する。
  //getContentText=HTTPレスポンスを文字コードによって文字列に変換して取得する
  var content = UrlFetchApp.fetch(url).getContentText();
  //Cheerioを用いたコンテントの読み込み
  var $ = Cheerio.load(content);
  //抜き出したい直近開催分の箇所を指定
  //日時+タイトル
  var title = $('ul#event_list li div.date').eq(0).text();
  //開催クラス名
  var level = $('ul#event_list li h2').eq(0).text();
  //現在募集状況
  //募集上限（コート拡大など変動する場合あり）
  var capacity = $('ul#event_list li div.capacity').eq(0).text().split(" ")[1].replace(/[^0-9]/g, '');
  //募集数残り
  var min = $('ul#event_list li span.min').eq(0).text().replace(/[^0-9]/g, '');
  //現在予約数
  var reserved = capacity - min

  console.log(title);
  console.log(level);
  console.log(capacity);
  console.log(min);
  console.log(capacity - min );

  //予約数が10人以上かつ日時タイトルが前回開催分試合でない場合にメッセージ送信
  //ソサイチなど最低開催人数が違う場合は数字の10を人数に応じて変更
  if( reserved > 10 && title != lastgame){
    postMessage(title, level, capacity, min, reserved);
    //10人以上の開催決定でスプレッドシートに記録
    sheet.getSheetByName('シート1').getRange("A1").setValue(title);
  }
}

//LINEPUSH通知を送る
function postMessage(title, level, capacity, min, reserved) {
  //const lastgamedate = Utilities.formatDate( lastdate, 'Asia/Tokyo', 'yyyy/MM/dd')

  Logger.log(reserved);

  const payload = {
    to: '〇〇〇', //送信先LINEユーザーID
    messages: [
      { type: 'text', text: '現在の予約数は' + capacity + "人募集中のところ" + reserved + '人で開催決定数を超えました。' + '〇〇〇開催イベント詳細URL' }
    ] //メッセージテキスト
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };
    UrlFetchApp.fetch(lineurl, params);
