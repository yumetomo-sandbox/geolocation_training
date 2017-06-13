(function(){

  'use strict';

  $(function(){

    // ボタンクリックで位置情報取得を開始
    $('#btn').on('click', function(){

      // 端末がGeolocation APIに対応しているか
      if(navigator.geolocation){

        $('#result').html('<p>位置情報を取得中・・・</p>');

        /**
         *  現在位置を取得する
         *  引数１：成功した時に実行する関数（必須）
         *  引数２：失敗した時に実行する関数（省略可）
         *  引数３：オプションをオブジェクト形式で指定（省略可）
         */
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError,geoOption);

      }
      else{

        alert('あなたの端末では、現在位置を取得できません。') ;

      }

    });

    /**
     *  位置情報取得に成功した時
     *  引数：意味
     *  ----------------------------------
     *  coords.latitude：現在位置の緯度（-180 ~ 180）
     *  coords.longitude：現在位置の経度（-90 ~ 90）
     *  coords.altitude：現在位置の高度（単位：メートル）
     *  coords.accuracy：取得した緯度・経度の精度（単位：メートル）
     *  coords.altitudeAccuracy：取得した高度の精度（単位：メートル）
     *  coords.heading：方角。0 ~ 360の角度で表示。0が北、90が東、180が南、270が西
     *  coords.speed：速度。メートル / 秒数で表示
     *  ----------------------------------
     *  取得できなかった値はnullになる
     */
    function geoSuccess(defaultData){

      // 楽に取り出せるように
      var data = defaultData.coords;

      var lat       = data.latitude,
          lng       = data.longitude,
          alt       = data.altitude,
          accLatLng = data.accuracy,
          accAlt    = data.altitudeAccuracy,
          heading   = data.heading,
          speed     = data.speed;

      $('#result').html('<dl><dt>緯度</dt><dd>' + lat + '</dd>' +
      '<dt>経度</dt><dd>' + lng + '</dd>' +
      '<dt>高度</dt><dd>' + alt + '</dd>' +
      '<dt>緯度・経度の精度</dt><dd>' + accLatLng + '</dd>' +
      '<dt>高度の精度</dt><dd>' + accAlt + '</dd>' +
      '<dt>方角</dt><dd>' + heading + '</dd>' +
      '<dt>速度</dt><dd>' + speed + '</dd>' +
      '</dl>');

    }

    /**
     *  位置情報取得に失敗した時
     *  引数：意味
     *  ----------------------------------
     *  0：原因不明のエラー
     *  1：位置情報の使用が許可されなかった
     *  2：電波状況などの問題で取得できなかった
     *  3：時間がかかりすぎてタイムアウト・エラーになった
     *  ----------------------------------
     */
    function geoError(error){

    	var errorMessage = [
        '原因不明のエラーが発生しました。',
        '位置情報の使用が許可されませんでした。',
        '電波状況などの問題で位置情報が取得できませんでした。',
        '位置情報の取得に時間がかかり過ぎたため、タイムアウトしました。'
    	];

      alert(errorMessage[error.code]);

    }

    /**
     *  位置情報取得に関するオプション
     *  引数：意味
     *  ----------------------------------
     *  enableHighAccuracy：trueにすると、より正確な情報を取得しようとする
     *  timeout：処理がタイムアウトするまでの時間（単位：ミリ秒）
     *  maximumAge：ここで指定した秒数だけ、今回のデータをキャッシュしておく（単位：ミリ秒）
     *  ----------------------------------
     */
    var geoOption = {

      'enableHighAccuracy': false,
      'timeout': 8000,
      'maximumAge': 1000
      
    };

  });

})();
