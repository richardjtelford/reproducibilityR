document.addEventListener('DOMContentLoaded', function() {
  TableOfContents();
}
);                        

function TableOfContents(container, output) {

var output = output || '#toc';

// Get all elements with class: section or subsection
idfromclass = document.querySelectorAll('.section, .subsection');

    // Create the list element:
    var list = document.createElement('ul');

    // Iterate through all found elements
    for(var i = 0; i < idfromclass.length; i++) {
      
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        var id = idfromclass[i].id
        
        // Replace - in id with whitespace
        var titleText = id.replace(/-/gi, " ");
        
        // Add text to list element
        item.appendChild(document.createTextNode(titleText));
        
        // Add subsection class
        item.className = idfromclass[i].className
        
        // Add it to the list:
        list.appendChild(item);
    }

// Return generated HTML to toc div in slide
document.querySelector(output).innerHTML = list.innerHTML;

// Generate instruction message if no classes are defined
if (idfromclass.length == 0) { document.querySelector(output).innerHTML = "Add {.section} or {.subsection} to slide name to generate TOC"; }  

};
