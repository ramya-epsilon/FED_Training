// JavaScript source code

class Employee {

    constructor() {
        this.matches = [];
    }

    async searchEmployees(searchText) {
        const res = await fetch('employee.json');
        const employees = await res.json();

        console.log(employees);

        //Get matches to current text input
        let matches = employees.filter(emp => {
            const regex = new RegExp(`^${searchText}`);
            if (emp.name.match(regex)) {
                return true;
            }

        });
        if (searchText.length === 0) {
            matchList.innerHTML = ' ';
        }
        console.log(matches);
        this.outputHtml(matches);
    };

    outputHtml(matches) {
        if (matches.length > 0) {
            const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h6>${match.name} / ${match.id}</h6>
                <h6>
                    <span class="text-primary">${match.department}</span>
                </h6>
                <small>Floor: ${match.floor} / Workstation Number: ${match.new_workplace_no}</small>
            </div>
            `
            )
                .join('');
            matchList.innerHTML = html;
        }
        else {
            matchList.innerHTML = null;
        }
    }
}

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search.addEventListener('input', () => searchEmployees(search.value));

const employee = new Employee();
search.addEventListener('input', function () {
    employee.searchEmployees(search.value);
});