window.onload = function () {

    var i = 0;
    var columnCounter = 1;
    var rowCounter = 0;
    currentRow = null;
    var cloning = true;
    var deleting = false;
    var compilerSwitchArray = [];
    var compilerSwitchValue = [];
    var convertedTextArray = [];
    var temporaryArray = [];
    var nameOfProjectArray = [];
    var output = "";

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
        var new_Input = "<th id='input" + columnCounter + "'>Option" + columnCounter + "</th>";
        var new_ToggleButton = "<th><input type='checkbox' id='toggleButton" + columnCounter + "' checked></th>";



        $("th#addColumn").before(new_Input);
        $("#enabledDisabled").before(new_ToggleButton);
        updateRows();
        updateToggle();

        $("#converToTextTd").before("<td></td>");

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
        var $thAtt = $("#stringOrBinary").children("th");

        $thAtt.each(function () {
            if ($(this).attr("id") != "enabledDisabled" && $(this).attr("id") != "toggleNotChange") {
                if (buttonState) {
                    $(this).children("div").addClass("disabled", true);
                    $("[id*=toggleButton]").attr("disabled", true);
                    $("[id=addInput]").attr("disabled", true);
                    $("[id=addRow]").attr("disabled", true);
                    $("[id=convertToText]").attr("disabled", true);
                    $("[id*=Button]").attr("disabled", true);
                    //$("[id*=button]").attr("disabled", true);
                } else {
                    $(this).children("div").removeClass("disabled", false);
                    $("[id*=toggleButton]").attr("disabled", false);
                    $("[id=addInput]").attr("disabled", false);
                    $("[id=addRow]").attr("disabled", false);
                    $("[id=convertToText]").attr("disabled", false);
                    $("[id*=cloneButton]").attr("disabled", false);
                    $("[id*=deleteButton]").attr("disabled", false);
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
                    updateValuesAndIds($(this), newRowNumber, deleting);
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

    $(document).on('click', '#convertToText', function () {

        $("#output").html("");

        // Clearing Arrays
        compilerSwitchArray.length = 0;
        compilerSwitchValue.length = 0;
        convertedTextArray.length = 0;
        nameOfProjectArray.length = 0;
        temporaryArray.length = 0;

        var nameOfProject = "";

        $("#compilerSwitches").children("th").each(function () {
            if ($(this).attr("id") == "addColumn") {
                return false;
            }
            compilerSwitchArray.push($(this).html());


            //console.log($(this).html());                                          // Compiler Switches Names

        });
        if (rowCounter > 0) {
            temporaryArray.length = 0;
            $("[id*=subProjectRow]").each(function () {
                $(this).children("td").each(function () {
                    if ($(this).children().length == 0) {                               //Row String Values
                        //console.log($(this).html());
                        temporaryArray.push($(this).html());
                    } else {                                                            //Row TRUE FALSE NULL Values
                        $(this).children("div").children("label").each(function () {
                            if ($(this).hasClass("active")) {
                                if ($(this).children("input").attr("value") == 0) {
                                    temporaryArray.push("FALSE");
                                    //console.log("false");
                                } else if ($(this).children("input").attr("value") == 1) {
                                    temporaryArray.push("NULL");
                                    //console.log("null");
                                } else {
                                    temporaryArray.push("TRUE");
                                    //console.log("true");
                                }
                            }
                        });
                    }
                });
                compilerSwitchValue[compilerSwitchValue.length] = [...temporaryArray];
                temporaryArray.length = 0;

            });
            /*compilerSwitchValue.forEach(function (element) {
                console.log("value -> " + element);
            });*/
        }

        compilerSwitchValue.forEach(function (innerArray, index) {
            var compilerOption = "";
            innerArray.forEach(function (param, indexOfInnerArray) {
                if (param != "NULL") {
                    compilerOption = compilerOption + "-d" + compilerSwitchArray[indexOfInnerArray] + "=" + param + " ";
                }

                if (indexOfInnerArray == innerArray.length - 1) {
                    compilerOption = compilerOption.slice(0, -1);
                }


                if (indexOfInnerArray == 0) {
                    nameOfProject = nameOfProject + param + "_";
                } else if ((param == "TRUE") && (indexOfInnerArray != compilerSwitchArray.length - 1)) {
                    nameOfProject = nameOfProject + compilerSwitchArray[indexOfInnerArray].slice(0, 4) + "_";
                } else if (indexOfInnerArray == compilerSwitchArray.length - 1) {
                    if (param == "TRUE") {
                        nameOfProject = nameOfProject + compilerSwitchArray[indexOfInnerArray].slice(0, 4) + "_";
                    }

                    if (compilerSwitchValue[index][1] != "TRUE" && compilerSwitchValue[index][1] != "NULL" && compilerSwitchValue[index][1] != "FALSE") {
                        nameOfProject = nameOfProject + compilerSwitchValue[index][1];
                        //console.log(compilerSwitchValue[index][1]);
                    } else {
                        nameOfProject = nameOfProject.slice(0, -1);
                    }
                }

                //temporaryArray.push(compilerOption);
                //console.log("array -> " + param);
            });
            nameOfProjectArray.push(nameOfProject);
            convertedTextArray.push(compilerOption);
            nameOfProject = "";
        });

        //console.log("array -> " + nameOfProjectArray);
        convertedTextArray.forEach(function (element, index) {

            /*if (index == 0){
                output = "'";
            } else if (index == convertedTextArray.length - 1){

            }*/
            output = output + "'" + element + "' : '" + nameOfProjectArray[index] + "'";
            if (index != convertedTextArray.length - 1)
                output = output + ",<br>";
        });

        var outputHtml = `
        <table id="outputForm" data-toggle="table" class=" table table-hover" width="100%" cellspacing="0"
            style="border: 1px; height:10px; min-width:600px; max-width:1720px; width:auto; margin:auto;">
            <thead style="background-color:#CCE5FF">
                <tr>
                    <th ><span class="align-middle">Output</span>
                    <button type="button" class="btn btn-light float-right" title="Copy to clipboard" style="display: inline-block;vertical-align: middle;" id="copy-button">
                        <svg class="icon" style="width:12px;height:12px;" viewBox="0 0 24 24">
                            <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
                        </svg>
                    </button>
                   </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="outputCopy">`+ output +`</td>
                </tr>
            </tbody>
        </table>
        `;
        if ($("#outputForm").length){
            $("#outputForm").remove();
        }
        $("#chargestableForm").after(outputHtml);
        //console.log(output);
        //$('#copy-button').tooltip();

    });

    $(document).on('click', '#copy-button',function () {
        var $temp = $("<textarea>");
        var brRegex = /<br\s*[\/]?>/gi;
        $("body").append($temp);
        $temp.val($("#outputCopy").html().replace(brRegex, "\r\n")).select();
        document.execCommand("copy");
        $temp.remove();
    });
    
}