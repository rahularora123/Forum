var ctrgry=document.getElementById("appendCategory");
var postname=document.getElementById("postname");
var selectedCategory=[];
selectedCategory=JSON.parse(localStorage.getItem("postHeader"));

var ctr;
ctr=JSON.parse(localStorage.getItem("ctrselect"));

var slct=document.createElement("div");
slct.innerHTML=ctr+" Posts";
postname.appendChild(slct);

for(var i=0;i<selectedCategory.length;i++)
{
	if(selectedCategory[i].category===ctr)
	{
		AddToDom(selectedCategory[i].id,selectedCategory[i].title,selectedCategory[i].snippet,selectedCategory[i].time,)
	}
}

function AddToDom(Id,title,snippet,time)
{
	
	var newDiv=document.createElement("div");
	newDiv.classList.add("well");
	newDiv.id=Id;
	ctrgry.appendChild(newDiv);
	
	var tm=document.createElement("h5");
	tm.style.float="right";
	tm.innerHTML=time.slice(5,25);
	newDiv.appendChild(tm);
	
	var ttl=document.createElement("a");
	ttl.href="#";
	ttl.style.fontSize="31px";
	ttl.innerHTML=title;
	newDiv.appendChild(ttl);
	
	ttl.addEventListener("click",function(event){
		ttl.href="selectedPost.html";
		passIdToPost=Id;
		localStorage.passIdToPost = JSON.stringify(passIdToPost);
	});
	
	var p=document.createElement("p");
	p.innerHTML=snippet;
	newDiv.appendChild(p);
	
	var edit=document.createElement("a");
	edit.classList.add("btn");
	edit.classList.add("btn-warning");
	edit.classList.add("fa");
	edit.classList.add("fa-edit");
	edit.innerHTML="&nbspEdit<br>";
	newDiv.appendChild(edit);
	
	var delt=document.createElement("a");
	delt.classList.add("btn");
	delt.classList.add("btn-danger");
	delt.classList.add("fa");
	delt.classList.add("fa-trash");
	delt.style.marginLeft="10px";
	delt.innerHTML="&nbspDelete";
	newDiv.appendChild(delt);
	
	var twt=document.createElement("a");
	twt.id="twitter";
	twt.classList.add("btn");
	twt.classList.add("fa");
	twt.classList.add("fa-twitter");
	twt.style.float="right";
	twt.innerHTML="&nbspShare";
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
}