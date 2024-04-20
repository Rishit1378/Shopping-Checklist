document.addEventListener("DOMContentLoaded", function () {
  // Function to handle adding items to the list
  var callback = function (event) {
    event.preventDefault();
    // Retrieve input value and determine list type (Need or Have)
    var input = document.querySelector("input[type=text][name=item]"),
      value = input.value,
      need = event.target.id === "addNeed",
      item = document.createElement("li"),
      checkbox = document.createElement("input"),
      textNode = document.createTextNode(value),
      deleteLink = document.createElement("a"),
      list = need
        ? document.querySelector("ul:first-of-type")
        : document.querySelector("ul:last-of-type");

    checkbox.type = "checkbox";
    checkbox.name = "item";
    item.appendChild(checkbox);
    item.appendChild(textNode);
    deleteLink.href = "#";
    deleteLink.innerHTML = "&#10006;";
    deleteLink.addEventListener("click", function (event) {
      event.preventDefault();
      event.target.parentNode.remove(); // Remove the entire list item
    });
    item.appendChild(deleteLink);

    input.value = ""; // Clear input field
    input.focus(); // Focus back on the input field

    if (value === "") return; // Ignore empty input

    if (!need) {
      checkbox.checked = true; // If item is 'Have', mark it checked
    }
    list.appendChild(item); // Append item to the respective list

    // Attach event listener for moving items between lists to the newly added checkbox
    checkbox.addEventListener("click", function (event) {
      var listItem = event.target.parentNode,
        list = event.target.checked
          ? document.querySelector("ul:last-of-type")
          : document.querySelector("ul:first-of-type");
      list.appendChild(listItem); // Move the item's <li> to the appropriate list
    });
  };

  // Event listeners for adding items
  document.getElementById("addHave").addEventListener("click", callback);
  document.getElementById("addNeed").addEventListener("click", callback);

  // Attach event listener for deleting items to existing delete links
  document.querySelectorAll("ul li a").forEach(function (deleteLink) {
    deleteLink.addEventListener("click", function (event) {
      event.preventDefault();
      event.target.parentNode.remove(); // Remove the entire list item
    });
  });

  // Event listener for moving items between lists for existing checkboxes
  document
    .querySelectorAll("input[type=checkbox]")
    .forEach(function (checkbox) {
      checkbox.addEventListener("click", function (event) {
        var listItem = event.target.parentNode,
          list = event.target.checked
            ? document.querySelector("ul:last-of-type")
            : document.querySelector("ul:first-of-type");
        list.appendChild(listItem); // Move the item's <li> to the appropriate list
      });
    });
});
