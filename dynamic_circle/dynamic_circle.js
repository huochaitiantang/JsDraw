
var width = 1200
var height = 640
var border = 5
var num_circle_low = 10; var num_circle_high = 20;
var circle_x_low = 550; var circle_x_high = 650;
var circle_y_low = 270; var circle_y_high = 370;
var circle_r_low = 10; var circle_r_high = 50;
var speed_low = 3; var speed_high = 5; var speed_step = 0.05; var speed_prob = 1.0;
var num_direction = 7;
var num_color = 17;
var circle_list = new Array();
var direction = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
var color = new Array("220,20,60","255,105,180","255,0,0","255,165,0","255,222,173","210,105,30","255,255,0","255,215,0"," 	189,183,107","0,255,127","50,205,50","0,128,0","65,105,225","0,191,255","0,255,255","128,0,128","148,0,211"," 	123,104,238");
var mycanvas = document.createElement('canvas');
document.body.appendChild(mycanvas);

//获取随机数
function get_random(min_num,max_num){
	var x = Math.random();
	x = x*(max_num-min_num);
	x = x+min_num;
	x = Math.round(x);
	return x;
}

function add_circle(){
	var add_num = get_random(num_circle_low,num_circle_high);//新增圆个数
	for(var i=0;i<add_num;i++){
		var x = get_random(circle_x_low,circle_x_high);//圆心横坐标
		var y = get_random(circle_y_low,circle_y_high);//圆心纵坐标
		var r = get_random(circle_r_low,circle_r_high);//圆半径
		var c = get_random(0,num_color);//色彩选择
		var d = Math.random()*Math.PI*2;
		var s = get_random(speed_low,speed_high);//速度选择
		var circle = new Array();
		circle['x'] = x;
		circle['y'] = y;
		circle['r'] = r;
		circle['c'] = c;
		circle['d'] = d;
		circle['s'] = s;		
		circle['flag'] = true;
		circle_list.push(circle);
	}
	console.log("Add ["+add_num+"] , Account to ["+circle_list.length+"]\n");
}

function draw_circle(){
	//console.log("Draw "+circle_list.length + "circles");
	mycanvas.width  = width; 
	mycanvas.height = height; 
	var canvas = mycanvas.getContext('2d');
	canvas.fillStyle='#f1f1f1';
	canvas.fillRect(0,0,width,height);
	for(var i=0;i<circle_list.length;i++){
		//画圆
		var cur = circle_list[i];
		canvas.beginPath();
		canvas.arc(cur['x'],cur['y'],cur['r'],0,Math.PI*2,false);
		canvas.fillStyle = "rgba("+color[cur['c']]+",0.8)";
		canvas.fill();
		canvas.closePath();
	}
}

function mov_a_circle(cc){
	var offsetx = Math.sin(cc['d'])*cc['s'];	
	var offsety = Math.cos(cc['d'])*cc['s'];
	cc['x'] += offsetx;
	cc['y'] += offsety;
	var r2 = Math.pow(cc['r'],2);
	var dis = 0;
	if (cc['x'] < 0 && cc['y'] < 0) dis = Math.pow(cc['x'],2) + Math.pow(cc['y'],2);
	else if(cc['x'] < 0 && cc['y'] >=0 && cc['y'] <= height) dis = Math.pow(cc['x'],2);
	else if(cc['x'] < 0 && cc['y'] > height) dis = Math.pow(cc['x'],2) + Math.pow(cc['y']-height,0);
	else if(cc['y'] < 0 && cc['x'] >= 0 && cc['x'] <= width) dis = Math.pow(cc['y'],2);
	else if(cc['y'] < 0 && cc['x'] > width) dis = Math.pow(cc['y'],2) + Math.pow(cc['x']-width,2);
	else if(cc['x'] > width && cc['y'] >= 0 && cc['y'] <= height) dis = Math.pow(cc['x']-width,2);
	else if(cc['x'] > width && cc['y'] > height) dis = Math.pow(cc['x']-width,2) + Math.pow(cc['y']-height,2);
	else if(cc['y'] > height && cc['x'] >= 0 && cc['x'] <= width) dis = Math.pow(cc['y']-height,2);
	if (dis > r2) cc['flag'] = false;
	if (Math.random() < speed_prob) cc['s'] += speed_step;
}

function mov_circle(){
	for(var i=0;i<circle_list.length;i++){
		mov_a_circle(circle_list[i]);
	}
	for(var i=circle_list.length-1;i>=0;i--){
		if (circle_list[i]['flag']==false) circle_list.splice(i,1);
	}
	if(circle_list.length >0 ) draw_circle();
}

add_circle();
setInterval(add_circle,1000);
setInterval(mov_circle,100);


