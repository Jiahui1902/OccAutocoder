
// read form input
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('crosswalkForm');
    if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Fetch API to submit form data without reloading the page
        // fetch('http://127.0.0.1:8989/getoptions', {
        fetch("{{ url_for('get_options') }}", {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            
            console.log(data);             

        })
        .catch(error => console.error('Error:', error));
    });
    }else {
        console.error("Form not found")
    }
});





function uploadFile() {
            const input = document.getElementById('crosswalkcsvFile');
            const data = new FormData();
            data.append('crosswalkcsv_file', input.files[0]);

            fetch("{{ url_for('parse_crosswalk') }}", {
                method: 'POST',
                body: data,
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                // document.getElementById("crosswalkdata").innerHTML = data.message;
                })
            .catch(error => console.error('Error:', error));
        }



// convert JSON to CSV
function jsonToCSV(json) {
    const items = json;
    const replacer = (key, value) => value === null ? '' : value; 
    const header = Object.keys(items[0]);
    const csv = [
        header.join(','), 
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ];
    return csv.join('\r\n');
}





// return interactive results
document.addEventListener('DOMContentLoaded', function() {
            const resultsDiv = document.getElementById('interactiveOutput');
            const urlParams = new URLSearchParams(window.location.search);
            const result = urlParams.get('result');
            if (result) {
                resultsDiv.textContent = 'Crosswalked to: ' + result;
            };
            
            const checked_onet2soc = urlParams.get('checked_onet2soc');
            if (checked_onet2soc) {
            document.querySelector('input[name="codingSystem"][value="onet2soc"]').checked = true;
            }
            
            const checked_soc2cen = urlParams.get('checked_soc2cen');
            if (checked_soc2cen) {
            document.querySelector('input[name="codingSystem"][value="soc2cen"]').checked = true;
            }
});





