$(document).ready(function () {
    $('#add-question-button').click(function () {
        // Clone the question card template and append it to the question row
        const questionCardTemplate = $('#question-card-template').html();
        $('#question-row').append(questionCardTemplate);
        $(this).hide();
    });
    $('#deactivate-test').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: deactivate_test_url,
            data: {
                test: testId,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (response) {
                alert(response.message);
                window.location.reload();
            },
            error: function (xhr, errmsg, err) {
                alert('Error deactivating test!');
            }
        });
    });

    $(document).on('submit', '#add-question-form', function (e) {
        e.preventDefault();

        // Collect form data
        const text = $('#text').val();
        const image = $('#image').prop('files')[0];
        const explanation = $('#explanation').val();
        const points = $('#points').val();
        const isOpenQuestion = $('#open-question').prop('checked');
        const optionA = $('#option_a_text').val();
        const optionB = $('#option_b_text').val();
        const optionC = $('#option_c_text').val();
        const optionD = $('#option_d_text').val();
        const correctOptionA = $('#option_a_correct').prop('checked');
        const correctOptionB = $('#option_b_correct').prop('checked');
        const correctOptionC = $('#option_c_correct').prop('checked');
        const correctOptionD = $('#option_d_correct').prop('checked');


        // Send AJAX request
        $.ajax({
            type: 'POST',
            url: createQuestionUrl,
            data: {
                test: testId,
                text: text,
                image: image,
                explanation: explanation,
                points: points,
                isOpenQuestion: isOpenQuestion,
                optionA: optionA,
                optionB: optionB,
                optionC: optionC,
                optionD: optionD,
                correctOptionA: correctOptionA,
                correctOptionB: correctOptionB,
                correctOptionC: correctOptionC,
                correctOptionD: correctOptionD,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (response) {
                alert('Question created successfully!');
                window.location.reload();
            },
            error: function (xhr, errmsg, err) {
                alert('Question creating test!');
            }
        });
    });

    // Event listener for the delete test button
    $('#delete-test-button').click(function () {
        // var testId = $(this).data('test-id');

        // Send AJAX request to delete the test
        $.ajax({
            type: 'POST',
            url: delete_test_url,
            data: {
                test: testId,
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (response) {
                if (response.success) {
                    // Redirect to the desired page upon successful deletion
                    window.location.href = test_list_url;
                } else {
                    // Display error message without leaving the current page
                    alert('Error: ' + response.error);
                }
            },
            error: function (xhr, errmsg, err) {
                // Display error message without leaving the current page
                alert('Error: Failed to delete test');
            }
        });
    });
    // Event listener for the delete test button
    $('#delete-question-button').click(function () {
        // var testId = $(this).data('test-id');
        const questionId = $(this).data('question-id');
        // Send AJAX request to delete the test
        $.ajax({
            type: 'POST',
            url: delete_question_url,
            data: {
                test: testId,
                question_id: questionId,
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (response) {
                if (response.success) {
                    alert('Question Deleted Successfully')
                    window.location.reload()
                } else {
                    alert('Error: ' + response.error);
                }
            },
            error: function (xhr, errmsg, err) {
                // Display error message without leaving the current page
                alert('Error: Failed to delete test');
            }
        });
    });

})
;

document.addEventListener('DOMContentLoaded', function () {
    const optionCheckboxes = document.querySelectorAll('.option-checkbox');

    optionCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                // Uncheck all other checkboxes
                optionCheckboxes.forEach(function (otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

});

