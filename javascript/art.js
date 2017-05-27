
var width = 256
var height = 256
var num_canvas = 7
for(var i=0;i<num_canvas;i++){
	var mycanvas = document.createElement('canvas');
	draw(mycanvas,i);
	convertCanvasToImage(mycanvas,i);	
	document.body.appendChild(mycanvas);
}

function get_random(min_num,max_num){
	var x = Math.random();
	x = x*(max_num-min_num);
	x = x+min_num;
	x = Math.round(x);
	return x;
}

function get_rgb(x,y,ind){
	var res = new Array();
	switch(ind){
		case 0:
			res['r'] = (x*x)%256;
			res['g'] = (y*y)%256;
			res['b'] = (x*y)%256;
			break;
		case 1:
			res['r'] = x%256;
			res['g'] = y%256;
			res['b'] = (x+y)%256;
			break;
		case 2:
			res['r'] = Math.round(Math.sqrt(x*1000))%256;
			res['g'] = Math.round(Math.sqrt(y*1000))%256;
			res['b'] = Math.round(Math.sqrt(x*y))%256;
			break;
		case 3:
			res['r'] = Math.round(Math.sqrt(x*256))%256;
			res['g'] = Math.round(Math.sqrt(y*256))%256;
			res['b'] = Math.round(Math.sqrt(x*y*512))%256;
			break;
		case 4:
			res['r'] = Math.round(Math.sin(x)*256)%256;
			res['g'] = Math.round(Math.cos(y)*256)%256;
			res['b'] = Math.round(Math.tan(x+y)*256)%256;
			break;
		case 5:
			res['r'] = Math.round(Math.sin(x*x)*256)%256;
			res['g'] = Math.round(Math.cos(y*y)*256)%256;
			res['b'] = Math.round(Math.tan((x+y)*(x+y))*256)%256;
			break;
		case 6:
			res['r'] = Math.round(Math.pow(x,1)+Math.pow(y,1))%256;
			res['g'] = Math.round(Math.pow(x,2)+Math.pow(y,2))%256;
			res['b'] = Math.round(Math.pow(x,3)+Math.pow(y,3))%256;
			break;
		default:
			res['r'] = get_random(0,255)
			res['g'] = get_random(0,255)
			res['b'] = get_random(0,255)
			break;
	}
	return res;
}

function draw(cur_canvas,ind){
	//console.log("Draw "+circle_list.length + "circles");
	cur_canvas.width  = width; 
	cur_canvas.height = height; 
	var ctx = cur_canvas.getContext('2d');
	ctx.fillStyle='#f1f1f1';
	ctx.fillRect(0,0,width,height);
	var imgdata = ctx.getImageData(0,0,width,height);
	console.log(imgdata);
	for(var y=0;y<height;y++){
		for(var x=0;x<width;x++){
			var cur_rgb = get_rgb(x,y,ind);
			imgdata.data[(x+y*width)*4] = cur_rgb['r'];	
			imgdata.data[(x+y*width)*4+1] = cur_rgb['g'];	
			imgdata.data[(x+y*width)*4+2] = cur_rgb['b'];	
		}
	}
	console.log(imgdata);
	ctx.putImageData(imgdata,0,0);
}

function convertCanvasToImage(canvas,ind) {
	var image = new Image();
	image.src = canvas.toDataURL("canvas["+ind+"]");
	return image;
}
