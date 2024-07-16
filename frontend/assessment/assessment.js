document.addEventListener('DOMContentLoaded', function() {
    
    var selectElement = document.getElementById('select');
    var paraElement = document.getElementById('para');
    var sentenceElement = document.getElementById('sentence');
    var wordsElement = document.getElementById('words');
    var lettersElement = document.getElementById('letters');
    var storyElement = document.getElementById('story');

  
    function hideAllTopics() {
        storyElement.style.display = 'none';
        paraElement.style.display = 'none';
        sentenceElement.style.display = 'none';
        wordsElement.style.display = 'none';
        lettersElement.style.display = 'none';
    }

    hideAllTopics();
    storyElement.style.display = 'block'; 

    
    selectElement.addEventListener('change', function() {
        hideAllTopics();

        var selectedOption = selectElement.value;
        if (selectedOption === 'para') {
            paraElement.style.display = 'block';
        } else if (selectedOption === 'sentence') {
            sentenceElement.style.display = 'block';
        } else if (selectedOption === 'words') {
            wordsElement.style.display = 'block';
        } else if (selectedOption === 'letters') {
            lettersElement.style.display = 'block';
        }
        else if (selectedOption === 'story') {
            storyElement.style.display = 'block';
        }
    });

    
    var writeElement = document.getElementById('write');
    writeElement.addEventListener('input', function() {
        
    });
});
