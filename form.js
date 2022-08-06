var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);

  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");

  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      this.setAttribute("data-id", this.innerHTML.toLocaleLowerCase());
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
      let target = e.target.dataset.id;
      document.querySelector(".box").style.height = "39rem";

      if (target === "individual") {
        document.querySelector(".new").classList.remove("hide");
        document.querySelector(".new label").innerHTML = "Reffered By:";
        reset();
      } else if (target === "other") {
        document.querySelector(".new").classList.remove("hide");
        document.querySelector(".new label").innerHTML = "Other:";
        reset();
      } else {
        document.querySelector(".new").classList.add("hide");
        document.querySelector(".box").style.height = "31rem";
        document.querySelector(".new-req").required = false;
      }
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    document.querySelector(".new").classList.add("hide");
    if (!e.target.classList.contains("select-arrow-active")) {
      document.querySelector(".box").style.height = "47rem";
      document.getElementById("btn").style.marginTop = "38rem";
    } else {
      document.querySelector(".box").style.height = "31rem";
      document.getElementById("btn").style.marginTop = "22rem";
    }

    /* When the select box is clicked, close any other select box
    es,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function reset() {
  document.getElementById("btn").style.marginTop = "28rem";
  document.querySelector(".new-req").required = true;
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

// document.getElementById("btn").addEventListener("click", () => {
//   location.href = "success.html";
// });
