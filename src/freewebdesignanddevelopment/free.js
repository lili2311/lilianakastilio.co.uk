function init() {
  window.addEventListener('scroll', function(e){
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
        shrinkOn = 200,
        header = document.querySelector("header");
    if (distanceY > shrinkOn) {
      header.setAttribute("class","smaller");
    } else {
        header.removeAttribute("class");
    }
  });
}
function supports_input_placeholder() {
        var i = document.createElement('input');
        return 'placeholder' in i;
    }

if (!supports_input_placeholder()) {
    var fields = document.getElementsByTagName('INPUT');
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].hasAttribute('placeholder')) {
            fields[i].defaultValue = fields[i].getAttribute('placeholder');
            fields[i].onfocus = function () { if (this.value == this.defaultValue) this.value = ''; }
            fields[i].onblur = function () { if (this.value == '') this.value = this.defaultValue; }
        }
    }
}
window.onload = init();

