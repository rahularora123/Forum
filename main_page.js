var new_div;

//fetch division from html page
var new_post=document.getElementById("new_post");
var upper_div=document.getElementById("upper_div");
var appendPost=document.getElementById("appendPost");
var container=document.getElementById("main_container");
var loginid=document.getElementById("lgid");
var logout=document.getElementById("log");
var postname=document.getElementById("postname");
var clr=document.getElementById("clr");
//My Activity


var activity=document.getElementById("activity");
if(sessionStorage.user)
{
activity.innerHTML="My Activity";
activity.addEventListener("click",function(event){
	appendPost.innerHTML="";
	postname.innerHTML="My Activity";
	clr.style.backgroundColor="#E5FFCC";
	appendActivity();
	event.preventDefault();
});
}

function appendActivity()
{
	for (var i=0;i<postHeader.length;i++)
	{
		var id=postHeader[i].id;
		var title=postHeader[i].title;
		var snippet=postHeader[i].snippet;
		var time=postHeader[i].time;
		var author=postHeader[i].author;
		var like=postHeader[i].like;
		var category=postHeader[i].category;
		if(author === user.Name)
		{
		AddToDom(id,title,snippet,time,author,like,category);
		}
		
	}
}






var like_flag=0;
var flag=0;

//main search button id
var mainSearch=document.getElementById("mainSearch");
var searchedValue=document.getElementById("searchedValue");

//sort according to date
var latest=document.getElementById("latest");
var oldest=document.getElementById("oldest");

latest.addEventListener("click",function(event){
	appendPost.innerHTML="";
	postname.innerHTML="Latest Posts";
	appendPosts();
});

oldest.addEventListener("click",function(event){
	appendPost.innerHTML="";
	postname.innerHTML="Oldest Posts";
	clr.style.backgroundColor="#FFFFCC";
	for (var i=postHeader.length-1;i>=0;i--)
	{
		var id=postHeader[i].id;
		var title=postHeader[i].title;
		var snippet=postHeader[i].snippet;
		var time=postHeader[i].time;
		var author=postHeader[i].author;
		var like=postHeader[i].like;
		var category=postHeader[i].category;
		AddToDom(id,title,snippet,time,author,like,category);
	}
});


var user=[];
if(sessionStorage.user)
{
user=JSON.parse(sessionStorage.getItem("user"));
flag=1;
}
if(flag==1)
{
	loginid.innerHTML="Welcome "+user.Name;
	logout.innerHTML="Logout";
}
logout.addEventListener("click",function(event){
	flag=0;
	sessionStorage.clear();
});

var postHeader=[];
//GETRequest();
if(!localStorage.postHeader)
{
	localStorage.postHeader=JSON.stringify([]);
}
postHeader=JSON.parse(localStorage.getItem("postHeader"));


/*function GETRequest()
{
	var xhttp=new XMLHttpRequest();
	xhttp.addEventListener('load',function()
	{
		if(this.readyState==4 && this.status==200)
		{
			postHeader=JSON.parse(this.responseText);
			console.log(postHeader);

*/
			
var postDetails=[];
postDetails=JSON.parse(localStorage.getItem("postDetails"));

var passIdToPost;

appendPosts();



new_post.addEventListener("click",function(event){
	if(flag==0)
		window.location.assign("login.html");
	else
	{
  upper_div.innerHTML='';
  new_div=document.createElement("div");
  new_div.setAttribute("id","new_div");
  new_div.classList.add('overlayDiv'); 
  upper_div.appendChild(new_div);
  createUserForm("");
	}
});

function newLine( postDiv ){
	var newLine=document.createElement("br");
	postDiv.appendChild(newLine);
}


