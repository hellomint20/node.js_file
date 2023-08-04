const router = require("express").Router();
const multer = require("multer"); //파일 관리해줌
//const upload = multer({dest : "upload_file"});  //파일을 저장할 폴더 위치 (dest 무조건 작성)
//프로젝트 바로 아래 만들어야 함
const stg = multer.diskStorage({
    destination : (req, file, cb)=> {
        console.log("===== dest =====")
        cb( null, "upload_file");   //null 고정으로 사용
    },
    filename : (req, file, cb) => {
        console.log("===== filename =====")
        console.log(file);
        cb(null, Date.now()+"-"+file.originalname); 
        //Date.now(): 현재 시간, originalname : 선택한 파일 이름 (같은 이름 파일 중복 방지)
    }
});   
const f_Filter = (req, file, cb) =>{
    console.log("==== filter ======")
    const type = file.mimetype.split("/")[0]  //파일 형식 알려줌
    //  mimetype: 'image/png',
    console.log("type : ", type);
    if( type === "image"){
        cb(null, true); //true 들어오면 파일 저장
    }else{
        //req = {fileValidation : " , ,"}
        req.fileValidation = "image만 저장하세요";
        cb(null, false); //false가 들어오면 파일 저장X
    }
   
}                 
const upload = multer({storage : stg, fileFilter : f_Filter }); //저장할 장소     
//파일이 없으면 위 함수가 실행되지 않음

const fileCtrl = require("../controller/file_controller.js");
/*router.get("/", (req, res) => {
    res.send("file idnex 연결")
})*/

router.get("/", fileCtrl.views.index);
router.get("/list", fileCtrl.views.list);
router.get("/download/:fileName", fileCtrl.views.download)
router.get("/deleteFile/:fileName", fileCtrl.process.deleteFile)
router.get("/modify_form/:fileName", fileCtrl.views.modify_form)

//함수 실행 후 컨트롤러로 연결함
router.post("/upload", upload.single("file_name"), fileCtrl.process.upload);    
    //single이라는건 하나의 파일 얘기함 ejs에 있는 name과 같아야 함
    
router.post("/modify", upload.single("newFileName"), fileCtrl.process.modify);    

module.exports = router