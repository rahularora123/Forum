var loadPost=document.getElementById("loadPost");

var postHeader=[];
postHeader=JSON.parse(localStorage.getItem("postHeader"));

var postDetails=[];
postDetails=JSON.parse(localStorage.getItem("postDetails"));

var passIdToPost;
passIdToPost=JSON.parse(localStorage.getItem("passIdToPost"));

var index2=getPostHeaderIndex(passIdToPost);
var index1=getIndex(passIdToPost);


//Nav Login
var loadPost=document.getElementById("loadPost");
var loginid=document.getElementById("lgid");
var logout=document.getElementById("log");

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






//console.log("index2"+index2);
var commentId=0;
var comments=[];
comments=storeIntoLocalStorage();
var flag=0;
var comment_box=0;
var view_comment=0;
var count=0;
var count1=0;
AddToDom(postHeader[index2],postDetails[index1]);

function AddToDom(obj1,obj2)
{
	var postDiv=document.createElement("div");
	postDiv.id=obj1.id;
	postDiv.classList.add("well");
	postDiv.style.backgroundColor="white";
	loadPost.appendChild(postDiv);
	
	var tm=document.createElement("h5");
	tm.style.float="right";
	tm.innerHTML=obj1.time;
	postDiv.appendChild(tm);
	
	var ttl=document.createElement("p");
	ttl.style.fontSize="31px";
	ttl.innerHTML=obj1.title+" ?<hr>";
	postDiv.appendChild(ttl);
	
	var bdy=document.createElement("p");
	bdy.innerHTML=obj2.body+"<br><hr><br>";
	postDiv.appendChild(bdy);
	
	var appendComment=document.createElement("div");
	appendComment.id="appendComment";
	postDiv.appendChild(appendComment);
	
	AddCommentToDiv();
}
function AddCommentToDiv()
{
	var divPost=document.getElementById("appendComment");
	
	
	var commentDiv=document.createElement("div");
	commentDiv.setAttribute("id","commentDiv");
	divPost.appendChild(commentDiv);
	
	for(var i=0;i<comments.length,count!=4;i++)
	{
		if(passIdToPost===comments[i].PostId)
			{
				commentId=comments[i].CommentId;
				//console.log(commentId);
				AddToCommentDom(comments[i],"commentDiv");
				count++;
			}
			else if(i==comments.length-1)
				break;
	}
	count=i;
	
	var viewComment=document.createElement("a");
	viewComment.setAttribute("id","viewComment");
	viewComment.classList.add("fa");
	
	viewComment.innerHTML="&#xf0ab;More Comments...";
	viewComment.style.fontSize="19px";
	viewComment.style.cursor="pointer";
	divPost.appendChild(viewComment);
	
	viewComment.addEventListener("click",function(event){
		if(view_comment==0){
			viewComment.innerHTML="Hide Comments...";
			createComment();
			view_comment=1;
		}
		else if(view_comment==1 && viewComment.innerHTML==="Hide Comments..." &&comment_box==0)
		{
			viewComment.innerHTML="&#xf0ab;More Comments...";
			for(var i=8;i<commentDiv.childNodes.length;i++)
			{
				//console.log("comment"+commentDiv.childNodes[8]);
			commentDiv.removeChild(commentDiv.childNodes[8]);
			commentDiv.removeChild(commentDiv.childNodes[8]);
			}
			//addComment.parentNode.removeChild(addComment);
			view_comment=0;
		}
	});
	newLine(divPost);
	newLine(divPost);
	var addComment=document.createElement("button");
	addComment.classList.add("btn");
	addComment.classList.add("btn-default");
	addComment.setAttribute("id","addComment");
	addComment.innerHTML="Add Comment";
	divPost.appendChild(addComment);
		
		
	addComment.addEventListener("click",function(event){
		if(comment_box==0){
		flag=0;
		hideAllBtn();
		createPostComment(-1);
		comment_box=1;
		}
		});
}