function createUserForm(postIndexId)
{
	if(postIndexId)
	{var postIndex=getPostHeaderIndex(postIndexId);}
	else
	{var postIndex=-1;}
  var form_container=document.createElement("div");
  form_container.id="form_container";
  form_container.classList.add('centered');
  new_div.appendChild(form_container);

  var title=document.createElement("label");
  title.innerHTML="Title : ";
  form_container.appendChild(title);
  var title_value=document.createElement("input");
  title_value.id="Title";
  if(postIndex!=-1)
  {title_value.value=postHeader[postIndex].title;
  }
  else{title_value.placeholder="Enter Title";
  }title_value.style.width="100%";
  form_container.appendChild(title_value);
  newLine(form_container);
  
   var snpt=document.createElement("label");
  snpt.innerHTML="Snippet : ";
  form_container.appendChild(snpt);
  var snpt_value=document.createElement("input");
  snpt_value.id="Snippet";
  if(postIndex!=-1)
  {snpt_value.value=postHeader[postIndex].snippet;
  }else{
  snpt_value.placeholder="Enter Snippet";
  }snpt_value.style.width="100%";
  form_container.appendChild(snpt_value);
  newLine(form_container);
  
  var ctglabel=document.createElement("label");
  ctglabel.innerHTML="Catogery : ";
  form_container.appendChild(ctglabel);
   newLine(form_container);
  var category=document.createElement("input");
  category.id="category";
  category.style.width="603px";
  if(postIndex!=-1)
  {category.value=postHeader[postIndex].category;
  }else
  {category.placeholder="Enter Category like: complaint,suggestion,compliment";
  }form_container.appendChild(category);
  newLine(form_container);
  newLine(form_container);
  var body=document.createElement("label");
  body.innerHTML="Body : ";
  form_container.appendChild(body);
  var form_div=document.createElement("textarea");
  form_div.id="Body";
  form_div.style.width="557px";
  form_div.style.height="69px";
  if(postIndex!=-1)
  {form_div.value=postDetails[getIndex(postIndexId)].body;
  }
  form_container.appendChild(form_div);
	newLine(form_container);
	
  var cancel_btn=document.createElement("button");
  cancel_btn.classList.add('btn');
  cancel_btn.classList.add('btn-danger');
  cancel_btn.innerHTML="Cancel";
  form_container.appendChild(cancel_btn);
  
  cancel_btn.addEventListener("click",function(event){
	new_div.style.display="none";
});
  
  var submit_btn=document.createElement("button");
  submit_btn.classList.add('btn');
  submit_btn.classList.add('btn-primary');
  submit_btn.innerHTML="Submit";
  if(postIndex!=-1)
  {	submit_btn.innerHTML="Edit";
  }
  submit_btn.style.float="right";
  form_container.appendChild(submit_btn);
  
  submit_btn.addEventListener("click",function(event){
		if(postIndex!=-1)
		{removePostFromDom(postIndexId);}
		addToArray(postIndex);
		addToDetailArray(postIndexId);
		new_div.style.display="none";
  });
}
function removePostFromDom(postIndexId)
{
	var postNode=document.getElementById(postIndexId);
	postNode.parentNode.removeChild(postNode);
}
function addToDetailArray(postIndex)
{
	if(postIndex!="")
	{var obj=postDetails[getIndex(postIndex)];}
	else
	{var obj=new Object();}
	obj.id=chance.guid();
	obj.Hid=postHeader[postHeader.length-1].id;
	obj.body=document.getElementById("Body").value;
	if(postIndex!="")
	{
		postDetails.splice(postIndex,1);
	}
	postDetails.push(obj);
	localStorage.postDetails = JSON.stringify(postDetails);
}
function addToArray(postIndex)
{
	if(postIndex!=-1)
	{
		var obj=postHeader[postIndex];	
	}
	else
	{var obj=new Object();}
	obj.id=chance.guid();
	obj.title=document.getElementById("Title").value;
	obj.snippet=document.getElementById("Snippet").value;
	obj.category=document.getElementById("category").value;
	addCategoryToDom(obj.category);
	if(postIndex==-1)
	{obj.like=0;
	obj.author=user.Name;}
	var d = new Date();
	obj.time=d.toUTCString();
	if(postIndex!=-1)
	{
		postHeader.splice(postIndex,1);
	}
	postHeader.push(obj);
	addPostToDom(obj);
	//POSTRequest();
	localStorage.postHeader = JSON.stringify(postHeader);
}
/*function POSTRequest()
{
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if(this.readyState===4 && this.status===200)
		{
			console.log(this.responseText);
		}
	};
	xhttp.open('POST','http://127.0.0.1:8000/posts',true);
	xhttp.send(JSON.stringify(postHeader[postHeader.length-1]));
}*/
function addPostToDom(obj)
{
		var id=obj.id;
		var title=obj.title;
		var snippet=obj.snippet;
		var time=obj.time;
		var author=obj.author;
		var like=obj.like;
		var category=obj.category;
	 AddToDom(id,title,snippet,time,author,like,category);
}
function appendPosts()
{
	for (var i=0;i<postHeader.length;i++)
	{
		var id=postHeader[i].id;
		var title=postHeader[i].title;
		var snippet=postHeader[i].snippet;
		var time=postHeader[i].time;
		var author=postHeader[i].author;
		var like=postHeader[i].like;
		var category=postHeader[i].category;
		AddToDom(id,title,snippet,time,author,like,category);
	}
}
function AddToDom(Id,title,snippet,time,author,like,category)
{
	
	var newDiv=document.createElement("div");
	newDiv.classList.add("well");
	//newDiv.style.backgroundColor="";
	newDiv.id=Id;
//	appendPost.appendChild(newDiv);
	
	appendPost.prepend(newDiv);
	
	var tm=document.createElement("h5");
	tm.style.float="right";
	tm.innerHTML=time.slice(5,25);
	newDiv.appendChild(tm);
	
	var d = new Date();
	//console.log("date"+d.getDate());
	var dt=new Date(time).getDate();
	if((d.getDate()-dt)<1)
	{
	var newimg=document.createElement("img");
	newimg.src="new.gif";
	newimg.float="right";
	newimg.classList.add("newim");
	newDiv.appendChild(newimg);
	}
	
	var categoryDis=document.createElement("h5");
	categoryDis.innerHTML="&#9658; "+category+"<br>";
	categoryDis.style.color="green";
	newDiv.appendChild(categoryDis);
	
	var ttl=document.createElement("a");
	ttl.href="#";
	ttl.style.fontSize="31px";
	ttl.innerHTML="<b>"+title;
	newDiv.appendChild(ttl);
	
	ttl.addEventListener("click",function(event){
		ttl.href="selectedPost.html";
		passIdToPost=Id;
		localStorage.passIdToPost = JSON.stringify(passIdToPost);
	});
	
	var p=document.createElement("p");
	p.innerHTML=snippet;
	newDiv.appendChild(p);
	
	if(author===user.Name)
	{
	var edit=document.createElement("a");
	edit.classList.add("btn");
	edit.classList.add("btn-warning");
	edit.classList.add("fa");
	edit.classList.add("fa-edit");
	edit.innerHTML="&nbspEdit<br>";
	newDiv.appendChild(edit);
	edit.addEventListener("click",function(event){
		var postToEdit=event.target.parentNode.id;
		upper_div.innerHTML='';
  new_div=document.createElement("div");
  new_div.setAttribute("id","new_div");
  new_div.classList.add('overlayDiv'); 
  upper_div.appendChild(new_div);
		createUserForm(postToEdit);
	});
	
	
	var delt=document.createElement("a");
	delt.classList.add("btn");
	delt.classList.add("btn-danger");
	delt.classList.add("fa");
	delt.classList.add("fa-trash");
	delt.style.marginLeft="10px";
	delt.innerHTML="&nbspDelete";
	newDiv.appendChild(delt);
	delt.addEventListener("click",function(event){
		var postToDel=event.target.parentNode.id;
		removePostFromDom(postToDel)
		
		postHeader.splice(getPostHeaderIndex(postToDel),1);
		postDetails.splice(getIndex(postToDel),1);
		
		localStorage.postDetails = JSON.stringify(postDetails);
		localStorage.postHeader = JSON.stringify(postHeader);
	});
	
	}
	var authr=document.createElement("a");
	authr.id="authr";
	authr.classList.add("btn");
	authr.classList.add("fa");
	authr.style.float="right";
	authr.style.marginTop="-13px";
	authr.innerHTML="&nbsp;By "+author+"&nbsp;";
	newDiv.appendChild(authr);
	
	var twt=document.createElement("a");
	twt.id="twitter";
	twt.classList.add("btn");
	twt.classList.add("fa");
	twt.style.marginTop="-13px";
	twt.classList.add("fa-twitter");
	twt.style.float="right";
	twt.innerHTML="&nbsp";
	newDiv.appendChild(twt);
	
	twt.addEventListener("click",function(event){
	var targetParent=event.target.parentNode;
	var index=getIndex(targetParent.id);
	var str="";
	var i=getPostHeaderIndex(targetParent.id);
	str="%28"+postHeader[i].title+"%29%20";
	str+=postDetails[index].body;
	twt.href="https://twitter.com/intent/tweet?text="+str;
	});
	var whatsapp=document.createElement("a");
	whatsapp.id="whatsapp";
	whatsapp.classList.add("btn");
	whatsapp.classList.add("fa");
	whatsapp.style.marginTop="-13px";
	whatsapp.classList.add("fa-whatsapp");
	whatsapp.style.float="right";
	whatsapp.innerHTML="&nbsp";
	newDiv.appendChild(whatsapp);
	
	whatsapp.addEventListener("click",function(event){
	var targetParent=event.target.parentNode;
	var index=getIndex(targetParent.id);
	var str="";
	var i=getPostHeaderIndex(targetParent.id);
	str="%28"+postHeader[i].title+"%29%20";
	str+=postDetails[index].body;
	whatsapp.target="_blank";
	whatsapp.href="https://api.whatsapp.com/send?text="+str;
	});
	
	var facebook=document.createElement("a");
	facebook.id="facebook";
	facebook.classList.add("btn");
	facebook.classList.add("fa");
	facebook.style.marginTop="-13px";
	facebook.classList.add("fa-facebook");
	facebook.style.float="right";
	facebook.innerHTML="&nbsp";
	newDiv.appendChild(facebook);
	
	facebook.addEventListener("click",function(event){
	var targetParent=event.target.parentNode;
	var index=getIndex(targetParent.id);
	var str="";
	var i=getPostHeaderIndex(targetParent.id);
	str="%28"+postHeader[i].title+"%29%20";
	str+=postDetails[index].body;
	facebook.href="http://www.facebook.com/sharer.php";
	});
	//<a href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">Share via Whatsapp</a>
	/*
	<a target=”_blank” href=”http://www.facebook.com/sharer.php>Share on Facebook</a>
	*/
	//Like and DisLike
	
	/*console.log(like);*/
	var Like=document.createElement("button");
	Like.id="Like";
	Like.innerHTML="Like: "+like;
	newDiv.appendChild(Like);
	
	var dislike=document.createElement("button");
	dislike.id="dislike";
	dislike.innerHTML="Dislike";
	newDiv.appendChild(dislike);
	
	
	
	Like.addEventListener("click",function(event){
	if(like_flag==0)
	{	
		like_flag=1;
		var targetParent=event.target.parentNode;
		var index=getPostHeaderIndex(targetParent.id);
		postHeader[index].like=parseInt(postHeader[index].like)+1;
		Like.innerHTML="Like: "+postHeader[index].like;
		localStorage.postHeader = JSON.stringify(postHeader);
	}});
	
	dislike.addEventListener("click",function(event){
	if(like_flag==1)
	{	
		like_flag=0;
		var targetParent=event.target.parentNode;
		var index=getPostHeaderIndex(targetParent.id);
		postHeader[index].like=parseInt(postHeader[index].like)-1;
		Like.innerHTML="Like: "+postHeader[index].like;
		localStorage.postHeader = JSON.stringify(postHeader);
	}});
	
}
function getPostHeaderIndex(id)
{
	for(var i=0;i<postHeader.length;i++)
	{
		if(postHeader[i].id===id)
			return i;
	}
}
function getIndex(id)
{
	for(var i=0;i<postDetails.length;i++)
	{
		if(postDetails[i].Hid===id)
			return i;
	}
}






