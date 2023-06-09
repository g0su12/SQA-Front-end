const saveInfo = (btn) => {
    localStorage.setItem("endpoint", btn.getAttribute("id"));
}

function reverse(s){
    return s.split("-").reverse().join("/");
}


const getNamHoc = () => {
    const APIUrl = "http://localhost:8080/api/v1/admin/nam-hocs";
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<li >
                        <button 
                            class="button" 
                            onclick=saveInfo(this)
                            id="${item.ten}" 
                        >
                            <a href="./ky-hoc.html">${item.ten}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join('');
    });
}

const getKyHoc = () => {
    const paths = localStorage.getItem("endpoint").split("*");
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<li>
                        <button 
                            class="button" 
                            onclick="saveInfo(this)" 
                            id="${item.namHoc.ten}*${item.kyHoc.ten.split(" ").join("-")}">
                            <a href="./nien-khoa.html">${item.kyHoc.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}

const getNienKhoa = () => {
    let paths = localStorage.getItem("endpoint").trim().split("*");
    if(paths.length>2){
        paths = paths.slice(0,2);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    console.log(paths);
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<li>
                        <button 
                            class="button"
                            onclick="saveInfo(this)" 
                            id="${localStorage.getItem("endpoint")}*${item.ten}">
                            <a href="./nganh-hoc.html">${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </button>
                    </li>`;
             });
             document.querySelector("#main").innerHTML = render.join(''); 
         }else{
             document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
         }
    });
}

const getNganhHoc = () => {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length>3){
        paths = paths.slice(0,3);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<li>
                        <button 
                            class="button"
                            onclick="saveInfo(this)" 
                            id="${localStorage.getItem("endpoint")}*${item.ten.split(" ").join("-")}">
                            <a href="./mon-hoc.html">${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </button>
                    </li>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}

const getMonHoc = () => {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length>4){
        paths =paths.slice(0,4);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh/${paths[3]}/mon-hocs`;

    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<tr>
                        <td>${item.id}</td>
                        <td 
                            onclick="saveInfo(this)" 
                            id="${localStorage.getItem("endpoint")}*${item.ten.split(" ").join("-")}">
                            <a href="./lop-hoc.html">${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </td>
                        <td>${item.tyLeDiemCC}</td>
                        <td>${item.tyLeDiemTH}</td>
                        <td>${item.tyLeDiemKT}</td>
                        <td>${item.tyLeDiemBT}</td>
                        <td>${item.tyLeDiemCuoiKy}</td>
                    </tr>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}

const getLHP = () => {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length>5){
        paths = paths.slice(0,5);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh/${paths[3]}/mon-hocs/${paths[4]}/lhps`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<tr>
                        <td>${index+1}</td>
                        <td onclick="saveInfo(this)" id="${localStorage.getItem("endpoint")}*${item.id}">
                            <a href="./ds-sv.html">${item.nienKhoaNganhNamHocKyHocMonHoc.monHoc.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </td>
                        <td>${item.giaoVien.nguoiDung.name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>${item.phongHoc.ten}</td>
                        <td>${item.listKetQua.length}</td>
                        <td>${reverse(item.batDau.toLocaleString('en-CA').slice(0, 10))}</td>
                        <td>${reverse(item.ketThuc.toLocaleString('en-CA').slice(0, 10))}</td>
                    </tr>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}

const getDSSV = () => {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length>6){
        paths = paths.slice(0,6);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh/${paths[3]}/mon-hocs/${paths[4]}/lhps/${paths[5]}/sinh-viens`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<tr>
                        <td>${index+1}</td>
                        <td id="${index+1}-name-sv">${item.nguoiDung.name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td id="${index+1}-msv">${item.maSinhVien}</td>
                        <td id="${index+1}-gender-sv">${item.nguoiDung.gioiTinh.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td id="${index+1}-address-sv">${item.nguoiDung.diaChi.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td id="${index+1}-email-sv">${item.nguoiDung.email}</td>
                        <td id="${index+1}-phone-sv">${item.nguoiDung.so_dien_thoai}</td>
                        <td id="${index+1}-dob-sv">${item.nguoiDung.ngaySinh.toLocaleString('en-CA').slice(0, 10).split("-").reverse().join("/")}</td>
                        <td>
                            <button class="edit" onclick="showFormEdit(${item.id})">Sửa thông tin</button>
                            <button class="delete" id="${item.id}" onclick="showForm(${item.id})">Xoá sinh viên</button>
                        </td>
                        <div class="toggle" id="delete-${item.id}">
                            <div class="form-msg">
                            <h4 class="form-title">Xác nhận xoá sinh viên</h4>
                                <button onclick="deleteStudent(${item.id})" class="submit">Xác nhận</button>
                                <button onclick="showForm(${item.id})" class="submit">Huỷ</button>
                            </div>
                        </div>
                    </tr>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
            document.querySelector('#btn-add').innerHTML = `<button class="add" onclick="showFormAdd()">Thêm sinh viên mới</button>`;

        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}

function getKetQuaLHP() {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length > 6){
        paths = paths.slice(0,6);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh/${paths[3]}/mon-hocs/${paths[4]}/lhps/${paths[5]}/ket-quas`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
            return document.querySelector("#main").innerHTML = 
                    `<tr>
                        <td>${data.nameSinhVien.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>${data.maSinhVien}</td>
                        <td>${data.diemCC}</td>
                        <td>${data.diemTH}</td>
                        <td>${data.diemKT}</td>
                        <td>${data.diemBT}</td>
                        <td>${data.diemCuoiKy}</td>
                        <td>${data.diemHe4 || "3.6"}</td>
                        <td>${data.diemHe10 || "9"}</td>
                        <td>${data.diemChu || "A+"}</td>
                    </tr>`;
    });
}

function getThangDiem() {
    const APIUrl = "http://localhost:8080/api/v1/cau-hinh-thang-diem/thang-diems";
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<tr>
                        <td>${item.diemHe4}</td>
                        <td>${item.from} - ${item.to}</td>
                        <td>${item.diemChu}</td>
                        <td>
                            <button class="edit" onclick="showFormEdit()">Sửa thông tin</button>
                        </td>
                    </tr>
                    <div class="form-msg" id="editSV">
                      <div class="input-container ic2">
                        <input id="from" class="input" type="text" name="from" placeholder=" " />
                        <div class="cut"></div>
                        <label for="from" class="placeholder">From</label>
                      </div>
                      <div class="input-container ic2">
                        <input id="to" class="input" type="text" name="to" placeholder=" " />
                        <div class="cut"></div>
                        <label for="to" class="placeholder">To</label>
                      </div>
                      <div class="input-container ic2">
                        <input id="diem-chu" class="input" type="text name="diem-chu" placeholder=" " />
                        <div class="cut"></div>
                        <label for="diem-chu" class="placeholder">Điểm chữ</label>
                      </div>
                      <div class="input-container ic2">
                        <input id="diemHe4" class="input" type="text name="diemHe4" placeholder=" " />
                        <div class="cut"></div>
                        <label for="diemHe4" class="placeholder">Điểm hệ 4</label>
                      </div>
                      <button  class="submit" onclick="editThangDiem(${index+1})">Sửa</button>
                      <button onclick="showFormEdit()" class="submit">Huỷ</button>
                  </div>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
        
}

function getAllNganhHoc() {
    const APIUrl = "http://localhost:8080/api/v1/cau-hinh-mon-hoc/nganhs";
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<li>
                        <button 
                            class="button" 
                            onclick=saveInfo(this)
                            id="${item.id}" 
                        >
                            <a href="./ch-mon-hoc.html">${item.ten}</a>
                        </button>
                    </li>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}

function getAllMonHoc() {
    let paths = localStorage.getItem("endpoint").split("*");
    const APIUrl = `http://localhost:8080/api/v1/cau-hinh-mon-hoc/nganhs/${paths[0]}/mon-hocs`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<tr>
                        <td>${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>${item.tyLeDiemCC}</td>
                        <td>${item.tyLeDiemTH}</td>
                        <td>${item.tyLeDiemBT}</td>
                        <td>${item.tyLeDiemKT}</td>
                        <td>${item.tyLeDiemCuoiKy}</td>
                        <td>
                            <button class="edit" onclick="showFormEdit()">Sửa thông tin</button>
                        </td>
                    </tr>
                    <div class="form-msg" id="editSV">
                      <div class="input-container ic2">
                        <input id="ten" class="input" type="text" name="ten" placeholder=" " />
                        <div class="cut"></div>
                        <label for="ten" class="placeholder">Tên môn</label>
                      </div>
                      <div class="input-container ic2">
                        <input id="diemcc" class="input" type="text" name="diemcc" placeholder=" " />
                        <div class="cut"></div>
                        <label for="diemcc" class="placeholder">Tỷ lệ diểm CC</label>
                      </div>
                      <div class="input-container ic2">
                        <input id="diemth" class="input" type="text name="diemth" placeholder=" " />
                        <div class="cut"></div>
                        <label for="diemth" class="placeholder">Tỷ lệ diểm TH</label>
                      </div>
                      <div class="input-container ic2">
                        <input id="diemkt" class="input" type="text name="diemkt" placeholder=" " />
                        <div class="cut"></div>
                        <label for="diemkt" class="placeholder">Tỷ lệ diểm KT</label>
                      </div>
                      <div class="input-container ic2">
                        <input id="diembt" class="input" type="text name="diembt" placeholder=" " />
                        <div class="cut"></div>
                        <label for="diembt" class="placeholder">Tỷ lệ diểm BT</label>
                      </div>
                      <div class="input-container ic2">
                        <input id="diemck" class="input" type="text name="diemck" placeholder=" " />
                        <div class="cut"></div>
                        <label for="diemck" class="placeholder">Tỷ lệ diểm CK</label>
                      </div>
                      <button  class="submit" onclick="editThangDiem(${item.id})">Sửa</button>
                      <button onclick="showFormEdit()" class="submit">Huỷ</button>
                  </div>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}