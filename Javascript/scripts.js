// JS Login

var userObject = { 'username': 'test', 'password': 'test123'};

// Put userObject to local storage
localStorage.setItem('userObject', JSON.stringify(userObject));

// Retrieve userobject from local storage
var retrievedObject = localStorage.getItem('userObject');

document.getElementById("loginContent").style.display = "none";

var getUser = JSON.parse(localStorage.getItem("userObject"))

var loginStatus = localStorage.getItem("loginStatus");

console.log(loginStatus);

if (loginStatus == 'true') {
  document.getElementById("formLogin").style.display = "none";
  document.getElementById("loginContent").style.display = "block";
}

const getLoginInput = () =>{
  console.log(getUser.username);
  let inputValue1 = document.getElementById("username").value;

  let inputValue2 = document.getElementById("password").value;

  if (inputValue1 == getUser.username && inputValue2 ==  getUser.password) {
      alert("Login Success");
      myFunction1();
      myFunction2();
      localStorage.setItem("loginStatus", "true");
  } else {
      alert("Login Failed");
  }
}

function myFunction1() {
  var x = document.getElementById("formLogin");
  if (x.style.display === "none") {
    x.style.display = "block";
    console.log("ok");
  } else {
    x.style.display = "none";
    console.log("no");
  }
}

function myFunction2() {
  var x = document.getElementById("loginContent");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem('loginStatus');
  // localStorage.clear();
  location.reload();
}

// -----------------------------------------------------------------------

function validateForm() {
  var name = document.forms["input-form"]["name"].value;
  var email = document.forms["input-form"]["email"].value;
  var address = document.forms["input-form"]["address"].value;
  var quantity = document.forms["input-form"]["quantity"].value;
  if (name == "" || email == "" || address == "" || quantity == "") {
    alert("Semua Harus Diisi!");
    return false;
  } else {
    saveOrder();
  }
}

var arrayOrder = [];

function saveOrder() {
  JSON.parse(localStorage.getItem('arrayObject') || '[]');
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let address = document.getElementById('address');
  let quantity = document.getElementById('quantity');
  var order = {
      name: name.value,
      email: email.value,
      address: address.value,
      quantity: quantity.value,
      status: 'Queue'
  }
  console.log(order);

  arrayOrder.push(order);

  localStorage.setItem('arrayOrder', JSON.stringify(arrayOrder));
  var temp = JSON.parse(localStorage.getItem('arrayOrder'));

  console.log('final', arrayOrder);

  console.log(temp[0]);
  getData();
}

getData()

function getData() {
  var data = ''
  var temp = JSON.parse(localStorage.getItem('arrayOrder'))

  if (temp != null) {
    arrayOrder = temp
  }

  
  var color = '';
  if (temp != null && temp.length > 0) {
    temp.forEach(function (item, index) {
      if (temp[index].status == 'Queue') {
        color = 'red';
      } else if (temp[index].status == 'On Process') {
        color = 'blue'
      } else {
        color = 'green';
      }
      
      var num = index + 1;
      data += '<tr>'+
      '<th scope="row">' + num + '</th>'+
      '<td>' + temp[index].name + '</td>'+
      '<td>' + temp[index].email + '</td>'+
      '<td>' + temp[index].address + '</td>'+
      '<td>' + temp[index].quantity + ' KG </td>'+
      '<td style="font-weight: bold; color: ' + color + '">' + temp[index].status + '</td>'+
      '<td>' + '<button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#modalEdit" style="width: 100px" onclick="selectData(' + index + ')">Edit</button>' + '</td>'+
      '<td  >' + '<button type="button" class="btn btn-outline-danger" style="width: 100px" onclick="removeData(' + index + ')">Remove</button>' + '</td>'+
      '</tr>'
    });
  } else {
    localStorage.setItem('arrayOrder', JSON.stringify(arrayOrder));
  }

  document.getElementById("order").innerHTML = data;
}

// var tempIndex = '';

function selectData(index) {
  console.log(index)

  let tasks =  JSON.parse(localStorage.getItem('arrayOrder'));
  const datafilter = tasks.filter((data,i) => i == index )[0]

  document.getElementById("editName").value = datafilter.name;
  document.getElementById("editEmail").value = datafilter.email;
  document.getElementById("editAddress").value = datafilter.address;
  document.getElementById("editQuantity").value = datafilter.quantity;
  document.getElementById("status").value = datafilter.status;

  console.log(datafilter);
  tempIndex = index;

  console.log('edit', tasks[index].name);

  editData(index);
}

var tempIndex;
function editData(index) {
  var temp = JSON.parse(localStorage.getItem('arrayOrder'));

  index != undefined ? tempIndex = index : tempIndex;
  
  let tempName = document.getElementById("editName").value;
  let tempEmail = document.getElementById("editEmail").value;
  let tempAddress = document.getElementById("editAddress").value;
  let tempQuantity = document.getElementById("editQuantity").value;
  let status = document.getElementById("status").value;
  
  temp[tempIndex] = {name: tempName, email: tempEmail, address: tempAddress, quantity: tempQuantity, status : status};
  
  localStorage.setItem('arrayOrder', JSON.stringify(temp));

  console.log(temp[tempIndex]);
}

function removeData(index) {
  console.log();
  var temp = JSON.parse(localStorage.getItem('arrayOrder'));
  temp.splice(index, 1);
  localStorage.setItem('arrayOrder',JSON.stringify(temp));
  getData();
}