function createComment()
{
	/*var divPost=document.getElementById("appendComment");
	
	var commentDiv=document.createElement("div");
	commentDiv.setAttribute("id","commentDiv");
	divPost.appendChild(commentDiv);*/
	
	for(var i=count;i<comments.length;i++)
	{
		if(passIdToPost===comments[i].PostId)
			{
				commentId=comments[i].CommentId;
				//console.log(commentId);
				AddToCommentDom(comments[i],"commentDiv");
			}
	}

}
function AddToCommentDom(obj,str)
	{
		var commentDiv=document.getElementById(str);
		newLine(commentDiv);
		var createNewDiv=document.createElement("div");
		createNewDiv.classList.add("well");
		createNewDiv.setAttribute("id",commentId);

		var commentValue=document.createElement("label");
		commentValue.innerHTML=obj.value;
		createNewDiv.appendChild(commentValue);
		
		newLine(createNewDiv);
		
		var cEdit=document.createElement("a");
		cEdit.setAttribute("id","cEdit");
		cEdit.innerHTML="Edit";
		cEdit.style.cursor="pointer";
		createNewDiv.appendChild(cEdit);
			
		cEdit.addEventListener("click",function(event){
			var targetParent=event.target.parentNode;
			var pos=getcommentIndex(targetParent.id);
			console.log(pos);
			flag=1;
			hideAllBtn();
			document.getElementById("addComment").style.visibility="hidden";
			createPostComment(-1);
			document.getElementById("comment").value=comments[pos].value;
			var getIdOfPost=document.getElementById("postbtn");
		getIdOfPost.addEventListener("click",function(event){
		commentValue.innerHTML=document.getElementById("comment").value;
		comments[pos].value=document.getElementById("comment").value;
		deleteDiv();
		visibleAllBtn();
			document.getElementById("addComment").style.visibility="visible";
		storeCommentsIntoLocalStorage(comments);
		cEdit.focus();
		flag=0;
		});
	var getIdOfCancelBtn=document.getElementById("cancelBtn");
	getIdOfCancelBtn.addEventListener("click",function(event){
			visibleAllBtn();
			cEdit.focus();
			document.getElementById("addComment").style.visibility="visible";
			flag=0;
	});
		});
		
		var cDelete=document.createElement("a");
		cDelete.setAttribute("id","cDelete");
		cDelete.innerHTML="Delete";
		cDelete.style.cursor="pointer";
		cDelete.style.marginLeft="28px";
		createNewDiv.appendChild(cDelete);
		
				var reply=document.createElement("a");
		reply.setAttribute("id","reply");
		reply.innerHTML="Reply";
		reply.style.cursor="pointer";
		reply.style.marginLeft="28px";
		createNewDiv.appendChild(reply);
		
		var replyDiv=document.createElement("div");
		//replyDiv.setAttribute("id",(commentId+"reply"));
		
		createNewDiv.appendChild(replyDiv);
		reply.addEventListener("click",function(event){
			var targetParent=event.target.parentNode;
			replyDiv.style.marginTop="-69px";
			replyDiv.setAttribute("id",(targetParent.id+"reply"));
			//var index=getIndex(parseInt(targetParent.id));
			flag=2;
			createPostComment(targetParent.id);
			flag=0;
		});
		
		cDelete.addEventListener("click",function(event){
			var targetParent=event.target.parentNode;
			var pos=getcommentIndex(targetParent.id);
			removeFromCommentArray(pos);
			targetParent.parentNode.removeChild(targetParent);
			storeCommentsIntoLocalStorage(comments);
		});
		//horizontalLine(createNewDiv);
			commentDiv.appendChild(createNewDiv);
			
	
	}
	function removeFromCommentArray(pos)
	{
		comments.splice(pos,1);
		storeCommentsIntoLocalStorage(comments);
	}
	function horizontalLine( postDiv ){
	var horizontalLine=document.createElement("hr");
	horizontalLine.setAttribute("style","color:black");
	postDiv.appendChild(horizontalLine);
	}
	function getcommentIndex(id)
	{
		for(var i=0;i<comments.length;i++)
		{
			if(passIdToPost===comments[i].PostId)
			if(comments[i].CommentId===id)
				return i;
		}
	}
	function visibleAllBtn()
	{
		for(var i=0;i<comments.length;i++)
		{
			var a=document.getElementById(comments[i].CommentId);
			if(a!=null)
			{
			var b=a.getElementsByTagName("a");
			b[0].style.visibility="visible";
			b[1].style.visibility="visible";
			}
		}
	}
	function hideAllBtn()
	{
		for(var i=0;i<comments.length;i++)
		{
			var a=document.getElementById(comments[i].CommentId);
			if(a!=null)
			{
			var b=a.getElementsByTagName("a");
			b[0].style.visibility="hidden";
			b[1].style.visibility="hidden";
			}
		}
	}
	function deleteDiv()
	{
		var childNodes=postCommentDiv.childNodes;
	for(var i=0;childNodes.length>0;)
	{
		postCommentDiv.removeChild(childNodes[i]);
	}
	postCommentDiv.parentNode.removeChild(postCommentDiv);
	}
