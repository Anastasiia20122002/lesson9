let UsersInfoList=[];
const input=document.getElementById("users-number");
const button=document.getElementById("get-button");
const button1=document.getElementById("save-button");
const render=(res)=>{
const containerUsers=document.getElementById("list-global");
changeOpacity(res.length ? 1: 0);
containerUsers.innerHTML=`${res.map((el, index)=>`<div id="list"><div id="combine"><div id="table-list">${index+1}.${el.name} <p> &nbsp; &nbsp;${el.email}</p><p> &nbsp; &nbsp;${el.phone}</div>
<img src="img1.png" onclick="RemoveElement(${index})"/></div></div>`).join(' ')}`
}

const addUserObj=(new_user_obj)=>{
localStorage.setItem("users", JSON.stringify(new_user_obj));
render(new_user_obj);
UsersInfoList=new_user_obj;
}
input.addEventListener("input", (e)=>{{}
  const value=e.currentTarget.value;
  if(value===""){
    button.disabled=true;
  }
  else{
    button.disabled=false;
    button.style.background='#9B59B6';
  }
})
button.addEventListener("click", async()=>{
  button.innerHTML="Loading...";
  document.getElementById("info").style.visibility="visible";
  const res=await fetch('https://jsonplaceholder.typicode.com/users');
  const users=await res.json(); 
  document.getElementById("data").style.visibility="visible";
  document.getElementById("name-info").innerHTML=`${users[input.value-1].name}`;
  document.getElementById("email-info").innerHTML=`${users[input.value-1].email}`;
  document.getElementById("phone-info").innerHTML=`${users[input.value-1].phone}`
  button.disabled=false;
  button.innerHTML="Get";
});

button1.addEventListener('click', ()=>{
  const name=document.getElementById("name-info").innerHTML;
  const email=document.getElementById("email-info").innerHTML;
  const phone=document.getElementById("phone-info").innerHTML;
  if(name===""||email===""||phone===""){
    return;
  }
  const res=[...UsersInfoList, {name: name, email: email, phone: phone}]
  addUserObj(res);
})

window.onload=()=>{
  getItem()
}
const changeOpacity=(value)=>{
document.getElementById("saved").style.opacity=value;
}
const RemoveElement=(CurrentIndex)=>{
  const newList=UsersInfoList.filter((el,index)=> index!==CurrentIndex);
  console.log(newList)
  addUserObj(newList);
}

const getItem=()=>{
const items=JSON.parse(localStorage.getItem("users"));
addUserObj(items);
}