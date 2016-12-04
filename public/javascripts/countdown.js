var theEl = document.querySelector('.console-container svg')
function whichAnimationEvent(){
    var a;
    var el = document.createElement('fakeelement');
    var animations = {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    }

    for(a in animations){
        if( el.style[a] !== undefined ){
            return animations[a];
        }
    }
}

var animationEvent = whichAnimationEvent();
animationEvent && theEl.addEventListener(animationEvent, function() {
    setTimeout( function() {
        type();
    }, 600);
});

var animationEventTwo = whichAnimationEvent();
animationEventTwo && document.querySelector('.output-quit').addEventListener(animationEventTwo, function() {
    setTimeout( function() {
        document.querySelector('.output-quit').innerHTML = "";
    }, 600);
});

var familiar = localStorage.getItem("kitty");

var checkText = "Are you sure? Y/N: ";
var creating = familiar ? "Error: Create process is already running..." : "Creating...";
var thinking = familiar ? "🙃" : "Taking awhile...";
var stillHere = familiar ? "Nothing is actually happening..." : "This is rather inefficient...";
var ctrlCResponse = '^C';
var ctrlC = '🐱';

var input = document.querySelector('.console');

var outputOne = document.querySelectorAll('.typing-output')[0];

var outputTwo = document.querySelectorAll('.typing-output')[1];

var outputThree = document.querySelectorAll('.typing-output')[2];

var outputFour = document.querySelectorAll('.typing-output')[3];

var outputFive = document.querySelectorAll('.typing-output')[5];

var outputDate = document.querySelector('.countdown');

var cursor = document.querySelector('.console .cursor');

var cursorPositions = document.querySelectorAll('.output-cursor');

var str = document.querySelector('.typing').getAttribute('data-text'),
    i = 0,
    isTag,
    text;

function type() {
    text = str.slice(0, ++i);
    if (text === str) return check();

    document.querySelector('.typing').innerHTML = text;

    var char = text.slice(-1);
    if( char === '<' ) isTag = true;
    if( char === '>' ) isTag = false;

    if (isTag) return type();
    setTimeout(type, 120);

    function check() {
        // Don't say I didn't warn ya
        // I want to solve interesting problems, this wasn't one of them

        cursor.innerHTML = "";
        var thisCursor = outputOne.parentElement.querySelector('.cursor');
        var nextCursor = cursorPositions[0].querySelector('.cursor');

        thisCursor.innerHTML = "|";

        setTimeout( function() {
            outputOne.innerHTML = checkText;

            setTimeout( function() {
                outputOne.innerHTML = checkText + ' Y';
                thisCursor.innerHTML = "";
                nextCursor.innerHTML = "|";

                setTimeout( function() {
                    thisCursor = nextCursor;
                    nextCursor = cursorPositions[1].querySelector('.cursor');
                    thisCursor.innerHTML = "";
                    nextCursor.innerHTML = "|";

                    setTimeout( function() {
                        thisCursor = nextCursor;
                        nextCursor = cursorPositions[2].querySelector('.cursor');
                        thisCursor.innerHTML = "";
                        nextCursor.innerHTML = "|";

                        setTimeout( function() {
                            thisCursor = nextCursor;
                            nextCursor = cursorPositions[3].querySelector('.cursor');
                            thisCursor.innerHTML = "";
                            nextCursor.innerHTML = "|";

                            setTimeout( function() {
                                thisCursor = nextCursor;
                                nextCursor = cursorPositions[4].querySelector('.cursor');
                                thisCursor.innerHTML = "";
                                nextCursor.innerHTML = "|";
                                outputTwo.innerHTML = creating;

                                setTimeout( function() {
                                    thisCursor = nextCursor;
                                    nextCursor = cursorPositions[5].querySelector('.cursor');
                                    thisCursor.innerHTML = "";
                                    nextCursor.innerHTML = "|";
                                    outputThree.innerHTML = thinking;

                                    setTimeout( function() {
                                        thisCursor = nextCursor;
                                        nextCursor = cursorPositions[6].querySelector('.cursor');
                                        thisCursor.innerHTML = "";
                                        nextCursor.innerHTML = "|";

                                        setTimeout( function() {
                                            thisCursor = nextCursor;
                                            nextCursor = cursorPositions[7].querySelector('.cursor');
                                            thisCursor.innerHTML = "";
                                            nextCursor.innerHTML = "|";
                                            outputFour.innerHTML = stillHere;

                                            setTimeout( function() {
                                                thisCursor = nextCursor;
                                                nextCursor = cursorPositions[8].querySelector('.cursor');
                                                thisCursor.innerHTML = "";
                                                nextCursor.innerHTML = "|";

                                                setTimeout( function() {
                                                    thisCursor = nextCursor;
                                                    nextCursor = cursorPositions[9].querySelector('.cursor');
                                                    thisCursor.innerHTML = "";
                                                    nextCursor.innerHTML = "|";

                                                    setTimeout( function() {
                                                        thisCursor = nextCursor;
                                                        nextCursor = cursorPositions[10].querySelector('.cursor');
                                                        thisCursor.innerHTML = "";
                                                        nextCursor.innerHTML = "|";

                                                        localStorage.setItem("kitty", "true");

                                                        function updateTimer() {
                                                            endTime = 1483414966458;
                                                            msLeft = endTime - (Date.now());
                                                            if ( msLeft > 1000 ) {
                                                                outputDate.innerHTML = msLeft;
                                                                setTimeout( updateTimer, 1000 );
                                                            }
                                                        }
                                                        updateTimer();

                                                        function quit(event) {
                                                              var evtobj = window.event? event : event
                                                              if (evtobj.keyCode == 67 && evtobj.ctrlKey)  {
                                                                  document.removeEventListener('keydown',  quit);
                                                                  outputFive.classList.add('cats');
                                                                  rainCats();
                                                                  console.log(ctrlC);

                                                                  thisCursor = nextCursor;
                                                                  nextCursor = cursorPositions[11].querySelector('.cursor');
                                                                  thisCursor.innerHTML = "";
                                                                  nextCursor.innerHTML = "|";
                                                                  outputFive.innerHTML = ctrlCResponse;
                                                              };

                                                              function rainCats() {
                                                                  str = ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC + ctrlC ;
                                                                  text = str.slice(0, ++i);
                                                                  if (text === str) return deleteCats();

                                                                  document.querySelector('.output-quit').innerHTML = text;

                                                                  document.onkeydown = escape;

                                                                  var char = text.slice(-1);
                                                                  if( char === '<' ) isTag = true;
                                                                  if( char === '>' ) isTag = false;

                                                                  if (isTag) return rainCats();
                                                                  setTimeout(rainCats, 10);

                                                                  function escape(event) {
                                                                      var evtobj = window.event? event : event
                                                                      if (evtobj.keyCode == 27)  {
                                                                          alert('There is no escape.');
                                                                      };
                                                                  }

                                                                  function deleteCats() {
                                                                      document.removeEventListener('keydown',  escape);
                                                                      document.querySelector('.output-quit').innerHTML = "";
                                                                  }

                                                              }
                                                        }

                                                        document.onkeydown = quit;

                                                    }, 5000);
                                                }, 2000);
                                            }, 1000);
                                        }, 6000);
                                    }, 2000);
                                }, 5000);
                            }, 3000);
                        }, 300);
                    }, 600);
                }, 300);
            }, 600);
        }, 2000);
    }
};
