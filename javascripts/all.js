
$(document).ready(function(){
	function addCommas(str)
	{
	 str += '';
	 x = str.split('.');
	 x1 = x[0];
	 x2 = x.length > 1 ? '.' + x[1] : '';
	 var rgx = /(\d+)(\d{3})/;
	 while (rgx.test(x1)) {
	  x1 = x1.replace(rgx, '$1' + ',' + '$2');
	 }
	 return x1 + x2;
	}
	var API_SERVER = "http://api.kptaipei.tw/v1/";
    var API_KEY = "kp53f55547a05d98.27741829";
	$.get(API_SERVER + "financial/all/?accessToken="+API_KEY, function(kp) {
    		var kinds = {};
			$.each(kp.data,function(index,item){
				if(item.price != 0){
					if(kinds[item.account]  == null){
						kinds[item.account] = {total:0,type:item.type};
					}
					kinds[item.account].total += parseInt(item.price,10);
				}
			});
			var money = JSON.parse(JSON.stringify(kinds));
			for(var k in money){
				var sum = addCommas(money[k].total)
				money[k].total = sum
			}
			var chart = c3.generate({
				bindto: '#chart',
			    data: {
			        columns: [
			          ['個人捐贈-非匿名：$'+money['個人捐贈-非匿名'].total, kinds['個人捐贈-非匿名'].total],
			          ['人民團體捐贈-非匿名：$'+money['人民團體捐贈-非匿名'].total, kinds['人民團體捐贈-非匿名'].total],
			          ['營利事業捐贈-非匿名：$'+money['營利事業捐贈-非匿名'].total, kinds['營利事業捐贈-非匿名'].total],
			          ['個人捐贈-匿名：$'+money['個人捐贈-匿名'].total, kinds['個人捐贈-匿名'].total],
			          ['網路募款捐贈-非匿名：$'+money['網路募款捐贈-非匿名'].total, kinds['網路募款捐贈-非匿名'].total],
			          ['網路募款捐贈-匿名：$'+money['網路募款捐贈-匿名'].total, kinds['網路募款捐贈-匿名'].total],
			        ],
			        type : 'pie',
			    }
			});
			var chart2 = c3.generate({
				bindto: '#chart2',
			    data: {
			        columns: [
			          ['人事費用支出：$'+money['人事費用支出'].total, kinds['人事費用支出'].total],
			          ['租用競選辦事處支出明細：$'+money['租用競選辦事處支出明細'].total, kinds['租用競選辦事處支出明細'].total],
			          ['宣傳支出明細：$'+money['宣傳支出明細'].total, kinds['宣傳支出明細'].total],
			          ['雜支支出明細：$'+money['雜支支出明細'].total, kinds['雜支支出明細'].total],
			          ['公共關係費用支出明細：$'+money['公共關係費用支出明細'].total, kinds['公共關係費用支出明細'].total],
			          ['交通旅運支出明細：$'+money['交通旅運支出明細'].total, kinds['交通旅運支出明細'].total],
			          ['集會支出明細：$'+money['集會支出明細'].total, kinds['集會支出明細'].total],
			        ],
			        type : 'pie',
			    }
			});
	});
});