function createPostComment(setDiv)
	{
		var divPost=document.getElementById("appendComment");
		
	var postCommentDiv=document.createElement("div");
	postCommentDiv.setAttribute("id","postCommentDiv");
	
   
	postCommentDiv.style.marginTop="20px";
	if(flag!=2)
	{
		postCommentDiv.classList.add("well");
		//postCommentDiv.style.backgroundColor="lightgray";
		 //postCommentDiv.style.width="621px";
    //postCommentDiv.style.height="202px";
	divPost.appendChild(postCommentDiv);
	}
	else
	{
		var getDivId=document.getElementById(setDiv+"reply");
		getDivId.appendChild(postCommentDiv);
	}
	newLine(postCommentDiv);
	var comment=document.createElement("textarea");
	comment.setAttribute("id","comment");
	comment.placeholder="Add your comment....";
	comment.setAttribute("type","text");
	comment.style.marginLeft="43px";
	
	if(flag!=2)
	{
		comment.style.height="172px";
	comment.style.width="925px";
	comment.style.fontSize="22px";
	comment.placeholder="Add your comment....";
	postCommentDiv.appendChild(comment);
	}
	else
	{
		comment.placeholder="Add your Reply....";
		var getDivId=document.getElementById(setDiv+"reply");
		getDivId.appendChild(comment);
	}
	comment.focus();
	newLine(postCommentDiv);
	newLine(postCommentDiv);
	
	var cancelBtn=document.createElement("button");
	cancelBtn.setAttribute("id","cancelBtn");
	cancelBtn.classList.add('btn');
	cancelBtn.classList.add('btn-danger');
	cancelBtn.style.marginLeft="44px";
	cancelBtn.innerHTML="Cancel";
	if(flag!=2)
	postCommentDiv.appendChild(cancelBtn);
	else
	{
		var getDivId=document.getElementById(setDiv+"reply");
		getDivId.appendChild(cancelBtn);
	}
	var postbtn=document.createElement("button");
	postbtn.setAttribute("id","postbtn");
	postbtn.classList.add('btn');
	postbtn.style.backgroundColor="#4CAF50";
	postbtn.style.color="white";
	postbtn.style.marginLeft="20px";
	if(flag==0)
	{
	postbtn.innerHTML="Post";
	postCommentDiv.appendChild(postbtn);
	}
	else if(flag==1)
	{
	postbtn.innerHTML="Update";
	postCommentDiv.appendChild(postbtn);
	}
	else if(flag==2)
	{
		postbtn.innerHTML="Reply";
		var getDivId=document.getElementById(setDiv+"reply");
		getDivId.appendChild(postbtn);
	}
	cancelBtn.addEventListener("click",function(event){
		comment_box=0;
		visibleAllBtn();
		deleteDiv();
	});
	if(flag==0)
	{
	postbtn.addEventListener("click",function(event){
	
	if(!comment.value){
		alert("Comment can't be empty");
	}else{
			comment_box=0;
		AddToCommentArray();
		deleteDiv();
		visibleAllBtn();
		storeCommentsIntoLocalStorage(comments);
	}
	});
	}
}

function newLine( postDiv ){
	var newLine=document.createElement("br");
	postDiv.appendChild(newLine);
}

function storeIntoLocalStorage()
{
	if (!localStorage.comments)
{
localStorage.comments = JSON.stringify([]);
}
return JSON.parse(localStorage.comments);
}

function storeCommentsIntoLocalStorage(comments)
	{
		localStorage.comments=JSON.stringify(comments);
	}
	
function AddToCommentArray()
{
		//console.log("index"+index2);
		var obj=new Object();
		obj.PostId=passIdToPost;
		obj.CommentId=chance.guid();
		obj.value=document.getElementById("comment").value;
		comments.push(obj);
		AddToCommentDom(obj,"commentDiv");
		console.log(comments);
		storeCommentsIntoLocalStorage(comments);
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