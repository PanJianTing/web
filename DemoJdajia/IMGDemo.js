var i = 0;

function downloadFile() {
    var start = 0;
    var end = 0;
    var section = 1300000;                            // 每 10M 行切割
    var isEOF = false;

    dajaDownload(start, section, isEOF);
}

function dajaDownload(start, count, isEOF) {

    var token = document.getElementById("token").value;
    alert('1');
    da.ready(function() {
        da.downloadFileByPart({
            "headers": '{"Content-Type":"application/octet-stream","digi-middleware-auth-access":' + token + '}',
            "fileUrl": 'http://10.20.88.64:8081/api/dmc/v1/myresources/files/5bb1ff88da89c62a2065cbde/' + start + '/' + count + '',
            "fileId": "5bb1ff88da89c62a2065cbde",
            "fileName": "影片.mp4",
            "isEOF": isEOF,
            success: function(res) {
                i = i + 1;
                var start = 0;
                var end = 0;
                var chunks = Math.ceil(5364475 / section);      // 切割的量
                var isEOF = false;
                var section = 1300000;                            // 每 10M 行切割
    
                start = i * section;                          // 始下載的字

                if (5364475 - start > section) {
                    end = start + section;
                } else {
                    end = 5364475;
                    section = 5364475 - start;
                }

                dajaDownload(start, section, isEOF);
            },
            fail: function(res) {

            }
        });
    });

}

/*
 public sliceDownload(file) {
        console.log(file);
        const that = this;
        let start = 0;
        let end = 0;
        let section = 1300000;                            // 每 10M ?行切割
        let chunks = Math.ceil(file.size / section);      // 切割的?量
        let uploadSuccessCount = 0;

        //分段下載
        this.api.GetToken().then(() => {
            for (let i = 0; i < chunks; i++) {

                start = i * section;                          // ?始下載的字?

                if (file.size - start > section) {
                    end = start + section;
                } else {
                    end = file.size;
                    section = file.size - start;
                }

                var blob = [];


                that.api.SliceDownLoadFiles(file.id, start, section).subscribe(blobFile => {
                    
                    blob.push(blobFile);

                    if (i + 1 === chunks) {

                        var b = new Blob(blob, { type: 'application/octet-stream' });
                        console.log(b);

                        //  var aa = this.mergeArrayBuffer(blob);
                        //  console.log(aa);
                        //  var c = new Blob([new Uint8Array(aa)], { type: 'application/octet-stream' });


                        var a = document.createElement('a');
                        var objectUrl = window.URL.createObjectURL(b);
                        a.href = objectUrl;
                        a.download = file.fileName;
                        document.body.appendChild(a);

                        var evt = document.createEvent("MouseEvents");
                        evt.initEvent("click", false, false);
                        a.dispatchEvent(evt);

                        window.URL.revokeObjectURL(objectUrl);
                        document.body.removeChild(a);
                    }
                });
            }
        });
    }
	
	*/