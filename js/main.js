$(document).ready(function () {
    var $contentUrlBox = $('#contentUrl');

    $contentUrlBox.on('focus', function (e) {
        $(this)
            .one('mouseup', function () {
                $(this).select();
                return false;
            })
            .select();
    });

    $contentUrlBox.on('input', function () {
        var imgBox = $('#imgBox');
        var url = $(this).val();

        reset();

        if (url) {
            imgBox.attr('src', $(this).val());
            imgBox.removeClass('hidden');
            $.get('https://doorboard.herokuapp.com/head?url=' + encodeURI(url), function (response) {
                var size = parseInt(response);
                if (size === 0 || isNaN(size)) {
                    console.log('Zero or NaN size');
                    reset();
                    setResult('BAD URL', false);
                } else if (size > 3 * 1024 * 1024) {
                    console.log('Too big!');
                    setResult('TOO BIG', false);
                } else {
                    console.log('Just right!');
                    setResult('LGTM', true);
                }
            }).fail(function() {
                reset();
                setResult('BAD URL', false);
            })
        } else {
            reset();
        }
    })
});

function setResult(resultText, isGood) {
    var $resultText = $('#resultText');

    $resultText.text(resultText);

    if (isGood) {
        $resultText.removeClass('bad');
        $resultText.addClass('good');
    } else {
        $resultText.removeClass('good');
        $resultText.addClass('bad');
    }
}

function reset() {
    var $imgBox = $('#imgBox');
    var $resultText = $('#resultText');

    $imgBox.removeAttr('src');
    $imgBox.addClass('hidden');
    $resultText.removeClass('bad');
    $resultText.removeClass('good');
}

