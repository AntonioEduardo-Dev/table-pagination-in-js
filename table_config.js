//carregar e exibir modal
$("#modal_carrengando").modal('show');

//fechar paginacao
$('div #paginationExibir').hide();

//iniciar a paginacao
setTimeout( function() {
    iniciarPor(5);
    esconderCarregar();
},1000)

habilitarTabela();

//funcao de pegar estrutura da tabela
function habilitarTabela(){
    var divSelecionar = `
        <p class="ml-3 mt-1 select_number_rows">Exibir:</p>
        <select name="state" id="maxRowsResults" class="form-control col-md-1 mr-md-auto ml-3 mr-3 mb-2 select_number_rows">
            <option value="5" selected>5</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="100">100</option>
        </select>`;

    var divPesquisar = `
        <input type="text" id="btn_de_busca" placeholder="Buscar: " class="col-md-3 ml-md-auto form-control rounded mb-3 mr-3 ml-3">`;

    var divPagination = `
        <div class="col">
            <div class="row justify-content-center">
                <div class="btn-group" role="group">
                    <button class="btn" style='background: #FF1E0C; color: white;' id="primeiroResult" name="buttonprimeiro" disabled>
                        <span class="glyphicon glyphicon-chevron-right">
                        </span>
                        <i class="fas fa-chevron-left"></i>
                        <i class="fas fa-chevron-left"></i>
                    </button>

                    <button class="btn" style='background: #FF1E0C; color: white;' id="Previous" name="buttonPrevious" disabled><span
                            class="glyphicon glyphicon-chevron-right"></span><i
                            class="fas fa-chevron-left"></i></button>

                    <input type="submit" class="btn" style='background: #FF1E0C; color: white;' id="btn-info-data" value="1" disabled>

                    <button class="btn" style='background: #FF1E0C; color: white;' id="Next" name="buttonNext" disabled><i
                            class="fas fa-chevron-right"></i><span
                            class="glyphicon glyphicon-chevron-right"></span></button>

                    <button class="btn" style='background: #FF1E0C; color: white;' id="ultimoResult" name="buttonultimo" disabled>
                        <i class="fas fa-chevron-right"></i>
                        <i class="fas fa-chevron-right"></i>
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </button>
                </div>
            </div>
        </div>`;

    $('#table_top').append(divSelecionar+divPesquisar);
    $('#paginationExibir').append(divPagination);
    $('#table_top').hide();
    $('#paginationExibir').hide();
}

function tableShow() {
    $('#table_top').show('slow');
    $('#paginationExibir').show('slow');
}

function tableHide() {
    $('#table_top').hide('fast');
    $('#paginationExibir').hide('fast');
}

//funcao de fechar o modal de carregamento
function esconderCarregar(){
    $("#modal_carrengando").modal('hide');
}

//exibir linha de resultados nao encontrados
function noResults(colunas){
    var Nolinha     = "<tr id='linha_id_no_result'>";
        Nolinha    += "    <th colspan='"+colunas+"' class='text-center'>Não há resultados</th>";
        Nolinha    += "</tr>";
    
    if($('#linha_id_no_result').length == 0){
        $('#tbody').append(Nolinha).show();
    }
}

