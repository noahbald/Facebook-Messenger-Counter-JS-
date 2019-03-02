var dropdown_list = null;

function dropdownOnClick(id)
{
    if (dropdown_list != null)
    {
        dropdown_list.classList.add("hidden");
    }
    document.getElementById(id).classList.remove("hidden");
    dropdown_list = document.getElementById(id);
}

window.onclick = function(e)
{
    if (dropdown_list != null)
    {
        var target = e.target;
        if (target != dropdown_list)
        {
            dropdown_list.classList.toggle("hidden");
            while (target = target.parentElement) {
                targetChildren = target.children
                for (var i=0; i<targetChildren.length; i++)
                {
                    if (targetChildren[i] == dropdown_list)
                    {
                        dropdown_list.classList.toggle("hidden");
                    }
                }
            }
        }
    }
}
