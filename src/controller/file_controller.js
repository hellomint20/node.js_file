const fs = require("fs"); //파일 관련 기능 사용

const views = { //key, value 로 값을 넘겨줌 (전처럼 module에 추가해서 보내는게 아님)
    index : (req, res) => {             //views.index 로 값을 받으면 됨
        //res.send("controller index 연동")
        res.render("file_index");
    },

    list : (req, res) => {
        /*fs.readdir("./upload_file", (err, files) => {
            console.log("===비동기===");
            console.log(files)
            res.render("file_list", {files : fileList});
        })*/
        const fileList = fs.readdirSync("./upload_file");
        console.log("===동기 방식===")
        console.log(fileList)
        //res.send("test")
        res.render("file_list", {files : fileList});
    },
    download : (req, res) =>{
        const filePath = `./upload_file/${req.params.fileName}`;
        res.download( filePath) ;

    },
    modify_form : (req, res) =>{
        const fileName = req.params.fileName;
        res.render("modify_form", {fileName})
    }
}

//연산하는 기능 수행
const process = {
    upload : (req, res) => {
        console.log("====ctrl upload=====")
        console.log(req.body);
        console.log("-----------------");
        console.log(req.file);
        console.log("-----------------");
        console.log("req.fileValidation : ", req.fileValidation); //req.test : undefined (파일 없을 경우)
        console.log("=====================")
        if(req.fileValidation){
            return res.send(req.fileValidation);
        }
        res.send("upload");
    },
    deleteFile : (req, res) => {
        fs.unlinkSync(`./upload_file/${req.params.fileName}`);
        res.redirect("/file/list");
    },
    modify : (req, res) => {
        console.log("==== modify ====");
        //file 값이 없으면 변경X/ 값이 있으면 변경O
        console.log(req.file);
        if(req.file) {
            return res.redirect(`/file/deleteFile/${req.body.originFileName}`)
        }
        res.redirect("/file/list");
    }    
}

module.exports = {views, process};