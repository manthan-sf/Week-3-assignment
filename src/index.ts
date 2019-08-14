let head: string[] = [];
let header: string[] = [
    "Id",
    "First Name",
    "Middle Name",
    "Last Name",
    "Phone",
    "Email",
    "Address",
    "Role"
];
let props: string[] = ["Id", "first_name", "middle_name", "last_name", "phone", "email", "address", "role"];
function loadData(): void {
    let btn: any = document.getElementById('loadbtn');
    btn.setAttribute('hidden', 'true');
    createTableHeader();
    createTableRowData();
}

const createTableHeader = (): void => {
    header.forEach(prop => {
        head.push(prop);
    });
    let row: HTMLTableRowElement = document.createElement("tr");
    head.forEach(prop => {
        let cell: any = createCell(prop);
        row.appendChild(cell);
    });
    let actionCell: HTMLTableCellElement = createCell("Action Cell");
    row.appendChild(actionCell);
    let table: any = document.querySelector("#mera_table");
    table.appendChild(row);
};


function createCell(text: string | number): HTMLTableCellElement {
    let cellContent = document.createTextNode(text + "");
    let cell = document.createElement("td");
    cell.appendChild(cellContent);
    return cell;
}

function createTableRowData(): void {
    console.log('ShowTable');

    for (let i = 0; i < seed.length; i++) {
        let row: HTMLTableRowElement = document.createElement("tr");
        for (let key of Object.keys(seed[i])) {
            let cell: HTMLTableCellElement = createCell(seed[i][key]);
            row.appendChild(cell);
        }

        let editBtn: HTMLButtonElement = createButton("Edit");
        let deleteBtn: HTMLButtonElement = createButton("Delete");
        let actionCell: HTMLTableCellElement = createCell("");
        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
        actionCell.setAttribute("class", "d-flex");
        row.appendChild(actionCell);
        var table: any = document.querySelector("#mera_table");
        table.appendChild(row);
    };
    emptyRow();
    console.log(ids);
}


function createButton(btnType: string): HTMLButtonElement {
    let btn = document.createElement("button");
    btn.innerHTML = btnType;
    if (btnType == "Delete") {
        btn.setAttribute("class", "btn btn-danger");
        btn.setAttribute("onclick", "buttonClicked(event)");
    }
    if (btnType == "Edit") {
        btn.setAttribute("class", "btn btn-primary");
        btn.setAttribute("onclick", "buttonClicked(event)");
    }
    if (btnType == 'Add') {
        btn.setAttribute('class', 'btn btn-info')
        btn.setAttribute('onclick', 'addOperation(event)');
    }

    return btn;
}

function buttonClicked(event: any): void {
    let activeBtn: any = event.target;
    let activeRow: any = activeBtn.parentNode.parentNode;
    let cellId: ChildNode | null = activeRow.childNodes[0];
    let id: number = (cellId) ? Number(cellId.textContent) : NaN;
    let activeBtnSibling: Element = activeBtn.nextSibling;
    if (activeBtn.innerHTML == "Delete") {
        seed = seed.filter((user) => {
            return id != user['Id'];
        })
        let table: Node | null = document.querySelector('#mera_table');
        if (table)
            table.removeChild(activeRow);
    }
    else if (activeBtn.innerHTML == 'Edit') {
        let btnCells: HTMLCollection = document.getElementsByClassName('d-flex'), flag = 0;
        for (let i = 0; i < btnCells.length; i++) {
            let firstBtn: any = btnCells[i].childNodes[1];
            if (firstBtn.innerHTML == 'Save')
                flag = 1;
        }
        if (flag == 1)
            alert("Operate one row at a time");
        else {
            for (let i = 0; i < activeRow.children.length; i++) {
                if (i != activeRow.children.length - 1)
                    activeRow.childNodes[i].setAttribute("contenteditable", true);
            }
            activeBtn.innerHTML = "Save";
            activeBtnSibling.innerHTML = "Cancel";
            activeBtn.setAttribute('onclick', `SaveOperation(event,${id})`);
            if (activeRow)
                activeBtnSibling.setAttribute('onclick', `CancelOperation(event,${id})`);
        }
    }
}
function CancelOperation(event: any, id: number): void {
    let table: HTMLTableElement | null = document.querySelector('#mera_table');
    let temp: User[] = seed.filter((user) => {
        return user["Id"] == id;
    })
    let activeRow: HTMLTableRowElement = event.target.parentNode.parentNode;
    while (activeRow.hasChildNodes()) {
        if (activeRow.firstChild)
            activeRow.removeChild(activeRow.firstChild)
    }
    console.log(temp[0])
    for (let key of Object.keys(temp[0])) {
        let cell = createCell(temp[0][key]);
        activeRow.appendChild(cell);
    }
    let editBtn = createButton('Edit');
    let deleteBtn = createButton('Delete');
    let cell = createCell('');
    cell.appendChild(editBtn);
    cell.appendChild(deleteBtn);
    cell.setAttribute('class', 'd-flex');
    activeRow.appendChild(cell);
}

function SaveOperation(event: any, id: number): void {
    let activeRow: any = event.target.parentNode.parentNode;
    seed.forEach((user, index) => {
        if (id == user["Id"]) {
            for (let i = 0; i < activeRow.children.length - 1; i++) {

                let data: string | number = activeRow.childNodes[i].textContent;
                if (props[i] == 'Id' || props[i] == 'phone')
                    seed[index][props[i]] = +data;
                else
                    seed[index][props[i]] = data;
            }
        }
    })
    for (let td of activeRow.children) {
        td.setAttribute('contenteditable', 'false');
    }
    event.target.innerHTML = "Edit";
    event.target.nextSibling.innerHTML = "Delete";
    event.target.setAttribute('onclick', 'buttonClicked(event)');
    event.target.nextSibling.setAttribute('onclick', 'buttonClicked(event)');
}
function emptyRow() {
    let row = document.createElement('tr');
    for (let i = 0; i <= 8; i++) {
        let cell = createCell('');
        if (i != 0 && i != 8)
            cell.setAttribute('contenteditable', 'true');
        if (i == 8) {
            var btn = createButton('Add');
            cell.appendChild(btn);
        }
        row.appendChild(cell);
    }
    let table: any = document.querySelector('#mera_table');
    table.appendChild(row);

}
function addOperation(event: any): void {
    let obj: User = {
        Id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        role: ''
    };
    let activeRow: any = event.target.parentNode.parentNode;
    console.log(Object.values(activeRow.children));
    Object.values(activeRow.children).forEach((cell: any, index: number) => {
        if (index !== 0 && index !== 8) {
            if (cell.textContent) {
                obj[props[index]] = cell.textContent;
            }
        }
    });
    if (!objectValueEmpty(obj)) {
        obj.Id = ids++;
        console.log(obj);
        seed.unshift(obj);
        reload();
    }
}

function objectValueEmpty(obj: User): boolean {
    let acc: string = '';
    Object.values(obj).forEach((value: string | number, index: number) => {
        index !== 0 ? acc += value : null;
    });
    return acc ? false : true;
}

function reload(): void {
    let table: any = document.querySelector('#mera_table');
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }
    head = []
    createTableHeader();
    createTableRowData();
}