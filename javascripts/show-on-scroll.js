// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

// sets 'scroll' variable = to either requestAnimationFrame or this func
var scroll = window.requestAnimationFrame || 
            function (callback)
            {
                window.setTimeout(callback, 1000/60)
            };

function loop () {
    elementsToShow.forEach(function (element) {
        if (isElementInViewport(element))
        {
            element.classList.add('is-visible');
        }
        else
        {
          if(!element.classList.contains("stay"))
          {
            element.classList.remove('is-visible');
          }
            
        }
    });
    scroll(loop); //passes function as callback (called every window refresh or requestAnimationFrame)
}


// all elements with class "show-on-scroll" as array
var elementsToShow = document.querySelectorAll('.show-on-scroll');
console.log(elementsToShow);
// call element for the first time
loop();
