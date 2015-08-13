//obj = {"ip":{"ip":"217.118.78.103","hostname":"No Hostname","city":"Saint Petersburg","region":"Saint Petersburg City","country":"RU","loc":"59.8944,30.2642","org":"AS16345 OJSC VimpelCom","postal":"190008"},"weather":{"coord":{"lon":30.26,"lat":59.89},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"cmc stations","main":{"temp":-29.61,"pressure":1013,"humidity":68,"temp_min":19,"temp_max":20.56},"wind":{"speed":8,"deg":280},"clouds":{"all":40},"dt":1439461160,"sys":{"type":1,"id":7267,"message":0.0056,"country":"RU","sunrise":1439431729,"sunset":1439488626},"id":498817,"name":"Saint Petersburg","cod":200}};
//showWeather();
var imgsrc = "";
var obj = {};
$.get("http://ipinfo.io", function(response) {
  obj.ip = response;
    $.get("http://api.openweathermap.org/data/2.5/weather?q="+obj.ip.city+"&units=metric", function(response) {
      obj.weather = response;
      showWeather();
     }, "jsonp");
}, "jsonp");

function back(temp) {
	var sign = (temp<0)?"-":""; console.log(sign);
	temp=/\d/.exec(temp);
	$('html').css("background", "url(img/"+sign+temp+".jpg) no-repeat rgba(0, 0, 0, 0.4)");
	$('html').css("background-size", "cover");
};
function cToF(type) {
	var temp = obj.weather.main.temp.toFixed(1);
	if(type==="C") {
		$('#temp').html(temp+" C&deg;");
		$('#ctof').html("Fahrenheit");
	}
	if(type==="F") {
		$('#temp').html((temp * 9 / 5 + 32).toFixed(1)+" F&deg;");
		$('#ctof').html("Celsius");
	}
}
function showWeather() {
$(document).ready(function () {
$('#w_icon').css("background", "url(http://openweathermap.org/img/w/"+obj.weather.weather[0].icon+".png) bottom right 15%/200px no-repeat #46B6AC");
$('#place').html(obj.ip.city+", "+obj.ip.region);
$('#weather').html(obj.weather.weather[0].description);
cToF("C");
back(obj.weather.main.temp);
$('#ctof').click(function(){
	if($(this).html()==="Fahrenheit") cToF("F");
	else cToF("C");
	});
});
};