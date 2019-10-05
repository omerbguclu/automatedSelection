window.onload = function () {

    var i = 0;
    var columnCounter = 1;
    var rowCounter = 0;
    currentRow = null;

    $(document).on('click', 'button#addInput', function () {
        var new_Input = "<th id='input" + columnCounter + "'>MaxAmmount" + columnCounter + "</th>";

        console.log();
        updateRows();

        $("form#chargestableForm div.col-md-12 table#charges thead tr th#addColumn").before(new_Input);

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
        var tdCount = null;
        if (rowCount > 1) {
            rowChilds.each(function () {
                tdCount = $(this).children('td').length;
                while (tdCount < columnCounter + 1){
                    $(this).append('<td id="td' + tdCount + '">' + (tdCount++) + '</td>');
                }
            })
        }
    }

}