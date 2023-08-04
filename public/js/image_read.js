function readURL(input){
    //파일에 대한 정보
    const file = input.files[0];
    console.log(file);
    if(file != "" ){
        const reader = new FileReader();    
        reader.readAsDataURL(file); //파일 정보 읽고
        reader.onload = (e) => {    //읽어온 값을 실행
            console.log( e.target.result);
            document.querySelector("#preview").src = e.target.result;
        }
    }
}