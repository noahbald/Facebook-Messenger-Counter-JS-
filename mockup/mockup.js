var dropdown_list = null;
var self_clicked = true;

$(document).ready(function(){
  $(".dropdown_option").click(function(){
      dropdown_optionOnClick($(this)[0]);
  })
  $(".dropdown_container .button").click(function(){
      dropdownOnClick($(this)[0]);
  })
});

function dropdownOnClick(self)
{
    others = document.getElementsByClassName("dropdown");
    dropdown_list = self.parentElement.getElementsByClassName("dropdown")[0]
    for (var i=0; i<others.length; i++)
    {
        if (others[i] == dropdown_list)
        {
            continue;
        }
        others[i].classList.add("hidden");
    }
    dropdown_list.classList.toggle("hidden");
    self_clicked = true;
}

function dropdown_optionOnClick(self)
{
    parent = self.parentElement
    button = parent.parentElement.getElementsByClassName("button")[0];
    button.innerHTML = self.innerHTML;
    others = parent.getElementsByClassName("dropdown_option");
    for (var i=0; i<others.length; i++)
    {
        others[i].classList.remove("selected");
    }
    self.classList.add("selected");
}

function isChrome()
{
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
       return -1;
    } else if(
      isChromium !== null &&
      typeof isChromium !== "undefined" &&
      vendorName === "Google Inc." &&
      isOpera === false &&
      isIEedge === false
    ) {
       return True;
    } else {
       return False;
    }
}

window.onclick = function(e)
{
    if (dropdown_list != null)
    {
        if (!self_clicked)
        {
            dropdown_list.classList.add("hidden");
            self_clicked = false;
        }
        else
        {
            self_clicked = false;
        }
    }
}
