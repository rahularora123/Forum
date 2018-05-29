var http=require('http');
var url=require('url');
var fs=require('fs');

function readAndServe(path,contentType,response)
{
	fs.readFile(path,function(error,data){
		if(error)
		{
			throw error;
		}
		response.writeHead(200,{'content-type':contentType});
		response.write(data);
		response.end();
	});
}
function createTask(arr,obj,callback)
{
	readTasks(function(posts){
		posts.push(obj);
		writeTasks(posts,callback);
	});
}
function writeTasks(posts,callback)
{
	var tasksJSON=JSON.stringify(posts);
	fs.writeFile('posts',tasksJSON,function(error){
		if(error)
			throw error;
		callback();
	});
}
function readJSONBody(request,callback)
{
	var body='';
	request.on('data',function(chunk){
		body+=chunk;
	});
	request.on('end',function(){
		var data=JSON.parse(body);
		callback(data);
	});
}
function readTasks(str,callback)
{
	fs.readFile(str,function(error,contents){
		if(error)
		{
			throw error;
		}
		var posts;
		if(contents.length===0)
		{
			posts=[];
		}
		else
		{
			posts=JSON.parse(contents);
		}
		callback(posts);
	});
}

http.createServer(function(request,response){
	
	var pathname= url.parse(request.url).pathname;
	if(request.method==="GET")
	{
	if(pathname==="/" ||pathname==="/new_post.html")
	{
		readAndServe('new_post.html','text/html',response);
	}
	else if (pathname === "/main_page.js") {
      readAndServe('.' + pathname, 'text/javascript', response);
    }
	else if (pathname === "/selectedPost.html") {
      readAndServe('.' + pathname, 'text/html', response);
    }
	else if (pathname === "/selectedPost.js") {
      readAndServe('.' + pathname, 'text/javascript', response);
    }
	else if (pathname === "/login.html") {
      readAndServe('.' + pathname, 'text/html', response);
    }
	else if (pathname === "/login.js") {
      readAndServe('.' + pathname, 'text/javascript', response);
    }
	else if (pathname === "/category.html") {
       readAndServe('category.html', 'text/html', response);
    }
	else if (pathname === "/category.js") {
      readAndServe('.' + pathname, 'text/javascript', response);
    }
	else if(pathname==="/posts")
	{
		//console.log("dfghj");
		var str=pathname.slice(1,pathname.length);
		//console.log(str);
		readTasks(str,function(posts){
			response.writeHead(200,{'content-type':'application/json'});
			response.write(JSON.stringify(posts));
			response.end();
		});
	}
	else
	{
		response.end();
	}
	}
	else if(request.method==="POST")
	{
		if(pathname==="/posts")
		{
			var str=pathname.slice(1,pathname.length);
			
			readJSONBody(request,function(obj){
				createTask(str,obj,function(){
					response.end();
				});
			});
		}
		else
		{
			response.end();
		}
	}
	else
	{
		response.end();
	}
}).listen(8000,'127.0.0.1');
console.log('running on 127.0.0.1:8000');