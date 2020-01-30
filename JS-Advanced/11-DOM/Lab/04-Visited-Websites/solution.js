function solve() {
  const links = document.getElementsByTagName("a");
  const visits = document.getElementsByTagName("p");

  for (let i = 0; i < links.length; i++) {
    attachClickEvent(links[i], visits[i]);
  }

  function attachClickEvent(link, visits) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      let count = Number.parseInt(visits.innerHTML.match(/\d+/gm));
      visits.innerHTML = visits.innerHTML.replace(/\d+/g, `${++count}`);
    })
  }
}