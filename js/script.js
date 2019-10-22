(function() {
    document.getElementById('imageLink').addEventListener('keypress', (e) => {
        if (e.keyCode == '13') {
            e.preventDefault();
            checkAge();
        }
    });
    
    document.getElementById('btn').addEventListener('click', (e) => {
        e.preventDefault();
        checkAge();
    });
    
    document.getElementsByClassName('header__dot')[0].addEventListener('click', () => {
        document.documentElement.style.setProperty('--background-color', '#673ab7ed');
    });
    
    document.getElementsByClassName('header__dot')[1].addEventListener('click', () => {
        document.documentElement.style.setProperty('--background-color', '#009688');
    });
    
    function checkAge() {
        let imgUrl = document.getElementById('imageLink').value;
        let img = document.getElementById('image');
    
        if (imgUrl.trim() == '' ) {
            alert('Add some link please');
        }
    
        while (img.hasChildNodes()) {
            img.removeChild(img.firstChild);
        }
    
        fetch(imgUrl).then((res) => {
    
            if (!res.ok) {
                document.getElementById('text').innerHTML = "Sorry we didn't detect face on this image";
            
                return res;
            } else {
                sendImage();
                let image = document.createElement('img');
                image.src = document.getElementById('imageLink').value;
                image.style.width = '40%';
                image.style.height = '40%';
                img.appendChild(image);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    
    function sendImage() {
        let uri = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender";
        let key = "9475ac3e01fe4ea2a9f87bd72022ce9c";
        let header = new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': key
        });
    
        let body = {
            'url': document.getElementById('imageLink').value
        };
    
        let initObject = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: header
        };
    
        let request = new Request(uri, initObject);
    
        fetch(request).then((result) => {
    
        if (result.ok) {
            return result.json();
        }
    
        else {
            return Promise.reject(new Error(result.statusText));
        }
    
        }).then((result) => {
            document.getElementById('text').innerHTML = 
                "Age    : " + result[0].faceAttributes.age + "<br/>" +
                "Gender : " + result[0].faceAttributes.gender;
        })
        .catch( (err) => {
            alert(err)
            document.getElementById('text').innerHTML = err;
        });
    }
    
}());