//function responsavel pela paginacao
function iniciarPor(QtdLinhas){
    var pageAtual = 1;
    var trnum = 0;
    var table = '#tabelaEstatica';
    var totalRows = $(table+' tbody tr').length;
    var totalColums = $(table+' thead th').length;

    $('.pagination').html('');
    
    if(totalRows > 5){
        tableShow();
    }else{
        tableHide();
    }

    if(totalRows == 0){
        if($('#linha_id_no_result').length > 0){
            $('#linha_id_no_result').remove();
        }

        noResults(totalColums);
    }else{

        $(table+' tr').slice(1).each(function() {
            trnum++
            if(trnum > QtdLinhas){
                $(this).hide();
            }
            if(trnum <= QtdLinhas){
                $(this).show();
            }
        })

        if (totalRows > QtdLinhas) {
            $('button[name=buttonNext]').prop('disabled', false);
            $('button[name=buttonultimo]').prop('disabled', false);
            $('button[name=buttonPrevious]').prop('disabled', true);
            $('button[name=buttonprimeiro]').prop('disabled', true);

            var pagenum = Math.ceil(totalRows/QtdLinhas);

            $('#btn-info-data').val(pageAtual+' de '+pagenum);

            $('#Previous , #Next, #primeiroResult, #ultimoResult').on('click', function(){
            var trIndex = 0;
                if (this.id == 'Previous') {

                    $('button[name=buttonNext]').removeClass('active');
                    $('button[name=buttonprimeiro]').removeClass('active');
                    $('button[name=buttonultimo]').removeClass('active');
                    $('button[name=buttonPrevious]').addClass('active');

                    if(pageAtual > 1){
                        pageAtual--;
                        $('button[name=buttonPrevious]').prop('disabled', false);
                        $('button[name=buttonprimeiro]').prop('disabled', false);
                    }else{
                        $('button[name=buttonPrevious]').prop('disabled', true);
                        $('button[name=buttonprimeiro]').prop('disabled', true);
                    }
                    if(pageAtual < pagenum){
                        $('button[name=buttonNext]').prop('disabled', false);
                        $('button[name=buttonultimo]').prop('disabled', false);
                    }else{
                        $('button[name=buttonNext]').prop('disabled', true);
                        $('button[name=buttonultimo]').prop('disabled', true);
                    }
                    if(pageAtual <= 1){
                        $('button[name=buttonPrevious]').prop('disabled', true);
                        $('button[name=buttonprimeiro]').prop('disabled', true);
                    }else{
                        $('button[name=buttonPrevious]').prop('disabled', false);
                        $('button[name=buttonprimeiro]').prop('disabled', false);
                    }

                    $('#btn-info-data').val(pageAtual+' de '+pagenum);
                    
                    $('button[name=buttonPrevious]').val(pageAtual);
                    
                }
                else if (this.id == 'Next') {

                    $('button[name=buttonPrevious]').removeClass('active');
                    $('button[name=buttonprimeiro]').removeClass('active');
                    $('button[name=buttonultimo]').removeClass('active');
                    $('button[name=buttonNext]').addClass('active');

                    pageAtual++; 
                    if(pageAtual == pagenum){
                        $('button[name=buttonNext]').prop('disabled', true);
                        $('button[name=buttonultimo]').prop('disabled', true);
                    }else{
                        $('button[name=buttonNext]').prop('disabled', false);
                        $('button[name=buttonultimo]').prop('disabled', false);
                    }

                    if(pageAtual > 1){
                        $('button[name=buttonPrevious]').prop('disabled', false);
                        $('button[name=buttonprimeiro]').prop('disabled', false);
                    }else{
                        $('button[name=buttonPrevious]').prop('disabled', true);
                        $('button[name=buttonprimeiro]').prop('disabled', true);
                    }

                    $('#btn-info-data').val(pageAtual+' de '+pagenum);
                    
                    $('button[name=buttonNext]').val(pageAtual);

                }
                else if (this.id == 'primeiroResult') {

                    $('button[name=buttonPrevious]').removeClass('active');
                    $('button[name=buttonNext]').removeClass('active');
                    $('button[name=buttonprimeiro]').addClass('active');
                    $('button[name=buttonultimo]').removeClass('active');

                    pageAtual = 1; 
                    if(pageAtual < pagenum){
                        $('button[name=buttonNext]').prop('disabled', false);
                        $('button[name=buttonultimo]').prop('disabled', false);
                    }else{
                        $('button[name=buttonNext]').prop('disabled', true);
                        $('button[name=buttonultimo]').prop('disabled', true);
                    }
                    if(pageAtual <= 1){
                        $('button[name=buttonPrevious]').prop('disabled', true);
                        $('button[name=buttonprimeiro]').prop('disabled', true);
                    }else{
                        $('button[name=buttonPrevious]').prop('disabled', false);
                        $('button[name=buttonprimeiro]').prop('disabled', false);
                    }

                    $('#btn-info-data').val(pageAtual+' de '+pagenum);

                    $('button[name=buttonNext]').val(pageAtual);

                }
                else if (this.id == 'ultimoResult') {

                    $('button[name=buttonPrevious]').removeClass('active');
                    $('button[name=buttonNext]').removeClass('active');
                    $('button[name=buttonprimeiro]').removeClass('active');
                    $('button[name=buttonultimo]').addClass('active');

                    pageAtual = pagenum;
                    
                    if(pageAtual == pagenum){
                        $('button[name=buttonNext]').prop('disabled', true);
                        $('button[name=buttonultimo]').prop('disabled', true);
                    }else{
                        $('button[name=buttonNext]').prop('disabled', false);
                        $('button[name=buttonultimo]').prop('disabled', false);
                    }
                    if(pageAtual > 1){
                        $('button[name=buttonPrevious]').prop('disabled', false);
                        $('button[name=buttonprimeiro]').prop('disabled', false);
                    }else{
                        $('button[name=buttonPrevious]').prop('disabled', true);
                        $('button[name=buttonprimeiro]').prop('disabled', true);
                    }
                    $('#btn-info-data').val(pageAtual+' de '+pagenum);

                    $('button[name=buttonNext]').val(pageAtual);

                }
                $(table+' tr').slice(1).each(function() {
                    trIndex++

                    if(trIndex > (QtdLinhas*pageAtual) || trIndex <= ((QtdLinhas*pageAtual)-QtdLinhas)){
                        $(this).hide();
                    }else{
                        $(this).show();
                    }
                })
            })
        }
        
        if(totalRows <= QtdLinhas){
            $('button[name=buttonNext]').prop('disabled', true);
            $('button[name=buttonultimo]').prop('disabled', true);
            $('button[name=buttonPrevious]').prop('disabled', true);
            $('button[name=buttonprimeiro]').prop('disabled', true);
        }
        
        if(totalRows <= QtdLinhas){
            $('div #paginationExibir').hide();
        }else{
            $('div #paginationExibir').show();
        }
    }
};

