// Làm đồng hồ
let Time = setInterval(myTimer, 1000);

function myTimer() {
  let day = new Date();
  document.getElementById("demo").innerHTML = day.toLocaleTimeString();
}

// ADMIN cho trang đầu tiên

function todolist() {
    return {
        'code': '',
        'job': '',
        'time': '',
        'countdown': '',
        'link': '',
        'date': '',   
    }
};

// Data Test

let posts = [];
let post1 = todolist();
post1.code= "1";
post1.job = "Do homework";
post1.time = "20h:00'";
post1.countdown = "15h:00'";
post1.link = "";
posts.push(post1);

let posts = [];
let post2 = todolist();
post2.code= "2";
post2.job = "Go to school";
post2.time = "	8h:00'";
post2.countdown = "	15h:00'";
post2.link = "";
posts.push(post2);

let posts = [];
let post3 = todolist();
post3.code= "3";
post3.job = "Online study";
post3.time = "10h:00'";
post3.countdown = "15h:00'";
post3.link = "";
posts.push(post3);

function displaytodolist(list) {

    let body = document.getElementById("list-todo");

    let s = '';

    for (let i = 0; i < list.length; i++) {

        const post = list[i];
             
        let tr = `
            <tr>

            <td>
            <button class="btn btn-info" onclick="editPost('${post.code}');" data-toggle="modal" data-target="#editPost">Edit</button>
            <button class="btn btn-danger" onclick="deletePost('${post.code}');">Delete</button>
            </td>
            
                <td>${i+1}</td>
                <td>${post.code}</td>
                <td>${post.date}</td>
                <td>${post.job}</td>
                <td>${post.countdown}</td>
                <td>${post.link}</td>               
            </tr>`;

        s += tr;
    }

    body.innerHTML = s;
}



displaytodolist(posts);

function addthings(e) {

    e.preventDefault();

    let newthings = reviewthings();

    newthings.code = document.getElementById("postCode").value;
    newthings.job = document.getElementById("postJob").value;
    newthings.date = document.getElementById("postDate").value;
    newthings.countdown = document.getElementById("postCountdown").value;
    newthings.link = document.getElementById("postlink").value;
    posts.push(newthings);

    displaytodolist(posts);

    document.getElementById("frmnewthings").reset();
    $("#addPost").modal('hide');

    localStorage.setItem('list', JSON.stringify(posts));

}

function editPost(code) {

    let currentThings;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (post.code === code) {
            currentThings = post;
            break;
        }
    }

    document.getElementById('postEditCode').value = currentThings.code;
    document.getElementById('postEditJob').value = currentThings.job;
    document.getElementById('postEditDate').value = currentThings.date;
    document.getElementById('postEditCountdown').value = currentThings.countdown;
    document.getElementById('postEditLink').value = currentThings.link;
}

function saveThings(e) {
    e.preventDefault();

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        let code = document.getElementById("postEditCode").value;

        if (post.code === code) {
            post.job = document.getElementById("postEditJob").value;
            post.date = document.getElementById("postEditDate").value;
            post.code = document.getElementById("postEditCode").value;
            post.countdown = document.getElementById("postEditCoundown").value;
            post.link = document.getElementById("postEditLink").value;           
            break;
        }
    }

    displaytodolist(posts);

    document.getElementById("frmEditPost").reset();
    $("#editPost").modal('hide');

    localStorage.setItem('list', JSON.stringify(posts));

}

function deletePost(code) {

    if (confirm("Do you want to delete?")) {

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            if (post.code === code) {
                posts.splice(i, 1)
                break;
            }
        }
    }
    displaytodolist(posts);

    localStorage.setItem('list', JSON.stringify(posts));

}

// lưu dữ liệu mẫu vào localstorage.
let isExist = localStorage.getItem("list");
if (!isExist) {
    localStorage.setItem('list', JSON.stringify(posts));
}