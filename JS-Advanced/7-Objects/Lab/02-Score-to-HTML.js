function solve(input) {
    let parsedJson = new Array(...JSON.parse(input));
    let sanitizeInput =
        (str) => String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    let indent = '  ';
    let html = '<table>\n'
                + `${indent}<tr><th>name</th><th>score</th></tr>\n`;
   
    parsedJson.reduce((acc, currentVal) => {
        let sanitizedName = sanitizeInput(currentVal['name']);
        let sanitizedScore = sanitizeInput(currentVal['score']);

        acc = 
        `${indent}<tr>` + `<td>${sanitizedName}</td>` 
        + `<td>${sanitizedScore}</td>` + '</tr>\n';
       
        return html += acc;
    },'');

    return html + '</table>';
}

console.log(solve(
    ['[{"name":"Pesho","score":479},{ "name": "Gosho", "score": 205 }]']
));

/*
<table>
  <tr><th>name</th><th>score</th></tr>
  <tr><td>Pesho</td><td>479</td></tr>
  <tr><td>Gosho</td><td>205</td></tr>
</table>
*/