// function responsavel pela busca dos registros
$("#btn_de_busca").on("keyup", function () {
    //varialvel responsavel por armazenar o value da caixa de pesquisa
    var value = $(this).val().toLowerCase(); 

    //function responsavel por filtrar as linhas da tabela
    $("#tbody tr").filter(function () { 

        //function responsavel por exibir as linhas filtradas
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });

    //verificar se existe uma row de resultados nao encontrados
    if($('#linha_id_no_result').length > 0){
        $('#linha_id_no_result').remove();
    }

    //verificar se existe linhas visiveis
    if($("#tbody tr:visible").length == 0){

        var totalColums = $('#tabelaEstatica thead th').length;
        noResults(totalColums);
    }

    //condicao responsavel por verificar se a caixa de pesquisa esta vazia
    if($(this).val().toLowerCase() == ''){

        //condicao responsavel por verificar se o tamanho da pesquisa é a necessaria para chamar a function
        iniciarPor(parseInt($("#maxRowsResults").val()));

    }else{
        $('div #paginationExibir').hide();
    }
});

//function responsavel por verificar se houve mudança do select
$('#maxRowsResults').on('change', function () {
    if($("#btn_de_busca").val() == ''){
        //chamada de function
        iniciarPor(parseInt($(this).val()));
    }else{
        $('div #paginationExibir').hide();
    }
});

//function responsavel por verificar se houve mudança do select
$('#DadosPag').on('change', function () {
    $('#tbody tr').remove();
    iniciarPor(5);
});