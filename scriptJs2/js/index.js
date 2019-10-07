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

        console.log();
        updateRows();

        $("table#charges thead tr th#addColumn").before(new_Input);
        $("#StringOrBinary").append(new_ToggleButton);
        updateToggle();
        //updateColumn();

        columnCounter++;
    });

    $(document).on('click', 'button#addRow', function () {
        var edited_Input = " ";

        //$("#rowCopyorClone").before("<tr><td>dasd" + columnCounter++ + "</td></tr>");
        $("#rowCopyorClone").before('<tr id="subProjectRow' + rowCounter++ + '">');
        var currentRow = $('[id=subProjectRow' + (rowCounter - 1) + ']')
        for (let index = 0; index < columnCounter; index++) {
            edited_Input = '<td id="td' + index + '">' + index + '</td>';
            currentRow.append(edited_Input);
            console.log(edited_Input);
        }
        //$("#rowCopyorClone").before("</tr>");
        //$("form# chargestableForm div.col - md - 12 table# charges thead tr ")

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
                    $(this).append('<td id="td' + tdCount + '">' + (tdCount++) + '</td>');
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
            console.log(columnState);

            var row = $('#rowCopyorClonetBody > tr');
            var rowChilds = $('[id*=subProject]');
            var rowCount = row.length;
            var tdCount = 0;

            

            if (rowCount > 1) {
                rowChilds.each(function () {
                    tdCount = $(this).children('td').length;
                    //console.log(tdCount);
                    if(columnState){
                        $(this).children('#td' + columnNumber[0] + '').html(tripleStateButton);
                    }else{
                        $(this).children('#td' + columnNumber[0] + '').html("sad2");
                    }
                });
            }
        });
    //};

    var $labels = $('label[name="labels"]');

    $(document).on('click', '[name=labels]', function (){
        var $activeButton = $(this);
        var buttonValue = $(this).children("input").val();

        var colorClasses = ["btn-danger", "btn-info", "btn-success"];
        
        $labels.each(function (){
            var innerButtonValue = $(this).children("input").val();
            if (buttonValue == innerButtonValue){
                $activeButton.removeClass("btn-info").addClass(colorClasses[innerButtonValue]);
            }else{
                console.log("notPassed");
                $(this).removeClass(colorClasses[innerButtonValue]).addClass("btn-info");
            }
        });
        
    });

}