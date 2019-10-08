window.onload = function () {

    var i = 0;
    var columnCounter = 1;
    var rowCounter = 0;
    currentRow = null;
    var cloning = true;
    var deleting = false;

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

        $("#rowCopyorClone").before('<tr value="' + rowCounter + '" id="subProjectRow' + rowCounter++ + '">');
        var currentRow = $('[id=subProjectRow' + (rowCounter - 1) + ']')
        edited_Input =
            '<td value="' + (rowCounter - 1) + '" id="tdLast' + (rowCounter - 1) + '">' +
            '<button type="button" value="' + (rowCounter - 1) + '" id="deleteButton' + (rowCounter - 1) + '" class="btn btn-outline-danger float-right" >Delete</button>' +
            '<button type="button" value="' + (rowCounter - 1) + '" id="cloneButton' + (rowCounter - 1) + '" class="btn btn-outline-success float-right">Clone</button>' +
            '</td>';
        currentRow.append(edited_Input);
        currentRow = $("#tdLast" + (rowCounter - 1));

        for (let index = 0; index < columnCounter; index++) {
            var columnState = $("[id=toggleButton" + index + "]").is(":checked");
            if (columnState) {
                edited_Input = '<td value="' + index + '" id="td' + index + '">' + tripleStateButton + '</td>';
            } else {
                edited_Input = '<td value="' + index + '" id="td' + index + '">' + index + '</td>';
            }
            currentRow.before(edited_Input);
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

    function updateVal(currentEle, value) {
        $(currentEle).html('<input class="thVal" type="text" value="' + value + '"/>');
        $(".thVal").focus();
        $(".thVal").keydown(function (event) {
            if (event.keyCode == 13) {
                $(currentEle).html($(".thVal").val());
            }
        });
    }

    function updateRows() {
        var row = $('#rowCopyorClonetBody > tr');
        var rowChilds = $('[id*=subProject]');
        var rowCount = row.length;
        var tdCount = 0;

        if (rowCount > 1) {
            rowChilds.each(function () {
                tdCount = $(this).children('td').length - 1;
                while (tdCount < columnCounter + 1) {
                    var columnState = $("[id=toggleButton" + tdCount + "]").is(":checked");
                    if (columnState) {
                        edited_Input = '<td value="' + tdCount + '" id="td' + (tdCount++) + '">' + tripleStateButton + '</td>';
                    } else {
                        edited_Input = '<td value="' + tdCount + '" id="td' + tdCount + '">' + (tdCount++) + '</td>'
                    }

                    $("[id*=tdLast]").before(edited_Input);
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

    $(document).on('change', '[id*=toggleButton]', function () {
        var columnNumberAttribute = $(this).attr('id');
        var columnNumberRegex = new RegExp(/(\d+)/);
        var columnNumber = columnNumberRegex.exec(columnNumberAttribute);
        var columnState = $(this).is(':checked');

        var row = $('#rowCopyorClonetBody > tr');
        var rowChilds = $('[id*=subProject]');
        var rowCount = row.length;
        var tdCount = 0;

        if (rowCount > 1) {
            rowChilds.each(function () {
                tdCount = $(this).children('td').length;
                if (columnState) {
                    $(this).children('#td' + columnNumber[0] + '').html(tripleStateButton);
                } else {
                    $(this).children('#td' + columnNumber[0] + '').html("String");
                }
            });
        }
    });

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
                $(this).removeClass(colorClasses[innerButtonValue]).addClass("btn-info");
            }
        });

    });

    $(document).on('change', '#enabledDisabledForControl', function () {//Edit Button */*/
        var buttonState = $(this).is(":checked");
        var $thAtt = $("#StringOrBinary").children("th");

        $thAtt.each(function () {
            if ($(this).attr("id") != "enabledDisabled" && $(this).attr("id") != "toggleNotChange") {
                if (buttonState) {
                    $(this).children("div").addClass("disabled", true);
                    $("[id*=toggleButton]").attr("disabled", true);
                } else {
                    $(this).children("div").removeClass("disabled", false);
                    $("[id*=toggleButton]").attr("disabled", false);
                }
            }
        });
        updataValues(buttonState);
    });

    function updataValues(buttonState) {
        var $subProjectRows = $("[id*=subProjectRow]");
        var subProjectRowCount = $subProjectRows.length;
        var $booleanStringColumns = $("[id*=toggleButton] , #toggleNotChange");
        var columnCounterForEdit = 0;
        var rowCounterForEdit = 0;
        $booleanStringColumns.each(function () {
            if ($(this).attr("id") == "toggleNotChange") { // For ToggleNotChange Button Column
                $subProjectRows.each(function () {
                    var currentElement = $(this).find("td:first-child");
                    var value = currentElement.html();
                    if (buttonState) {
                        currentElement.html('<input class="thValFirst" type="text" value="' + value + '"/>');
                    } else {
                        currentElement.html($(".thValFirst").val());
                    }
                });
            } else {
                if (!($(this).is(":checked"))) { // For SubProject Rows
                    var toggleRegex = /(\d+)/.exec($(this).attr("id"));
                    var toggleCounter = parseInt(toggleRegex[0]) + 1;
                    $subProjectRows.each(function () {
                        var currentElement = $(this).find('td:nth-child(' + toggleCounter + ')');
                        var value = currentElement.html();
                        if (buttonState) {
                            currentElement.html('<input class="thVal' + (rowCounterForEdit++) + columnCounterForEdit + '" type="text" value="' + value + '"/>');
                        } else {
                            currentElement.html($(".thVal" + (rowCounterForEdit++) + columnCounterForEdit).val());
                        }
                    });
                }
            }
            columnCounterForEdit++;
        });

    }

    $(document).on('click', '[id*=clone]', function () {
        var rowNumber = $(this).val();
        selectedRow = $("#subProjectRow" + rowNumber);

        clonedRow = updateIdNumbers(rowNumber, cloning);
        selectedRow.after(clonedRow);
    });

    $(document).on('click', '[id*=delete]', function () {
        var rowNumber = $(this).val();
        selectedRow = $("#subProjectRow" + rowNumber);
        updateIdNumbers(rowNumber, deleting);
        selectedRow.remove();
    });

    function updateIdNumbers(selectedCloneButtonRowValue, booleanValue) {

        if (booleanValue) {                                                     //Cloning Row
            var clonedRow = null;
            $("[id*=subProjectRow]").each(function () {
                var eachSubProjectRowValue = $(this).attr("value");

                if (eachSubProjectRowValue == selectedCloneButtonRowValue) { // Cloning Selected Row
                    var newRowNumber = parseInt(eachSubProjectRowValue) + 1;
                    clonedRow = $(this).clone();

                    updateValuesAndIds(clonedRow, newRowNumber, cloning);
                    updateValuesAndIds(clonedRow.children('td').last(), newRowNumber, cloning);

                    clonedRow.children("td").last().children("button").each(function () {
                        updateValuesAndIds($(this), newRowNumber, cloning);
                    });

                    rowCounter++;

                } else if (eachSubProjectRowValue > selectedCloneButtonRowValue) { // Updating Other Row Values and Ids

                    var newRowNumber = parseInt($(this).attr("value")) + 1;
                    updateValuesAndIds($(this), newRowNumber, cloning);
                    updateValuesAndIds($(this).children('td').last(), newRowNumber, cloning);
                    $(this).children("td").last().children("button").each(function () {
                        updateValuesAndIds($(this), newRowNumber, cloning);
                    });
                }
            });
            return clonedRow;
        } else {                                                                //Deleting Row
            $("[id*=subProjectRow]").each(function () {
                var eachSubProjectRowValue = $(this).attr("value");

                if (eachSubProjectRowValue > selectedCloneButtonRowValue) { // Updating Other Row Values and Ids

                    var newRowNumber = parseInt($(this).attr("value")) - 1;
                    updateValuesAndIds($(this), newRowNumber,deleting);
                    updateValuesAndIds($(this).children('td').last(), newRowNumber, deleting);
                    $(this).children("td").last().children("button").each(function () {
                        updateValuesAndIds($(this), newRowNumber, deleting);
                    });
                }
            });
            rowCounter--;
        }
    }

    function getIdStringWithoutNumber(selectedObject) {
        return (/(\D+)/.exec($(selectedObject).attr("id")))[0];
    }

    function getIdNumberWithoutString(selectedObject) {
        return parseInt((/(\d+)/.exec($(selectedObject).attr("id")))[0]);
    }

    function updateValuesAndIds(selectedObject, newRowNumber, booleanValue) {
        selectedObject.attr("value", newRowNumber);//Increase subProject Value
        if (booleanValue) {
            selectedObject.attr("id", getIdStringWithoutNumber(selectedObject) + (getIdNumberWithoutString(selectedObject) + 1));//Increase subProject Id
        } else {

            selectedObject.attr("id", getIdStringWithoutNumber(selectedObject) + (getIdNumberWithoutString(selectedObject) - 1));//Increase subProject Id
        }
    }

}