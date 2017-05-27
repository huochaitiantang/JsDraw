
var width = 1200
var height = 640
var border = 5
var num_circle_low = 75; var num_circle_high = 100;
var circle_x_low = 40; var circle_x_high = 1160;
var circle_y_low = 40; var circle_y_high = 600;
var circle_r_low = 10; var circle_r_high = 50;
var num_color = 17;
var canvas_num = 1;

function next_seed(seed_s){
	return ( seed_s * 9301 + 49297 ) % 233280;
}


//获取随机数
function get_random(seed_s,min_num,max_num){
	var x = ( seed_s * 9301 + 49297 ) % 233280/233280.0 ;
	x = x*(max_num-min_num);
	x = x+min_num;
	x = Math.round(x);
	return x;
}


//判断圆心之间是否太近的函数
function too_close(k,array_obj,x,y,r){
	
	if((x+r>width+border)||(x-r<0)||(y+r>height+border)||(y-r<0)){
		return 1;
	}
	for(var j=k-4;j>=0;j=j-4){
		var dis,r_2;
		dis = (x-array_obj[j])*(x-array_obj[j])+(y-array_obj[j+1])*(y-array_obj[j+1]);
		r_2 = array_obj[j+2]*array_obj[j+2];
		//console.log("dis:",dis," r_2",r_2);
		if(dis<r_2){
			return 1;
		}		
	}
	return 0;
}


//判断该颜色是否已经出现过的函数
function repeat_color(k,array_obj,c){
	for(var j=k-4;j>=0;j=j-4){
		if(c == array_obj[j+3]){
			return 1;
		}		
	}
	return 0;
}


//id_number是一个很大的整数
function get_number(id_number,array_obj){

	var seed = id_number;
	array_obj["num_circle"] = get_random(seed,num_circle_low,num_circle_high);//圆个数
	seed = next_seed(seed);

//	array_obj["style"] = get_random(seed,0,1);//色调二选一
//	seed = next_seed(seed);

	var k = 0;
	for(var i=0;i<array_obj["num_circle"];i++){
		var x = get_random(seed,circle_x_low,circle_x_high);//圆心横坐标
		seed = next_seed(seed);
		var y = get_random(seed,circle_y_low,circle_y_high);//圆心纵坐标
		seed = next_seed(seed);
		var r = get_random(seed,circle_r_low,circle_r_high);//圆半径
		seed = next_seed(seed);
		var c = get_random(seed,0,num_color);//色彩选择
		seed = next_seed(seed);
		while(too_close(k,array_obj,x,y,r)){/*保证圆之间不会隔的太近*/
			var pro = get_random(seed,0,100);
			seed = next_seed(seed);
			if(pro<3){						//3%的概率可以
				break;
			}	
			else{
				x = get_random(seed,circle_x_low,circle_x_high);//圆心横坐标
				seed = next_seed(seed);
				y = get_random(seed,circle_y_low,circle_y_high);//圆心纵坐标
				seed = next_seed(seed);
				r = get_random(seed,circle_r_low,circle_r_high);//圆半径
				seed = next_seed(seed);
			}
		}

		while(repeat_color(k,array_obj,c)){/*保证颜色之间不会怎么重复*/
			var pro = get_random(seed,0,100);
			seed = next_seed(seed);
			if(pro<3){				//3%的概率可以
				break;
			}
			else{
				c = get_random(seed,0,num_color);//色彩选择
				seed = next_seed(seed);
			}	
		}

		array_obj[k++] = x;
		array_obj[k++] = y;
		array_obj[k++] = r;
		array_obj[k++] = c;		
	}

}


/*根据传入的id和画布对象，进行作画*/
function create_by_id(id_number,canvas_all){
	
	canvas_all.width  = width; 
	canvas_all.height = height; 

	var canvas = canvas_all.getContext('2d');
	canvas.fillStyle='#f1f1f1';
	canvas.fillRect(0,0,width,height);
	var my_array = new Array();

	var color = new Array("220,20,60","255,105,180","255,0,0","255,165,0","255,222,173","210,105,30","255,255,0","255,215,0"," 	189,183,107","0,255,127","50,205,50","0,128,0","65,105,225","0,191,255","0,255,255","128,0,128","148,0,211"," 	123,104,238");
	get_number(id_number,my_array);

	//console.log("num_circle:",my_array["num_circle"]);
	//console.log("色调",my_array["style"]);

	for(var i=0;i<my_array["num_circle"];i++){
		//console.log("x:",my_array[i*4]," y:",my_array[i*4+1]," r:",my_array[i*4+2]);
		//console.log("色彩：",my_array[i*4+3]);
		//画圆
		canvas.beginPath();
		canvas.arc(my_array[i*4],my_array[i*4+1],my_array[i*4+2],0,Math.PI*2,false);
		var index = my_array[i*4+3];
		canvas.fillStyle = "rgba("+color[index]+",0.8)";
		canvas.fill();
		canvas.closePath();
	}
}

var canvas_array = new Array();
for (var i=0;i<canvas_num;i++){
	canvas_array[i] = document.createElement('canvas');
	create_by_id(i,canvas_array[i]);
	document.body.appendChild(canvas_array[i]);
}



