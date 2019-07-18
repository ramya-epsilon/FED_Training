// JavaScript source code

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//Search states.json and filter it
const searchStates = async searchText => {
    const res = await fetch('employee.json');
    const states = await res.json();

    console.log(states);

    //Get matches to current text input
    let matches = states.filter(emp => {
        const regex = new RegExp(`^${searchText}`, 'g');
        if (emp.name.match(regex)) {
            return true;
        }
        
    });
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = ' ';
    }
    console.log(matches);
    outputHtml(matches);
};

//Show results on HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h6>${match.name} / ${match.id} 
                    <span class="text-primary">${match.department}</span>
                </h6>
                <small>Floor: ${match.floor} / Workstation Number: ${match.new_workplace_no}</small>
            </div>
        `
        )
        .join('');
        matchList.innerHTML = html;
    }
};
search.addEventListener('input', () => searchStates(search.value));