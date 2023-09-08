function bodyload(){
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY&quot")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
         var listCameras = document.getElementById("listCameras");
         var cameraNames= new Set();
         for(var photo of data.photos)
         {   
            var cName=photo.camera.name;
            if (!cameraNames.has(cName)){
             cameraNames.add(cName);
            var option = document.createElement("option");
            option.text = photo.camera.full_name;
            option.value = photo.camera.name;
            listCameras.appendChild(option);
            }

            var div = document.createElement("div");
            div.className= "card m-2 p-2";
            div.style.width= "200px";
            div.innerHTML = `
              <a href=${photo.img_src} target="_blank"><img src=${photo.img_src} class="card-img-top" height="150"></a>
              <div class="card-header"> ${photo.id} </div>
              <div class="card-body">
                 <dl>
                    <dt>Camera Name</dt>
                    <dd>${photo.camera.full_name} </dd>
                    <dt>Rover Name</dt>
                    <dd>${photo.rover.name}</dd>
                 </dl>
              </div>
            `;

            document.querySelector("main").appendChild(div);

          }
       })
 }
function CameraChange(){
     document.querySelector("main").innerHTML = "";
     var cameraName = document.getElementById("listCameras").value;
     fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY&quot")
     .then(function(response){
         return response.json();
     })
     .then(function(data){
         var result = data.photos.filter(function(photo){
             return photo.camera.name==cameraName;
         });
         for(var photo of result)
         {
            var div = document.createElement("div");
            div.className= "card m-2 p-2";
            div.style.width= "200px";
            div.innerHTML = `
              <img src=${photo.img_src} class="card-img-top" height="150">
              <div class="card-header"> ${photo.id} </div>
              <div class="card-body">
                 <dl>
                    <dt>Camera Name</dt>
                    <dd>${photo.camera.full_name} </dd>
                    <dt>Rover Name</dt>
                    <dd>${photo.rover.name}</dd>
                 </dl>
              </div>
            `;
            document.querySelector("main").appendChild(div);
            }
        })
}