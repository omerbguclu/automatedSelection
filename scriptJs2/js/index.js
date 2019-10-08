window.onload = function () {

    var i = 0;
    var columnCounter = 1;
    var rowCounter = 0;
    currentRow = null;
    var increasing = true;
    var decreasing = false;

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

        $("#rowCopyorClone").before('<tr value=' + rowCounter + ' id="subProjectRow' + rowCounter++ + '">');
        var currentRow = $('[id=subProjectRow' + (rowCounter - 1) + ']')
        edited_Input =
            '<td value="' + (rowCounter - 1) + '" id="tdLast' + (rowCounter - 1) + '">' +
            '<button type="button" value=' + (rowCounter - 1) + ' id="deleteButton' + (rowCounter - 1) + '" class="btn btn-outline-danger float-right" >Delete</button>' +
            '<button type="button" value=' + (rowCounter - 1) + ' id="cloneButton' + (rowCounter - 1) + '" class="btn btn-outline-success float-right">Clone</button>' +
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
        $(currentEle).html('<input class="thVal" type="text" value=' + value + '/>');
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
                tdCount = $(this).children('td').length - 1;
                while (tdCount < columnCounter + 1) {
                    var columnState = $("[id=toggleButton" + tdCount + "]").is(":checked");
                    //console.log("[id=toggleButton" + tdCount + "]");
                    if (columnState) {
                        //console.log("[id=toggleButton" + tdCount + "]");
                        edited_Input = '<td value="' + tdCount + '" id="td' + (tdCount++) + '">' + tripleStateButton + '</td>';
                    } else {
                        //console.log("passed2");
                        edited_Input = '<td value="' + tdCount + '" id="td' + tdCount + '">' + (tdCount++) + '</td>'
                    }

                    $("[id*=tdLast]").before(edited_Input);

                    /*if (tdCount == columnCounter + 1) {
                        edited_Input =
                            '<td id="td' + tdCount + '">' +
                            '<button type="button" id="td' + tdCount + '" class="btn btn-outline-success">Clone</button>' +
                            '<button type="button" id="td' + tdCount + '" class="btn btn-outline-danger" >Delete</button>' +
                            '</td>';
                        $(this).append(edited_Input);
                    }*/
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
                    $(this).children('#td' + columnNumber[0] + '').html("String");
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
                //console.log("notPassed");
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
        var columnCounterForEdit = 0;
        var rowCounterForEdit = 0;
        $booleanStringColumns.each(function () {
            if ($(this).attr("id") == "toggleNotChange") { // For ToggleNotChange Button Column
                $subProjectRows.each(function () {
                    var currentElement = $(this).find("td:first-child");
                    //console.log(currentElement.attr("id"));
                    var value = currentElement.html();
                    if (buttonState) {
                        currentElement.html('<input class="thValFirst" type="text" value=' + value + '/>');
                    } else {
                        currentElement.html($(".thValFirst").val());
                    }
                });
            } else {
                if (!($(this).is(":checked"))) { // For SubProject Rows
                    var toggleRegex = /(\d+)/.exec($(this).attr("id"));
                    var toggleCounter = parseInt(toggleRegex[0]) + 1;
                    //var value = currentElement.html();
                    $subProjectRows.each(function () {
                        var currentElement = $(this).find('td:nth-child(' + toggleCounter + ')');
                        var value = currentElement.html();
                        if (buttonState) {
                            currentElement.html('<input class="thVal' + (rowCounterForEdit++) + columnCounterForEdit + '" type="text" value=' + value + '/>');
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
        var newRowNumber = parseInt(rowNumber) + 1;
        selectedRow = $("#subProjectRow" + rowNumber);
        //clonedRow = $("#subProjectRow" + $(this).val()).clone();
        //console.log(clonedRow.attr("id"));
        //clonedRow.attr("id","subProjectRow" + newRowNumber)
        //console.log(clonedRow.attr("id"));
        //selectedRow.after(clonedRow);
        //columnCounter++;
        /*console.log("RowNumber is -> " + rowNumber + "\n");
        console.log("NewRowNumber is -> " + newRowNumber + "\n");
        console.log("selectedRow is -> " + selectedRow.attr("id") + "\n");*/

        clonedRow = updateIdNumbers(rowNumber, increasing);
        selectedRow.after(clonedRow);
        //console.log(clonedRow + "\n");

    });
    $(document).on('click', '[id*=delete]', function () {
        console.log("deletelendin -> " + $(this).attr("id"));
    });

    function updateIdNumbers(selectedCloneButtonRowValue, booleanValue) {

        if (booleanValue) {
            var clonedRow = null;
            $("[id*=subProjectRow]").each(function () {
                var eachSubProjectRowValue = $(this).attr("value");
                //console.log(eachSubProjectRowValue+"\n");

                if (eachSubProjectRowValue == selectedCloneButtonRowValue) {
                    var newRowNumber = parseInt(eachSubProjectRowValue) + 1;
                    clonedRow = $(this).clone();
                    updateValuesAndIds(clonedRow, newRowNumber);



                    //console.log("value is ->->-> "+$(this).attr("value"));
                    //console.log("id is ->->-> " +$(this).attr("id"));
                    updateValuesAndIds(clonedRow.children('td').last(), newRowNumber);

                    /*clonedRow.children('td').each(function () {
                        console.log("new value is ->->-> " + $(this).attr("value"));
                        console.log("new id is ->->-> " + $(this).attr("id"));                        
                    });*/

                    //console.log(clonedRow.children("td").last().attr("id"));
                    clonedRow.children("td").last().children("button").each(function () {
                        //console.log($(this).attr("id"));
                        //console.log($(this).attr("value"));
                        updateValuesAndIds($(this), newRowNumber);
                    });
                    //console.log(clonedRow.children("td").last().attr("id"));
                    //console.log(clonedRow);

                    /*clonedRow.children("td").last().children("button").each(function () {
                        console.log($(this).attr("id"));
                        console.log($(this).attr("value"));
                    });*/

                    //console.log($(clonedRow).attr("id"));
                    //console.log($(clonedRow).attr("value"));
                    rowCounter++;

                } else if (eachSubProjectRowValue > selectedCloneButtonRowValue) {
                    console.log(eachSubProjectRowValue + " \n");
                    console.log(selectedCloneButtonRowValue);

                    var newRowNumber = parseInt($(this).attr("value")) + 1;
                    updateValuesAndIds($(this), newRowNumber);
                    updateValuesAndIds($(this).children('td').last(), newRowNumber);
                    $(this).children("td").last().children("button").each(function () {
                        updateValuesAndIds($(this), newRowNumber);
                    });

                }
            });
            return clonedRow;
        } else {

        }


    }

    function getIdStringWithoutNumber(selectedObject) {
        return (/(\D+)/.exec($(selectedObject).attr("id")))[0];
    }

    function getIdNumberWithoutString(selectedObject) {
        return parseInt((/(\d+)/.exec($(selectedObject).attr("id")))[0]);
    }

    function updateValuesAndIds(selectedObject, newRowNumber) {
        selectedObject.attr("value", newRowNumber);//Increase subProject Value
        selectedObject.attr("id", getIdStringWithoutNumber(selectedObject) + (getIdNumberWithoutString(selectedObject) + 1));//Increase subProject Id
    }

}