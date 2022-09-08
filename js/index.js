

var taskArr = [];

const addTask = document.querySelector('.addTask');
const TaskPopup = document.querySelector('.addTaskModal');
const ItemPopup = document.querySelector('.addItemModal');
const header = document.querySelector('header');
const wrapper = document.querySelector('.wrapper');
const taskList = document.querySelector('.tasks');

var tasks=null;
var selectedTask=null;
window.addEventListener('load',()=>{
    const storedTasks = JSON.parse(localStorage.getItem('Tasks'));
    if(storedTasks!==null && storedTasks.length!==0){
        taskArr=storedTasks;
        showTaskMenu();
        updateTasks();
        checkBoxes();
    }
    else{
        showEmptyList();  
    }
})



function showTaskMenu(){
    taskList.classList.add('active');
}

function showEmptyList(){
    taskList.classList.remove('active');  
}




function updateLocalStorage(){
    localStorage.setItem('Tasks',JSON.stringify(taskArr));
}

addTask.addEventListener('click', () => {
    TaskPopup.classList.add('active');
    // header.classList.add('blur');
    // wrapper.classList.add('blur');
})

function closePopup() {
    TaskPopup.classList.remove('active');
    // header.classList.remove('blur');
    // wrapper.classList.remove('blur');
}

function addTaskFunction() {
    const taskTitle = document.querySelector('.taskName').value;
    const obj = {
        taskName: taskTitle[0].toUpperCase()+taskTitle.slice(1,taskTitle.length),
        itemsArr: [],
    }

    taskArr.push(obj);
    closePopup();
    updateTasks();
    checkBoxes();
    document.querySelector('.taskName').value="";
    window.location.reload();
}

// console.log(taskArr.length);



function updateTasks() {
    updateLocalStorage();

    taskList.innerHTML=taskArr.map((ele, index) => {
        return(
        `
        <div class="task" id=${index}>
        <div class="taskHeader">
            <h1 class="taskName">${ele.taskName}</h1>
        </div>
        <div class="taskBody">
            <ul class="task-items">
                ${
                    ele.itemsArr.map((item,index)=>{
                        return (`
                            <li data-itemKey=${index}>
                                <div class="item">
                                    <input type="checkbox" onclick="checkBtn()" class="itemInput">
                                    <label>${item.itemname}</label>
                                </div>
                                <div>
                                    <span class="handleItems delete"  onclick="deleteItem()"><i class="bi bi-trash3-fill"></i></span>
                                </div
                            </li>
                        `)
                    }).join('')
                }
            </ul>
        </div>
        <div class="taskFooter">
            <button class="addItem" onclick="showItemPopup()"><i class="bi bi-plus"></i> Add Item</button>
            <button class="deleteTask" onclick="checkBtn()"><i class="bi bi-trash3-fill"></i> Delete Task</button>
        </div>
    </div>
    `)
    }).join('');


    tasks=document.querySelectorAll('.task');

}


function checkBoxes(){
    tasks.forEach((task)=>{
        const taskInd=task.id;
        const listItems = task.querySelectorAll('.task-items li');
        listItems.forEach(item=>{
            const itemInd = item.dataset.itemkey;
            const checkVal = taskArr[taskInd].itemsArr[itemInd].isChecked;
            const itemInput=item.querySelector('.itemInput');
            itemInput.checked=checkVal;
        })
    })
}

function checkBtn(){
    tasks.forEach(task=>{
        task.addEventListener('click',(e)=>{
            const selEle = e.target;

            // Item is to be added
            if(selEle.classList.contains('addItem')){
                selectedTask = e.path[2];
                showItemPopup();
                // console.log(selEle);
                // console.log(selectedTask);
                
            }

            // To delete task
            else if(selEle.classList.contains('deleteTask')){
                const ind = e.path[2].id;
                taskArr.splice(ind,1);
                updateTasks();
                checkBoxes();

                window.location.reload();
            }


            // To delete an item
            else if(selEle.classList.contains('bi-trash3-fill')){
                const ind=e.path[6].id;
                const selItemInd = e.path[3].dataset.itemkey;
                taskArr[ind].itemsArr.splice(selItemInd,1);
                updateTasks();
                checkBoxes();

            }

            // If an item is checked
            else if(selEle.classList.contains('itemInput')){
                const ind = e.path[5].id;
                const selItemInd = e.path[2].dataset.itemkey;
                var ischecked = selEle.checked;
                taskArr[ind].itemsArr[selItemInd].isChecked=ischecked;
                updateLocalStorage();
                updateTasks();
                checkBoxes();

            }
            else{
                return;
            }

        })
    })

    
}

function showItemPopup(){

    ItemPopup.classList.add('active');
    header.classList.add('blur');
    wrapper.classList.add('blur');
    window.scroll(0,0);

    checkBtn();
}

function closeItem() {
    ItemPopup.classList.remove('active');
    header.classList.remove('blur');
    wrapper.classList.remove('blur');
    selectedTask=null;
}


function addItemFunction(){
    const itemName = document.querySelector('.itemName').value;
    const len = itemName.length;
    const index = selectedTask.id;

    const itemObj={
        itemname:itemName[0].toUpperCase()+itemName.slice(1, len),
        isChecked:false,
    }
    taskArr[index].itemsArr.push(itemObj); 
    closeItem();
    updateTasks();
    checkBoxes();
    document.querySelector('.itemName').value="";
}

function deleteItem(){
    checkBtn();

}