// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');

var dados = [];

$('#enviar').on('click', function(){
	
	var formData = $("#form_indicacao").serializeArray();
	
         $.ajax({
            type: "POST",
            url: "http://191.33.228.212:3000/tab-bar/ajax/enviar_indicacao.php", 
            data: formData,            
            async: false,
            dataType: "json", 
            success: function (json) {
				alert(json.msg);
				
				$("#form_indicacao")[0].reset();
				//alert(json.msg);
				
				/*
                if(json.result == true){
                   //redireciona o usuario para pagina
                   $("#usuario_nome").html(json.dados.nome);
 
                   $.mobile.changePage("#index", {
                        transition : "slidefade"
                    });
 
                }else{
                   alert(json.msg);
                }*/
            },error: function(xhr,e,t){
                console.log(xhr.responseText);                
            }
        });
	
});

$(document).ready(function() {
	
	
	
	var storedData = myApp.formGetData('dados_usuario');
	  if(storedData) {
		dados = storedData;
	
		$('#cli_nome').val(dados[0].cli_nome.trim())
		$('#cli_cpf').val(dados[0].cli_cpf)
		$('#cli_email').val(dados[0].cli_email.trim())
		$('#cli_telefone').val(dados[0].cli_telefone)
		$('#cli_senha').val(dados[0].cli_senha.trim())
		$('#cli_senha2').val(dados[0].cli_senha.trim())
		$('#cli_cep').val(dados[0].cli_cep.trim())
		$('#cli_estado').val(dados[0].cli_estado.trim())
		$('#cli_cidade').val(dados[0].cli_cidade.trim())
		$('#cli_telefone').val(dados[0].cli_telefone.trim())
		$('#cli_banco').val(dados[0].cli_banco.trim())
		$('#cli_agencia').val(dados[0].cli_agencia.trim())
		$('#cli_conta').val(dados[0].cli_conta.trim())
		$('#ind_cliente').val(dados[0].cli_id.trim())
		
		if(dados[0].cli_fone_whats==1){
			$("#cli_fone_whats").prop('checked', true)
		}
		//alert($$("#cli_fone_whats").prop('checked', true));
		
		carrega_indicacoes();
		
	  }
	  else {
		alert('Não foram encontrados dados do usuário');
	  }
  
	$(".fone_nro").inputmask("mask", {
		mask: ["(99) 9999-9999", "(99) 99999-9999" ],
		placeholder: ""
	});

	$(".cep").inputmask("mask", {
		mask: "99999-999",
		placeholder: ""
	});
	
	$(".cpf").inputmask("mask", {
		"mask": "999.999.999-99",
		placeholder: ""
	});
});

/* LOCALIZAR DADOS DO CEP */
$('.cep').on('blur', function(){

	su = this.name.substring(0, 3);
	$("#"+su+"_cidade").val("");
	$("#"+su+"_estado").val("");

	consulta = $("#"+su+"_cep").val();
	consulta = consulta.replace('-', '');
		
	$.getScript("http://www.toolsweb.com.br/webservice/clienteWebService.php?cep="+consulta+"&formato=javascript", function(){
		cidade = resultadoCEP.cidade;
		uf = resultadoCEP.estado;
		$("#"+su+"_cidade").val(cidade)
		$("#"+su+"_estado").val(uf)
	

	});
	
});


var bancos = ['Santander','Banco do Brasil','Caixa Econômica Federal','Itaú Unibanco','SICOOB','Bradesco','Banrisul','Banco BTG Pactual','BANCOOB','Banco da Amazônia','Banese','Banpará','Banco do Nordeste','Safra','Banco Mercantil','HSBC','ParanáBanco'];

