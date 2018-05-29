var userData=[];
var flag=0;
var f1=0;
userData=getStoredProducts();
var loginDiv=document.getElementById("logindiv");
createBtn();

register.addEventListener("click",function(event){
	hideAddNewProductLink(register);
	hideAddNewProductLink(login);
	createNewForm();
});
login.addEventListener("click",function(event){
	hideAddNewProductLink(register);
	hideAddNewProductLink(login);
	createNewFormLogin();
});
function createNewFormLogin()
{
	var formTag=document.createElement("form");
	formTag.setAttribute("id","Form");
	loginDiv.appendChild(formTag);
	
	var fieldSet=document.createElement("fieldSet");
	fieldSet.style.width="150px";
	formTag.appendChild(fieldSet);
	
	var legend=document.createElement("legend");
	legend.innerHTML="Login";
	fieldSet.appendChild(legend);
	insertBlankLine(fieldSet,1);
	
	var email=document.createTextNode("Email: ");
	fieldSet.appendChild(email);
	
	var emailBox=document.createElement("input");
	emailBox.setAttribute("id","emlBox");
	emailBox.setAttribute("type","text");
	fieldSet.appendChild(emailBox);
	insertBlankLine(fieldSet,2);
	
	var pswd=document.createTextNode("Password: ");
	fieldSet.appendChild(pswd);
	
	var pswdBox=document.createElement("input");
	pswdBox.setAttribute("id","psdBox");
	pswdBox.setAttribute("type","password");
	fieldSet.appendChild(pswdBox);
	insertBlankLine(fieldSet,2);
	
	var checkBox=document.createElement("input");
	checkBox.setAttribute("type","checkbox");
	checkBox.setAttribute("id","checkBox1");
	//checkBox.value=1;
	fieldSet.appendChild(checkBox);
	
	var pswd=document.createTextNode("If You'r Admin");
	fieldSet.appendChild(pswd);
	
	var registerBtn=document.createElement("button");
	//registerBtn.setAttribute("type","submit");
	registerBtn.style.height="20px";
	registerBtn.style.width="70px";
	registerBtn.style.backgroundColor="#46b246";
	registerBtn.style.borderRadius="500px";
	registerBtn.innerHTML="Login";
	fieldSet.appendChild(registerBtn);
	
	registerBtn.addEventListener("click",function(event){
		
		var f=formValidationLogin();
		var a=document.getElementById("checkBox1");
		f1=0;
		if(a.checked===true)
		{
			f1=1;
		}
		if(f==1)
		{
		for(var i=0;i<userData.length;i++)
		{
			if((userData[i].Email==emailBox.value) &&(userData[i].Password==pswdBox.value))
			{
				if(f1==1 &&userData[i].Admin==2)
				{
				userData[i].Admin=2;
				storeSession(i);
				flag=1;	
				}
				else
				{
				storeSession(i);
				flag=1;
				}
			}
		}
		if(flag==0)
		{
		window.alert("Invalid User");
		event.preventDefault();
		}
		else
		{
			formTag.setAttribute("action","new_post.html");
		}
	    //flag=0;
		}
		else
		event.preventDefault();
	});
	insertSpace(fieldSet,2);
	
	var cancelBtn=document.createElement("input");
	cancelBtn.setAttribute("type","submit");
	cancelBtn.style.height="20px";
	cancelBtn.style.width="70px";
	cancelBtn.style.backgroundColor="#46b246";
	cancelBtn.style.borderRadius="500px";
	cancelBtn.value="Cancel";
	fieldSet.appendChild(cancelBtn);
}
function getStoredProducts()
{
	if (!localStorage.userData)
{
// default to empty array
localStorage.userData = JSON.stringify([]);
}

return JSON.parse(localStorage.userData);
}

