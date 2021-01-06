// Автозагрузка данных при загрузке страницы
$(document).ready(
    updateTable()
)

// Подгрузка данных в таблицу
function updateTable() {
    // Чистим таблицу перед новой загрузкой
    $('table tbody tr').remove();
    $.getJSON("http://localhost:8080/api/products", function (data) {
        var row_data = '';
        /*Заполняем строку данными*/
        $.each(data, function (index, value) {
            row_data += '<tr  data-toggle="modal" data-target="#editModal" data-whatever="' + value.id + '">';
            row_data += '<td>' + value.id + '</td>';
            row_data += '<td>' + value.title + '</td>';
            row_data += '<td>' + value.description + '</td>';
            row_data += '</tr>'

        });
        $("#productList").append(row_data);
    })
}

// Подгрузка данных в таблицу для поиска с параметром поиска
function updateTableWithParam(str) {
    /*Чистим таблицу перед новой загрузкой*/
    $('table tbody tr').remove();
    $.getJSON("http://localhost:8080/api/products?title=" + str, function (data) {
        var row_data = '';
        /*Заполняем строку данными*/
        $.each(data, function (index, value) {
            row_data += '<tr  data-toggle="modal" data-target="#editModal" data-whatever="' + value.id + '">';
            row_data += '<td>' + value.id + '</td>';
            row_data += '<td>' + value.title + '</td>';
            row_data += '<td>' + value.description + '</td>';
            row_data += '</tr>'

        });
        $("#productList").append(row_data);
    })
}


/*Модальное окно для редактирования*/

$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var temp = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    $(document).ready(function () {
        $.getJSON("http://localhost:8080/api/products/" + temp, function (data) {
            modal.find('.modal-title').text('Карточка продукта: ' + data.title)
            modal.find('.modal-body input').val(data.title)
            modal.find('.modal-body textarea').val(data.description)
            $('#deleteButton').click(function () {
                removeProduct(data.id);
            })
            $('#editButton').click(function () {
                editProduct(data.id);
            })
        })
    })
})

/*Отправляем запрос на создание продукта*/
$(document).ready(function () {
    $('#addForm').submit(function (event) {

        event.preventDefault();
        var product = {
            title: $("#title").val(),
            description: $("#description").val()
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/products/",
            data: JSON.stringify(product),
            contentType: "application/json;",
            dataType: "json",
            cache: false,
            processData: false,

            success: function (result) {
                updateTable();
                $(".modal").modal("hide");
                $(".modal-body input").val('');
                $(".modal-body textarea").val('');

            },
        });

    });
})

// Удаление продуктов
function removeProduct(str) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/products/" + str,
        data: {_method: 'delete'},
        contentType: "application/json;",

        success: function (result) {
            updateTable();
            $(".modal").modal("hide");
            $(".modal-body input").val('');
            $(".modal-body textarea").val('');
        },
    });

}


// Редактирование описания продукта
function editProduct(str) {
        $("#editForm").submit(function (event) {
            /*Отправляем запрос на создание продукта*/
            event.preventDefault();
            var product = {
                title: $("#editTitle").val(),
                description: $("#editDescription").val()
            }
            $.ajax({
                type: "PATCH",
                url: "http://localhost:8080/api/products/" + str,
                data: JSON.stringify(product),
                contentType: "application/json;",
                cache: false,
                processData: false,

                success: function (result) {
                    updateTable();
                    $(".modal").modal("hide");
                    $(".modal-body input").val('');
                    $(".modal-body textarea").val('');

                },
            });
        });
}


// Очищаем содержимое поиска, после подгружаем список продуктов
$('#clearButton').click(function () {
    $('#searchProduct').val('');
    updateTable();
});

// Вешаем на поиск продуктов задержку запросов
$('#searchProduct').keyup(delay(function (e) {
    updateTableWithParam(this.value);
}, 500));

// Функция задержки запроса
function delay(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}
