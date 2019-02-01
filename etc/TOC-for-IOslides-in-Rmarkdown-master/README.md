# TOC for IOslides in Rmarkdown

IOslides using Rmarkdown does not have the ability to add a table of content page in the YAML header. This document provides a workaround to automaticly add a TOC. By specifying section and subsection classes in the Rmd file the javascript file searches for the id's in the section classes and generates the table of content based on the name of the id's.

# Add TOC

To add the table of content to the slides, first create a new slide in Rmarkdown.

``` ## Table of content ```

Next add the following HTML to this page.

```{"HTML"}
<!-- add div element table of content for javascript to fill -->
<div id="toc"></div>
```

# Dependencies

## HTML 

In order to get the javascript to work, the dependencies must be added to the markdown document. This can be done with two methods. The first being HTML links to the ```javascript``` and ```css``` files like:

```{"HTML"}
<!-- Link to table of content javascript -->
<script language="JavaScript" src="TOC_generator.js"></script>

<!-- Link to table of content style -->
<link rel="stylesheet" type="text/css" href="toc-style.css">
```

The problem with this method is that the parsed HTML file stays dependent on the external files and is therefore not self contained.

## YAML

An ugly workaround for this problem is to specify the dependencies in the YAML header of the Rmarkdown file:

```{"YAML"}
---
output:
  ioslides_presentation:
    css: toc-style.css
    includes:
      in_header: TOC_generator.js.wrapper
    self_contained: true
---
```

In order to include a ```.js``` file it needs to be wrapped in ```HTML <script>```
elements. I therefore created the ```TOC_generator.js.wrapper``` file, but this is very ugly.

# Javascript

Now that the link to the javascript file has been added to the Rmarkdown slide we need to also add the file itself, by adding it to the working directory of your ``` .rmd ``` file.

# CSS

Some basic styles have been added in the ``` TOC-style.css ``` file.

```{"CSS"}
li.section { color: black; }

li.subsection {font-size: .95em; 
               list-style-type:circle;
}
```

This file also needs to be added to the working directory.

# Add sections

To add a section that you want displayed in the table of content all you have to do is add a ``` .section ``` or ``` .subsection ``` class to the header of the slide.

This can be done by adding ``` {.section} ``` or ``` {.subsection} ``` after the heading.

```{"markdown"}
# Your heading one name {.section}

## Your heading two name {.subsection}
```

# Limitations

## Lowercase

The table of content can only be displayed in lowercase. This is due to the javascipt using the ellement id for retrieving the title text of the section. This variable only contains lowercase letters.

## No links

It would be nice if the table of content also had links to the referenced slides. Unfortunately linking to id text does not seem to work.

Linking to page id numbers does work. But the slide number is not available through the used method: 

```{"javascirt"}
document.querySelectorAll('.section, .subsection')
```

## Two levels

Only two levels are available to use in the table of content. This seems to be caused by the Rmarkdown header 3 not allowing to define a class.

```{"markdown"}
### Your heading three name {.subsubsection}
```

The above code does not seem to result in an HTML element containing the ``` .subsubsection ``` class.

# Example

A working axample of the ```toc-example.Rmd``` file can be seen on [Rpubs](http://rpubs.com/ShKlinkenberg/TOC-for-IOslides-in-Rmarkdown)
