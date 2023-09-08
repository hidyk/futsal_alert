# futsal_alert
個人フットサルの最低開催人数を超えた時点でLINEに通知を送る

自分が参加する地元の個人フットサルは10人以上集まると開催し満たない場合には開催は中止になる。
開催されるかどうかをサイトに都度訪問する必要があったので開催が決定したらLUNEに通知が入るようにした。




##  作成背景
  予約するとほかの予定がいれられなくなる
  予約しないままだとぎりぎり予約しようとしてたら満員で予約できず
  というようなことを避けるために作成。
  
  
  
##  必要なもの
  Googleアカウント
    GAS
      拡張機能：Cheerio
    スプレッドシート
  LINE Messaging API


##  改善点メモ
  キャンセル待ち通知
  
  
  
  
##  使い方

### GAS
1.  GASにalert.gsを添付
2.  ライブラリ追加からスクレイピングライブラリCheerioを利用
```
ライブラリID
1ReeQ6WO8kKNxoaA_O0XEQ589cIrRvEBA9qcWpNqdOP17i47u6N9M5Xh0
```
https://github.com/tani/cheeriogs
1.  定期実行トリガーを任意の時間に設定

### 取得するページを指定
1. LaBOLA総合サイトでいつも利用している施設のページに移動
2. 個人フットサルページに移動し種目やレベルを指定（指定無しでもよく、よく利用するページを開ければ良い）
3. URLをコピーし該当部分へペースト
```
function myFunction() {
  //情報を取得したいサイトのURLを""の間に記述。今回のケースは個人フットサルのエンジョイクラス一覧開催一覧ページ
  const url = "〇〇〇"
```
<img src="https://user-images.githubusercontent.com/5473564/191475721-61a103f7-325e-4b6d-b9e5-f2c050b8ff24.gif" width="50%">


### スプレッドシートのIDを取得
1.  ログの記録管理のためのスプレッドシートを用意しIDを取得する
2.  IDをコピーしスクリプト該当部分へペースト
```
const sheet    = SpreadsheetApp.openById('〇〇〇'); //スプレッドシートID
const lastgame = sheet.getSheetByName('シート1').getRange("A1").getValues(); //スプレッドシート前回開催分ログ
```
https://developers.google.com/sheets/api/guides/concepts

### LINE MessagingAPIを取得
1.  LINEチャンネルアクセストークンを取得し添付
```
const lineurl = 'https://api.line.me/v2/bot/message/push'; //LINE Messaging API
const token = '〇〇〇'; //Messaging API チャンネルアクセストークン
```
2.  送信先LINEIDを添付
```
to: '〇〇〇', //送信先LINEユーザーID
```
https://developers.line.biz/ja/docs/messaging-api/overview/
