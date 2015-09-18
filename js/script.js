var game_unordered_list=document.getElementsByTagName('ul')[0];
var li_list = document.getElementsByTagName('li');
var games = document.getElementsByClassName('game_list_item');
var global_target;

var loop_all = function(){
	for (var i= 0; i < li_list.length; i++){
		li_list[i].addEventListener('click',function(){
			fu_click(this);
		});
		li_list[i].addEventListener('mouseover',function(){
			fu_hover(this);
		});
		li_list[i].addEventListener('mouseleave',function(){
			fu_mouse_leave(this);
		});
		li_list[i].addEventListener('mousedown', function(){
			fu_mouse_down(this);
		});
		li_list[i].addEventListener('mouseup', function(){
			global_target=this;
			fu_mouse_up(this);
		});
		li_list[i].addEventListener('touchstart', function(event){ 	
			fu_touch_start(event);
		});
		li_list[i].addEventListener('touchend', function(event){ 	
			fu_touch_end(event);
		});
	}
	submit_listeners();
};

var fu_minus_click = function(){
	var minus_list = document.getElementsByClassName('minus');
	for (i=0;i<minus_list.length;i++){
		minus_list[i].addEventListener('click',function(){
			this.parentNode.remove(this.parentNode);
		})
	}
}

var loop_all_remove = function(){
	for (var i= 0; i < li_list.length; i++){
		var el = li_list[i],
    	elClone = el.cloneNode(true);
		el.parentNode.replaceChild(elClone, el);
	}
};

var fu_click= function(target){
	fu_undo_check(target);
};

var fu_hover= function(target){
	target.classList.add("hover");
	make_minus(target);
	fu_open_form(target);
};

var fu_mouse_leave= function(target){
	target.classList.remove("hover");
	remove_minus(target);
	fu_close_form(target);
};



function make_minus(target){
	if (target.id === "alert"){return;};
	if (target.classList.contains('title') || target.classList.contains('form')){return;};
	if (target.children.length<1){
		var new_minus = document.createElement('div');
		target.appendChild(new_minus);
		new_minus.innerText = "-"; 
		new_minus.classList.add("minus");
	};
	fu_minus_click();
};

function remove_minus(target){
	if (target.children.length==1) {
		target.removeChild(target.children[0])
	};
}

function fu_open_form(target){
	if (target.classList.contains('title') || target.classList.contains('form')){
		li_list[1].classList.add('open');
		li_list[1].classList.remove('closed');
		document.getElementById("name_input_box").focus(); 
	}
	 
}

function fu_close_form(target){
	document.getElementById("name_input_box").blur();
	if (target.classList.contains('form')){
		li_list[1].classList.remove('open');
		li_list[1].classList.add('closed');			
	};
}

function add_game(name_value){
   	var new_game = name_value.toUpperCase();
   	new_game = new_game.replace(/^\s+/, '').replace(/\s+$/, '');
   	if (new_game===''|| new_game===null){
   		return ;
   	}
   	for (var i = 0; i < games.length; i++) {   	
   		if (new_game === games[i].innerText){
   		document.getElementById('alert').innerText="YOU ALREADY HAVE THIS";
   		document.getElementById('alert').classList.remove('hidden');
   		fu_alert_box();
   		return;
   		}
   	}
   	var new_li = document.createElement('li');
   	new_li.innerText = name_value; 
	game_unordered_list.appendChild(new_li);
	new_li.innerText = name_value.toUpperCase(); 
	new_li.classList.toggle("game_list_item");
	document.getElementById("name_input_box").blur();
};

var submit_listeners = function(){
	document.getElementById('add_submit_button').addEventListener('click',function(){
		var name_value = document.getElementById("name_input_box").value;
		add_game(name_value);
		li_list[1].classList.toggle("closed");
		li_list[1].classList.toggle("open");
		document.getElementById("name_input_box").value='';
		loop_all_remove();
		loop_all();
	});
	document.getElementById("name_input_box").addEventListener('keydown', function(){    
        if(event.keyCode == 13) {
            document.getElementById('add_submit_button').click();       
    	};
	});

};

loop_all();
//////////////////////////////////swipe///////////////////////////////////////////////////
var start_swipe = 0;
var end_swipe = 0;
var threshold = 100;
var y_threshold = 50;

var fu_mouse_down = function(target){
	start_swipe = event.clientX;
	start_swipe_y = event.clientY;
};

var fu_mouse_up = function(target){
	end_swipe = event.clientX;
	end_swipe_y= event.clientY;
	if (start_swipe_y < end_swipe_y){
		if (end_swipe_y - start_swipe_y > y_threshold){
			alert("crooked fingers");
			alert(end_swipe_y - start_swipe_y);
		}
	} 
	if (start_swipe_y > end_swipe_y){
		if (start_swipe_y - end_swipe_y > y_threshold){
			alert("crooked fingers");
			alert(start_swipe_y - end_swipe_y)
		}
	}       			
	if (start_swipe + threshold< end_swipe ){
		global_target.classList.add('deleted');
		document.getElementById('alert').classList.remove('hidden');
		document.getElementById('alert').innerText = "UNDO DELETE: " + global_target.innerText.replace('-','');
		fu_alert_box();
		//global_target.remove(global_target);						
	}
	if (start_swipe > end_swipe + threshold){
		alert('swipe left')
	}
};
		
var fu_touch_start = function(event){		
	start_swipe = event.touches[0].pageX;
	start_swipe_y = event.touches[0].pageY;
	
}; 
var fu_touch_end = function(event){
	end_swipe = event.changedTouches[0].pageX;
	end_swipe_y = event.changedTouches[0].pageY;
	if (start_swipe_y < end_swipe_y){
		if (end_swipe_y - start_swipe_y > y_threshold){
			alert("crooked fingers");
			alert(end_swipe_y - start_swipe_y);
		}
	} 
	if (start_swipe_y > end_swipe_y){
		if (start_swipe_y - end_swipe_y > y_threshold){
			alert("crooked fingers");
			alert(start_swipe_y - end_swipe_y)
		}
	}       			
	if (start_swipe + threshold< end_swipe ){
		global_target.classList.add('deleted');
		document.getElementById('alert').classList.remove('hidden');
		document.getElementById('alert').innerText = "UNDO DELETE: " + global_target.innerText.replace('-','');
		fu_alert_box();
		//clearInterval(alert_interval);
		//global_target.remove(global_target);
		//this.remove(this);	
		//alert("touchswipe");				
	}
	if (start_swipe > end_swipe + threshold){
		alert('swipe left');
	}
};

var fu_alert_box = function(){

	var alert_interval =setInterval(function(){	 	
		document.getElementById('alert').classList.add('hidden');
		clearInterval(alert_interval);
		for (i=0;i<li_list.length;i++){
			if (li_list[i].classList.contains('deleted')){
				li_list[i].remove(li_list[i]);
			}
		};
	}, 3000);
};

var fu_undo_check = function(target){
	if (target.id === "alert"){
		for (i=0;i<li_list.length;i++){
			if (li_list[i].classList.contains('deleted')){
				li_list[i].classList.remove('deleted');
			}
		};
		document.getElementById('alert').innerText = "UNDO SUCCESSFUL";
	}
};

alert("version: 0.0.57");
