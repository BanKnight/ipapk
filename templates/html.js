module.exports = (one)=>{return `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
      <meta name="description" content="">
      <meta name="author" content="">
      <link rel="icon" href="../../favicon.ico">
  
      <title>IPA Server</title>
  
      <!-- Bootstrap core CSS -->
      <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
  
      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
      <!--[if lt IE 9]>
        <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
    </head>
  
    <body>
  
      <div class="tabbable">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#ios" data-toggle="tab">IOS</a></li>
          <li><a href="#android" data-toggle="tab">Android</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active " id="ios">
            <div class="list-group">
              ${one.ipas}
            </div>
          </div>
          <div class="tab-pane" id="android">
            <div class="list-group">
              ${one.apks}
            </div>
          </div>
        </div>
      </div>
      <!-- Bootstrap core JavaScript
      ================================================== -->
      <!-- Placed at the end of the document so the pages load faster -->
      <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
      <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\\/script>')</script>
      <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
  </html>
  `
}


