var dropdown_list = null;
var self_clicked = true;

function dropdownOnClick(id)
{
    if (dropdown_list != null)
    {
        if (dropdown_list.id != id)
        {
            dropdown_list.classList.add("hidden");
            document.getElementById(id).classList.add("hidden");
        }
        self_clicked = true;
    }
    dropdown_list = document.getElementById(id);
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
            dropdown_list.classList.toggle("hidden");
            self_clicked = false;
        }
    }
}
