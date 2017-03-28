var comments={
	"i-like-bugs-4":[
		[],
		["That's red!","That bug is very red!", "Look at its tail!"],
		["Look!", "That bug blends in!", "It is upsidedown."],
		["Black and purple!","That bug is very pretty!","That bug blends in!"],
		["Two wings","It's on a leaf!","Do you see its green eyes?"],
		["Orange!","That bug is so orange!","It has 2 spots!"],
		["It's shiny!","That bug is big!","It is both green and yellow!"],
		["Where is it? ","I almost missed that bug!","It really blends in!"],
		["So cute!","That's a lady bug!","I has 1,2,3,4,5 spots!"],
		["Zig Zags!","Look at those stripes!","its like a bee!"],
		["Two bugs","There are TWO bugs!","They are next to a flower!"],
		["Cool","That's a dragonfly!","It is so big!"],
		["Eww","That looks like a spider","It has 1,2,3,4,5,6 legs"],
		["It's hiding","Where is the bug?!","It's hidden with the flower!"],
		["Oh!  Pretty!","Those wings are so shiny!","Those eyes are so big!"],
		["That is big","That bug looks like gold","See how shiny it looks"],
		["What?","That bug is curled up!","It has two feet!"],
		["Wow!","Wow thats alot of bugs!","How many bugs is that? Its 34 bugs!"],
		["Gross!!!!!","It's in his TEETH!","Ew! Bugs don't taste good."]
	]
}

function go(comments){
	var ww=$(window).innerWidth(),
		wh=$(window).innerHeight(),
		iw=ww-10,
		ih=wh-$("#controls").height()-20;
		
	$('iframe').css({
		width: iw,
		height: ih,
	});
	
	if(location.hash){
		$('iframe').attr('src', location.hash.slice(1));
	}
	
	function updatecomments(current){
		var re=/^\/\d+\/\d+\/\d+\/([^\/]+)\/(?:(\d+)\/)?(?:\?.*)?$/,
			m=current.match(re);
		if(!m || !m[2]){
			$("#controls").show();
			$("#comments").hide();
			return;
		}else{
			$("#controls").hide();
			$("#comments").show();
		}
		
		var slug=m[1],
			page=m[2];
		
		if(!page){
			page="1";
		}
		page=parseInt(page);
		$('#comments').empty();
		var cset= +$("input[name=set]:checked").val();
		if(slug in comments){
			var pagecom=comments[slug].elements[page-1]["Comment "+cset];
			$('#comments').append(pagecom);
		}
	}
	
	var url="";
	setInterval(function(){
		var current=$('iframe').get(0).contentWindow.location.pathname;
		if(current != url){
			console.log('change', current);
			
			updatecomments(current);
			location.hash=current;
			url=current;
		}
	}, 200);
}

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1_35lz7v1IfT5FzBWv_-Hw1cyMuicFPuJBZLFgZ0wCR4/pubhtmll';

$(function (){
	Tabletop.init( {key: public_spreadsheet_url,
		callback: go,
		simpleSheet: false})
});