//search posts using post title

mainSearch.addEventListener("click",function(event){
	appendPost.innerHTML="";
	
	for(var i=0;i<postHeader.length;i++)
	{
		if(postHeader[i].category.toLowerCase().includes(searchedValue.value.toLowerCase().trim())||postHeader[i].title.toLowerCase().includes(searchedValue.value.toLowerCase().trim()))
		{
		var id=postHeader[i].id;
		var title=postHeader[i].title;
		var snippet=postHeader[i].snippet;
		var time=postHeader[i].time;
		var author=postHeader[i].author;
		var like=postHeader[i].like;
		var category=postHeader[i].category;
		AddToDom(id,title,snippet,time,author,like,category);
		}
	}
	event.preventDefault();
});








// category

var cat=document.getElementById("ctegory");

var ct=[];
var k=0;
for(var i=0;i<postHeader.length;i++)
{
	if(!searchcategory(postHeader[i].category))
	{
		ct[k++]=postHeader[i].category;
		addCategoryToDom(ct[k-1]);
	}
}


function addCategoryToDom(val)
{
	var li=document.createElement("li");
	li.id="list";
	cat.appendChild(li);
	
	var a=document.createElement("a");
	a.href="#";
	a.id=chance.guid();
	a.innerHTML=val;
	li.appendChild(a);
	
	a.addEventListener("click",function(event){
		var targetParent=event.target.innerHTML;
		appendPost.innerHTML="";
		for(var i=0;i<postHeader.length;i++)
		{
		if(postHeader[i].category.toLowerCase().includes(targetParent.toLowerCase().trim()))
		{
		var id=postHeader[i].id;
		var title=postHeader[i].title;
		var snippet=postHeader[i].snippet;
		var time=postHeader[i].time;
		var author=postHeader[i].author;
		var like=postHeader[i].like;
		var category=postHeader[i].category;
		AddToDom(id,title,snippet,time,author,like,category);
		}
	}
	});
}

function searchcategory(val)
{
	for(var i=0;i<ct.length;i++)
	{
		if(ct[i].toLowerCase().trim()===val.toLowerCase().trim())
		{
			return 1;
		}
	}
	return 0;
}


	/*	}
		
	});
	xhttp.open("GET","http://127.0.0.1:8000/posts",true);
	xhttp.send();
}*/