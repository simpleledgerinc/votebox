export default function(filename, buffer){
    var blob = new Blob([buffer], {type: "text/plain"});
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}