var autocompleteDropdownSimple = myApp.autocomplete({
    input: '#cli_banco',
    openIn: 'dropdown',
    source: function (autocomplete, query, render) {
        var results = [];
        if (query.length === 0) {
            render(results);
            return;
        }
		
        // Find matched items
        for (var i = 0; i < bancos.length; i++) {
            if (bancos[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(bancos[i]);
        }
        // Render items by passing array with result items
        render(results);
    }
});



$('#btn_atualizar').on('click', function(){

	if($("#cli_nome").val()==''){
		myApp.alert('Digite o seu nome','Atenção!')
		return null;		
	}

	if($("#cli_cpf").val()==''||$("#cli_cpf").val().length<14){
		myApp.alert('CPF Inválido','Atenção!')
		return null;		
	}

	if($("#cli_email").val()==''){
		myApp.alert('Digite o seu e-mail','Atenção!')
		return null;		
	}

	if($("#cli_telefone").val()==''){
		myApp.alert('Digite o seu telefone','Atenção!')
		return null;		
	}	
	
	if($("#cli_senha").val()==''){
		myApp.alert('Digite uma senha','Atenção!')
		return null;		
	}	

	if($("#cli_senha2").val()==''){
		myApp.alert('Repita a senha','Atenção!')
		return null;		
	}	

	if($("#cli_senha").val()!=$("#cli_senha2").val()){
		myApp.alert('As senhas não conferem','Atenção!')
		return null;		
	}	

	if($("#cli_estado").val()==''){
		myApp.alert('Selecione um Estado','Atenção!')
		return null;		
	}	

	if($("#cli_cidade").val()==''){
		myApp.alert('Digite a sua Cidade','Atenção!')
		return null;		
	}	


	myApp.showPreloader('Aguarde...');
	var formData = $("#form_cadastro").serializeArray();

         $.ajax({
            type: "POST",
            url: "http://191.33.228.212:3000/tab-bar/ajax/atualiza_cadastro.php", 
            data: formData,            
            async: false,
            dataType: "json", 
            success: function (json) {
				if(json.result){
					
					  var storedData = myApp.formStoreData('dados_usuario', formData);
  
					myApp.hidePreloader();
					myApp.alert(json.msg,'Sucesso!')
				}else{
					myApp.hidePreloader();
					myApp.alert(json.msg,'Atenção')
				}
            },error: function(xhr,e,t){
                console.log(xhr.responseText);                
            }
        });
	
});


$('#btn_indicar').on('click', function(){

	if($("#ind_nome").val()==''){
		myApp.alert('Digite o nome da indicação','Atenção!')
		return null;		
	}

	if($("#ind_telefone1").val()==''){
		myApp.alert('Digite o telefone','Atenção!')
		return null;		
	}	

	if($("#ind_telefone1").val()==$("#ind_telefone2").val()){
		myApp.alert('Os telefones não podem ser iguais','Atenção!')
		return null;		
	}	

	if($("#ind_estado").val()==''){
		myApp.alert('Selecione um Estado','Atenção!')
		return null;		
	}	

	if($("#ind_cidade").val()==''){
		myApp.alert('Digite a Cidade','Atenção!')
		return null;		
	}	


	myApp.showPreloader('Indicando...');
	var formData = $("#form_indicacao").serializeArray();

         $.ajax({
            type: "POST",
            url: "http://191.33.228.212:3000/tab-bar/ajax/enviar_indicacao.php", 
            data: formData,            
            async: false,
            dataType: "json", 
            success: function (json) {
				if(json.result){
					  
					myApp.hidePreloader();
					myApp.alert(json.msg,'Sucesso!')
					$("#form_indicacao")[0].reset();
				}else{
					myApp.hidePreloader();
					myApp.alert(json.msg,'Atenção')
				}
            },error: function(xhr,e,t){
                console.log(xhr.responseText);                
            }
        });
	
});



function carrega_indicacoes(){
	
			myApp.showPreloader('Carregando...');
	
	cli_id = $('#ind_cliente').val();
	
	       $.ajax({
            type: "POST",
            url: "http://191.33.228.212:3000/tab-bar/ajax/indicacoes.php", 
            data: {cli_id : cli_id},            
            async: false,
            dataType: "json", 
            success: function (json) {
				if(json.result){

					 $('#ind_quant').html(json.dados.length);
					 $("#lista_pendente li").remove();
					 $("#lista_faturada li").remove();
					 $("#lista_aguardando li").remove();
					 $("#lista_cancelada li").remove();
					 
					$("#div_pendente").show();
					$("#div_faturada").show();
					$("#div_aguardando").show();
					$("#div_cancelada").show();
						
					for (x in json.dados) {
					
					if(json.dados[x].ind_status=='PENDENTE')
					$("#lista_pendente").append('<li><a href="indicacao.html?ind_id='+json.dados[x].ind_id+'" class="item-link"><div class="item-content"><div class="item-inner"><div class="item-title">'+json.dados[x].ind_nome+'</div></div></div></a></li>');

					if(json.dados[x].ind_status=='FATURADA')
					$("#lista_faturada").append('<li><a href="indicacao.html?ind_id='+json.dados[x].ind_id+'" class="item-link"><div class="item-content"><div class="item-inner"><div class="item-title">'+json.dados[x].ind_nome+'</div></div></div></a></li>');

					if(json.dados[x].ind_status=='AGUARDANDO')
					$("#lista_aguardando").append('<li><a href="indicacao.html?ind_id='+json.dados[x].ind_id+'" class="item-link"><div class="item-content"><div class="item-inner"><div class="item-title">'+json.dados[x].ind_nome+'</div></div></div></a></li>');

					if(json.dados[x].ind_status=='CANCELADA')
					$("#lista_cancelada").append('<li><a href="indicacao.html?ind_id='+json.dados[x].ind_id+'" class="item-link"><div class="item-content"><div class="item-inner"><div class="item-title">'+json.dados[x].ind_nome+'</div></div></div></a></li>');

				
					} 
					
					if($("#lista_pendente li").length==0){
						$("#div_pendente").hide();
					}
					
					if($("#lista_faturada li").length==0){
						$("#div_faturada").hide();
					}
					
					if($("#lista_aguardando li").length==0){
						$("#div_aguardando").hide();
					}
					
					if($("#lista_cancelada li").length==0){
						$("#div_cancelada").hide();
					}
					myApp.hidePreloader();
				}else{
					myApp.hidePreloader();
					//myApp.alert(json.msg,'Atenção')
				}
            },error: function(xhr,e,t){
                console.log(xhr.responseText);                
            }
        });
		
		
}

$('#tab_indicacoes').on('click', function(){

	carrega_indicacoes()
	
	});
	
	
myApp.onPageInit('indicacao', function (page) {	
	myApp.showPreloader('Carregando...');
	var ind_id = page.query.ind_id;
	  $.ajax({
            type: "POST",
            url: "http://191.33.228.212:3000/tab-bar/ajax/get_indicacao.php", 
            data: {ind_id:ind_id},            
            async: false,
            dataType: "json", 
            success: function (json) {
				if(json.result){
					

					$('#indd_nome').val(json.dados[0].ind_nome);  
					$('#indd_telefone1').val(json.dados[0].ind_telefone1);  
					$('#indd_telefone2').val(json.dados[0].ind_telefone2);  
					$('#indd_cep').val(json.dados[0].ind_cep);  
					$('#indd_status').val(json.dados[0].ind_status);  
					$('#indd_cidade').val(json.dados[0].ind_cidade);  
					$('#indd_estado').val(json.dados[0].ind_estado);  
					$('#indd_obs').val(json.dados[0].ind_obs);  
					myApp.hidePreloader();
					
				}else{
					myApp.hidePreloader();
					myApp.alert(json.msg,'Atenção')
				}
            },error: function(xhr,e,t){
                console.log(xhr.responseText);                
            }
        });
});