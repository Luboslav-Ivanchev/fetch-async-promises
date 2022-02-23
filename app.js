function attachEvents() {

    let loadBtn=document.getElementById('btnLoadPosts');


    let posts=document.getElementById('posts');

    loadBtn.addEventListener('click',function () {

        let promise=fetch(`https://blog-apps-c12bf.firebaseio.com/posts.json`);

        promise
            .then(res=>res.json())
            .then(data=>{

                console.log(data);

                let option=Object.keys(data).map(el=>
                    `<option value="${el}">${data[el].title}</option>`).join('');

                posts.innerHTML=option;



            })
    });


    posts.addEventListener('change',(e)=>{

        fetch(`https://blog-apps-c12bf.firebaseio.com/posts/${e.currentTarget.value}.json`)

            .then(res=>res.json())
            .then(data=>{
                console.log(data);

                let btnView=document.getElementById('btnViewPost');
                btnView.addEventListener('click',function () {

                    let list=document.getElementById('post-comments');

                    let comments=data.comments;

                    let h1=Object.keys(data).map(el=>{
                        list.innerHTML=`<h1>${data[el].title}</h1>`
                    })

                    list.innerHTML=comments.map(x=>`<li>${x.id} \n ${x.postID} ${x.text}</li>`).join('');


                });

            })
    })
}

attachEvents();
