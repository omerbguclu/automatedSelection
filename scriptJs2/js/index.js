window.onload = function () {

    var i = 0;
    var columnCounter = 1;
    var rowCounter = 0;
    currentRow = null;

    var tripleStateButton = `
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-info btn-sm" name="labels">
            <input type="radio" name="options" id="option1" value=0 autocomplete="off" checked> FALSE
        </label>
        <label class="btn btn-info btn-sm active" name="labels">
            <input type="radio" name="options" id="option2" value=1 autocomplete="off"> NULL
        </label>
        <label class="btn btn-info btn-sm" name="labels">
            <input type="radio" name="options" id="option3" value=2 autocomplete="off"> TRUE
        </label>
    </div>
    `;

    $(document).on('click', 'button#addInput', function () {
        var new_Input = "<th id='input" + columnCounter + "'>MaxAmmount" + columnCounter + "</th>";
        var new_ToggleButton = "<th><input type='checkbox' id='toggleButton" + columnCounter + "' checked></th>";



        $("th#addColumn").before(new_Input);
        $("#enabledDisabled").before(new_ToggleButton);
        updateRows();
        updateToggle();

        columnCounter++;
    });

    $(document).on('click', 'button#addRow', function () {
        var edited_Input = " ";

        $("#rowCopyorClone").before('<tr id="subProjectRow' + rowCounter++ + '">');
        var currentRow = $('[id=subProjectRow' + (rowCounter - 1) + ']')
        for (let index = 0; index < columnCounter; index++) {
            var columnState = $("[id=toggleButton" + index + "]").is(":checked");
            if (columnState) {
                edited_Input = '<td id="td' + index + '">' + tripleStateButton + '</td>';
            } else {
                edited_Input = '<td id="td' + index + '">' + index + '</td>';
            }
            currentRow.append(edited_Input);
            //console.log(edited_Input);
        }

    });

    $(function () {
        $(document).on('dblclick', '[id*=input]', function (e) {
            e.stopPropagation(); //<-------stop the bubbling of the event here
            var currentEle = $(this);
            var value = $(this).html();
            updateVal(currentEle, value);
        });
    });

    /*$(document).on('change', '[id*=toggleButton]', function () {
        $("[id *= toggleButton]").each(function(){
            console.log($(this).is(":checked"));
        });
    });*/

    function updateVal(currentEle, value) {
        $(currentEle).html('<input class="thVal" type="text" value="' + value + '" />');
        $(".thVal").focus();
        $(".thVal").keydown(function (event) {
            if (event.keyCode == 13) {
                $(currentEle).html($(".thVal").val());
            }
        });

        /*$(document).click(function () { // you can use $('html')
            $(currentEle).html($(".thVal").val());
        });*/
    }

    function updateRows() {
        var row = $('#rowCopyorClonetBody > tr');
        var rowChilds = $('[id*=subProject]');
        var rowCount = row.length;
        var tdCount = 0;

        if (rowCount > 1) {
            rowChilds.each(function () {
                tdCount = $(this).children('td').length;
                while (tdCount < columnCounter + 1) {
                    var columnState = $("[id=toggleButton" + tdCount + "]").is(":checked");
                    console.log("[id=toggleButton" + tdCount + "]");
                    if (columnState) {
                        console.log("[id=toggleButton" + tdCount + "]");
                        edited_Input = '<td id="td' + (tdCount++) + '">' + tripleStateButton + '</td>';
                    } else {
                        console.log("passed2");
                        edited_Input = '<td id="td' + tdCount + '">' + (tdCount++) + '</td>'
                    }

                    $(this).append(edited_Input);
                }
            })
        }
    }

    $(function () {
        $('[id*=toggleButton]').bootstrapToggle({
            on: 'TRUE/FALSE',
            off: 'STRING',
            size: 'small',
            onstyle: 'warning',
            offstyle: 'info'
        });
    });

    function updateToggle() {
        $(function () {
            $('[id*=toggleButton]').bootstrapToggle({
                on: 'TRUE/FALSE',
                off: 'STRING',
                size: 'small',
                onstyle: 'warning',
                offstyle: 'info'
            });
        });
    };

    //function updateColumn(){
    $(document).on('change', '[id*=toggleButton]', function () {
        var columnNumberAttribute = $(this).attr('id');
        var columnNumberRegex = new RegExp(/(\d+)/);
        var columnNumber = columnNumberRegex.exec(columnNumberAttribute);
        var columnState = $(this).is(':checked');
        //console.log(columnState);

        var row = $('#rowCopyorClonetBody > tr');
        var rowChilds = $('[id*=subProject]');
        var rowCount = row.length;
        var tdCount = 0;



        if (rowCount > 1) {
            rowChilds.each(function () {
                tdCount = $(this).children('td').length;
                //console.log(tdCount);
                if (columnState) {
                    $(this).children('#td' + columnNumber[0] + '').html(tripleStateButton);
                } else {
                    $(this).children('#td' + columnNumber[0] + '').html("sad2");
                }
            });
        }
    });
    //};

    $(document).on('click', '[name=labels]', function () {

        var $labels = $(this).parent("div").children("label");
        var $activeButton = $(this);
        var buttonValue = $(this).children("input").val();

        var colorClasses = ["btn-danger", "btn-info", "btn-success"];

        $labels.each(function () {
            var innerButtonValue = $(this).children("input").val();
            if (buttonValue == innerButtonValue) {
                $activeButton.removeClass("btn-info").addClass(colorClasses[innerButtonValue]);
            } else {
                console.log("notPassed");
                $(this).removeClass(colorClasses[innerButtonValue]).addClass("btn-info");
            }
        });

    });

    $(document).on('change', '#enabledDisabledForControl', function () {
        var buttonState = $(this).is(":checked");
        var $thAtt = $("#StringOrBinary").children("th");

        $thAtt.each(function () {
            if ($(this).attr("id") != "enabledDisabled" && $(this).attr("id") != "toggleNotChange") {
                if (buttonState) {
                    $(this).children("div").removeClass("disabled", false);
                    $("[id*=toggleButton]").attr("disabled", false);
                } else {
                    $(this).children("div").addClass("disabled", true);
                    $("[id*=toggleButton]").attr("disabled", true);
                }
            }
        });
        updataValues(buttonState);
    });

    function updataValues(buttonState) {
        var $subProjectRows = $("[id*=subProjectRow]");
        var subProjectRowCount = $subProjectRows.length;
        var $booleanStringColumns = $("[id*=toggleButton] , #toggleNotChange");

        $booleanStringColumns.each(function () {
            if ($(this).attr("id") == "toggleNotChange") {
                $subProjectRows.each(function () {
                    var currentElement = $(this).find("td:first-child");
                    console.log(currentElement.attr("id"));
                    var value = currentElement.html();
                    if (buttonState) {
                        currentElement.html('<input class="thVal" type="text" value="' + value + '" />');
                    } else {
                        currentElement.html($(".thVal").val());
                    }
                });
            } else {
                if (!($(this).is(":checked"))) {
                    var toggleRegex = /(\d+)/.exec($(this).attr("id"));
                    var toggleCounter = parseInt(toggleRegex[0]) + 1;
                    //var value = currentElement.html();
                    $subProjectRows.each(function () {
                        var currentElement = $(this).find('td:nth-child(' + toggleCounter + ')');
                        var value = currentElement.html();
                        if (buttonState) {
                            currentElement.html('<input class="thVal" type="text" value="' + value + '" />');
                        } else {
                            currentElement.html($(".thVal").val());
                        }
                    });
                }
            }
        });
        /*

        */

    }

}