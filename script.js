var taskInput=document.getElementById("new-task");//Add nova task.
var addButton=document.getElementsByTagName("button")[0];//primeiro botão
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul de incompletas
var completedTasksHolder=document.getElementById("completed-tasks");//tarefas ok


//Lista de tarefas
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//input (checkbox)
	var checkBox=document.createElement("input");
	//label
	var label=document.createElement("label");
	//texto input
	var editInput=document.createElement("input");
	//botão editar
	var editButton=document.createElement("button");

	//botão deletar
	var deleteButton=document.createElement("button");

	label.innerText=taskString;

	
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";




	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Adiciona Task...");
	//Cria uma nova lista:
	var listItem=createNewTaskElement(taskInput.value);

	
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//Edita tarefa existente

var editTask=function(){
console.log("Edita Task...");
console.log("Mudar 'edita' to 'salva'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		
		if(containsClass){
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}
		listItem.classList.toggle("editMode");
}




//Deleta task.
var deleteTask=function(){
		console.log("Deleta Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Remove item parente
		ul.removeChild(listItem);

}


//Marca tarefa como completa
var taskCompleted=function(){
		console.log("Tarefa Completa...");
	
	
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		console.log("Tarefa Incompleta...");
//Marca task como imcompleta
	
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}



//Clique hanlder para addTask
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");

	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");


		
			editButton.onclick=editTask;
			
			deleteButton.onclick=deleteTask;
			
			checkBox.onchange=checkBoxEventHandler;
}


	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




//ciclo de tarefas completas
	for (var i=0; i<completedTasksHolder.children.length;i++){
	
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}




