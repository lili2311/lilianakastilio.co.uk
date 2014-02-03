---
layout: post.html
title: Meow
tags: [css,html,forms,css,javascript,tutorial,example]
---

---
                **DRAFT****DRAFT****DRAFT****DRAFT****DRAFT****DRAFT****DRAFT****DRAFT**

Plan:

1. Intro
2. Basic html page layout (explain each tag)
3. CSS & normalize.css
4. JavaScript on the  button
---


For my first web page I wanted to create something simple, but also challenging for myself. I have created some web pages in uni, and I have attempted it a few times since, but lack of understanding was holding me back, and I found it very dicouraging not getting far. So after a couple of courses on [Codeacademy](http://www.codecademy.com/) and some patient tutoring from my boyfried (who is django developer), I finally feel like I am getting somewhere.

I have never in the past managed to use forms or manipulate data using JavaScript on a web page so these were elements I wanted to include in my first project. I should mention that I am not new to coding or scripting, but am a complete noob to web development. In the end I wanted a page that was reminisent of Lorem Ipsum text generators, but much simpler. Here is the [result](http://www.lilianakastilio.co.uk/meow/meow.html). The user can enter some text and in return get a "Meow" filled paragprah.

So how did I do it?
After some franctic googling and trying desperately to remember what I have learned in uni about HTML, I have found that we need two main things to make a webpage:

1. **HTML - HyperText Markup Language.**
    
    First thing first is to create a file ```index.html```. The basic HTML5 structure of a web page:
    
        <!DOCTYPE html>
        <html>
            <head>
                <title>Page title goes here</title>
            </head>
            <body>
            </body>
        </html>
So lets explain each tag:
    1. ```<!DOCTYPE html>``` - here we are declaring that the document contains HTML5 mark-up.
    2. ```<head>``` - here you will store links to or definitions of scripts and stylesheets. Any description of the page content goes here, such as page title. Search engines will use this to add the page to their search index. This must be the first element in the ```<html>``` element.
    3. ```<title>``` - this defines the page title, which will be shown in the browser tab or title bar.
    4. ```<body>``` - this holds the content of the HTML page. This must be the second element in the ```<html>``` element.
    
  At this stage opening ```index.html``` in the browser will produce an empty page with the tab title "Page title goes here". 

  Earlier I mentione that I wanted the page to have an input field and a button to process the input on click. Looking at the [HTML 5 Element List](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list), we can see that within the ```<form>``` we have ```<input>``` and ```<button>``` elements available to us. We will also need a ```<label>``` caption the ```<input>```. So here is them all added it:
        <!DOCTYPE html>
        <html>
            <head>
                <title>Meow</title>
            </head>
            <body>
            <div class="form-container">
                <form id="meow-form">
                    <label>Type Anything:</label>
                    <input id="meow-input" name="field" maxlength="255" type="text" autocomplete="off">
                    <button type="submit">Go!</button>
                    </form>
                </div>
            </body>
        </html>

 The form is within a container ```<div>```, it can also be called a content ```<div>```. Placing the form in the container will allow for more sophisticated CSS styling and to place the elements anywhere we want on the page with ease. There are a couple of thigs to explain here:
  1. ```class``` and ```id``` attributes. The ```class``` attribute in the ```<div>``` element assigns the element to a named class (in this case "form-container"). Multiple elements in the document can have the same class value, for any unique elements ```id``` is more appropriate. (Note: ```id``` must be unique in the document). However in this case, ```id``` could have also been used. I found a simple explanation of where to use which [here](chttp://www.impressivewebs.com/difference-class-id-css/). Both ```id``` and ```class``` are used in a selector in the stylesheet to style the elements (more on this later).
  2. ```<label>``` - simply has text to be used as caption.
  3. ```<input>``` - we have given the input an ```id``` so that it can be styled later on.
  4. ```<button>``` - setting the ```type="submit"``` will submit form data when teh button is pressed. This is the default option if nothing is specified.
 
  Loading the ```index.html``` in the browser now gives us this:

    ![](http://i.imgur.com/ExVY6i4.png)
    
  We are now ready to style the page.
    
2. **CSS - Cascading Style Sheets.**
    CSS describes how a structured element (HTML or XML) must be rendered on screen.

  CSS can be:
  
 1. *inline* - using the style attribute in HTML elements. 
 2. *internal* - using the ```<style>``` element in the ```<head>``` section.
 3. *external* - using an external ```.css``` file.
 I am putting all CSS in an external ```style.css```:

  First we can set the body of the page to have a background image:

            body {
        	    background: url(images/lined_paper.png);
            }
     
     The whole expression is a ***rule***, and ***body*** is a selector, which selects which element the rules apply to.
    
    Now we want to give the whole form a width and set the font. Earlier we have made the div that contained teh form be of class "form-container", in order to select elements of that class we have to put a ```.``` in front of the class name:
     
            .form-container {
            	margin: 90px auto;
            	width: 400px;
            	font-family: "Roboto Condensed"; 
            }
            
    We can give the input a desired width:
            
            input {
            	width: 200px;
            }
    And style the button: 
            button {
            	background-color:#ED518A;
            	height:37px;
            	border: 3px solid #fff;
            	color: #fff;
            	display: inline-block;
            }
            
 By saying display the button as an ```inline-block``` we are actually telling it to stay on the same line.  
    
 Now we need to add a line in the ```<head>```  to load the external ``.css`` file and to load the custom google font (the google font line can be generated on [Google Fonts](http://www.google.com/fonts) website):
        <head>
            <title>Meow</title>
            <link href="normalize.css" rel="stylesheet">
            <link rel="stylesheet" href="style.css">
            <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:700,400' rel='stylesheet' type='text/css'>
        </head>
 After applying all the changes, our web page should now look like this:
    ![](http://i.imgur.com/vOhv3Li.png)
    
 Trying this in a few different browsers may yeld a different result, but we can  help the page to render consistently across different browsers by using something called [Normalize.css](http://necolas.github.io/normalize.css/). You can see that I have already included normalize.css in the ```<head>``` There is also something called [reset.css](http://www.cssreset.com/), there are many different versions you can try, but [here](http://stackoverflow.com/a/8357635) an overview of the main differences between ```reset.css``` and ```normalize.css```.
 
3. **JavaScript** is an object-oriented language, widely used as a scripting language for Web pages. 
               **TO DO**   **TO DO**   **TO DO**   **TO DO**   **TO DO**   **TO DO**   **TO DO**


        <script type="text/javascript" src="meow.js"></script>
		<script type="text/javascript">
			var form = document.getElementById("meow-form");
			form.addEventListener('submit', send, true);
		</script>



 
 meow.js:

        function send(event) {
        	var input_text = document.getElementById("meow-input").value;
        	document.getElementById("meow-output").value = meow(50,input_text);
        	event.preventDefault();
        };
        
        function meow(times, input_text){
        	var output = new Array(times);
        	for (i=0; i< times; i++){
        		output[i] = " meow " + input_text; 
        	}
        	return output;
        };
**Some useful resources:**
  1. [MDN - Mozilla Developer Network](https://developer.mozilla.org/en-US/)
  2. [Can I Use...](http://caniuse.com/)
  3. [color.hailpixel.com](http://color.hailpixel.com/)
  4. [StackOverflow](http://stackoverflow.com/)
    