function createBtn()
{
	var newDiv=document.createElement("div");
	newDiv.setAttribute("id","newDiv");
	loginDiv.appendChild(newDiv);
	var register=document.createElement("button");
	register.innerHTML="Register";
	register.style.height="40px";
	register.style.width="300px";
	register.style.backgroundColor="#46b246";
	register.style.color="white";
	register.style.borderRadius="500px";
	register.setAttribute("id","register");
	newDiv.appendChild(register);
	insertBlankLine(loginDiv,1);
	var login=document.createElement("button");
	login.innerHTML="Login";
	login.setAttribute("id","login");
	login.style.color="white";
	login.style.height="40px";
	login.style.width="300px";
	login.style.backgroundColor="#46b246";
	login.style.borderRadius="500px";
	loginDiv.appendChild(login);
}
function hideAddNewProductLink(div)
{
	div.setAttribute("style","visibility:hidden");
}
function createNewForm()
{
	var formTag=document.createElement("form");
	formTag.setAttribute("id","Form");
	loginDiv.appendChild(formTag);
	
	var fieldSet=document.createElement("fieldSet");
	fieldSet.style.width="150px";
	formTag.appendChild(fieldSet);
	
	var legend=document.createElement("legend");
	legend.innerHTML="Register";
	fieldSet.appendChild(legend);
	insertBlankLine(fieldSet,1);
	
	var name=document.createTextNode("Name: ");
	fieldSet.appendChild(name);
	
	var nameBox=document.createElement("input");
	nameBox.setAttribute("id","nameBox");
	nameBox.setAttribute("type","text");
	fieldSet.appendChild(nameBox);
	insertBlankLine(fieldSet,2);
	
	var email=document.createTextNode("Email: ");
	fieldSet.appendChild(email);
	
	var emailBox=document.createElement("input");
	emailBox.setAttribute("type","email");
	emailBox.setAttribute("id","emailBox");
	fieldSet.appendChild(emailBox);
	insertBlankLine(fieldSet,2);
	
	var mobileNo=document.createTextNode("Mobile No.: ");
	fieldSet.appendChild(mobileNo);
	
	var mobileNoBox=document.createElement("input");
	mobileNoBox.setAttribute("type","number");
	mobileNoBox.setAttribute("id","mobileNoBox");
	fieldSet.appendChild(mobileNoBox);
	insertBlankLine(fieldSet,2);
	
	var pswd=document.createTextNode("Password: ");
	fieldSet.appendChild(pswd);
	
	var pswdBox=document.createElement("input");
	pswdBox.setAttribute("type","password");
	pswdBox.setAttribute("id","pswdBox");
	fieldSet.appendChild(pswdBox);
	insertBlankLine(fieldSet,2);
	
	var cfrmPswd=document.createTextNode("Confirm Password: ");
	fieldSet.appendChild(cfrmPswd);
	
	var cfrmPswdBox=document.createElement("input");
	cfrmPswdBox.setAttribute("type","password");
	cfrmPswdBox.setAttribute("id","cfrmPswdBox");
	fieldSet.appendChild(cfrmPswdBox);
	
	insertBlankLine(fieldSet,2);
	
	var checkBox=document.createElement("input");
	checkBox.setAttribute("type","checkbox");
	checkBox.setAttribute("id","checkBox");
	//checkBox.value=1;
	fieldSet.appendChild(checkBox);
	
	var pswd=document.createTextNode("If You'r Admin");
	fieldSet.appendChild(pswd);
	insertBlankLine(fieldSet,2);
	
	var registerBtn=document.createElement("button");
	registerBtn.style.height="20px";
	registerBtn.style.width="70px";
	registerBtn.style.backgroundColor="#46b246";
	registerBtn.style.borderRadius="500px";
	//registerBtn.setAttribute("type","");
	registerBtn.innerHTML="Register";
	fieldSet.appendChild(registerBtn);
	
	registerBtn.addEventListener("click",function(event){
		var flag=formValidation();
		var admin=document.getElementById("checkBox");
		if(admin.checked===true)
		{
			f1=0;
		var a=prompt("If You'r Admin Enter previous Password");
		if(a==="yAnup")
		{
			f1=1;
			flag=1;
		}
		else
			flag=0;
		}
		if(flag==1)
		{
		var obj=new Object();
		if(f1==1)
		obj.Admin=2;
		else
		obj.Admin=0;
		obj.Name=nameBox.value;
		obj.Email=emailBox.value;
		obj.Mobile=mobileNoBox.value;
		obj.Password=pswdBox.value;
		userData.push(obj);
		storeProducts(userData);
		storeSession(userData.length-1);
		formTag.setAttribute("action","new_post.html");
		}
		else
		{
			event.preventDefault();
		}
		
	});
	insertSpace(fieldSet,2);
	
	var cancelBtn=document.createElement("input");
	cancelBtn.setAttribute("type","submit");
	cancelBtn.style.height="20px";
	cancelBtn.style.width="70px";
	cancelBtn.style.backgroundColor="#46b246";
	cancelBtn.style.borderRadius="500px";
	cancelBtn.value="Cancel";
	fieldSet.appendChild(cancelBtn);
	
	
}
function formValidationLogin()
{
	var flag=0;
	var re=/\S+@\S+\.\S+/;
	var a=document.getElementById("emlBox");
	if(!re.test(a.value))
	{
		window.alert("Enter The Correct Email");
		return 0;
	}
	else
		flag=1;
	var reg= /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	var b=document.getElementById("psdBox");
	if(!reg.test(b.value))
	{
		window.alert("Enter 1 small and 1 capital character and 1 digit and min length 8,max length 16");
		return 0;
	}
	else
		flag=1;
	return flag;
	
}
function formValidation()
{ 
    var flag=0;
	var nm=document.getElementById("nameBox");
	if(nm.value=="")
	{
		window.alert("Enter Name");
		return 0;
	}
	else
		flag=1;
	var re=/\S+@\S+\.\S+/;
	var eml=document.getElementById("emailBox");
	//console.log(userData.length);
	for(var i=0;i<userData.length;i++)
	{
		if(userData[i].Email==eml.value)
		{
			window.alert("User Already have Account");
			return 0;
		}
	}
	if(!re.test(eml.value))
	{
		window.alert("Enter The Correct Email");
		return 0;
	}
	else
		flag=1;
	var mbl=document.getElementById("mobileNoBox");
	if((mbl.value.length>10) ||(mbl.value.length<10))
	{
		window.alert("Enter the Correct Mobile Number");
		return 0;
	}
	else
		flag=1;
	var reg= /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	var psd=document.getElementById("pswdBox");
	if(!reg.test(psd.value))
	{
	
		window.alert("Enter 1 small and 1 capital character and 1 digit and min length 8,max length 16");
		return 0;
	}
	else
		flag=1;
	var cpsd=document.getElementById("cfrmPswdBox");
	if(psd.value!=cpsd.value)
	{
		window.alert("Your Password didn't match");
		return 0;
	}
	else
		flag=1
	
return flag;
}

function storeSession(index)
{
	sessionStorage.user=JSON.stringify(userData[index]);
}
function storeProducts(userData)
		{
			localStorage.userData = JSON.stringify(userData);
		}
function insertSpace(targetElement,numberOfBreak)
{
	for(var i=0;i<numberOfBreak;i++)
	{
		var br=document.createElement("label");
		br.innerHTML=" ";
		targetElement.appendChild(br);
	}
}
function insertBlankLine(targetElement,numberOfBreak)
{
	for(var i=0;i<numberOfBreak;i++)
	{
		var br=document.createElement("BR");
		targetElement.appendChild(br);
	}
}
